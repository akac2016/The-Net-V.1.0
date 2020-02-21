import InterviewGraph from "./InterviewGraph";
import InterviewNode from "./InterviewNode";
import Point from "./Point";
declare var kdTree: any;

const Radius : number = 7;
const Margin : number = 5;

export default class InterviewGraphFactory {
    private canvasSize : Point;

    constructor(canvasSize: Point) {
        this.canvasSize = canvasSize;
    }

    public create(n : number) : InterviewGraph {
        const graph : InterviewGraph = new InterviewGraph();
        this.generateNodes(graph, n);
        const pointMapping : Map<Point, InterviewNode> = this.getPointMapping(graph);
        var tree = new kdTree(this.getPoints(graph), this.distance, ["x", "y"]);
        if (tree == null) {
            throw new Error("Failed to build a KDTree");
        }
        this.generateEdges(graph, tree, pointMapping);
        return graph;
    }

    private getPointMapping(graph : InterviewGraph): Map<Point, InterviewNode> {
        const mapping : Map<Point, InterviewNode> = new Map();
        for (let node of graph.vertexes()) {
            mapping.set(node.getCenter(), node);
        }
        return mapping;
    }

    private getPoints(graph : InterviewGraph): any {
        return graph.vertexes().map((node : InterviewNode) => {
            return {
                x: node.getCenter().getX(),
                y: node.getCenter().getY()
            };
        })
    }

    private distance(a : any, b: any) {
        if (a.x == b.x && a.x == b.x) {
            return Number.POSITIVE_INFINITY;
        }
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    private generateNodes(graph : InterviewGraph, n : number) {
        while (graph.size() < n) {
            graph.addNode(this.createNode(graph));
        }
    }

    // TODO: Fix mapping
    private generateEdges(graph : InterviewGraph, tree : any, mapping : Map<Point, InterviewNode>) {
        for (let node of graph.vertexes()) {
            for (let nearestNeighbor of tree.nearest(node.getCenter(), 3, [500])) {
                const nearestPoint : Point = new Point(nearestNeighbor[0].x, nearestNeighbor[0].y);
                for (let edge of graph.vertexes()) {
                    if (edge.getCenter().getX() == nearestPoint.getX() && edge.getCenter().getY() == nearestPoint.getY()) {
                        node.connect(edge);
                    }
                }
            }
        }
    }

    private createNode(graph : InterviewGraph) : InterviewNode {
        return new InterviewNode(this.getRandomPoint(graph), Radius);
    }

    private getRandomPoint(graph : InterviewGraph) : Point {
        let x : number = this.getRandomValueInRange(this.canvasSize.getX())
        let y : number = this.getRandomValueInRange(this.canvasSize.getY())
        let point : Point = new Point(x, y);
        while (graph.hasVertexIntersection(point)) {
            x = this.getRandomValueInRange(this.canvasSize.getX())
            y = this.getRandomValueInRange(this.canvasSize.getY())
            point = new Point(x, y);
        }
        return point;
    }

    private getRandomValueInRange(max : number) : number {
        return Math.floor(Math.random() * ((max - Radius - Margin) - Radius + 1)) + (Radius + Margin);
    }
}