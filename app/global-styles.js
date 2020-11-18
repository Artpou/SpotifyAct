import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  h1 {
    font-size: 4em;
    padding-bottom: 20px;
  }
  a {
    color: #3E3E3E;
    text-decoration: none;
  }
  a:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

export default GlobalStyle;
