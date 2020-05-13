class Principles {
    public keywords : string[];
    public textMapping: Map<string, string>;

    constructor(keywords: string[], textMapping: Map<string, string>) {
        this.keywords = keywords;
        this.textMapping = textMapping;
    }

    public choosePrinciple() {
        
        return this.keywords[Math.floor(Math.random() * (this.keywords.length - 1))]
    }
}

const keywords : string[] = ["realizing", "believing", "loving", "easing", "building", "persisting", "creating", "fighting", "meaning"];
const textMapping : Map<string, string> = new Map<string, string>([
    ["realizing", "Fighting the good fight means realizing our planet is hurtling in space, and is unique as the only one known to support the precious and miraculous thing that is life"],
    ["believing", "Fighting the good fight means believing that this shared uniqueness of existence creates a special bond among those already here with no choice in the matter"],
    ["loving", "Fighting the good fight means loving life for it possesses misery and suffering, but also joy, satisfaction, and beauty"],
    ["easing", "Fighting the good fight means easing the unnecessary burden of misery and suffering that exist for much of life"],
    ["building", "Fighting the good fight means building on the progress we have made and the times we have fallen short"],
    ["persisting", "Fighting the good fight means persisting through trials and pain for growth and accomplishment"],
    ["creating", "Fighting the good fight means creating the strength for ourselves and those beyond ourselves"],
    ["fighting", "Fighting the good fight means fighting for a stranger we don’t know but may have been born as"],
    ["meaning", "Help others to the best of your ability while learning about oneself and others and enjoying the process of doing so"] 
]);

const DefaultPrinciples = new Principles(keywords, textMapping);

export default DefaultPrinciples;