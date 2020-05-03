import TutorialInfo from "./TutorialInfo";

// Listens to tutorials passed in
 
export default class TutorialTracker {
    private tutorials: TutorialInfo[];
    private activeTutorial: TutorialInfo;
    private activeIndex: number;

    constructor(tutorials: TutorialInfo[]) {
        this.tutorials = tutorials;
        this.activeTutorial = this.tutorials[0];
        this.activeIndex = 0;
    }

    public completeTask() {
        
    }

    public hasCompletedTutorials() {
        return this.activeIndex == this.tutorials.length - 1;
    }
}