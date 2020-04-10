import React from "react";
import './Net.css';
import Point from "./Point";
import InterviewGraph from "./InterviewGraph";
import InterviewGraphFactory from "./InterviewGraphFactory";
// import Axios from "axios";

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
    graph: InterviewGraph | null;

    constructor(props : any) {
        super(props);
        this.startDragOffset = new Point(0, 0);
        this.mouseDown = false;
        this.scale = 1.5;
        this.translatePosition = new Point(0, 0);
        this.context = null;
        this.canvas = null;
        this.graph = null;
        // check if graph is cached in local storage
        // if graph in local storage get graph
        // otherwise generate new graph
    }

    public async componentDidMount() {
        const interviews : string[] = await this.getInterviewGraphData();
        this.canvas = this.getCanvas();
        this.context = this.getContext();
        const canvasSize : Point = this.getInitalCanvasSize(interviews);
        this.setCanvasSize(canvasSize);
        this.initializeListeners();
        const graphFactory : InterviewGraphFactory = new InterviewGraphFactory(canvasSize);
        this.graph = graphFactory.create(interviews);
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

    private getInitalCanvasSize(interviews : string[]) : Point {
        return new Point(
            window.innerWidth * (1 + Math.floor(interviews.length / 1000)), 
            window.innerHeight * (1 + Math.floor(interviews.length / 1000))
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
        this.canvas.addEventListener("wheel", (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (this.scale - event.deltaY * ScaleMultiplier > 0) {
                if ((event.deltaY > 0 && this.scale >= 0.5) || (event.deltaY < 0 && this.scale <= 3)) {
                    this.scale -= event.deltaY * ScaleMultiplier;
                    this.draw()
                }
            }
        });
        this.canvas.addEventListener("mousedown", (event) => {
            this.mouseDown = true;
            this.startDragOffset = new Point(
                event.clientX - this.translatePosition.getX(),
                event.clientY - this.translatePosition.getY(),
            )
        });
        this.canvas.addEventListener("mouseup", (event) => {
            if (this.graph == null) {
                throw new Error("Graph not generted yet");
            }
            const eventPoint : Point = this.getClickPoint(event);
            const nearestNeighbor = this.graph.getKDTree().nearest(eventPoint, 1, [10]);
            if (nearestNeighbor && nearestNeighbor.length != 0) {
                // render interview
                this.graph.getPointMapping().get(nearestNeighbor[0][0])?.select();
            }
            this.mouseDown = false;
            this.draw();
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
                // prevent translation beyond bounds
                let x : number = event.clientX - this.startDragOffset.getX();
                let y : number = event.clientY - this.startDragOffset.getY();
                this.translatePosition = new Point(x, y);
                this.draw();
            }
        })
    }

    private getClickPoint(event : MouseEvent) : Point {
        if (this.canvas === null) {
            throw new Error("Canvas has not been mounted yet");
        }
        const boundingRect : DOMRect | undefined = this.canvas.getBoundingClientRect();
        if (boundingRect === undefined) {
            throw new Error("Failed to get bounding rect of canvas");
        }
        let x : number = (event.clientX - boundingRect.left) / this.scale - this.translatePosition.getX();
        let y : number = (event.clientY - boundingRect.top) / this.scale - this.translatePosition.getY();
        const untransformedPoint : Point = new Point(x, y);
        return untransformedPoint;
    }

    private draw() {
        if (this.graph == null) {
            throw new Error("Graph not generted yet");
        }
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
                <div ref="nodeLayer" id="node-layer">
                    <canvas ref="canvas" id="net"></canvas>
                </div>
            </div>
        )
    }
}