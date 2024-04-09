import { forwardRef, InputHTMLAttributes } from "react";
import { styled } from "styled-components";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Input = forwardRef(function input(props: InputProps, _) {
  return <InputWrapper type="text" {...props} />;
});

const InputWrapper = styled.input`
  max-width: 70%;
  margin: 0 100px;
  padding: 12px 50px;
  background-color: #e4e8f1;
  border: 0;
  border-radius: 20px;
  color: #4b6db4;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;
