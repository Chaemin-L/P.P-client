import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

import { ReactComponent as CloseSVG } from "@/assets/icons/modal-close.svg";
import { colorTheme } from "@/style/color-theme";

type CloseButtonType = {
  onClick: MouseEventHandler<HTMLDivElement>;
};

type TitleType = {
  text: string;
};

type ButtonType = {
  color?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

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

const Button = ({ color = "blue", children, ...props }: ButtonType) => {
  return (
    <ButtonWrapper color={color} {...props}>
      {children}
    </ButtonWrapper>
  );
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
  top: -12px;
  right: -14px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 25px;
  font-weight: 500;
  word-wrap: break-word;
`;

const ButtonWrapper = styled.button<{ color?: string }>`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #f17547;
  border: 0;
  border-radius: 30px;
  background-color: ${({ color }) =>
    color === "blue" ? `${colorTheme.blue900}` : `${colorTheme.orange400}`};
  color: white;
  font-size: 30px;
  font-weight: 400;
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
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 35px;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.25);
  font-size: 18px;
  font-weight: 400;
  line-height: 120%;
  flex-direction: column;
  text-align: center;
  gap: 30px;
  z-index: 100;
  & > * {
    flex: 1;
  }
`;
