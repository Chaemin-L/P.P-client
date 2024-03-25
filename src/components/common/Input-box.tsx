import { useState, ChangeEvent, PropsWithChildren } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";

export const InputBox = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const InputNum = ({ value, onChange, children }: InputType) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <InputBoxContainer>
      <InputBoxCom
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={inputValue}
        onChange={handleInputChange}
      />
      <WonText>{children}</WonText>
    </InputBoxContainer>
  );
};

const InputMap = ({ value, onChange }: InputType) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <InputMapContainer>
      <Icon src="" />
      <InputMapBox
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </InputMapContainer>
  );
};

const InputBoxContainer = styled.div`
  width: 64.1%;
  height: 79px;
  background-color: #d9d9d9;
  border-radius: 11px;
  padding: 11px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const InputBoxCom = styled.input`
  font-size: 50px;
  font-weight: bold;
  color: #a1a1a1;
  width: 68.4%;
  text-align: right;
  background-color: rgb(0, 0, 0, 0);
  border: 0;
`;

const WonText = styled.span`
  color: #ffffff;
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
