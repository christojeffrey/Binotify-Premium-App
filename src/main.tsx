import ReactDOM from "react-dom/client";
import "./index.css";
import ScreensRouter from "./router";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      secondary: {
        main: '#1DB954',
      },
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'Roboto',
            'sans-serif',
        ].join(','),
    }
  });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<ThemeProvider theme={darkTheme}> <ScreensRouter /></ThemeProvider>);

