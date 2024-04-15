/* eslint-disable import/no-named-as-default */
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  #root, 
  body,html {
    margin: 0;
    padding: 0;

    width: 100%;
    height: 100%;
    margin: 0 auto;

    @media screen and (min-width: 380px) and (max-width: 480px) {
      font-size: 18px;
    }
    @media screen and (min-width: 340px) and (max-width: 379px) {
      font-size: 16px;
    }
    @media screen and (max-width: 339px) {
      font-size: 14px;
    }
  }
 
  * {
    box-sizing: border-box;
	}

  button:hover {
    cursor: pointer;
  }
  
  a, a:visited {
    text-decoration: none;
    color: black;
  }

  input:focus {
    outline: none;
  }
  
  textarea:focus {
    outline: none;
  }
`;
