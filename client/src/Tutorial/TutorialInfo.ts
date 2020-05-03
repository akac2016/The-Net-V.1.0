// Emits tutorial events

export default class TutorialInfo {
    public title: string;
    public instructions: string;

    constructor(title : string, instructions: string) {
        this.title = title;
        this.instructions = instructions;
    }
}