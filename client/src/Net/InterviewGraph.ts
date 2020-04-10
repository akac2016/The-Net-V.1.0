import InterviewNode from "./InterviewNode";
import Point from "./Point";
declare var kdTree: any;

export default class InterviewGraph {
    private nodes : InterviewNode[];
    private tree : any;
    private pointMapping : Map<Point, InterviewNode>

    constructor() {
        this.nodes = [];
        this.tree = new kdTree([], this.distanceFunction, ["x", "y"]);
        this.pointMapping = new Map<Point, InterviewNode>();
    }

    private distanceFunction(a : any, b: any) {
        if (a.x == b.x && a.x == b.x) {
            return Number.POSITIVE_INFINITY;
        }
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    public addNode(node : InterviewNode) {
        this.pointMapping.set(node.getCenter(), node);
        this.tree.insert(node.getCenter());
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

    public getKDTree() : any {
        return this.tree;
    }

    public getPointMapping() : Map<Point, InterviewNode> {
        return this.pointMapping;
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