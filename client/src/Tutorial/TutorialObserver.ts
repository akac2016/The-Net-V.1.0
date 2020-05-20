import TutorialSubject from "./TutorialSubject";
import TutorialManager from "./TutorialManager";

export default class TutorialObserver {
    private subjects: Map<string, TutorialSubject>;

    constructor() {
        this.subjects = new Map<string, TutorialSubject>();
    }

    public addSubject(name: string, subject: TutorialSubject) {
        this.subjects.set(name, subject)
    }

    public update(name: string) {
        TutorialManager.progress(name);
    }
}