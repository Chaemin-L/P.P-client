import { useState, ChangeEvent, PropsWithChildren } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";
import { colorTheme } from "@/style/color-theme";
import readingGlass from "@/assets/images/reading-glass.png";

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
      <Icon src={readingGlass} />
      <InputMapBox
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
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
  color: white;
  text-align: center;
  border: 0;
  width: 70%;
  height: 79px;
  background-color: ${colorTheme.orange400};
  border-radius: 11px;
  padding: 11px;
`;

const WonText = styled.span`
  color: black;
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
  width: 10%;
  margin: 0 1.28% 0 0;
  height: 100%;
`;

const InputMapBox = styled.input`
  width: 69.12%;
  height: 100%;
  padding: 7.4%;
  font-size: 13px;
  vertical-align: center;
  color: black;
  background-color: ${colorTheme.blue100};
  border-radius: 11px;
  border: 0;
`;

InputBox.InputNum = InputNum;
InputBox.InputMap = InputMap;
