import { useState, ChangeEvent, PropsWithChildren } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";

export const InputBox = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const InputNum = (props: InputType) => {
  return (
    <InputBoxContainer>
      <InputBoxCom
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        {...props}
      />
      <WonText>{props.children}</WonText>
    </InputBoxContainer>
  );
};

const InputMap = (props: InputType) => {
  return (
    <InputMapContainer>
      <Icon src="" />
      <InputMapBox type="text" {...props} />
    </InputMapContainer>
  );
};

const InputBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-left: 21.5%;
`;

const InputBoxCom = styled.input`
  font-size: 50px;
  font-weight: bold;
  color: #a1a1a1;
  text-align: center;
  border: 0;
  width: 70%;
  height: 79px;
  background-color: #d9d9d9;
  border-radius: 11px;
  padding: 11px;
`;

const WonText = styled.span`
  color: #d9d9d9;
  font-size: 20px;
  vertical-align: bottom;
  margin: 0 0 5% 7%;
`;

const InputMapContainer = styled.div`
  width: 100%;
  height: 39px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 7.43%;
  margin: 0 1.28% 0 0;
  height: 100%;
  background-color: #d9d9d9;
`;

const InputMapBox = styled.input`
  width: 69.12%;
  height: 100%;
  padding: 7.4%;
  font-size: 13px;
  vertical-align: center;
  color: #ffffff;
  background-color: #d9d9d9;
  border-radius: 11px;
  border: 0;
`;

InputBox.InputNum = InputNum;
InputBox.InputMap = InputMap;
