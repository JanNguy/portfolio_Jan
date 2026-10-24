import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { artworkSrc, type BiblioTrack } from "@/lib/biblio-source";

/**
 * Scène Three.js de /biblio : une étagère de boîtiers CD, un par titre.
 *
 * Un clic tire le boîtier hors de l'étagère, le fait pivoter face à soi,
 * puis le disque glisse hors du boîtier et tourne pendant l'extrait.
 * Classe sans React : `CdLibrary` la pilote via `setSelected` / `dispose`.
 *
 * Unités : le centimètre (un boîtier cristal mesure 1 × 12,5 × 14,2 cm).
 */

const CASE_W = 1.0;
const CASE_H = 12.5;
const CASE_D = 14.2;
const PITCH = 1.07;
const BOARD = 1.6;
const ROW_H = 14.4;
const SHELF_D = 16.5;
const SIDE_PAD = 0.7;
/** Recul de la tranche par rapport au chant des planches. */
const INSET = 0.9;
const HOVER_PULL = 2.2;
/** Course de sortie avant de pivoter : le boîtier doit quitter l'étagère. */
const PULL = CASE_D + 2;
const DISC_R = 5.9;
const DISC_SLIDE = 7.4;
const FOV = 26;

/** Durées des animations (s), raccourcies si l'utilisateur limite les animations. */
const PICK_DURATION = 1.35;
const RETURN_DURATION = 1.05;
const DISC_DURATION = 0.75;

const SHELF_COLOR = 0xefebe4;
const BACK_COLOR = 0xe4dfd6;
const TRAY_COLOR = 0x18181a;
const DIM_COLOR = 0xf7f6f3;

const SERIF = '"Times New Normal", Times, serif';

export type CdShelfCallbacks = {
    /** Clic dans la scène : index du disque touché, ou `null` dans le vide. */
    onPick: (index: number | null) => void;
    onHover: (index: number | null) => void;
    isPlaying: () => boolean;
};

type Cd = {
    group: THREE.Group;
    body: THREE.Mesh;
    discPivot: THREE.Group;
    spinner: THREE.Group;
    home: THREE.Vector3;
    homeQuat: THREE.Quaternion;
    hover: number;
    /** Progression sortie → face à soi, 0..1 (linéaire, adoucie au rendu). */
    pick: number;
    /** Sortie du disque hors du boîtier, 0..1. */
    disc: number;
    spin: number;
    jitter: { z: number; roll: number; yaw: number; x: number };
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const damp = (current: number, target: number, lambda: number, dt: number) =>
    THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));

/** Pseudo-aléatoire déterministe : l'étagère garde le même désordre à chaque visite. */
function seeded(seed: number) {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

/**
 * Appareil contraint (mobile) : 44 boîtiers × 4 textures pleine définition
 * dépassent la mémoire canvas d'iOS Safari, qui recharge alors la page à blanc.
 */
function isConstrained() {
    return (
        window.matchMedia("(pointer: coarse)").matches ||
        Math.min(window.screen.width, window.screen.height) < 768
    );
}

function makeCanvas(width: number, height: number, scale: number) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    return { canvas, ctx: canvas.getContext("2d")! };
}

/** Contexte 2D en coordonnées logiques : le dessin ignore la définition réelle. */
function logical(texture: THREE.CanvasTexture, width: number, height: number) {
    const canvas = texture.image as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    return { ctx, width, height };
}

const SPINE_SIZE = [128, 1600] as const;
const FACE_SIZE = [1136, 1000] as const;
const LABEL_SIZE = 512;

/**
 * Réduit la police jusqu'à ce que le texte tienne dans `maxWidth`.
 * `font` construit la déclaration CSS complète pour une taille donnée.
 */
function fitFont(
    ctx: CanvasRenderingContext2D,
    text: string,
    font: (size: number) => string,
    size: number,
    maxWidth: number,
) {
    let current = size;
    ctx.font = font(current);
    while (current > 12 && ctx.measureText(text).width > maxWidth) {
        current -= 1;
        ctx.font = font(current);
    }
    return Math.min(ctx.measureText(text).width, maxWidth);
}

const serif = (size: number) => `${size}px ${SERIF}`;

/** Police sans-serif du site (Manrope via next/font, nom généré à la compilation). */
function siteSans() {
    const value = getComputedStyle(document.body).getPropertyValue("--font-sans").trim();
    return value || "system-ui, sans-serif";
}

class CdTextures {
    readonly spine: THREE.CanvasTexture;
    readonly cover: THREE.CanvasTexture;
    readonly back: THREE.CanvasTexture;
    readonly label: THREE.CanvasTexture;
    private image: HTMLImageElement | null = null;
    private disposed = false;

    constructor(
        private readonly track: BiblioTrack,
        private readonly index: number,
        private readonly total: number,
        private readonly sans: string,
        anisotropy: number,
        scale: number,
        private readonly onChange: () => void,
    ) {
        this.spine = this.texture(makeCanvas(...SPINE_SIZE, scale).canvas, anisotropy);
        this.cover = this.texture(makeCanvas(...FACE_SIZE, scale).canvas, anisotropy);
        this.back = this.texture(makeCanvas(...FACE_SIZE, scale).canvas, anisotropy);
        this.label = this.texture(makeCanvas(LABEL_SIZE, LABEL_SIZE, scale).canvas, anisotropy);
        this.drawAll();

        const image = new Image();
        image.crossOrigin = "anonymous";
        image.decoding = "async";
        image.onload = () => {
            if (this.disposed) return;
            this.image = image;
            this.drawAll();
            this.onChange();
        };
        image.src = artworkSrc(track.artwork, 600);
    }

    private texture(canvas: HTMLCanvasElement, anisotropy: number) {
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = anisotropy;
        return texture;
    }

    private get bg() {
        return `#${this.track.bgColor}`;
    }

    private get fg() {
        return `#${this.track.textColor}`;
    }

    private drawAll() {
        this.drawSpine();
        this.drawCover();
        this.drawBack();
        this.drawLabel();
    }

    private drawSpine() {
        const { ctx, width, height } = logical(this.spine, ...SPINE_SIZE);

        ctx.fillStyle = this.bg;
        ctx.fillRect(0, 0, width, height);

        // Charnières du boîtier, en haut et en bas de la tranche.
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.fillRect(0, 0, width, 22);
        ctx.fillRect(0, height - 22, width, 22);

        const thumb = 92;
        const thumbY = height - 22 - 26 - thumb;
        if (this.image) {
            ctx.drawImage(this.image, (width - thumb) / 2, thumbY, thumb, thumb);
        }

        const number = String(this.index + 1).padStart(2, "0");
        ctx.fillStyle = this.fg;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `600 26px ${this.sans}`;
        ctx.fillText(number, width / 2, 62);

        // Texte en lecture de haut en bas, centré sur la tranche.
        ctx.save();
        ctx.translate(width / 2, 0);
        ctx.rotate(Math.PI / 2);
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const start = 112;
        const available = thumbY - 30 - start;
        const artist = this.track.artist.toUpperCase();
        const artistWidth = fitFont(
            ctx,
            artist,
            (size) => `600 ${size}px ${this.sans}`,
            30,
            available * 0.42,
        );
        ctx.globalAlpha = 0.72;
        ctx.fillText(artist, start, 0, artistWidth);
        ctx.globalAlpha = 1;

        const titleStart = start + artistWidth + 28;
        fitFont(ctx, this.track.title, serif, 50, start + available - titleStart);
        ctx.fillText(this.track.title, titleStart, 2, start + available - titleStart);
        ctx.restore();

        this.spine.needsUpdate = true;
    }

    private drawCover() {
        const { ctx, width, height } = logical(this.cover, ...FACE_SIZE);
        const hinge = width - height;

        ctx.fillStyle = this.bg;
        ctx.fillRect(0, 0, width, height);
        if (this.image) {
            ctx.drawImage(this.image, hinge, 0, height, height);
        } else {
            ctx.fillStyle = this.fg;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            fitFont(ctx, this.track.title, serif, 80, height * 0.8);
            ctx.fillText(this.track.title, hinge + height / 2, height / 2);
        }

        // Charnière en plastique strié, côté tranche.
        ctx.fillStyle = "rgba(12, 12, 14, 0.82)";
        ctx.fillRect(0, 0, hinge, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        for (let x = 10; x < hinge - 6; x += 9) ctx.fillRect(x, 0, 2, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.fillRect(hinge - 3, 0, 3, height);

        this.cover.needsUpdate = true;
    }

    private drawBack() {
        const { ctx, width, height } = logical(this.back, ...FACE_SIZE);
        const pad = 90;

        ctx.fillStyle = this.bg;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = this.fg;
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";

        ctx.font = `600 28px ${this.sans}`;
        ctx.globalAlpha = 0.6;
        ctx.fillText(
            `BIBLIO — ${String(this.index + 1).padStart(2, "0")} / ${this.total}`,
            pad,
            pad + 20,
        );
        ctx.globalAlpha = 1;

        fitFont(ctx, this.track.title, serif, 96, width - pad * 2);
        ctx.fillText(this.track.title, pad, height * 0.46);

        ctx.font = `600 34px ${this.sans}`;
        ctx.fillText(this.track.artist.toUpperCase(), pad, height * 0.46 + 70, width - pad * 2);

        ctx.font = `30px ${SERIF}`;
        ctx.globalAlpha = 0.7;
        const meta = [this.track.album, this.track.year, this.track.genre]
            .filter(Boolean)
            .join(" · ");
        ctx.fillText(meta, pad, height - pad, width - pad * 2);
        ctx.globalAlpha = 1;

        this.back.needsUpdate = true;
    }

    private drawLabel() {
        const { ctx, width } = logical(this.label, LABEL_SIZE, LABEL_SIZE);

        ctx.fillStyle = this.bg;
        ctx.fillRect(0, 0, width, width);
        if (this.image) ctx.drawImage(this.image, 0, 0, width, width);

        // Léger voile radial : le disque imprimé n'est pas aussi plat qu'une pochette.
        const gradient = ctx.createRadialGradient(
            width / 2, width / 2, width * 0.18,
            width / 2, width / 2, width / 2,
        );
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.18)");
        gradient.addColorStop(0.35, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.12)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, width);

        this.label.needsUpdate = true;
    }

    dispose() {
        this.disposed = true;
        this.spine.dispose();
        this.cover.dispose();
        this.back.dispose();
        this.label.dispose();
    }
}

export class CdShelfScene {
    private readonly renderer: THREE.WebGLRenderer;
    private readonly scene = new THREE.Scene();
    private readonly camera = new THREE.PerspectiveCamera(FOV, 1, 1, 600);
    private readonly raycaster = new THREE.Raycaster();
    private readonly shelf = new THREE.Group();
    private readonly dim: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    private readonly wood = new THREE.MeshStandardMaterial({ color: SHELF_COLOR, roughness: 0.82 });
    private readonly backWood = new THREE.MeshStandardMaterial({ color: BACK_COLOR, roughness: 0.9 });
    private readonly sun: THREE.DirectionalLight;
    private readonly cds: Cd[] = [];
    private readonly textures: CdTextures[] = [];
    private readonly disposables: { dispose: () => void }[] = [];
    private readonly resizeObserver: ResizeObserver;
    private readonly visibilityObserver: IntersectionObserver;
    private readonly reducedMotion: boolean;

    private width = 1;
    private height = 1;
    private readonly constrained: boolean;
    private perRow = 0;
    private cameraDistance = 50;
    private readonly cameraBase = new THREE.Vector3();
    private readonly lookTarget = new THREE.Vector3();
    private readonly pointer = new THREE.Vector2(0, 0);
    private readonly parallax = new THREE.Vector2(0, 0);
    private pointerInside = false;
    private hovered: number | null = null;
    private selected: number | null = null;
    private visible = true;
    private frame = 0;
    private lastTime = 0;
    private elapsed = 0;

    constructor(
        private readonly container: HTMLElement,
        private readonly tracks: BiblioTrack[],
        private readonly callbacks: CdShelfCallbacks,
        private readonly tooltip: HTMLElement | null,
    ) {
        this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        this.constrained = isConstrained();

        this.renderer = new THREE.WebGLRenderer({ antialias: !this.constrained, alpha: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.constrained ? 1.5 : 2));
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.NeutralToneMapping;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.domElement.style.display = "block";
        this.renderer.domElement.style.width = "100%";
        this.renderer.domElement.style.height = "100%";
        this.renderer.domElement.style.touchAction = "pan-y";
        container.appendChild(this.renderer.domElement);

        const pmrem = new THREE.PMREMGenerator(this.renderer);
        const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        pmrem.dispose();
        this.scene.environment = environment;
        this.scene.environmentIntensity = 0.55;
        this.disposables.push(environment);

        this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c8, 0.9));
        this.sun = new THREE.DirectionalLight(0xfff6ea, 2.1);
        this.sun.castShadow = true;
        const shadowSize = this.constrained ? 1024 : 2048;
        this.sun.shadow.mapSize.set(shadowSize, shadowSize);
        this.sun.shadow.bias = -0.0004;
        this.sun.shadow.normalBias = 0.03;
        this.sun.shadow.radius = 5;
        this.scene.add(this.sun, this.sun.target);
        this.scene.add(this.shelf);

        const dimMaterial = new THREE.MeshBasicMaterial({
            color: DIM_COLOR,
            transparent: true,
            opacity: 0,
            depthWrite: false,
        });
        this.dim = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), dimMaterial);
        this.dim.position.z = 2.5;
        this.dim.visible = false;
        this.scene.add(this.dim);
        this.disposables.push(this.dim.geometry, dimMaterial, this.wood, this.backWood);

        this.buildCds();

        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(container);
        this.visibilityObserver = new IntersectionObserver(([entry]) => {
            this.visible = entry.isIntersecting;
            if (this.visible) this.start();
        });
        this.visibilityObserver.observe(container);

        const canvas = this.renderer.domElement;
        canvas.addEventListener("pointermove", this.handlePointerMove);
        canvas.addEventListener("pointerleave", this.handlePointerLeave);
        canvas.addEventListener("click", this.handleClick);
        document.addEventListener("visibilitychange", this.handleVisibility);

        this.resize();
        this.start();
    }

    // ── Construction ────────────────────────────────────────────────────────

    private buildCds() {
        const sans = siteSans();
        const anisotropy = Math.min(
            this.renderer.capabilities.getMaxAnisotropy(),
            this.constrained ? 4 : 16,
        );
        const scale = this.constrained ? 0.5 : 1;
        const random = seeded(7);

        const box = new THREE.BoxGeometry(CASE_W, CASE_H, CASE_D);
        const trayMaterial = new THREE.MeshPhysicalMaterial({
            color: TRAY_COLOR,
            roughness: 0.35,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        });

        const labelRing = new THREE.RingGeometry(2.1, DISC_R, 96, 1);
        const hubRing = new THREE.RingGeometry(0.75, 2.1, 64, 1);
        const backRing = new THREE.RingGeometry(0.75, DISC_R, 96, 1);
        const discBack = new THREE.MeshPhysicalMaterial({
            color: 0xdedfe3,
            metalness: 1,
            roughness: 0.18,
            iridescence: 1,
            iridescenceIOR: 1.6,
            iridescenceThicknessRange: [200, 800],
            side: THREE.DoubleSide,
        });
        const hubMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.15,
            transparent: true,
            opacity: 0.45,
            side: THREE.DoubleSide,
        });
        this.disposables.push(box, trayMaterial, labelRing, hubRing, backRing, discBack, hubMaterial);

        this.tracks.forEach((track, index) => {
            const textures = new CdTextures(track, index, this.tracks.length, sans, anisotropy, scale, () =>
                this.start(),
            );
            this.textures.push(textures);

            const glossy = (map: THREE.Texture) =>
                new THREE.MeshPhysicalMaterial({
                    map,
                    roughness: 0.55,
                    clearcoat: 1,
                    clearcoatRoughness: 0.06,
                });
            const coverMaterial = glossy(textures.cover);
            const backMaterial = glossy(textures.back);
            const spineMaterial = glossy(textures.spine);
            const labelMaterial = new THREE.MeshStandardMaterial({
                map: textures.label,
                roughness: 0.45,
            });
            this.disposables.push(coverMaterial, backMaterial, spineMaterial, labelMaterial);

            // Ordre des faces d'un BoxGeometry : +x, −x, +y, −y, +z, −z.
            const body = new THREE.Mesh(box, [
                coverMaterial,
                backMaterial,
                trayMaterial,
                trayMaterial,
                spineMaterial,
                trayMaterial,
            ]);
            body.castShadow = true;
            body.receiveShadow = true;
            body.userData.index = index;

            // Le disque est rangé dans le boîtier (axe +x = face pochette)
            // et en sort par le côté opposé à la tranche (−z).
            const spinner = new THREE.Group();
            const label = new THREE.Mesh(labelRing, labelMaterial);
            label.position.z = 0.025;
            const hub = new THREE.Mesh(hubRing, hubMaterial);
            hub.position.z = 0.02;
            const back = new THREE.Mesh(backRing, discBack);
            back.position.z = -0.025;
            back.rotation.y = Math.PI;
            spinner.add(label, hub, back);

            const discPivot = new THREE.Group();
            discPivot.rotation.y = Math.PI / 2;
            discPivot.add(spinner);
            discPivot.visible = false;

            const group = new THREE.Group();
            group.add(body, discPivot);
            this.scene.add(group);

            this.cds.push({
                group,
                body,
                discPivot,
                spinner,
                home: new THREE.Vector3(),
                homeQuat: new THREE.Quaternion(),
                hover: 0,
                pick: 0,
                disc: 0,
                spin: 0,
                jitter: {
                    z: random() * 0.7,
                    roll: (random() - 0.5) * 0.012,
                    yaw: (random() - 0.5) * 0.03,
                    x: (random() - 0.5) * 0.03,
                },
            });
        });
    }

    /** Nombre de boîtiers par rangée selon le format du cadre. */
    private chooseColumns(aspect: number) {
        const count = this.tracks.length;
        // Surface d'un boîtier sur l'étagère : PITCH × (ROW_H + BOARD).
        const ideal = Math.sqrt((count * (ROW_H + BOARD) * aspect) / PITCH);
        const rows = Math.max(1, Math.round(count / Math.max(1, ideal)));
        return Math.ceil(count / rows);
    }

    private layout() {
        const perRow = this.chooseColumns(this.width / this.height);
        if (perRow === this.perRow) return;
        this.perRow = perRow;

        for (const child of [...this.shelf.children]) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.dispose();
            this.shelf.remove(mesh);
        }

        const rows = Math.ceil(this.tracks.length / perRow);
        const innerW = perRow * PITCH + SIDE_PAD * 2;
        const outerW = innerW + BOARD * 2;
        const outerH = rows * ROW_H + (rows + 1) * BOARD;
        const front = 0.6;
        const centerZ = front - SHELF_D / 2;

        const { wood, backWood } = this;

        const add = (geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number) => {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.shelf.add(mesh);
        };

        for (let r = 0; r <= rows; r++) {
            const y = outerH / 2 - BOARD / 2 - r * (ROW_H + BOARD);
            add(new THREE.BoxGeometry(outerW, BOARD, SHELF_D), wood, 0, y, centerZ);
        }
        for (const side of [-1, 1]) {
            add(new THREE.BoxGeometry(BOARD, outerH, SHELF_D), wood, side * (outerW - BOARD) / 2, 0, centerZ);
        }
        add(new THREE.BoxGeometry(outerW, outerH, 0.4), backWood, 0, 0, front - SHELF_D - 0.2);

        this.cds.forEach((cd, index) => {
            const row = Math.floor(index / perRow);
            const col = index % perRow;
            const floor = outerH / 2 - BOARD - row * (ROW_H + BOARD) - ROW_H;
            cd.home.set(
                -innerW / 2 + SIDE_PAD + (col + 0.5) * PITCH + cd.jitter.x,
                floor + CASE_H / 2 + 0.001,
                front - INSET - CASE_D / 2 - cd.jitter.z,
            );
            cd.homeQuat.setFromEuler(new THREE.Euler(0, cd.jitter.yaw, cd.jitter.roll));
        });

        // Cadrage : toute l'étagère tient dans le champ, avec une marge.
        const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
        const margin = 1.1;
        const aspect = this.width / this.height;
        const fitH = (outerH / 2) * margin / tan;
        const fitW = (outerW / 2) * margin / (tan * aspect);
        this.cameraDistance = Math.max(fitH, fitW) + front;
        this.cameraBase.set(0, outerH * 0.06, this.cameraDistance);
        this.lookTarget.set(0, 0, -SHELF_D * 0.25);

        const extent = Math.max(outerW, outerH) * 0.75;
        Object.assign(this.sun.shadow.camera, {
            left: -extent,
            right: extent,
            top: extent,
            bottom: -extent,
            near: 1,
            far: 200,
        });
        this.sun.shadow.camera.updateProjectionMatrix();
        this.sun.position.set(-outerW * 0.35, outerH * 0.9 + 20, 45);
        this.sun.target.position.set(0, 0, -SHELF_D / 2);
    }

    // ── Pilotage ────────────────────────────────────────────────────────────

    setSelected(index: number | null) {
        this.selected = index;
        this.start();
    }

    private resize() {
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, rect.width);
        this.height = Math.max(1, rect.height);
        this.renderer.setSize(this.width, this.height, false);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.perRow = 0;
        this.layout();
        this.start();
    }

    private handlePointerMove = (event: PointerEvent) => {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.pointer.set(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        this.pointerInside = event.pointerType === "mouse";
        if (this.tooltip) {
            this.tooltip.style.transform = `translate(${event.clientX - rect.left + 14}px, ${
                event.clientY - rect.top + 18
            }px)`;
        }
        this.start();
    };

    private handlePointerLeave = () => {
        this.pointerInside = false;
        this.setHovered(null);
    };

    private handleClick = (event: MouseEvent) => {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.pointer.set(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        this.callbacks.onPick(this.pick());
    };

    private handleVisibility = () => {
        if (!document.hidden) this.start();
    };

    private pick(): number | null {
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const hits = this.raycaster.intersectObjects(
            this.cds.map((cd) => cd.body),
            false,
        );
        const hit = hits[0];
        return hit ? (hit.object.userData.index as number) : null;
    }

    private setHovered(index: number | null) {
        if (index === this.hovered) return;
        this.hovered = index;
        this.renderer.domElement.style.cursor = index === null ? "default" : "pointer";
        this.callbacks.onHover(index);
    }

    // ── Boucle de rendu ─────────────────────────────────────────────────────

    private start() {
        if (this.frame || !this.visible || document.hidden) return;
        this.lastTime = performance.now();
        this.frame = requestAnimationFrame(this.tick);
    }

    private tick = (now: number) => {
        this.frame = 0;
        const dt = Math.min(0.05, (now - this.lastTime) / 1000);
        this.lastTime = now;
        this.elapsed += dt;

        const busy = this.update(dt);
        this.renderer.render(this.scene, this.camera);

        // Au repos (rien ne bouge, souris hors du cadre), on cesse de dessiner.
        if (busy && this.visible && !document.hidden) {
            this.frame = requestAnimationFrame(this.tick);
        }
    };

    private readonly tmpPos = new THREE.Vector3();
    private readonly tmpQuat = new THREE.Quaternion();
    private readonly viewPos = new THREE.Vector3();
    private readonly viewQuat = new THREE.Quaternion();
    private readonly forward = new THREE.Vector3();
    private readonly right = new THREE.Vector3();
    private readonly up = new THREE.Vector3();
    private readonly tilt = new THREE.Euler();
    private readonly faceCamera = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, -Math.PI / 2, 0),
    );

    /** Avance l'état d'une image ; renvoie `true` tant qu'une animation est en cours. */
    private update(dt: number): boolean {
        let busy = this.pointerInside;
        const speed = this.reducedMotion ? 2.5 : 1;

        // Caméra : léger parallaxe qui suit la souris.
        const parallaxTarget = this.reducedMotion || !this.pointerInside ? 0 : 1;
        this.parallax.x = damp(this.parallax.x, this.pointer.x * parallaxTarget, 3, dt);
        this.parallax.y = damp(this.parallax.y, this.pointer.y * parallaxTarget, 3, dt);
        if (Math.abs(this.parallax.x - this.pointer.x * parallaxTarget) > 0.001) busy = true;
        this.camera.position.set(
            this.cameraBase.x + this.parallax.x * 1.6,
            this.cameraBase.y + this.parallax.y * 0.9,
            this.cameraBase.z,
        );
        this.camera.lookAt(this.lookTarget);
        this.camera.updateMatrixWorld();

        // Survol (souris uniquement).
        this.setHovered(this.pointerInside ? this.pick() : null);

        // Pose « en main » : devant la caméra, à l'échelle du cadre.
        const aspect = this.width / this.height;
        const wide = aspect > 1.15;
        const distance = this.cameraDistance * 0.5;
        const visH = 2 * distance * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
        const visW = visH * aspect;
        const span = CASE_D / 2 + DISC_SLIDE + DISC_R;
        const scale = wide
            ? Math.min((0.62 * visH) / CASE_H, (0.5 * visW) / (CASE_D / 2 + span))
            : Math.min((0.94 * visW) / (CASE_D / 2 + span), (0.42 * visH) / CASE_H);
        const offsetX = wide ? -0.2 * visW : -((span - CASE_D / 2) / 2) * scale;
        const offsetY = wide ? 0.02 * visH : 0.2 * visH;

        this.camera.matrixWorld.extractBasis(this.right, this.up, this.forward);
        this.forward.negate();
        const float = this.reducedMotion ? 0 : Math.sin(this.elapsed * 1.1) * 0.12;
        this.viewPos
            .copy(this.camera.position)
            .addScaledVector(this.forward, distance)
            .addScaledVector(this.right, offsetX)
            .addScaledVector(this.up, offsetY + float);

        this.tilt.set(
            -this.parallax.y * 0.16,
            this.parallax.x * 0.32 + (this.reducedMotion ? 0 : Math.sin(this.elapsed * 0.6) * 0.05),
            0,
        );
        this.viewQuat
            .copy(this.camera.quaternion)
            .multiply(this.tmpQuat.setFromEuler(this.tilt))
            .multiply(this.faceCamera);

        let dimLevel = 0;
        const playing = this.callbacks.isPlaying();

        this.cds.forEach((cd, index) => {
            const isSelected = index === this.selected;

            const hoverTarget = this.hovered === index && this.selected === null ? 1 : 0;
            cd.hover = damp(cd.hover, hoverTarget, 12, dt);
            if (Math.abs(cd.hover - hoverTarget) > 0.002) busy = true;

            // Le disque rentre avant que le boîtier ne regagne l'étagère.
            const discTarget = isSelected && cd.pick >= 1 ? 1 : 0;
            const discStep = (dt * speed) / DISC_DURATION;
            cd.disc = discTarget ? Math.min(1, cd.disc + discStep) : Math.max(0, cd.disc - discStep * 1.4);
            if (cd.disc !== discTarget) busy = true;

            if (isSelected) {
                cd.pick = Math.min(1, cd.pick + (dt * speed) / PICK_DURATION);
            } else if (cd.disc === 0) {
                cd.pick = Math.max(0, cd.pick - (dt * speed) / RETURN_DURATION);
            }
            if (cd.pick > 0 && cd.pick < 1) busy = true;

            const spinTarget = isSelected && playing && cd.disc >= 1 ? 4.2 : 0;
            cd.spin = damp(cd.spin, spinTarget, 1.8, dt);
            if (cd.spin > 0.01) {
                cd.spinner.rotation.z -= cd.spin * dt;
                busy = true;
            }

            // Pose de repos, tirée de quelques centimètres au survol.
            this.tmpPos.copy(cd.home);
            this.tmpPos.z += cd.hover * HOVER_PULL;
            this.tmpPos.y += cd.hover * 0.12;

            if (cd.pick <= 0) {
                cd.group.position.copy(this.tmpPos);
                cd.group.quaternion.copy(cd.homeQuat);
                cd.group.scale.setScalar(1);
            } else {
                // 1. On tire le boîtier hors de l'étagère, 2. il vient face à soi.
                const out = easeInOut(clamp01(cd.pick / 0.34));
                const turn = easeInOut(clamp01((cd.pick - 0.3) / 0.7));
                this.tmpPos.z += out * PULL;
                this.tmpPos.y += out * 0.6;

                cd.group.position.lerpVectors(this.tmpPos, this.viewPos, turn);
                cd.group.position.addScaledVector(this.up, Math.sin(Math.PI * turn) * 2.2);
                cd.group.quaternion.slerpQuaternions(cd.homeQuat, this.viewQuat, turn);
                cd.group.scale.setScalar(THREE.MathUtils.lerp(1, scale, turn));
                dimLevel = Math.max(dimLevel, turn);
                if (isSelected && cd.pick >= 1 && !this.reducedMotion) busy = true;
            }

            cd.discPivot.visible = cd.disc > 0;
            cd.discPivot.position.z = -easeInOut(cd.disc) * DISC_SLIDE;
        });

        this.dim.visible = dimLevel > 0.001;
        this.dim.material.opacity = dimLevel * 0.84;

        return busy;
    }

    dispose() {
        cancelAnimationFrame(this.frame);
        this.frame = 0;
        this.resizeObserver.disconnect();
        this.visibilityObserver.disconnect();
        const canvas = this.renderer.domElement;
        canvas.removeEventListener("pointermove", this.handlePointerMove);
        canvas.removeEventListener("pointerleave", this.handlePointerLeave);
        canvas.removeEventListener("click", this.handleClick);
        document.removeEventListener("visibilitychange", this.handleVisibility);

        for (const child of this.shelf.children) (child as THREE.Mesh).geometry.dispose();
        this.textures.forEach((textures) => textures.dispose());
        this.disposables.forEach((item) => item.dispose());
        this.renderer.dispose();
        canvas.remove();
    }
}
