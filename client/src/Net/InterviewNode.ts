import Point from "./Point";
import Axios from "axios";
import Interview from "./Interview";
import { Coordinates } from "./Coordinates";

const Margin : number = 30

export default class InterviewNode {
    private id : string;
    private center : Point;
    private radius : number;
    private edges : InterviewNode[];
    private wasSelected : boolean;

    constructor(id : string, center : Point, radius : number) {
        this.id = id;
        this.center = center;
        this.radius = radius;
        this.edges = [];
        this.wasSelected = false;
    }

    public toJson() : string {
        const json : any = {
            id: this.id,
            center: this.center,
            radius: this.radius,
            wasSelected: this.wasSelected
        }
        return json;
    }

    public draw(context : CanvasRenderingContext2D) {
        context.beginPath();
        const worldPosition = Coordinates.screenToWorldPoint(this.center);
        context.arc(
            worldPosition.getX(), 
            worldPosition.getY(),
            Coordinates.scaleValue(this.radius),
            0,
            360
        );
        if (!this.wasSelected) {
            context.fillStyle = "white";
        } else {
            context.fillStyle = "#FFE591";
        }
        context.fill();
        context.closePath();
    }

    public select() {
        this.wasSelected = true;
    }

    public drawEdges(context : CanvasRenderingContext2D) {
        for (let node of this.edges) {
            context.beginPath()
            const worldPosition = Coordinates.screenToWorldPoint(this.center);
            const otherWorldPosition = Coordinates.screenToWorldPoint(node.center);
            context.moveTo(worldPosition.getX(), worldPosition.getY());
            context.lineTo(otherWorldPosition.getX(), otherWorldPosition.getY());
            context.strokeStyle = "rgb(230, 230, 230)";
            context.lineWidth = Coordinates.scaleValue(1.75);
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