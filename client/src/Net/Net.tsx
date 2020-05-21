import React from "react";
import './Net.css';
import Point from "./Point";
import InterviewGraph from "./InterviewGraph";
import InterviewGraphFactory from "./InterviewGraphFactory";
import { Mouse } from "./Mouse";
import { Coordinates } from "./Coordinates";
import InterviewNode from "./InterviewNode";
import NetToolTip from "./NetTooltip";
import styled from "styled-components";
import Axios from "axios";
import Interview from "./Interview";

const Output = styled.output`
position: absolute;
top: 0;
left: 0;
width: 100vw;
height: 0;
font-size: 12px;
background-color: white;
z-index: 2;
opacity: 0;
`;

interface IProps {
    openInterview: (node : InterviewNode) => void;
    tutorialNotifier: (name : string) => void;
    isShowing: boolean;
}

interface IState {
    interviews: Interview[];
    tooltipX: number,
    tooltipY: number,
    displayTooltip: boolean,
    tooltipValue: string
}

export default class Net extends React.Component<IProps, IState> {
    context : CanvasRenderingContext2D | null;
    canvas : HTMLCanvasElement | null;
    graph: InterviewGraph | null;
    interviews: Interview[];
    eventCache: PointerEvent[];
    prevDifference: number;

    constructor(props : any) {
        super(props);
        this.context = null;
        this.canvas = null;
        this.graph = null;
        this.interviews = [];
        this.eventCache = [];
        this.prevDifference = -1;
        // if (window.localStorage.getItem("graph")) {
        //     const graphData = JSON.parse(window.localStorage.getItem("graph") as string); 
        //     this.graph = new InterviewGraph(graphData)
        // }
        this.handleMouseWheel = this.handleMouseWheel.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.pointerDownHandler = this.pointerDownHandler.bind(this);
        this.pointerMoveHandler = this.pointerMoveHandler.bind(this);
        this.pointerUpHandler = this.pointerUpHandler.bind(this);
        this.draw = this.draw.bind(this);
        this.getContext = this.getContext.bind(this);
        this.getCanvas = this.getCanvas.bind(this);

        this.state = {
            interviews: [],
            tooltipX: 0,
            tooltipY: 0,
            tooltipValue: "",
            displayTooltip: false,
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
            // window.localStorage.setItem("graph", this.graph.toString());
        }
        this.draw()
    }

    private async getInterviewGraphData() : Promise<Interview[]> {
        const response = await Axios.get("/nodes");
        const payload = response.data;
        const interviews : Interview[] = [];
        for (let entry of payload) {
            interviews.push({
                id: entry.pk.toString(),
                title: entry.name,
                text: entry.interview,
                imageUrls: [entry.image]
            })
        }
        return interviews;
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

    public componentWillUnmount() {
        if (this.canvas === null) {
            throw new Error("Canvas has not been mounted yet");
        }
        this.canvas.removeEventListener("touchstart", this.touchHandler, true);
        this.canvas.removeEventListener("touchmove", this.touchHandler, true);
        this.canvas.removeEventListener("touchend", this.touchHandler, true);
        this.canvas.removeEventListener("touchcancel", this.touchHandler, true);
        this.canvas.removeEventListener("pointerdown", this.pointerDownHandler); 
        this.canvas.removeEventListener("pointermove", this.pointerMoveHandler);
        this.canvas.removeEventListener("pointerup", this.pointerUpHandler);
        this.canvas.removeEventListener("pointercancel", this.pointerUpHandler);
        this.canvas.removeEventListener("pointerout", this.pointerUpHandler);
        this.canvas.removeEventListener("pointerleave", this.pointerUpHandler);
        this.canvas.removeEventListener("wheel", this.handleMouseWheel);
        this.canvas.removeEventListener("mousedown", this.handleMouseMove);
        this.canvas.removeEventListener("mouseup", this.handleMouseMove);
        this.canvas.removeEventListener("mouseover", this.handleMouseMove);
        this.canvas.removeEventListener("mouseout", this.handleMouseMove);
        this.canvas.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("resize", this.handleWindowResize);
    }

    private initializeListeners() {
        if (this.canvas === null) {
            throw new Error("Canvas has not been mounted yet");
        }
        this.canvas.addEventListener("touchstart", this.touchHandler, true);
        this.canvas.addEventListener("touchmove", this.touchHandler, true);
        this.canvas.addEventListener("touchend", this.touchHandler, true);
        this.canvas.addEventListener("touchcancel", this.touchHandler, true);
        this.canvas.addEventListener("pointerdown", this.pointerDownHandler); 
        this.canvas.addEventListener("pointermove", this.pointerMoveHandler);
        this.canvas.addEventListener("pointerup", this.pointerUpHandler);
        this.canvas.addEventListener("pointercancel", this.pointerUpHandler);
        this.canvas.addEventListener("pointerout", this.pointerUpHandler);
        this.canvas.addEventListener("pointerleave", this.pointerUpHandler);
        this.canvas.addEventListener("wheel", this.handleMouseWheel);
        this.canvas.addEventListener("mousedown", this.handleMouseMove);
        this.canvas.addEventListener("mouseup", this.handleMouseMove);
        this.canvas.addEventListener("mouseover", this.handleMouseMove);
        this.canvas.addEventListener("mouseout", this.handleMouseMove);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("resize", this.handleWindowResize);
    }

    private logTouchEvents(prefix : string, event : PointerEvent) {
        let output = document.getElementsByTagName("output")[0];
        let data = `${prefix}: pointerID = ${event.pointerId}; pointerType = ${event.pointerType}; isPrimary = ${event.isPrimary}\n`;
        output.innerHTML += data;
    }

    private clearLog() {
        let output = document.getElementsByTagName("output")[0];
        output.innerHTML = "";
    }

    private pointerDownHandler(event : PointerEvent) {
        this.eventCache.push(event);
        this.clearLog();
        this.logTouchEvents("pointerDown", event);
    }

    private pointerUpHandler(event : PointerEvent) {
        this.clearLog();
        this.logTouchEvents(event.type, event);
        this.removeEventFromCache(event);
        if (this.eventCache.length < 2) {
            this.prevDifference = -1;
        }
    }

    private removeEventFromCache(event : PointerEvent) {
        for (let i = 0; i < this.eventCache.length; i++) {
            if (this.eventCache[i].pointerId === event.pointerId) {
                this.eventCache.splice(i, 1);
                break;
            }
        }
    }

    private pointerMoveHandler(event : PointerEvent) {
        this.clearLog();
        this.logTouchEvents("pointerMove", event);
        for (let i = 0; i < this.eventCache.length; i++) {
            if (this.eventCache[i].pointerId === event.pointerId) {
                this.eventCache[i] = event;
                break;
            }
        }
        
        if (this.eventCache.length === 2) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let currentDifference = Math.abs(this.eventCache[0].clientX - this.eventCache[1].clientX);
            if (this.prevDifference > 0) {
                if (currentDifference > this.prevDifference) {
                    this.clearLog();
                    this.logTouchEvents("Pinch moving OUT -> Zoom in", event)
                    Coordinates.setScale(Math.max(0.3, Coordinates.getScale() * (1 / Coordinates.ScaleMultiplier)));
                }
                if (currentDifference < this.prevDifference) {
                    this.clearLog();
                    this.logTouchEvents("Pinch moving IN -> Zoom out", event)
                    Coordinates.setScale(Math.min(1.5, Coordinates.getScale() * Coordinates.ScaleMultiplier));
                }
                Coordinates.setWorldOrigin(Mouse.getWorldPosition());
                Coordinates.setScreenOrigin(Mouse.getScreenPosition())
                Mouse.setWorldPosition(Coordinates.screenToWorldPoint(Mouse.getScreenPosition()));
                this.completeTutorial("zoom");
                this.draw()
            }
            this.prevDifference = currentDifference;
        }
    }

    private touchHandler(event: TouchEvent) {
        if (event.touches.length === 1) {
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

            if (type === "mousedown") {
                Mouse.setScreenPosition(new Point(first.clientX, first.clientY));
                Mouse.setWorldPosition(Coordinates.screenToWorldPoint(Mouse.getScreenPosition()))
            }
            // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
            //                screenX, screenY, clientX, clientY, ctrlKey, 
            //                altKey, shiftKey, metaKey, button, relatedTarget);
            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                        first.screenX, first.screenY, 
                                        first.clientX, first.clientY, false, 
                                        false, false, false, 0, null);

            first.target.dispatchEvent(simulatedEvent);
            event.preventDefault();
        }
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
        this.completeTutorial("zoom");
        this.draw()
    }

    private handleMouseMove(event : MouseEvent) {
        if (event.type === "mousedown") {
            this.handleMouseDown(event);
            (document.getElementById("net") as any).style.cursor = "grabbing";
        }
        if (event.type === "mouseover" || event.type === "mouseout" || event.type === "mouseup") {
            (document.getElementById("net") as any).style.cursor = "grab";
            Mouse.setMouseButtonUp(Mouse.Buttons.Left);
        }
        if (this.graph == null) {
            throw new Error("Graph not generated yet");
        }
        const lastPosition = this.updateMousePosition(event);
        const nearestNeighbor = this.graph.getKDTree().nearest(this.getClickPoint(event), 1, [Coordinates.scaleValue(3.5)]);
        if (nearestNeighbor && nearestNeighbor.length !== 0) {
            const node : InterviewNode = this.graph.getPointMapping().get(nearestNeighbor[0][0]) as InterviewNode;
            const position = Coordinates.screenToWorldPoint(node.getCenter());
            this.setState({
                tooltipX: position.getX(),
                tooltipY: position.getY(),
                displayTooltip: true,
                tooltipValue: node.getInterview().title
            });
            node.hover();
            (document.getElementById("net") as any).style.cursor = "pointer";
            this.completeTutorial("hover");
        } else {
            this.setState({
                displayTooltip: false
            });
            for (let vertex of this.graph.vertexes()) {
                vertex.unhover();
            }
        }
        if (Mouse.isMouseButtonDown(Mouse.Buttons.Left)) {
            this.updateCoordinates(lastPosition);
        }
        this.draw();
    }

    private handleMouseDown(event : MouseEvent) {
        if (this.graph == null) {
            throw new Error("Graph not generated yet");
        }
        (document.getElementById("net") as any).style.cursor = "grabbing";
        const eventPoint : Point = this.getClickPoint(event);
        const nearestNeighbor = this.graph.getKDTree().nearest(eventPoint, 1, [Coordinates.scaleValue(3.5)]);
        if (this.doesNeighborExist(nearestNeighbor)) {
            const node : InterviewNode = this.graph.getPointMapping().get(nearestNeighbor[0][0]) as InterviewNode;
            if (this.eventCache.length === 1 && !node.isHovered) {
                const position = Coordinates.screenToWorldPoint(node.getCenter());
                this.setState({
                    tooltipX: position.getX(),
                    tooltipY: position.getY(),
                    displayTooltip: true,
                    tooltipValue: node.getInterview().title
                });
                node.hover();
                (document.getElementById("net") as any).style.cursor = "pointer";
                this.completeTutorial("hover");
            } else {
                node.select();
                this.props.openInterview(node);
                this.completeTutorial("click");
                // window.localStorage.setItem("graph", this.graph.toString());
                this.setState({
                    displayTooltip: false
                });
            }
        }
        Mouse.setMouseButtonDown(Mouse.Buttons.Left);
        this.completeTutorial("navigation");
    }

    private completeTutorial(name: string) {
        this.props.tutorialNotifier(name);
    }

    private doesNeighborExist(nearestNeighbor : any) {
        if (this.graph == null) {
            throw new Error("Graph not generated yet");
        }
        return nearestNeighbor && nearestNeighbor.length !== 0 && this.graph.getPointMapping().has(nearestNeighbor[0][0]);
    }

    private updateMousePosition(event : MouseEvent) {
        if (this.canvas) {
            const boundingRect : DOMRect | undefined = this.canvas.getBoundingClientRect();
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

    public render() {
        return (
            <div style={{display: this.props.isShowing ? "block" : "none"}}>
                <NetToolTip 
                    x={this.state.tooltipX} 
                    y={this.state.tooltipY} 
                    isShowing={this.state.displayTooltip} 
                    title={this.state.tooltipValue} />
                <canvas ref="canvas" id="net"></canvas>
                <Output/>
            </div>
        )
    }
}