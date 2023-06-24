import { createTheme } from "@mui/material/styles";

const navbarTheme = createTheme({
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                   width: '40px',
                   height: '40px',
                   marginLeft: '4px',
                   position: 'relative'
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                   width: '32px',
                   height: '32px',
                },
            },
        },
    },
});

export default navbarTheme;
