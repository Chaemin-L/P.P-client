import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { Header } from "@/components/profile/header";
import { usePostProfile } from "@/hooks/queries/usePostProfile";
import { profileState } from "@/recoil/atoms/profile-state";
import { colorTheme } from "@/style/color-theme";

const PASSWORD_LENGTH = 4;

export const PasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [status, setStatus] = useState<"INITIAL" | "CONFIRM" | "MISMATCH">(
    "INITIAL",
  );

  const profile = useRecoilValue(profileState);

  const { mutate: submitProfile } = usePostProfile();

  const onChange = (
    type: "password" | "confirmPassword",
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (
      isNaN(Number(e.target.value)) ||
      e.target.value.toString().length > PASSWORD_LENGTH
    )
      return;
    return type === "password"
      ? setPassword(e.target.value)
      : setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (password.length === PASSWORD_LENGTH) setStatus("CONFIRM");
  }, [password]);

  useEffect(() => {
    if (confirmPassword.length === PASSWORD_LENGTH) {
      if (password === confirmPassword) {
        submitProfile({ ...profile, password });
      } else {
        setPassword("");
        setConfirmPassword("");
        setStatus("MISMATCH");
      }
    }
  }, [confirmPassword]);

  return (
    <ContentLayout>
      {status !== "CONFIRM" ? (
        <>
          <Header text={`계좌 비밀번호를\\n설정해주세요`} />
          <InputArea>
            <input value={password} onChange={(e) => onChange("password", e)} />
            <PasswordWrapper>
              {password.split("").map((p, i) => (
                <span key={i}>{p}</span>
              ))}
              {new Array(PASSWORD_LENGTH - password.length)
                .fill(0)
                .map((_, i) => (
                  <DotsWrapper key={i}>
                    <Dots />
                  </DotsWrapper>
                ))}
            </PasswordWrapper>
          </InputArea>
          {status === "MISMATCH" && (
            <ErrorMessage>
              전에 입력한 비밀번호와
              <br />
              일치하지 않아요
              <br />
              비밀번호를 다시 설정해주세요
            </ErrorMessage>
          )}
        </>
      ) : (
        <>
          <Header text={`똑같이 한 번 더\\n입력해주세요`} />
          <InputArea>
            <input
              value={confirmPassword}
              onChange={(e) => onChange("confirmPassword", e)}
            />
            <PasswordWrapper>
              {confirmPassword.split("").map((p, i) => (
                <span key={i}>{p}</span>
              ))}
              {new Array(PASSWORD_LENGTH - confirmPassword.length)
                .fill(0)
                .map((_, i) => (
                  <DotsWrapper key={i}>
                    <Dots />
                  </DotsWrapper>
                ))}
            </PasswordWrapper>
          </InputArea>
        </>
      )}
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 86px;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const InputArea = styled.div`
  width: 90%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  position: relative;

  & > input {
    position: relative;
    width: 100%;
    background: transparent;
    border: 0;
    color: transparent;
    z-index: 10;
  }
`;

const PasswordWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colorTheme.orange400};
  font-size: 2.7rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
  & > * {
    flex: 1;
  }
`;

const DotsWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dots = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${colorTheme.orange200};
`;

const ErrorMessage = styled.div`
  font-size: 1rem;
  color: ${colorTheme.orange400};
  text-align: center;
  line-height: 120%;
`;
