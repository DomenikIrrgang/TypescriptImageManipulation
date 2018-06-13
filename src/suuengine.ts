import { Canvas } from "./canvas";
import { SuuEngineConfig } from "./suuengineconfig";
import { RedFilter } from "./filter/redfilter";
import { InvertFilter } from "./filter/invertfilter";

export class SuuEngine {

    private canvas: Canvas;
    private image: HTMLImageElement;

    constructor(private config: SuuEngineConfig) {
        document.addEventListener("DOMContentLoaded", () => {
            this.image = new Image();
            this.image.src = "https://i.imgur.com/8pDdN0s.jpg" + '?' + new Date().getTime();
            this.image.setAttribute('crossOrigin', '');
            this.image.onload = () => {
                this.init();
            };
        });
    }

    public init(): void {
        this.canvas = new Canvas(this.config.canvasId);
        this.canvas.drawImage(this.image);
        this.canvas.drawFrame();
        this.canvas.addFilter(new RedFilter());
        this.canvas.addFilter(new InvertFilter());
        setInterval(() => {
            console.log("render interval");
            this.canvas.drawFrame();
        }, 1000);
    }


}

let engine: SuuEngine = new SuuEngine({ canvasId: "canvas" });
console.log(engine);