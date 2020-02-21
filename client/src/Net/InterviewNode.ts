import Point from "./Point";

const Margin : number = 30

export default class InterviewNode {
    private center : Point;
    private radius : number;
    private edges : InterviewNode[];

    constructor(center : Point, radius : number) {
        this.center = center;
        this.radius = radius;
        this.edges = [];
    }

    public draw(context : CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(
            this.center.getX(), 
            this.center.getY(),
            this.radius,
            0,
            360
        );
        context.fillStyle = "white";
        context.fill();
        context.closePath();
    }

    public drawEdges(context : CanvasRenderingContext2D) {
        for (let node of this.edges) {
            context.beginPath()
            context.moveTo(this.center.getX(), this.center.getY());
            context.lineTo(node.center.getX(), node.center.getY());
            context.strokeStyle = "rgb(230, 230, 230)";
            context.lineWidth = 1.75;
            context.stroke();
            context.closePath();
        }
    }

    public getEdges() : InterviewNode[] {
        return this.edges;
    }

    public getCenter() : Point {
        return this.center;
    }

    public connect(node : InterviewNode) {
        this.edges.push(node);
    }

    public intersects(point : Point) : boolean {
        return this.distanceFromCenter(point) <= this.radius + this.radius + Margin;
    }

    private distanceFromCenter(point : Point) {
        return Math.sqrt(((point.getX() - this.center.getX()) * (point.getX() - this.center.getX())) +
                ((point.getY() - this.center.getY()) * (point.getY() - this.center.getY())))
    }
}