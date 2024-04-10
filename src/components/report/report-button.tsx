import { styled } from "styled-components";

import { ReportButtonProps } from "./type";

import { colorTheme } from "@/style/color-theme";

export const ReportButton = ({
  children,
  state,
  ...props
}: ReportButtonProps) => {
  return (
    <StyledButton
      style={{
        backgroundColor: state ? colorTheme.orange400 : colorTheme.orange200,
        color: state ? "#ffffff" : "#000000",
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  margin: 12px 0;
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: ${colorTheme.orange200};
  color: #ffffff;
  text-align: center;
  padding: 18px 0;
  font-size: 18px;
`;
