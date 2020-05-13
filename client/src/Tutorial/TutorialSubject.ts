import TutorialManager from "./TutorialManager";

export default class TutorialSubject {
    private name : string;
    private completed : boolean;

    constructor(name : string) {
        this.name = name;
        this.completed = false;
    }

    public getStatus() {
        return this.completed;
    }

    public complete() {
        this.completed = true;
        this.execute();
    }

    public execute() {
        TutorialManager.update(this.name);
    }
}