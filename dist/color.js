"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    subtract(color) {
        return new Color(this.red - color.red, this.green - color.green, this.blue - color.blue, this.alpha - color.alpha);
    }
    add(color) {
        return new Color(this.red + color.red, this.green + color.green, this.blue + color.blue, this.alpha + color.alpha);
    }
    invert() {
        return new Color(255 - this.red, 255 - this.green, 255 - this.blue, this.alpha);
    }
    average() {
        let average = this.red + this.blue + this.green / 3;
        return new Color(average, average, average, this.alpha);
    }
}
exports.Color = Color;
//# sourceMappingURL=color.js.map