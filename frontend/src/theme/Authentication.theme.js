import { createTheme } from "@mui/material/styles";

const authenticationTheme = createTheme({
    components: {
        MuiFormControl: {
            styleOverrides: {
                root: {
                    marginBottom: '4px !important',
                    marginTop: '0 !important'
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '4px !important',
                    marginTop: '0 !important'
                },
            },
        },
    },
});

export default authenticationTheme;
