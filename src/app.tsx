import { RecoilRoot } from "recoil";

import { Routers } from "./routes";
import { GlobalStyle } from "./style/global";

export const App = () => {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Routers />
    </RecoilRoot>
  );
};
