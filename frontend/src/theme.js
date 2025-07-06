export const tokens = {
  grey: {
    100: "#f8f8fa", // very light grey background
    200: "#e6e6eb",
    300: "#c9c9d1",
    400: "#acacb7",
    500: "#8f8fa0",
    600: "#6d6d78",
    700: "#4a4a52",
    800: "#28282c",
    900: "#141417",
  },
  primary: {
    // soft pink shades
    100: "#ffe8f0",
    200: "#ffbfd1",
    300: "#ff95b3",
    400: "#ff6c95",
    500: "#ff4377",  // main pink
    600: "#cc365f",
    700: "#992a47",
    800: "#661c2f",
    900: "#330e17",
  },
  secondary: {
    // muted dusty rose
    100: "#f9e6ea",
    200: "#f0c9d1",
    300: "#e6abb8",
    400: "#dd8da0",
    500: "#d46f87",  // main secondary
    600: "#a65a6a",
    700: "#75434c",
    800: "#462e2f",
    900: "#231617",
  },
  tertiary: {
    // soft lavender/purple accent
    100: "#f2e9f9",
    200: "#d9c9f3",
    300: "#c1a9ed",
    400: "#a989e7",
    500: "#9069e0",  // main tertiary
    600: "#704fba",
    700: "#503891",
    800: "#312368",
    900: "#181234",
  },
 background: {
    light: "#f5f6fa",  // light grey page background
    main: "#e2e4ea",   // light grey card/paper background
  },
};
export const themeSettings = {
  palette: {
    mode: "light",
    primary: {
      ...tokens.primary,
      main: tokens.primary[700],
      light: tokens.primary[300],
      contrastText: "#fff",
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
      contrastText: "#fff",
    },
    tertiary: {
      ...tokens.tertiary,
      main: tokens.tertiary[500],
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[700],
    },
 background: {
      default: tokens.background.light, // light grey for whole page
      paper: tokens.background.main,    // light grey for cards, modals, etc.
    },
    text: {
      primary: tokens.grey[900],
      secondary: tokens.grey[600],
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 14,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 36,
      fontWeight: 700,
      color: tokens.grey[900],
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 28,
      fontWeight: 600,
      color: tokens.grey[900],
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 22,
      fontWeight: 600,
      color: tokens.grey[800],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 18,
      fontWeight: 500,
      color: tokens.grey[700],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 16,
      fontWeight: 400,
      color: tokens.grey[600],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 400,
      color: tokens.grey[500],
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: tokens.secondary[300], // default border color
          },
          "&:hover fieldset": {
            borderColor: tokens.secondary[400], // border on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: tokens.primary[500], // border on focus (clicked)
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: tokens.grey[(500)], // label default color
          "&.Mui-focused": {
            color: tokens.primary[700], // label color when focused
          },
        },
      },
    },
  },
};
