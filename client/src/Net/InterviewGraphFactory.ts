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
        return new InterviewNode(id, {
            title: "test",
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis eget velit aliquet sagittis id consectetur. Magna fringilla urna porttitor rhoncus dolor purus non. Urna condimentum mattis pellentesque id nibh. Mi sit amet mauris commodo quis. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Quis risus sed vulputate odio ut. Enim tortor at auctor urna nunc id cursus metus aliquam. Neque aliquam vestibulum morbi blandit. Urna neque viverra justo nec ultrices dui sapien eget. Eget nunc scelerisque viverra mauris. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Pretium lectus quam id leo in vitae turpis massa. Non blandit massa enim nec dui nunc mattis. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Aenean euismod elementum nisi quis eleifend quam.
            Amet dictum sit amet justo donec enim diam vulputate ut. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Sed viverra ipsum nunc aliquet bibendum. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Lectus magna fringilla urna porttitor rhoncus dolor purus. Sit amet purus gravida quis blandit. Id ornare arcu odio ut sem nulla pharetra diam. Quis enim lobortis scelerisque fermentum. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.
            Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Molestie at elementum eu facilisis sed. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Pretium nibh ipsum consequat nisl vel pretium lectus. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Sociis natoque penatibus et magnis dis parturient montes. Scelerisque felis imperdiet proin fermentum leo vel orci porta. Blandit aliquam etiam erat velit scelerisque in dictum non. Et egestas quis ipsum suspendisse ultrices. Amet aliquam id diam maecenas ultricies. Viverra nam libero justo laoreet sit amet cursus sit. Suspendisse ultrices gravida dictum fusce ut placerat orci. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci.
            Porttitor leo a diam sollicitudin tempor. Sit amet mauris commodo quis. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Vitae aliquet nec ullamcorper sit amet risus. Dui nunc mattis enim ut tellus elementum sagittis vitae. Semper eget duis at tellus at. Posuere sollicitudin aliquam ultrices sagittis orci a. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Quis risus sed vulputate odio ut enim blandit. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Ante metus dictum at tempor commodo ullamcorper a lacus. Pharetra pharetra massa massa ultricies mi quis. Id diam maecenas ultricies mi eget mauris pharetra et. Interdum velit euismod in pellentesque massa placerat duis ultricies. Nibh sed pulvinar proin gravida hendrerit.
            Sem viverra aliquet eget sit amet tellus cras. Dolor purus non enim praesent elementum. Vestibulum sed arcu non odio. Ut tristique et egestas quis ipsum. Eget arcu dictum varius duis. Amet mattis vulputate enim nulla. Dignissim sodales ut eu sem integer. Sit amet commodo nulla facilisi nullam vehicula ipsum a arcu. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Elit eget gravida cum sociis natoque penatibus et magnis. Nunc non blandit massa enim nec dui nunc mattis. Id leo in vitae turpis. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.`,
            imageUrls: ["https://via.placeholder.com/350"]
        }, this.getRandomPoint(graph), Radius);
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