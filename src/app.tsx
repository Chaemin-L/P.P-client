import { RecoilRoot } from "recoil";

import { Routers } from "./routes";
import { GlobalStyle } from "./style/global";

export const App = () => {
  // if (process.env.REACT_APP_TEST_TOKEN)
  //   localStorage.setItem("accessToken", process.env.REACT_APP_TEST_TOKEN);
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Routers />
    </RecoilRoot>
  );
};
