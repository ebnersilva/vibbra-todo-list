import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
      margin:0;
      padding:0;
      outline:0;
      box-sizing:border-box;
      font-family: 'Montserrat', sans-serif;

      background: #2C2C2C;
      color: #fff;
  }
  
  /* // para os inputs nao ficarem com o azulzinho  outline:0  */
  *:focus {
      outline:0;
  }
  
  /* // Para as fontes ficarem mais definidas -webkit-font-smoothing:antialiased;  */
  body {
    -webkit-font-smoothing:antialiased;
  }

  html, body, #root {
      height:100vh;
      overflow-x:hidden;
  }

  body, input, textarea, button {
      font-size: 14px;
      font-family: 'Montserrat', sans-serif;
      &:focus {
          outline:0;
      }
  }

  a {
      text-decoration: none;
  }

  button {
      cursor: pointer
  }
`;
export default GlobalStyle;
