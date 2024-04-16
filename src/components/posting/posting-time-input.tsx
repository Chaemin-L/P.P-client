import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { colorTheme } from "@/style/color-theme";

export const PostingTimeInput = () => {
  const [hourValue, setHourValue] = useState("");
  const [minuteValue, setMinuteValue] = useState("");
  const [isHourError, setIsHourError] = useState(false);
  const [isMinuteError, setIsMinuteError] = useState(false);

  useEffect(() => {
    const hourTimeout = setTimeout(() => {
      setIsHourError(false);
    }, 2000);

    const MinuteTimeout = setTimeout(() => {
      setIsMinuteError(false);
    }, 2000);

    return () => {
      clearTimeout(hourTimeout);
      clearTimeout(MinuteTimeout);
    };
  }, [hourValue, minuteValue]);

  return (
    <Wrapper>
      <EachBox>
        <StyledInput
          type="number"
          value={hourValue}
          onChange={(e) => {
            if (Number(e.target.value) > 12) {
              setHourValue("12");
              setIsHourError(true);
            } else if (Number(e.target.value) < 1) {
              setHourValue("1");
              setIsHourError(true);
            } else {
              setHourValue(e.target.value);
              setIsHourError(false);
            }
          }}
          animate={{
            x: isHourError ? [-5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0] : 0,
          }}
          transition={{ duration: 0.5, repeat: 0 }}
          style={{
            color: isHourError ? colorTheme.orange400 : "white",
            backgroundColor: isHourError
              ? colorTheme.orange200
              : colorTheme.orange400,
          }}
        />
        <TextDiv>시</TextDiv>
      </EachBox>
      <EachBox>
        <StyledInput
          type="number"
          value={minuteValue}
          onChange={(e) => {
            if (Number(e.target.value) > 59) {
              setMinuteValue("59");
              setIsMinuteError(true);
            } else if (Number(e.target.value) < 0) {
              setMinuteValue("0");
              setIsMinuteError(true);
            } else {
              setMinuteValue(e.target.value);
              setIsMinuteError(false);
            }
          }}
          animate={{
            x: isMinuteError ? [-5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0] : 0,
          }}
          transition={{ duration: 0.5, repeat: 0 }}
          style={{
            color: isMinuteError ? colorTheme.orange400 : "white",
            backgroundColor: isMinuteError
              ? colorTheme.orange200
              : colorTheme.orange400,
          }}
        />
        <TextDiv>분</TextDiv>
      </EachBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10%;
  gap: 5%;
`;

const EachBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 2%;
`;

const TextDiv = styled.div`
  font-size: 1.39rem;
`;

const StyledInput = styled(motion.input)`
  width: 100%;
  height: 4.39rem;
  border-radius: 0.83rem;
  text-align: center;
  font-size: 2.78rem;
  font-weight: bold;
  border: none;
`;
