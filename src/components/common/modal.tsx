import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

import { ReactComponent as CloseSVG } from "@/assets/icons/close.svg";

type CloseButtonType = {
  onClick: MouseEventHandler<HTMLDivElement>;
};

type TitleType = {
  text: string;
};

type ButtonType = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

type ModalType = {
  onClose: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
};

const CloseButton = ({ onClick }: CloseButtonType) => (
  <CloseButtonWrapper className="modal-close-button" onClick={onClick}>
    <CloseSVG />
  </CloseButtonWrapper>
);

const Title = ({ text }: TitleType) => {
  return (
    <TitleWrapper>
      {text.split("\\n").map((t) => (
        <span key={t}>{t}</span>
      ))}
    </TitleWrapper>
  );
};

const Button = ({ children, ...props }: ButtonType) => {
  return <ButtonWrapper {...props}>{children}</ButtonWrapper>;
};

export const Modal = ({ onClose, children }: ModalType) => {
  return (
    <>
      {createPortal(
        <ModalBackground>
          <Content>
            <CloseButton onClick={onClose} />
            {children}
          </Content>
        </ModalBackground>,
        document.body,
      )}
    </>
  );
};

Modal.Button = Button;
Modal.Title = Title;

const CloseButtonWrapper = styled.div`
  width: 64px;
  height: 64px;
  position: absolute;
  background-color: transparent;
  top: -15px;
  right: -10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  word-wrap: break-word;
`;

const ButtonWrapper = styled.button`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #f17547;
  border: 0;
  border-radius: 30px;
  color: white;
  font-size: 30px;
  font-weight: 600;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(217, 217, 217, 0.7);
`;

const Content = styled.div`
  position: relative;
  display: flex;
  max-width: 90%;
  max-height: 90%;
  padding: 40px 34px;
  background-color: #f5f5f5;
  border-radius: 35px;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.25);
  font-size: 25px;
  flex-direction: column;
  text-align: center;
  gap: 30px;
  & > * {
    flex: 1;
  }
`;
