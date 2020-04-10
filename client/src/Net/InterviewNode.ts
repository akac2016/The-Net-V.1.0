import Point from "./Point";
import Axios from "axios";
import Interview from "./Interview";

const Margin : number = 30

export default class InterviewNode {
    private id : string;
    private center : Point;
    private radius : number;
    private edges : InterviewNode[];
    private isSelected : boolean;

    constructor(id : string, center : Point, radius : number) {
        this.id = id;
        this.center = center;
        this.radius = radius;
        this.edges = [];
        this.isSelected = false;
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
        if (!this.isSelected) {
            context.fillStyle = "white";
        } else {
            context.fillStyle = "red";
        }
        context.fill();
        context.closePath();
    }

    public select() {
        this.isSelected = true;
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

    public hasEdge(other: InterviewNode) : boolean {
        for (let edge of this.edges) {
            if (edge.center.equals(other.center)) {
                return true;
            }
        }
        return false;
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

    public async getInterview() : Promise<Interview> {
        const response = await Axios.get(`/path/to/interview/${this.id}`);
        return response.data as Interview;
    }

    public getId() : string {
        return this.id;
    }
}