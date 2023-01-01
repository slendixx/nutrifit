import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#652e88",
        },
        secondary: {
            main: "#20AB89",
            contrastText: "#ffffff",
        },
        info: {
            main: "#2088AB",
        },
        background: {
            default: "#fafafa",
        },
        success: {
            main: "#51882e",
        },
        warning: {
            main: "#ec6031",
        },
        error: {
            main: "#AB2043",
        },
    },
});
export default theme;
