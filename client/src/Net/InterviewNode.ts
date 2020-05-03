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
    private isSelected : boolean;
    private isHovered : boolean;

    constructor(id : string, center : Point, radius : number) {
        this.id = id;
        this.center = center;
        this.radius = radius;
        this.edges = [];
        this.isSelected = false;
        this.isHovered = false;
    }

    public toJson() : string {
        const json : any = {
            id: this.id,
            center: this.center,
            radius: this.radius,
            wasSelected: this.isSelected
        }
        return json;
    }

    public draw(context : CanvasRenderingContext2D) {
        context.beginPath();
        const worldPosition = Coordinates.screenToWorldPoint(this.center);

        context.shadowBlur = Coordinates.scaleValue(10);
        context.shadowColor = "black";

        context.arc(
            worldPosition.getX(), 
            worldPosition.getY(),
            Coordinates.scaleValue(this.radius),
            0,
            360
        );
        context.fill();

        context.shadowBlur = 0;
        context.shadowColor = "rgb(100, 100, 100, 0.5)";

        context.arc(
            worldPosition.getX(), 
            worldPosition.getY(),
            Coordinates.scaleValue(this.radius),
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
        return this.distanceFromCenter(point) <= this.radius + this.radius + Margin;
    }

    private distanceFromCenter(point : Point) {
        return Math.sqrt(((point.getX() - this.center.getX()) * (point.getX() - this.center.getX())) +
                ((point.getY() - this.center.getY()) * (point.getY() - this.center.getY())))
    }

    public async getInterview() : Promise<Interview> {
        // const response = await Axios.get(`/path/to/interview/${this.id}`);
        // return response.data as Interview;
        return {
            title: "test",
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis eget velit aliquet sagittis id consectetur. Magna fringilla urna porttitor rhoncus dolor purus non. Urna condimentum mattis pellentesque id nibh. Mi sit amet mauris commodo quis. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Quis risus sed vulputate odio ut. Enim tortor at auctor urna nunc id cursus metus aliquam. Neque aliquam vestibulum morbi blandit. Urna neque viverra justo nec ultrices dui sapien eget. Eget nunc scelerisque viverra mauris. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Pretium lectus quam id leo in vitae turpis massa. Non blandit massa enim nec dui nunc mattis. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Aenean euismod elementum nisi quis eleifend quam.
            Amet dictum sit amet justo donec enim diam vulputate ut. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Sed viverra ipsum nunc aliquet bibendum. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Lectus magna fringilla urna porttitor rhoncus dolor purus. Sit amet purus gravida quis blandit. Id ornare arcu odio ut sem nulla pharetra diam. Quis enim lobortis scelerisque fermentum. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.
            Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Molestie at elementum eu facilisis sed. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Pretium nibh ipsum consequat nisl vel pretium lectus. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Sociis natoque penatibus et magnis dis parturient montes. Scelerisque felis imperdiet proin fermentum leo vel orci porta. Blandit aliquam etiam erat velit scelerisque in dictum non. Et egestas quis ipsum suspendisse ultrices. Amet aliquam id diam maecenas ultricies. Viverra nam libero justo laoreet sit amet cursus sit. Suspendisse ultrices gravida dictum fusce ut placerat orci. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci.
            Porttitor leo a diam sollicitudin tempor. Sit amet mauris commodo quis. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Vitae aliquet nec ullamcorper sit amet risus. Dui nunc mattis enim ut tellus elementum sagittis vitae. Semper eget duis at tellus at. Posuere sollicitudin aliquam ultrices sagittis orci a. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Quis risus sed vulputate odio ut enim blandit. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Ante metus dictum at tempor commodo ullamcorper a lacus. Pharetra pharetra massa massa ultricies mi quis. Id diam maecenas ultricies mi eget mauris pharetra et. Interdum velit euismod in pellentesque massa placerat duis ultricies. Nibh sed pulvinar proin gravida hendrerit.
            Sem viverra aliquet eget sit amet tellus cras. Dolor purus non enim praesent elementum. Vestibulum sed arcu non odio. Ut tristique et egestas quis ipsum. Eget arcu dictum varius duis. Amet mattis vulputate enim nulla. Dignissim sodales ut eu sem integer. Sit amet commodo nulla facilisi nullam vehicula ipsum a arcu. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Elit eget gravida cum sociis natoque penatibus et magnis. Nunc non blandit massa enim nec dui nunc mattis. Id leo in vitae turpis. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.`,
            imageUrls: ["https://via.placeholder.com/350"]
        }
    }

    public getId() : string {
        return this.id;
    }
}