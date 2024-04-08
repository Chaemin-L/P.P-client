import { styled } from "styled-components";

export const Header = ({ text = "" }: { text: string }) => {
  return (
    <HeaderWrapper>
      {text.split("\\n").map((item) => (
        <div key={item}>{item}</div>
      ))}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: 30px;
  line-height: 120%;
`;
