import TutorialObserver from "./TutorialObserver";
import TutorialInfo from "./TutorialInfo";
import TutorialSubject from "./TutorialSubject";

export default class TutorialManager {
    private static tutorialMap : Map<string, TutorialInfo> = new Map<string, TutorialInfo>();
    private static observer : TutorialObserver = new TutorialObserver();
    private static currentTutorial : TutorialInfo;
    private static currentTutorialIndex : number = 0;
    private static tutorials : TutorialInfo[] = [
        new TutorialInfo("navigation", "Click and drag to navigate the screen.", "zoom"),
        new TutorialInfo("zoom", "Use your mouse wheel to scroll in and out.", "hover"),
        new TutorialInfo("hover", "Hover over a node whose interview you want to see.", "click"),
        new TutorialInfo("click", "Click on a node to see its interview", "done"),
        new TutorialInfo("done", "You have now completed the tutorial.", "")
    ]

    private constructor() { }

    public static addTutorial(name: string, tutorial : TutorialInfo) {
        if (!TutorialManager.currentTutorial) {
            TutorialManager.currentTutorial = tutorial;
        }
        TutorialManager.tutorialMap.set(name, tutorial);
        TutorialManager.observer.addSubject(name, tutorial.getSubject())
    }

    public static update(name: string) {
        TutorialManager.observer.update(name);
    }

    public static getTutorial(name : string) {
        return this.tutorialMap.get(name) as TutorialInfo;
    }

    public static progress(name : string) {
        TutorialManager.currentTutorial = TutorialManager.currentTutorial.transition(name);
    }

    public static progressIndex() {
        TutorialManager.currentTutorialIndex++;
    }

    public static getCurrentTutorial() {
        return TutorialManager.currentTutorial;
    }

    public static getCurrentTutorialIndex() {
        return TutorialManager.currentTutorialIndex;
    }

    public static getTotalTutorials() {
        return TutorialManager.tutorials.length;
    }

    public static getTutorialEmitter(name : string) {
        return this.tutorialMap.get(name)?.getSubject() as TutorialSubject;
    }
}