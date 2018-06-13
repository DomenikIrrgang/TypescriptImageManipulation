import { Filter } from "./filter";
import { Canvas } from "../canvas";
import { Color } from "../color";

export class RedFilter implements Filter {
    apply(x: number, y: number, canvas: Canvas): void {
        canvas.setPixel(canvas.getFilterBuffer(), x, y, canvas.getPixelColor(canvas.getFilterBuffer(), x, y).add(new Color(10, 0, 0, 0)));
    }
}