import InterviewNode from "./InterviewNode";
import Point from "./Point";
declare var kdTree: any;

export default class InterviewGraph {
    private nodes : InterviewNode[];
    private tree : any;
    private pointMapping : Map<Point, InterviewNode>
    private idMapping : Map<string, InterviewNode>;

    constructor(graphData? : any) {
        this.nodes = [];
        this.tree = new kdTree([], this.distanceFunction, ["x", "y"]);
        this.pointMapping = new Map<Point, InterviewNode>();
        this.idMapping = new Map<string, InterviewNode>();
        if (graphData) {
            this.nodes = this.getCachedNodes(graphData);
            this.connectCachedNodes(graphData);
        }
    }

    private getCachedNodes(graphData : any) : InterviewNode[] {
        const nodes : InterviewNode[] = [];
        for (let id of Object.keys(graphData.nodeData)) {
            const center : Point = new Point(
                graphData.nodeData[id].center.x,
                graphData.nodeData[id].center.y
            )
            const node : InterviewNode = new InterviewNode(id, center, graphData.nodeData[id].radius);
            if (graphData.nodeData[id].wasSelected) {
                node.select();
            }
            this.pointMapping.set(center, node);
            this.tree.insert(center);
            nodes.push(node);
            this.idMapping.set(id, node);
        }
        return nodes;
    }

    private connectCachedNodes(graphData : any) {
        for (let id of Object.keys(graphData.adjacencyData)) {
            const srcNode : InterviewNode | undefined = this.idMapping.get(id);
            if (!srcNode) {
                throw new Error("Could not find node with id: " + id);
            }
            for (let connectionID of graphData.adjacencyData[id]) {
                const connectionNode = this.idMapping.get(connectionID);
                if (!connectionNode) {
                    throw new Error("Could not find node with id: " + id);
                }
                srcNode.connect(connectionNode);
            }
        }
    }

    private distanceFunction(a : any, b: any) {
        if (a.x === b.x && a.x === b.x) {
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

    public toString() : string {
        const adjacencyData : any = {};
        const nodeData : any = {}
        for (let node of this.nodes) {
            nodeData[node.getId()] = node.toJson();
            adjacencyData[node.getId()] = node.getEdges().map((x : InterviewNode) => x.getId());
        }
        return JSON.stringify({
            nodeData,
            adjacencyData
        });
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