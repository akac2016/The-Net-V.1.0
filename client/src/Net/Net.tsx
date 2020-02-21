import React from "react";
import './Net.css';
import Point from "./Point";
import InterviewGraph from "./InterviewGraph";
import InterviewGraphFactory from "./InterviewGraphFactory";

interface IState {
    canvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    startDragOffset : any;
    mouseDown : boolean;
    translationPosition : Point;
    scale : number;
}

const ScaleMultiplier : number = 0.005;

export default class Net extends React.Component<{}, IState> {
    startDragOffset : Point;
    mouseDown : boolean;
    translatePosition : Point;
    scale : number;
    context : CanvasRenderingContext2D | null;
    canvas : HTMLCanvasElement | null;
    graph: InterviewGraph 

    constructor(props : any) {
        super(props);
        this.startDragOffset = new Point(0, 0);
        this.mouseDown = false;
        this.scale = 3.0;
        this.translatePosition = new Point(window.innerWidth / 4, window.innerHeight / 4);
        this.context = null;
        this.canvas = null;
        const graphFactory : InterviewGraphFactory = new InterviewGraphFactory(this.getInitalCanvasSize());
        this.graph = graphFactory.create(200);
    }

    public async componentDidMount() {
        // check if graph is cached in local storage
        // if graph in local storage get graph
        // otherwise generate new graph
        this.canvas = this.getCanvas();
        this.context = this.getContext();
        const canvasSize : Point = this.getInitalCanvasSize();
        this.setCanvasSize(canvasSize);
        this.initializeListeners();
        this.draw()
    }

    private getCanvas() : HTMLCanvasElement {
        return this.refs.canvas as HTMLCanvasElement;
    }

    private getInitalCanvasSize() : Point {
        return new Point(window.innerWidth, window.innerHeight);
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
        if (this.canvas == null) {
            throw new Error("Canvas has not been mounted yet");
        }
        this.canvas.addEventListener("wheel", (event) => {
            if (this.scale <= 5.0 && this.scale >= 0.5) {
                this.scale += event.deltaY * ScaleMultiplier;
                this.draw()
            } else if (this.scale <= 0.5) {
                this.scale = 0.51;
            } else if (this.scale >= 5.0) {
                this.scale = 4.99;
            }
        });
        this.canvas.addEventListener("mousedown", (event) => {
            this.mouseDown = true;
            this.startDragOffset = new Point(
                event.clientX - this.translatePosition.getX(),
                event.clientY - this.translatePosition.getY(),
            )
        });
        this.canvas.addEventListener("mouseup", () => {
            this.mouseDown = false;
        })
        this.canvas.addEventListener("mouseover", () => {
            this.mouseDown = false;
        })
        this.canvas.addEventListener("mouseout", () => {
            this.mouseDown = false;
        });
        this.canvas.addEventListener("mousemove", (event) => {
            if (this.mouseDown) {
                if (this.canvas == null) {
                    throw new Error("Canvas has not been mounted yet");
                }
                let x : number = event.clientX - this.startDragOffset.getX();
                let y : number = event.clientY - this.startDragOffset.getY();
                this.translatePosition = new Point(x, y);
                this.draw();
            }
        })
    }

    private draw() {
        if (this.context == null) {
            throw new Error("Called draw before context has been retreived");
        }
        this.context.clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
        this.context.save();        
        this.context.scale(this.scale, this.scale);
        this.context.translate(this.translatePosition.getX(), this.translatePosition.getY());
        this.graph.draw(this.context);
        this.context.restore();
    }

    public render() {
        return (
            <div className="net-container">
                <canvas ref="canvas" id="net"></canvas>
            </div>
        )
    }
}