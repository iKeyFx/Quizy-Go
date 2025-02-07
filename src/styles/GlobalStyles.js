import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  
    /* color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424; */
  
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
    /* Colors  */
    --color-white: #FFFFFF;
  --color-primary : #442D7C;
  --color-text: #181818;
  --color-soft-red: #F3645F;
  --color-green: #31CD63;
  --color-primary-1: #E4CCFF;
  --color-primary-2: #764ED7;
  --color-primary-3: #FECFC4;
  --color-green-1: #4BAE48;
  --color-gray: #F4F3F6;
  --color-red: red;
  --color-link: #05ACF6;
  --color-secondary-1: #F85ACA;
  --color-secondary-2: #1E0E62;
  --color-secondary-3: #DBFF83;
  --color-deep-blue: #10062A;
  --color-gray-text: #c5c6d0;
  --color-secondary-4: #1B0749;


    --border-radius-lg: 32px;
  
  }

  body {
   
    font-family: "Rubik", serif;
    line-height: 1.5;
    font-weight: 400;
    min-height: 100vh;
    background-color: var(--color-white);
    /* width: 100vw; */
  /* overflow-x: hidden; */

  }

  input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}
`;

export default GlobalStyles;
