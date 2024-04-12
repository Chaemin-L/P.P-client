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
  margin: 0.67rem 0;
  width: 100%;
  border-radius: 0.56rem;
  border: none;
  background-color: ${colorTheme.orange200};
  color: #ffffff;
  text-align: center;
  padding: 1rem 0;
  font-size: 1rem;
`;
