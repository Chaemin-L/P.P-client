import { styled } from "styled-components";

import { ReportButtonProps } from "./type";

export const ReportButton = ({ children, ...props }: ReportButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  margin: 12px 0;
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: #d9d9d9;
  color: #ffffff;
  text-align: center;
  padding: 18px 0;
  font-size: 18px;
`;
