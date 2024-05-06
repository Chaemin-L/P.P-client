import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { TransferDetailMemberItem } from "./transfer-detail-member-item";
import { TransferDetailProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Button } from "@/components/common/button";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { transferState } from "@/recoil/atoms/transfer-state";
import { colorTheme } from "@/style/color-theme";

export const TransferDetailMember = ({ setScreen }: TransferDetailProps) => {
  const [transfer] = useRecoilState(transferState);
  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);

  const handleAllSelect = () => {
    if (transfer.member === lastTransfer.member) {
      setLastTransfer((prevLastTransfer) => {
        const updatedLastTransfer = {
          ...prevLastTransfer,
          member: 0,
          users: [],
        };
        return updatedLastTransfer;
      });
    } else {
      setLastTransfer((prevLastTransfer) => {
        const updatedLastTransfer = {
          ...prevLastTransfer,
          member: transfer.member,
          users: transfer.users,
        };
        return updatedLastTransfer;
      });
    }
  };

  const handleMemberCheck = (item: {
    nickName: string;
    userId: number;
    profileId: number;
    profileImage: string;
    accountNumber: string;
  }) => {
    const foundUser = lastTransfer.users.find(
      (user) => user.nickName === item.nickName,
    );
    const isTrue = !!foundUser;
    const tempUsers = isTrue
      ? lastTransfer.users.filter((user) => user.nickName !== item.nickName)
      : [...lastTransfer.users, item];

    setLastTransfer((prevLastTransfer) => {
      const updatedLastTransfer = {
        ...prevLastTransfer,
        member: isTrue ? lastTransfer.member - 1 : lastTransfer.member + 1,
        users: tempUsers,
      };
      return updatedLastTransfer;
    });
  };

  return (
    <Wrapper>
      <CheckMsg>송금할 인원을 선택해주세요.</CheckMsg>
      <div style={{ fontSize: "30px", color: colorTheme.orange400 }}>
        {lastTransfer.member}명
      </div>
      <Button
        style={{
          fontSize: "1.39rem",
          padding: "0.56rem 1.11rem",
          borderRadius: "30px",
          border: "1px solid black",
          margin: "0.56rem",
        }}
        onClick={handleAllSelect}
      >
        {transfer.member === lastTransfer.member
          ? "전체 선택 해제"
          : "전체 선택하기"}
      </Button>
      <MemberScroll>
        {transfer.users.map((item, index) => {
          const foundUser = lastTransfer.users.find(
            (user) => user.nickName === item.nickName,
          );
          const isTrue = !!foundUser;
          return (
            <TransferDetailMemberItem
              key={index}
              isTrue={isTrue}
              setIsTrue={() => handleMemberCheck(item)}
            >
              {item.nickName}
            </TransferDetailMemberItem>
          );
        })}
      </MemberScroll>
      <BottomFixed alignDirection="column">
        <BottomFixed.Button
          color="blue"
          onClick={() => setScreen("transfer-detail-price")}
        >
          다음
        </BottomFixed.Button>
      </BottomFixed>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-size: 1.11rem;
`;

const CheckMsg = styled.div`
  font-size: 1.39rem;
  margin: 5% 0;
`;

const MemberScroll = styled.div`
  height: 45.3%;
  width: 100%;
  box-shadow: inset 0px 1px 0.61rem 1px #555555;
  overflow: scroll;
  display: grid;
  width: 100%;
  gap: 10%;
  padding: 0 10%;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);
`;
