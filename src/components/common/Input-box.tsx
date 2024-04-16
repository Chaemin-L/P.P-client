import { useState, ChangeEvent, PropsWithChildren } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";

import readingGlass from "@/assets/images/reading-glass.png";
import { colorTheme } from "@/style/color-theme";

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
  font-size: 2.78rem;
  font-weight: bold;
  color: white;
  text-align: center;
  border: 0;
  width: 70%;
  height: 79px;
  background-color: ${colorTheme.orange400};
  border-radius: 0.61rem;
  padding: 0.61rem;
`;

const WonText = styled.span`
  color: black;
  font-size: 1.11rem;
  vertical-align: bottom;
  margin: 0 0 5% 7%;
`;

const InputMapContainer = styled.div`
  width: 100%;
  height: 2.17rem;
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
  font-size: 0.72rem;
  vertical-align: center;
  color: black;
  background-color: ${colorTheme.blue100};
  border-radius: 0.61rem;
  border: 0;
`;

InputBox.InputNum = InputNum;
InputBox.InputMap = InputMap;
