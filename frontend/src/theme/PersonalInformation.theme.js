import { createTheme } from "@mui/material/styles";

const personalInformationTheme = createTheme({
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: '60px',
                    height: '60px',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: '#202124'
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    '& > legend': {
                        width: '133px'
                    }
                },
            },
        },
    },
});

export default personalInformationTheme;
