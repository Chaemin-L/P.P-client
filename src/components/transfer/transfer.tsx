import { useState } from "react";

import { TransferDetail } from "./transfer-detail";
import { TransferDetailMember } from "./transfer-detail-member";
import { TransferDetailPrice } from "./transfer-detail-price";
import { TransferFinish } from "./transfer-finish";

export const Transfer = ({ onClick }: { onClick: () => void }) => {
  const [screen, setScreen] = useState("transfer-detail");
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {screen === "transfer-detail" && <TransferDetail setScreen={setScreen} />}
      {screen === "transfer-detail-member" && (
        <TransferDetailMember setScreen={setScreen} />
      )}
      {screen === "transfer-detail-price" && (
        <TransferDetailPrice setScreen={setScreen} />
      )}
      {screen === "transfer-finish" && <TransferFinish onClick={onClick} />}
    </div>
  );
};
