import InterviewGraph from "./InterviewGraph";
import InterviewNode from "./InterviewNode";
import Point from "./Point";

const Radius : number = 7;
const Margin : number = 5;
const MaxDistance : number = 200;
const NearestNeighborCount : number = 3;

export default class InterviewGraphFactory {
    private canvasSize : Point;

    constructor(canvasSize: Point) {
        this.canvasSize = canvasSize;
    }

    public create(interviews : string[]) : InterviewGraph {
        const graph : InterviewGraph = new InterviewGraph();
        this.generateNodes(graph, interviews);
        this.generateEdges(graph);
        return graph;
    }

    private generateNodes(graph : InterviewGraph, interviews : string[]) {
        while (graph.size() < interviews.length) {
            graph.addNode(this.createNode(graph, interviews[graph.size()]));
        }
    }

    private createNode(graph : InterviewGraph, id : string) : InterviewNode {
        return new InterviewNode(id, this.getRandomPoint(graph), Radius);
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
        // Todo
        // this.connectDisjointSets(graph);
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

    private connectDisjointSets(graph : InterviewGraph) {
        const parent : string[] = [];
        const idMapping : Map<string, number> = new Map<string, number>();
        for (let i = 0; i < graph.size(); i++) {
            parent[i] = "";
            idMapping.set(graph.vertexes()[i].getId(), i);
        }
        for (let node of graph.vertexes()) {
            const a: string = this.find(parent, node.getId(), idMapping);
            for (let edge of node.getEdges()) {
                const b: string = this.find(parent, edge.getId(), idMapping);
                this.union(parent, a, b, idMapping);
            }
        }
        console.log(parent);
    }

    private find(parent : string[], id : string, idMapping : Map<string, number>) : string {
        if (idMapping.get(id) === undefined) {
            throw new Error("Unknown interview id");
        }
        const index = idMapping.get(id) as number
        console.log(index, parent[index]);
        if (parent[index] === "" || parent[index] === id) {
            return id;
        }
        return this.find(parent, parent[index], idMapping);
    }

    private union(parent : string[], x : string, y : string, idMapping : Map<string, number>) {
        const xset : number = idMapping.get(this.find(parent, x, idMapping)) as number;
        const yset : string = this.find(parent, y, idMapping)
        parent[xset] = yset;
    }
}