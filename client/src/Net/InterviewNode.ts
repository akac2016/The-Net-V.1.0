import Point from "./Point";
import Interview from "./Interview";
import { Coordinates } from "./Coordinates";

const Margin : number = 30

export default class InterviewNode {
    private id : string;
    private interview : Interview;
    private center : Point;
    private baseRadius : number;
    private maxRadius : number;
    private currentRadius : number;
    private edges : InterviewNode[];
    private isSelected : boolean;
    public isHovered : boolean;

    constructor(id : string, interview : Interview, center : Point, radius : number) {
        this.id = id;
        this.interview = interview;
        this.center = center;
        this.currentRadius = radius;
        this.baseRadius = radius;
        this.maxRadius = this.baseRadius + 2.5;
        this.edges = [];
        this.isSelected = false;
        this.isHovered = false;
    }

    public toJson() : string {
        const json : any = {
            interview: this.interview,
            center: this.center,
            radius: this.currentRadius,
            wasSelected: this.isSelected
        }
        return json;
    }

    public draw(context : CanvasRenderingContext2D) {
        context.beginPath();
        const worldPosition = Coordinates.screenToWorldPoint(this.center);

        context.arc(
            worldPosition.getX(), 
            worldPosition.getY(),
            Coordinates.scaleValue(this.currentRadius),
            0,
            360
        );

        context.arc(
            worldPosition.getX(), 
            worldPosition.getY(),
            Coordinates.scaleValue(this.currentRadius),
            0,
            360
        );
        
        context.lineWidth = Coordinates.scaleValue(3);
        if (!this.isSelected) {
            if (this.isHovered) {
                context.strokeStyle = "#FFE591";
            } else {
                context.strokeStyle = "white";
            }
            context.fillStyle = "white";
        } else {
            if (this.isHovered) {
                context.strokeStyle = "white";
            } else {
                context.strokeStyle = "#FFE591";
            }
            context.fillStyle = "#FFE591";
        }
        context.stroke();
        context.fill();
        context.closePath();
    }

    public select() {
        this.isSelected = true;
    }

    public hover() {
        this.isHovered = true;
    }

    public unhover() {
        this.isHovered = false;
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
        return this.distanceFromCenter(point) <= this.currentRadius + this.currentRadius + Margin;
    }

    private distanceFromCenter(point : Point) {
        return Math.sqrt(((point.getX() - this.center.getX()) * (point.getX() - this.center.getX())) +
                ((point.getY() - this.center.getY()) * (point.getY() - this.center.getY())))
    }

    public getInterview() : Interview {
        return this.interview;
    }

    public getId() : string {
        return this.id;
    }
}