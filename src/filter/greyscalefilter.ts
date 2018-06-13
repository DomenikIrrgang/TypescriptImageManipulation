import { Filter } from "./filter";
import { Canvas } from "../canvas";

export class GreyScaleFilter implements Filter {
    apply(x: number, y: number, canvas: Canvas): void {
        canvas.setPixel(canvas.getFilterBuffer(), x, y, canvas.getPixelColor(canvas.getFilterBuffer(), x, y).average());
    }
}