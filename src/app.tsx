import { RecoilRoot } from "recoil";
import GlobalStyle from "./style/global";
import { Routers } from "./routes";

export const App = () => {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Routers />
    </RecoilRoot>
  );
};
