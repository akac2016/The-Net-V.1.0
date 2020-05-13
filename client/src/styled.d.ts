import "styled-components"

declare module 'styled-components' {
    export interface SlideTheme {
        colors: {
            background: {
                main: string,
                secondary: string,
            }
            text: {
                primary: string,
                secondary: string
            }
            controls: {
                dot: {
                    main: string,
                    hover: string,
                    active: string
                }
            },
            button: {
                backgroundColor: string;
                textColor: string;
                hoverTextColor: string;
                hoverBackgroundColor: string;
            }
        }
    }

    export interface NetTheme {
        colors: {
            background: {
                main: string,
            }
            text: {
                primary: string,
                secondary: string
            }
            actions: {
                hover: string
            }
        }
    }

    export interface LoadScreenTheme {
        colors: {
            background: {
                main: string,
            }
            text: {
                primary: string
            }
        }
    }

    export interface InterviewTheme {

    }
}