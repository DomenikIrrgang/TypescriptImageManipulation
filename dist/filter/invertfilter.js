"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvertFilter {
    apply(x, y, canvas) {
        canvas.setPixel(canvas.getFilterBuffer(), x, y, canvas.getPixelColor(canvas.getFilterBuffer(), x, y).invert());
    }
}
exports.InvertFilter = InvertFilter;
//# sourceMappingURL=invertfilter.js.map