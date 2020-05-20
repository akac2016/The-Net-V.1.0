import TutorialSubject from "./TutorialSubject";
import TutorialManager from "./TutorialManager";

export default class TutorialInfo {
    public title: string;
    public instructions: string;

    private subject : TutorialSubject;
    private nextTutorial : string;

    constructor(title : string, instructions: string, nextTutorial : string) {
        this.title = title;
        this.instructions = instructions;
        this.subject = new TutorialSubject(this.title);
        this.nextTutorial = nextTutorial;
        TutorialManager.addTutorial(this.title, this);
    }

    public getSubject() {
        return this.subject;
    }

    public transition(input : string) {
        if (input === this.title) {
            TutorialManager.progressIndex();
            return TutorialManager.getTutorial(this.nextTutorial);
        }
        return this;
    }
}