import { PropsWithChildren, useRef } from "react";
import { styled } from "styled-components";

import { InputType } from "@/components/common/type";
import { colorTheme } from "@/style/color-theme";

export const PostingInput = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const InputTitle = (props: InputType) => {
  return (
    <InputWrapper>
      <InputContainer>
        <InputTitleBox maxLength={20} type="text" {...props} />
        <InputLeft>{props.value?.toString().length}/20자</InputLeft>
      </InputContainer>
    </InputWrapper>
  );
};

const InputContent = (props: InputType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <InputWrapper>
      <InputContainer>
        <InputContentBoxContainer onClick={handleClick}>
          <InputContentBox
            ref={inputRef}
            maxLength={100}
            type="text"
            {...props}
          />
        </InputContentBoxContainer>
        <InputLeft>{props.value?.toString().length}/100자</InputLeft>
      </InputContainer>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 100%;
  padding: 0 9.8%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 19px 21px;
  background-color: ${colorTheme.blue300};
  border-radius: 11px;
  color: black;
  align-items: flex-start;
`;

const InputTitleBox = styled.input`
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  background-color: transparent;
  border: 0;
`;

const InputLeft = styled.span`
  font-size: 15px;
  width: 100%;
  border: 0;
  padding-top: 10px;
  text-align: end;
`;

const InputContentBoxContainer = styled.div`
  width: 100%;
  background-color: transparent;
  border: 0;
  height: 206px;
`;

const InputContentBox = styled.input`
  width: 100%;
  font-size: 18px;
  background-color: transparent;
  resize: vertical;
  border: 0;
`;

PostingInput.InputTitle = InputTitle;
PostingInput.InputContent = InputContent;
