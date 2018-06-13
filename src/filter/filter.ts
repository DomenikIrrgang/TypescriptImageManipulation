import { Canvas } from "../canvas";

export interface Filter {
    apply(x: number, y: number, canvas: Canvas): void;
}