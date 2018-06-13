import { Color } from "./color";
import { Filter } from "./filter/filter";

export class Canvas {

    private ctx: CanvasRenderingContext2D;
    private pixelBuffer: ImageData;
    private filterBuffer: ImageData;
    private filters: Filter[] = [];

    constructor(private elementId: string) {
        this.element.addEventListener('mousemove', (event) => {
            let x = event.layerX;
            let y = event.layerY;
            this.setPixel(this.getImageBuffer(), x, y, new Color(0, 255, 0, 255));
            this.drawFrame();
        });
    }

    private get element(): HTMLCanvasElement {
        return document.getElementById(this.elementId) as HTMLCanvasElement;
    }

    private getImageBuffer(): ImageData {
        if (this.pixelBuffer === undefined) {
            this.pixelBuffer = this.context.getImageData(0, 0, this.element.width, this.element.height);
        }
        return this.pixelBuffer;
    }

    private get context(): CanvasRenderingContext2D {
        if (this.ctx === undefined) {
            this.ctx = this.element.getContext("2d") as CanvasRenderingContext2D;
        }
        return this.ctx;
    }

    public addFilter(filter: Filter): void {
        this.filters.push(filter);
    }

    public get width(): number {
        return this.element.width;
    }

    public get height(): number {
        return this.element.height;
    }

    public setPixel(buffer: ImageData, x: number, y: number, color: Color) {
        buffer.data[this.getBufferIndex(x, y)] = color.red;
        buffer.data[this.getBufferIndex(x, y) + 1] = color.green;
        buffer.data[this.getBufferIndex(x, y) + 2] = color.blue;
        buffer.data[this.getBufferIndex(x, y) + 3] = color.alpha;
    }

    public drawImage(image: HTMLImageElement): void {
        this.context.drawImage(image, 0, 0);
        image.style.display = "none";
    }

    public getPixelColor(buffer: ImageData, x: number, y: number): Color {
        return new Color(
            this.getImageBuffer().data[this.getBufferIndex(x, y)],
            this.getImageBuffer().data[this.getBufferIndex(x, y) + 2],
            this.getImageBuffer().data[this.getBufferIndex(x, y) + 1],
            this.getImageBuffer().data[this.getBufferIndex(x, y) + 3]
        );
    }

    public getFilterBuffer(): ImageData {
        return this.filterBuffer;
    }

    public drawFrame(): void {
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

    public initRandomColors(): void {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.setPixel(this.getImageBuffer(), x, y, new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() * 255));
            }
        }
    }

    private getBufferIndex(x: number, y: number): number {
        return y * (this.getImageBuffer().width * 4) + x * 4;
    }

}