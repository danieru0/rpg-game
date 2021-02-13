import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        primary: string;
        primaryDark: string;
        secondary: string;
        fontColor: string;
        roboto: string;
        border: string;
        hpColor: string;
        expColor: string;
    }
}