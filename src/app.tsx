import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import {createTheme, ThemeProvider, type ThemeOptions} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {useLocalStorage} from './services/LocalStorage.ts';
import HeaderToolbar from "./components/HeaderToolbar";
import QRCodeGenerator from "./components/QRCodeGenerator";
// import preactLogo from './assets/preact.svg'
// import viteLogo from '/vite.svg'

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("isDarkTheme", prefersDarkMode);
  const appliedTheme = createTheme(isDarkTheme ? dark : light);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <HeaderToolbar isDarkTheme={isDarkTheme} useStateCallback={setIsDarkTheme} />
        <QRCodeGenerator />
      </Container>
    </ThemeProvider>
  );
}

const light: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#60A5FA',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#34D399',
    },
  },
};
const dark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#2563EB',
      contrastText: '#121212',
    },
    secondary: {
      main: '#059669',
    },
  },
};
