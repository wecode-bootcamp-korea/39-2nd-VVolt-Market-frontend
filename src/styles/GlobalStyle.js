// src/styles/GlobalStyle.js

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif!important;  }
`;

export default GlobalStyle;
