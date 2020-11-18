import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    position: relative;
    color: white;
    height: 100vh;
    background-color: #181818;
    background-image: linear-gradient(#3F3F3F 10%, #181818);
    font-family: Arial, Helvetica, Helvetica Neue, serif;
    overflow-y: hidden;
  }

  h2 {
    margin: 0;
    font-size: 2.25rem;
    font-weight: bold;
    letter-spacing: -0.025em;
    color: #fff;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
