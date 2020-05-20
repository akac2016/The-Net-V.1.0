import VendorPrefixes from "../Vendor/VendorPrefixes";

export default class Animation {
    public name: string;
    public duration: number;
    public unit: string;
    public timingFunction: string;
    public delay: number;
    public iterations: number;
    public direction: string;
    public fillMode: string;
    public playState: string;

    constructor(
        name?: string, 
        duration?: number, 
        unit?:string,
        timingFunction?: string,
        delay?: number,
        iterations?: number,
        direction?: string,
        fillMode?: string,
        playState?: string
    ) {
        this.name = name ? name : "none";
        this.duration = duration ? duration : 0;
        this.unit = unit ? unit : "ms";
        this.timingFunction = timingFunction ? timingFunction : "";
        this.delay = delay ? delay : 0;
        this.iterations = iterations ? iterations : 0;
        this.direction = direction ? direction : "forward";
        this.fillMode = fillMode ? fillMode : "";
        this.playState = playState ? playState : "";
    }

    public getCSSString() : string {
        const animationString : string = this.getAnimation();
        const vendors = [...VendorPrefixes, ""];
        return vendors.map((vendor : string) => {
            return `${vendor}${animationString}`;
        }).reduce((css: string, vendorPrefixedAnimation: string) => {
            return `${css}\n${vendorPrefixedAnimation}`;
        });
    }

    public getStylesObject() : any {
        const animationString : string = this.getAnimation();
        const vendors = [...VendorPrefixes, ""];
        return vendors.map((vendor : string) => {
            return `${vendor}animation`;
        }).reduce((styles: any, vendorPrefixedAnimation: string) => {
            styles[vendorPrefixedAnimation] = animationString;
            return styles;
        });
    }

    private getAnimation() {
        return `animation: ${this.name} ${this.duration}${this.unit} ${this.timingFunction} ${this.delay}${this.unit} ${this.iterations} ${this.direction} ${this.fillMode} ${this.playState}`.trim() + ';';
    }
}