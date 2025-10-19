import { useState, useRef, useEffect, useCallback } from "react";
import type { Position, DivId } from "../utils/interfaces.tsx";
import "../css/App.css";

function BlockApp() {
    const [positionsDefault] = useState<{ [key in DivId]: Position }>({
        div1: { x: 0, y: 0 },
        div2: { x: 0, y: 0 },
        div3: { x: 0, y: 0 },
    });
    const [positions, setPositions] = useState<{ [key in DivId]: Position }>({
        div1: { x: 0, y: 0 },
        div2: { x: 0, y: 100 },
        div3: { x: 0, y: 0 },
    });
    const [positionsArrive, setPositionsArrive] = useState<{
        [key in DivId]: Position;
    }>({
        div1: { x: 0, y: 0 },
        div2: { x: 0, y: 0 },
        div3: { x: 0, y: 0 },
    });

    const animationFrameIds = useRef<{ [key in DivId]?: number | null }>({});
    const [screenWidth] = useState(window.innerWidth);
    const [screenHeight] = useState(window.innerHeight);
    const [draggingDiv, setDraggingDiv] = useState<DivId | null>(null);

    const handleMouseDown = (divId: DivId) => (_e: React.MouseEvent) => {
        setDraggingDiv(divId);
    };

    const handleMouseUp = useCallback(() => {
        setDraggingDiv(null);
    }, []);

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            if (draggingDiv !== null) {
                setPositions((prev) => ({
                    ...prev,
                    [draggingDiv]: {
                        x: e.clientX,
                        y: e.clientY,
                    },
                }));
            }
        }
        if (draggingDiv !== null) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [draggingDiv, handleMouseUp]);

    function animate(
        targetId: DivId,
        destination: Position,
        duration: number = 1000,
    ) {
        const startX = positions[targetId].x;
        const startY = positions[targetId].y;
        const deltaX = destination.x - startX;
        const deltaY = destination.y - startY;
        let startTime: number | null = null;

        function smoothAnimate(currentTime: number) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const newX = startX + deltaX * progress;
            const newY = startY + deltaY * progress;

            setPositions((prev) => ({
                ...prev,
                [targetId]: { x: newX, y: newY },
            }));

            if (progress < 1) {
                animationFrameIds.current[targetId] =
                    requestAnimationFrame(smoothAnimate);
            } else {
                animationFrameIds.current[targetId] = null;
            }
        }

        if (animationFrameIds.current[targetId]) {
            cancelAnimationFrame(animationFrameIds.current[targetId]!);
        }

        animationFrameIds.current[targetId] =
            requestAnimationFrame(smoothAnimate);
    }

    const handleChange =
        (divId: DivId, axis: "x" | "y") =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let numVal = e.target.value === "" ? 0 : Number(e.target.value);
            if (numVal >= screenWidth && axis === "x") numVal = 0;
            if (numVal >= screenHeight && axis === "y") numVal = 0;
            setPositions((prev) => ({
                ...prev,
                [divId]: {
                    ...prev[divId],
                    [axis]: numVal,
                },
            }));
        };

    const handleChangeArrive =
        (divId: DivId, axis: "x" | "y") =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let numVal = e.target.value === "" ? 0 : Number(e.target.value);
            if (numVal >= screenWidth && axis === "x") numVal = 0;
            if (numVal >= screenHeight && axis === "y") numVal = 0;
            setPositionsArrive((prev) => ({
                ...prev,
                [divId]: {
                    ...prev[divId],
                    [axis]: numVal,
                },
            }));
        };

    useEffect(() => {
        const ids = animationFrameIds.current;
        return () => {
            Object.values(ids).forEach((id) => {
                if (id) cancelAnimationFrame(id);
            });
        };
    }, []);

    return (
        <>
            <div className="flex flex-col justify-around">
                <div
                    className="bg-emerald-300 h-24 w-24 flex items-center justify-center"
                    style={{
                        transform: `translate(${positions.div1.x}px, ${positions.div1.y}px)`,
                    }}
                    onMouseDown={handleMouseDown("div1")}
                >
                    Div 1
                </div>

                <div
                    className="bg-gray-300 h-24 w-24 flex items-center justify-center"
                    style={{
                        transform: `translate(${positions.div2.x}px, ${positions.div2.y - 100}px)`,
                    }}
                    onMouseDown={handleMouseDown("div2")}
                >
                    Div 2
                </div>

                {/* {divIds.map((id: number) => {
                    return <div key={id} className="bg-emerald-300 h-24 w-24 flex items-center justify-center">
                        div n° {id}
                    </div>
                })} */}
            </div>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex">
                <div className="flex flex-nowrap flex-col ml-20">
                    <div className="flex flex-row flex-nowrap my-auto">
                        <input
                            type="number"
                            className="h-10 border-1 border-solid border-radius mx-3 border-slate-600 rounded-2xl text-black px-5"
                            id="inputDiv1X"
                            placeholder="Div1 départ X"
                            onChange={handleChange("div1", "x")}
                        />
                        <input
                            type="number"
                            className="border-1 border-solid mx-3 border-slate-600 rounded-2xl text-black px-5"
                            id="inputDiv1Y"
                            placeholder="Div1 départ Y"
                            onChange={handleChange("div1", "y")}
                        />
                        <input
                            type="number"
                            className="border-1 border-solid mx-3 border-slate-600 rounded-2xl text-black px-5"
                            id="inputDiv2X"
                            placeholder="Div2 départ X"
                            onChange={handleChange("div2", "x")}
                        />
                        <input
                            type="number"
                            className="border-1 border-solid mx-3 border-slate-600 rounded-2xl text-black px-5"
                            id="inputDiv2Y"
                            placeholder="Div2 départ Y"
                            onChange={handleChange("div2", "y")}
                        />
                    </div>
                    <div className="flex flex-row flex-nowrap my-5">
                        <input
                            type="number"
                            className="h-10 border-1 border-solid mx-3 border-slate-600 rounded-2xl text-black px-5"
                            id="inputDiv1XArr"
                            placeholder="Div1 arrivée X"
                            onChange={handleChangeArrive("div1", "x")}
                        />
                        <input
                            type="number"
                            className="border-1 border-solid mx-3 border-slate-600 rounded-2xl text-black px-5"
                            id="inputDiv1YArr"
                            placeholder="Div1 arrivée Y"
                            onChange={handleChangeArrive("div1", "y")}
                        />
                        <input
                            type="number"
                            className="border-1 border-solid mx-3 border-slate-600 rounded-2xl text-black px-5"
                            id="inputDiv2XArr"
                            placeholder="Div2 arrivée X"
                            onChange={handleChangeArrive("div2", "x")}
                        />
                        <input
                            type="number"
                            className="border-1 border-solid mx-3 border-slate-600 rounded-2xl text-black px-5"
                            id="inputDiv2YArr"
                            placeholder="Div2 arrivée Y"
                            onChange={handleChangeArrive("div2", "y")}
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-nowra mx-10">
                    <button
                        className="button_mov button mx-3 p-2 bg-emerald-500 text-white rounded"
                        onClick={() => animate("div1", positionsArrive.div1)}
                    >
                        Bouger Div 1
                    </button>
                    <button
                        className="button_mov mx-3 p-2 bg-gray-500 text-white rounded"
                        onClick={() => animate("div2", positionsArrive.div2)}
                    >
                        Bouger Div 2
                    </button>
                    <button
                        className="button_mov mx-3 p-2 bg-blue-500 text-white rounded"
                        onClick={() => {
                            animate("div1", positionsDefault.div1, 500);
                            animate("div2", positionsDefault.div2, 500);
                        }}
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>
        </>
    );
}

export default BlockApp;
