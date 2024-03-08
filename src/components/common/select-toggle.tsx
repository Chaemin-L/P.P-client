import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { SelectToggleType } from "./type";

export const SelectToggle = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const ManageSelectToggle = ({ state, onClick, children }: SelectToggleType) => {
  return (
    <ManageSelectStyle
      style={{ backgroundColor: state ? "#d9d9d9" : "#a1a1a1" }}
      onClick={onClick}
    >
      {children}
    </ManageSelectStyle>
  );
};

const CheckTypeToggle = ({ state, onClick, children }: SelectToggleType) => {
  return (
    <CheckTypeStyle
      style={{ backgroundColor: state ? "#a1a1a1" : "#d9d9d9" }}
      onClick={onClick}
    >
      <ColumnBox>
        <CheckBox></CheckBox>
        {state ? <CheckImg src="src/assets/images/check-img.png" /> : <></>}
        <span>{children}</span>
      </ColumnBox>
      <TypeImage src="" />
    </CheckTypeStyle>
  );
};

const ManageSelectStyle = styled.button`
  width: 100%;
  height: 100%;
  font-size: 18px;
  border: 0;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckTypeStyle = styled.button`
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: #ffffff;
  border: 0;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ColumnBox = styled.div`
  margin: 2.63% 0px 16.7% 7%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 18px;
`;

const CheckImg = styled.img`
  width: 20.51%;
  height: 20.17%;
  position: absolute;
`;

const CheckBox = styled.div`
  position: relative;
  margin: 1% 1% 0% 0%;
  width: 17.9%;
  height: 24.56%;
  background-color: #ffffff;
`;

const TypeImage = styled.img`
  width: 45.5%;
  height: 62.3%;
  margin: 21.9% 0% 15.8% 12.8%;
  border: 12px;
  background-color: #ffffff;
`;

SelectToggle.ManageSelectToggle = ManageSelectToggle;
SelectToggle.CheckTypeToggle = CheckTypeToggle;
