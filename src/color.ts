export class Color {
    constructor(
        public red: number,
        public green: number,
        public blue: number,
        public alpha: number) {}
    
    public subtract(color: Color): Color {
        return new Color(this.red - color.red,
            this.green - color.green,
            this.blue - color.blue,
            this.alpha - color.alpha);
    }

    public add(color: Color): Color {
        return new Color(this.red + color.red,
            this.green + color.green,
            this.blue + color.blue,
            this.alpha + color.alpha);
    }

    public invert(): Color {
        return new Color(
            255 - this.red,
            255 - this.green,
            255 - this.blue,
            this.alpha
        );
    }

    public average(): Color {
        let average = this.red + this.blue + this.green / 3
        return new Color(
            average,
            average,
            average,
            this.alpha
        );
    }

}