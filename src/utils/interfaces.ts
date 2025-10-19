export type DivId = `div${number}`;

export interface Position {
    x: number;
    y: number;
}

export interface divInfo {
    pos: Position;
    id: string;
}