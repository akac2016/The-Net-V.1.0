import InterviewNode from "./InterviewNode";
import Point from "./Point";

export default class InterviewGraph {
    private nodes : InterviewNode[];

    constructor() {
        this.nodes = [];
    }

    public addNode(node : InterviewNode) {
        this.nodes.push(node);
    }

    public draw(context : CanvasRenderingContext2D) {
        for (let node of this.nodes) {
            node.drawEdges(context);
        }
        for (let node of this.nodes) {
            node.draw(context);
        }
    }

    public size() : number {
        return this.nodes.length;
    }

    public vertexes() : InterviewNode[] {
        return this.nodes;
    }

    public hasVertexIntersection(point : Point) : boolean {
        for (let node of this.nodes) {
            if (node.intersects(point)) {
                return true;
            }
        }
        return false;
    } 
}