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
//# sourceMappingURL=suuengine.js.map