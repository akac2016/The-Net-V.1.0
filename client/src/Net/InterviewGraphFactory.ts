import InterviewGraph from "./InterviewGraph";
import InterviewNode from "./InterviewNode";
import Point from "./Point";
import Interview from "./Interview";

const Radius : number = 7;
const Margin : number = 5;
const MaxDistance : number = 200;
const NearestNeighborCount : number = 3;

export default class InterviewGraphFactory {
    private canvasSize : Point;

    constructor(canvasSize: Point) {
        this.canvasSize = canvasSize;
    }

    public create(interviews : Interview[]) : InterviewGraph {
        const graph : InterviewGraph = new InterviewGraph();
        this.generateNodes(graph, interviews);
        this.generateEdges(graph);
        return graph;
    }

    private generateNodes(graph : InterviewGraph, interviews : Interview[]) {
        while (graph.size() < interviews.length) {
            graph.addNode(this.createNode(graph, interviews[graph.size()]));
        }
    }

    private createNode(graph : InterviewGraph, interview : Interview) : InterviewNode {
        return new InterviewNode(interview.id, interview, this.getRandomPoint(graph), Radius);
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

    private generateEdges(graph : InterviewGraph) {
        this.createNearestConnections(graph);
        this.connectSoloNodes(graph);
    }

    private createNearestConnections(graph : InterviewGraph) {
        const mapping : Map<Point, InterviewNode> = graph.getPointMapping();
        const kdTree : any = graph.getKDTree();
        for (let node of graph.vertexes()) {
            const nearestNeighbors = kdTree.nearest(node.getCenter(), NearestNeighborCount, [MaxDistance]);
            for (let nearestNeighbor of nearestNeighbors) {
                let toConnect : InterviewNode | undefined = mapping.get(nearestNeighbor[0]);
                if (toConnect !== undefined && !node.hasEdge(toConnect)) {
                    node.connect(toConnect);
                } else {
                    throw new Error("Could not find a mapping to the node at the nearest neighbor")
                }
            }
        }
    }

    private connectSoloNodes(graph : InterviewGraph) {
        for (let node of graph.vertexes()) {
            if (node.getEdges().length === 0) {
                let nearestNeighbor = graph.getKDTree().nearest(node.getCenter(), 1)
                node.connect(graph.getPointMapping().get(nearestNeighbor[0][0]) as InterviewNode);
            }
        }
    }
}