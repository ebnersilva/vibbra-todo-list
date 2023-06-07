import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import { theme } from "./styles/theme";
import GlobalStyle from './styles/global';

import { BrowserRouter } from "react-router-dom";

import Router from './routes';
import { ToastContainer } from 'react-toastify';


function App() {


  
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <ToastContainer />
      
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
