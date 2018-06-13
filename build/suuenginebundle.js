(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./color":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvertFilter {
    apply(x, y, canvas) {
        canvas.setPixel(canvas.getFilterBuffer(), x, y, canvas.getPixelColor(canvas.getFilterBuffer(), x, y).invert());
    }
}
exports.InvertFilter = InvertFilter;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../color");
class RedFilter {
    apply(x, y, canvas) {
        canvas.setPixel(canvas.getFilterBuffer(), x, y, canvas.getPixelColor(canvas.getFilterBuffer(), x, y).add(new color_1.Color(10, 0, 0, 0)));
    }
}
exports.RedFilter = RedFilter;

},{"../color":2}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./canvas");
const redfilter_1 = require("./filter/redfilter");
const invertfilter_1 = require("./filter/invertfilter");
class SuuEngine {
    constructor(config) {
        this.config = config;
        document.addEventListener("DOMContentLoaded", () => {
            this.image = new Image();
            this.image.src = "https://i.imgur.com/8pDdN0s.jpg" + '?' + new Date().getTime();
            this.image.setAttribute('crossOrigin', '');
            this.image.onload = () => {
                this.init();
            };
        });
    }
    init() {
        this.canvas = new canvas_1.Canvas(this.config.canvasId);
        this.canvas.drawImage(this.image);
        this.canvas.drawFrame();
        this.canvas.addFilter(new redfilter_1.RedFilter());
        this.canvas.addFilter(new invertfilter_1.InvertFilter());
        setInterval(() => {
            console.log("render interval");
            this.canvas.drawFrame();
        }, 1000);
    }
}
exports.SuuEngine = SuuEngine;
let engine = new SuuEngine({ canvasId: "canvas" });
console.log(engine);

},{"./canvas":1,"./filter/invertfilter":3,"./filter/redfilter":4}]},{},[5]);
