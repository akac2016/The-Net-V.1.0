import Point from "./Point";

export class Mouse {
    public static Buttons = {
        Left: 0,
        Right: 1,
    }

    private static screenPostion : Point = new Point(0, 0);
    private static worldPosition : Point = new Point(0, 0);
    private static isDown = {
        left: false,
        right: false
    }

    public static getScreenPosition() {
        return Mouse.screenPostion;
    }

    public static setScreenPosition(point : Point) {
        Mouse.screenPostion = point;
    }

    public static getWorldPosition() {
        return Mouse.worldPosition;
    }

    public static setWorldPosition(point : Point) {
        Mouse.worldPosition = point;
    }

    public static isMouseButtonDown(button : number) {
        if (button === this.Buttons.Left) {
            return this.isDown.left;
        }
        if (button === this.Buttons.Right) {
            return this.isDown.right;
        }
        return false;
    }

    public static setMouseButtonDown(button : number) {
        if (button === this.Buttons.Left) {
            Mouse.isDown.left = true;
        }
        if (button === this.Buttons.Right) {
            Mouse.isDown.right = true;
        }
    }

    public static setMouseButtonUp(button : number) {
        if (button === this.Buttons.Left) {
            Mouse.isDown.left = false;
        }
        if (button === this.Buttons.Right) {
            Mouse.isDown.right = false;
        }
    }
}