import { ThemeProvider } from 'styled-components';
import { theme } from "./styles/theme";
import GlobalStyle from './styles/global';

import { BrowserRouter } from "react-router-dom";

import Router from './routes';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
