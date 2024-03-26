import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { InputType } from "@/components/common/type";

export const PostingInput = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const InputTitle = (props: InputType) => {
  return (
    <InputWrapper>
      <InputContainer>
        <InputTitleBox maxLength={20} type="text" {...props} />
        <InputLeft>{props.value?.toString.length}/20자</InputLeft>
      </InputContainer>
    </InputWrapper>
  );
};

const InputContent = (props: InputType) => {
  return (
    <InputWrapper>
      <InputContainer>
        <InputContentBox maxLength={100} type="text" {...props} />
        <InputLeft>{props.value?.toString.length}/100자</InputLeft>
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
  background-color: #d9d9d9;
  border-radius: 11px;
  color: #ffffff;
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

const InputContentBox = styled.input`
  font-size: 18px;
  width: 100%;
  background-color: transparent;
  border: 0;
  height: 206px;
`;

PostingInput.InputTitle = InputTitle;
PostingInput.InputContent = InputContent;
