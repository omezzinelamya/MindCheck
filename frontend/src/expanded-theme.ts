import { PaletteOptions } from "@mui/material/styles";

declare module"@mui/material/styles"{
    interface PaletteColor {
        [key: number]: String;
    }
    
    interface Palette {
        tertiary: PaletteColor;
    }
}