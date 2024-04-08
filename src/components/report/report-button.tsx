import { styled } from "styled-components";

import { ReportButtonProps } from "./type";

import { colorTheme } from "@/style/color-theme";

export const ReportButton = ({ children, ...props }: ReportButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  margin: 12px 0;
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: ${colorTheme.orange400};
  color: #ffffff;
  text-align: center;
  padding: 18px 0;
  font-size: 18px;
`;
