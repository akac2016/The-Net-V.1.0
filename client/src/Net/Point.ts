export default class Point {
    private x : number;
    private y : number;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    public getX() : number {
        return this.x;
    }

    public getY() : number {
        return this.y;
    }

    public equals(other : Point) : boolean {
        return this.x == other.x && this.y == other.y;
    }
}