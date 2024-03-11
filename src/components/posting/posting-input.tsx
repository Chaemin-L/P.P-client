import { useState, ChangeEvent, PropsWithChildren } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";

export const PostingInput = ({ children }: PropsWithChildren) => {
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
      <InputBox
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
`;

const InputBox = styled.input`
  font-size: 50px;
  font-weight: bold;
  color: #a1a1a1;
  widht: 68.4%;
  text-align: right;
`;

const WonText = styled.span`
  height: 60px;
  color: #ffffff;
  font-size: 20px;
  vertical-align: bottom;
`;

const InputMapContainer = styled.div`
  width: 100%;
  height: 39px;
  display: flex;
  felx-direction: row;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 7.43%;
  margin: 0 0 0 1.28%;
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
`;

PostingInput.InputNum = InputNum;
PostingInput.InputMap = InputMap;
