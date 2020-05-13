import { SlideTheme } from 'styled-components'

const slideTheme : SlideTheme = {
    colors: {
        background: {
            main: '#F4EEE6',
            secondary: '#65B4D0',
        },
        controls: {
            dot: {
                main: 'lightgray',
                hover: 'darkgray',
                active: '#FFE591'
            }
        },
        text: {
            primary: '#011638',
            secondary: 'white'
        },
        button: {
            backgroundColor: '#65B4D0',
            textColor: 'white',
            hoverTextColor: 'white',
            hoverBackgroundColor: '#65B4D0'
        }
    }
}

export default slideTheme