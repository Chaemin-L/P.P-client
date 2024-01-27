import React from "react";
import { RecoilRoot } from "recoil";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./style/global";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<div>첫 화면</div>} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
