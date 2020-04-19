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

    }

    export interface InterviewTheme {

    }
}