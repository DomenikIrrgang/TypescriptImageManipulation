"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GreyScaleFilter {
    apply(x, y, canvas) {
        canvas.setPixel(canvas.getFilterBuffer(), x, y, canvas.getPixelColor(canvas.getFilterBuffer(), x, y).average());
    }
}
exports.GreyScaleFilter = GreyScaleFilter;
//# sourceMappingURL=greyscalefilter.js.map