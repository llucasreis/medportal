import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #F5F5F5;
    color: #2F2F2F;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  html, body, #root {
    height: 100vh;
  }

  body, input, button {
    font-family: 'Roboto Slab', Montserrat, sans-serif;
    font-size: 16px;
  }
`;
