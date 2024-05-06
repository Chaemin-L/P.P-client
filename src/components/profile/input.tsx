import { forwardRef, InputHTMLAttributes } from "react";
import { styled } from "styled-components";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return <InputWrapper ref={ref} type="text" {...props} />;
  },
);

const InputWrapper = styled.input`
  width: 100%;
  padding: 12px 50px;
  background-color: #e4e8f1;
  border: 0;
  border-radius: 20px;
  color: #4b6db4;
  font-size: 1.67rem;
  font-weight: 600;
  text-align: center;
`;
