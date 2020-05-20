import Point from "./Point";

export class Coordinates {
    public static ScaleMultiplier : number = 1.1;
    private static worldOrigin : Point = new Point(0, 0);
    private static screenOrigin : Point = new Point(0, 0);
    private static scale : number = 0.5;

    public static scaleValue(n : number) : number {
        return n / Coordinates.scale;
    }

    public static screenToWorldPoint(point : Point) : Point {
        return new Point(
            (point.getX() - Coordinates.screenOrigin.getX()) * (1 / Coordinates.scale) + Coordinates.worldOrigin.getX(),
            (point.getY() - Coordinates.screenOrigin.getY()) * (1 / Coordinates.scale) + Coordinates.worldOrigin.getY()
        )
    }

    public static worldToScreenPoint(point : Point) : Point {
        return new Point(
            (point.getX() - Coordinates.worldOrigin.getX()) * Coordinates.scale + Coordinates.screenOrigin.getX(),
            (point.getY() - Coordinates.worldOrigin.getY()) * Coordinates.scale + Coordinates.screenOrigin.getY()
        )
    }

    public static setScale(scale : number) {
        Coordinates.scale = scale;
    }

    public static getScale() : number {
        return Coordinates.scale;
    }

    public static setWorldOrigin(point : Point) {
        Coordinates.worldOrigin = point;
    }

    public static getWorldOrigin() {
        return Coordinates.worldOrigin;
    }

    public static setScreenOrigin(point : Point) {
        Coordinates.screenOrigin = point;
    }

    public static getScreenOrigin() {
        return Coordinates.screenOrigin;
    }
}