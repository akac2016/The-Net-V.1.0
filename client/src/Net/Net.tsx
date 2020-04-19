import React from "react";
import './Net.css';
import Point from "./Point";
import InterviewGraph from "./InterviewGraph";
import InterviewGraphFactory from "./InterviewGraphFactory";
import { Mouse } from "./Mouse";
import { Coordinates } from "./Coordinates";
import InterviewDisplay from "./InterviewDisplay";
// import Axios from "axios";

interface IState {
    canvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    interviews: string[];
    showInterview: boolean;
}

export default class Net extends React.Component<{}, IState> {
    context : CanvasRenderingContext2D | null;
    canvas : HTMLCanvasElement | null;
    graph: InterviewGraph | null;
    interviews: string[];

    constructor(props : any) {
        super(props);
        this.context = null;
        this.canvas = null;
        this.graph = null;
        this.interviews = [];
        if (window.localStorage.getItem("graph")) {
            const graphData = JSON.parse(window.localStorage.getItem("graph") as string); 
            this.graph = new InterviewGraph(graphData)
        }
        this.handleMouseWheel = this.handleMouseWheel.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.hideInterview = this.hideInterview.bind(this);
        this.draw = this.draw.bind(this);

        this.state = {
            showInterview: false,
            canvas: null,
            context: null,
            interviews: [],
        }
    }

    public async componentDidMount() {
        this.interviews = await this.getInterviewGraphData();
        if (this.canvas === null) {
            this.canvas = this.getCanvas();
        }
        if (this.context === null) {
            this.context = this.getContext();
        }
        const canvasSize : Point = this.getCanvasSize();
        this.setCanvasSize(canvasSize);
        this.initializeListeners();
        if (this.graph === null) {
            const graphFactory : InterviewGraphFactory = new InterviewGraphFactory(canvasSize);
            this.graph = graphFactory.create(this.interviews);
            window.localStorage.setItem("graph", this.graph.toString());
        }
        this.draw()
    }

    private async getInterviewGraphData() : Promise<string[]> {
        // const response = await Axios.get("/path/to/interview/graph/data");
        const dummyData : string[] = [];
        for (let i = 0; i < 300; i++) {
            dummyData.push(i.toString());
        }
        return dummyData;
        // return response.data as string[];
    }

    private getCanvas() : HTMLCanvasElement {
        return this.refs.canvas as HTMLCanvasElement;
    }

    private getCanvasSize() : Point {
        return new Point(
            window.innerWidth > 1000 ? window.innerWidth * (1 + Math.floor(this.interviews.length / 1000))
                : 1000 * (1 + Math.floor(this.interviews.length / 1000)), 
            window.innerHeight > 1000 ? window.innerHeight * (1 + Math.floor(this.interviews.length / 1000))
                : 1000 * (1 + Math.floor(this.interviews.length / 1000)), 
        );
    }

    private setCanvasSize(point : Point) {
        if (this.canvas == null) {
            throw new Error("Canvas has not been mounted yet");
        }
        this.canvas.width = point.getX();
        this.canvas.height = point.getY();
    }

    private getContext() : CanvasRenderingContext2D {
        if (this.canvas == null) {
            throw new Error("Canvas has not been mounted yet");
        }
        const context : CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (context == null) {
            throw new Error("Failed to fetch rendering context for the net");
        }
        return context;
    }

    private initializeListeners() {
        if (this.canvas === null) {
            throw new Error("Canvas has not been mounted yet");
        }
        this.canvas.addEventListener("touchstart", this.touchHandler, true);
        this.canvas.addEventListener("touchmove", this.touchHandler, true);
        this.canvas.addEventListener("touchend", this.touchHandler, true);
        this.canvas.addEventListener("touchcancel", this.touchHandler, true); 
        this.canvas.addEventListener("wheel", this.handleMouseWheel);
        this.canvas.addEventListener("mousedown", this.handleMouseMove);
        this.canvas.addEventListener("mouseup", this.handleMouseMove);
        this.canvas.addEventListener("mouseover", this.handleMouseMove);
        this.canvas.addEventListener("mouseout", this.handleMouseMove);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("resize", this.handleWindowResize);
    }

    private touchHandler(event: TouchEvent) {
        let touches = event.changedTouches,
            first = touches[0],
            type = "";
        switch(event.type)
        {
            case "touchstart": type = "mousedown"; break;
            case "touchmove":  type = "mousemove"; break;        
            case "touchend":   type = "mouseup";   break;
            default:           return;
        }

        // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
        //                screenX, screenY, clientX, clientY, ctrlKey, 
        //                altKey, shiftKey, metaKey, button, relatedTarget);

        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                    first.screenX, first.screenY, 
                                    first.clientX, first.clientY, false, 
                                    false, false, false, 0/*left*/, null);

        first.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
    }

    private handleMouseWheel(event : WheelEvent) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (event.deltaY > 0) {
            Coordinates.setScale(Math.min(1.5, Coordinates.getScale() * Coordinates.ScaleMultiplier));
        } else {
            Coordinates.setScale(Math.max(0.3, Coordinates.getScale() * (1 / Coordinates.ScaleMultiplier)));
        }
        Coordinates.setWorldOrigin(Mouse.getWorldPosition());
        Coordinates.setScreenOrigin(Mouse.getScreenPosition())
        Mouse.setWorldPosition(Coordinates.screenToWorldPoint(Mouse.getScreenPosition()));
        this.draw()
    }

    private handleMouseMove(event : MouseEvent) {
        if (event.type === "mousedown") {
            this.handleMouseDown(event);
        }
        if (event.type === "mouseover" || event.type === "mouseout" || event.type === "mouseup") {
            Mouse.setMouseButtonUp(Mouse.Buttons.Left);
        }
        const lastPosition = this.updateMousePosition(event);
        if (Mouse.isMouseButtonDown(Mouse.Buttons.Left)) {
            this.updateCoordinates(lastPosition);
        }
        this.draw();
    }

    private handleMouseDown(event : MouseEvent) {
        if (this.graph == null) {
            throw new Error("Graph not generated yet");
        }
        const eventPoint : Point = this.getClickPoint(event);
        const nearestNeighbor = this.graph.getKDTree().nearest(eventPoint, 1, [Coordinates.scaleValue(7)]);
        if (nearestNeighbor && nearestNeighbor.length !== 0) {
            this.graph.getPointMapping().get(nearestNeighbor[0][0])?.select();
            this.showInterview();
            window.localStorage.setItem("graph", this.graph.toString());
        }
        Mouse.setMouseButtonDown(Mouse.Buttons.Left);
    }

    private updateMousePosition(event : MouseEvent) {
        if (this.canvas) {
            const boundingRect : DOMRect | undefined = this.canvas.getBoundingClientRect();
            console.log(event.clientX, event.clientY);
            Mouse.setScreenPosition(new Point(
                event.clientX - boundingRect.left,
                event.clientY - boundingRect.top
            ));
            const lastPosition = new Point(
                Mouse.getWorldPosition().getX(),
                Mouse.getWorldPosition().getY(),
            );
            Mouse.setWorldPosition(Coordinates.screenToWorldPoint(Mouse.getScreenPosition()));
            return lastPosition;
        }
        return new Point(0, 0);
    }

    private updateCoordinates(lastPosition : Point) {
        Coordinates.setWorldOrigin(new Point(
            Coordinates.getWorldOrigin().getX() + (Mouse.getWorldPosition().getX() - lastPosition.getX()),
            Coordinates.getWorldOrigin().getY() + (Mouse.getWorldPosition().getY() - lastPosition.getY()),
        ))
        Mouse.setWorldPosition(Coordinates.screenToWorldPoint(Mouse.getScreenPosition()));
    }

    private handleWindowResize() {
        const canvasSize : Point = this.getCanvasSize();
        this.setCanvasSize(canvasSize);
        this.draw();
    }

    private getClickPoint(event : MouseEvent) : Point {
        if (this.canvas === null) {
            throw new Error("Canvas has not been mounted yet");
        }
        const boundingRect : DOMRect | undefined = this.canvas.getBoundingClientRect();
        if (boundingRect === undefined) {
            throw new Error("Failed to get bounding rect of canvas");
        }
        const pos = new Point(
            event.clientX - boundingRect.left,
            event.clientY - boundingRect.top
        )
        return Coordinates.worldToScreenPoint(pos);
    }

    private draw() {
        if (this.graph == null) {
            throw new Error("Graph not generted yet");
        }
        if (this.context == null) {
            throw new Error("Called draw before context has been retreived");
        }
        this.context = this.getContext();
        this.context.clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
        this.context.save();
        this.graph.draw(this.context);
        this.context.restore();
    }

    public showInterview() {
        this.setState({
            showInterview: true
        })
    }

    public hideInterview() {
        this.setState({
            showInterview: false
        })
    }

    public render() {
        return (
            <div className="net-container">
                <div ref="nodeLayer" id="node-layer">
                    <canvas ref="canvas" id="net"></canvas>
                </div>
                {this.state.showInterview ? <InterviewDisplay
					title={"title"}
                    text={"text"}
                    closeHandler={this.hideInterview}
					imageSource={"https://via.placeholder.com/500"}></InterviewDisplay> : null}
            </div>
        )
    }
}