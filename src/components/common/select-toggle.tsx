import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { SelectToggleType } from "./type";

import checkImg from "@/assets/images/check-img.png";

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
        <CheckBoxContainer>
          <CheckBox></CheckBox>
          {state ? <CheckImg src={checkImg} /> : <></>}
          <span>{children}</span>
        </CheckBoxContainer>
      </ColumnBox>
      <TypeImageContainer>
        <TypeImage src="" />
      </TypeImageContainer>
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
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0% 0% 15.8% 0%;
`;

const ColumnBox = styled.div`
  padding: 5.26% 0% 4% 7%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 18px;
`;

const CheckImg = styled.img`
  width: 32px;
  height: 23px;
  position: absolute;
  top: -1%;
  right: 0;
  left: -1%;
`;

const CheckBoxContainer = styled.div`
  position: relative;
`;

const CheckBox = styled.div`
  position: relative;
  margin: 8% 0% 0% 4%;
  width: 28px;
  height: 28px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const TypeImageContainer = styled.div`
  width: 45.5%;
  padding-top: 45.5%;
  margin: 21.9% 12.8% 0% 0%;
  border: 12px;
  position: relative;
`;

const TypeImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

SelectToggle.ManageSelectToggle = ManageSelectToggle;
SelectToggle.CheckTypeToggle = CheckTypeToggle;
