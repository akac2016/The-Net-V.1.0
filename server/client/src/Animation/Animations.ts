import Animation from "./Animation";
import "./Animations.css";

type AnimationGenerator = (duration: number, delay: number) => Animation;

const TrackingInContract : AnimationGenerator = 
(duration: number, delay: number) => new Animation(
    "tracking-in-contract",
    duration,
    "s",
    "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
    delay,
    1,
    "both"
)

const TextFocusIn : AnimationGenerator = 
(duration: number, delay: number) => new Animation(
    "text-focus-in",
    duration,
    "s",
    "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
    delay,
    1,
    "both"
);

const TrackingInExpand : AnimationGenerator = 
(duration: number, delay: number) => new Animation(
    "text-focus-in",
    duration,
    "s",
    "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
    delay,
    1,
    "both"
);

const SlideUp : AnimationGenerator =
(duration: number, delay: number) => new Animation(
    "slide-up",
    duration,
    "s",
    "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
    delay,
    1,
    "both"
);

export {
    TrackingInContract,
    TextFocusIn,
    SlideUp,
    TrackingInExpand
};