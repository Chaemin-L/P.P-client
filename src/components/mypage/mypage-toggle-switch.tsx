import { motion } from "framer-motion";
import { styled } from "styled-components";

import { SwitchToggleType } from "@/components/common/type";
import { colorTheme } from "@/style/color-theme";

export const MypageToggleSwitch = ({
  firstText,
  secondText,
  onChangeSelected,
  isLeftSelected,
}: SwitchToggleType) => {
  const variants = {
    selected: { width: "65%", backgroundColor: "#ffffff", color: "#000000" },
    notSelected: {
      width: "35%",
      backgroundColor: colorTheme.orange400,
      color: "#ffffff",
    },
  };

  return (
    <SelectToggleWrapper>
      <SelectToggleButton
        variants={variants}
        initial={false}
        animate={isLeftSelected ? "selected" : "notSelected"}
        onClick={() => onChangeSelected(true)}
      >
        {firstText}
      </SelectToggleButton>
      <SelectToggleButton
        variants={variants}
        initial={false}
        animate={isLeftSelected ? "notSelected" : "selected"}
        onClick={() => onChangeSelected(false)}
      >
        {secondText}
      </SelectToggleButton>
    </SelectToggleWrapper>
  );
};

const SelectToggleWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const SelectToggleButton = styled(motion.button)`
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  width: 100%;
  line-height: 29px;
  padding: 8px 0;
  border: 0;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;
