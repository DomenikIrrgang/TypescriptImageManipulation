"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
class Canvas {
    constructor(elementId) {
        this.elementId = elementId;
        this.filters = [];
        this.element.addEventListener('mousemove', (event) => {
            let x = event.layerX;
            let y = event.layerY;
            this.setPixel(this.getImageBuffer(), x, y, new color_1.Color(0, 255, 0, 255));
            this.drawFrame();
        });
    }
    get element() {
        return document.getElementById(this.elementId);
    }
    getImageBuffer() {
        if (this.pixelBuffer === undefined) {
            this.pixelBuffer = this.context.getImageData(0, 0, this.element.width, this.element.height);
        }
        return this.pixelBuffer;
    }
    get context() {
        if (this.ctx === undefined) {
            this.ctx = this.element.getContext("2d");
        }
        return this.ctx;
    }
    addFilter(filter) {
        this.filters.push(filter);
    }
    get width() {
        return this.element.width;
    }
    get height() {
        return this.element.height;
    }
    setPixel(buffer, x, y, color) {
        buffer.data[this.getBufferIndex(x, y)] = color.red;
        buffer.data[this.getBufferIndex(x, y) + 1] = color.green;
        buffer.data[this.getBufferIndex(x, y) + 2] = color.blue;
        buffer.data[this.getBufferIndex(x, y) + 3] = color.alpha;
    }
    drawImage(image) {
        this.context.drawImage(image, 0, 0);
        image.style.display = "none";
    }
    getPixelColor(buffer, x, y) {
        return new color_1.Color(this.getImageBuffer().data[this.getBufferIndex(x, y)], this.getImageBuffer().data[this.getBufferIndex(x, y) + 2], this.getImageBuffer().data[this.getBufferIndex(x, y) + 1], this.getImageBuffer().data[this.getBufferIndex(x, y) + 3]);
    }
    getFilterBuffer() {
        return this.filterBuffer;
    }
    drawFrame() {
        this.filterBuffer = new ImageData(this.getImageBuffer().width, this.getImageBuffer().height);
        for (let i = 0; i < this.getImageBuffer().data.length; i++) {
            this.filterBuffer.data[i] = this.getImageBuffer().data[i];
        }
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height / 1.7; y++) {
                for (let filter of this.filters) {
                    filter.apply(x, y, this);
                }
            }
        }
        this.context.putImageData(this.getFilterBuffer(), 0, 0);
    }
    initRandomColors() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.setPixel(this.getImageBuffer(), x, y, new color_1.Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() * 255));
            }
        }
    }
    getBufferIndex(x, y) {
        return y * (this.getImageBuffer().width * 4) + x * 4;
    }
}
exports.Canvas = Canvas;
//# sourceMappingURL=canvas.js.map