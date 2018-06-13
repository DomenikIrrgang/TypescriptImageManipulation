"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../color");
class RedFilter {
    apply(x, y, canvas) {
        canvas.setPixel(canvas.getFilterBuffer(), x, y, canvas.getPixelColor(canvas.getFilterBuffer(), x, y).add(new color_1.Color(10, 0, 0, 0)));
    }
}
exports.RedFilter = RedFilter;
//# sourceMappingURL=redfilter.js.map