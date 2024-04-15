import { useState } from "react";

import { TransferDetail } from "./transfer-detail";
import { TransferDetailMember } from "./transfer-detail-member";
import { TransferDetailPassword } from "./transfer-detail-password";
import { TransferDetailPrice } from "./transfer-detail-price";
import { TransferFinish } from "./transfer-finish";
import { TransferOnePersonDetail } from "./transfer-one-person-detail";
import { TransferProps } from "./type";

export const Transfer = ({ onClick, memberCount }: TransferProps) => {
  const [screen, setScreen] = useState(
    memberCount === 2 ? "transfer-detail-one" : "transfer-detail",
  );
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {screen === "transfer-detail" && <TransferDetail setScreen={setScreen} />}
      {screen === "transfer-detail-one" && (
        <TransferOnePersonDetail setScreen={setScreen} />
      )}
      {screen === "transfer-detail-member" && (
        <TransferDetailMember setScreen={setScreen} />
      )}
      {screen === "transfer-detail-price" && (
        <TransferDetailPrice setScreen={setScreen} memberCount={memberCount} />
      )}
      {screen === "transfer-finish" && <TransferFinish onClick={onClick} />}
      {screen === "transfer-detail-password" && <TransferDetailPassword />}
    </div>
  );
};
