import { createTheme } from "@mui/material/styles";

const CustomTextField = createTheme({
  palette: {
    primary: {
      main: "#d3d3d3f9",
    },
    text: {
      primary: "#d3d3d3f9",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root": {
            color: "#d3d3d3f9",
          },
        },
      },
    },
  },
});

export default CustomTextField;
