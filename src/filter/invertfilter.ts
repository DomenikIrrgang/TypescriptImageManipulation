import { Filter } from "./filter";
import { Canvas } from "../canvas";

export class InvertFilter implements Filter {
    apply(x: number, y: number, canvas: Canvas): void {
        canvas.setPixel(canvas.getFilterBuffer(), x, y, canvas.getPixelColor(canvas.getFilterBuffer(), x, y).invert());
    }
}