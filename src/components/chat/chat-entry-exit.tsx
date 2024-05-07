import { styled } from "styled-components";

export const ChatEntryExit = ({ msg }: { msg: string }) => {
  return (
    <Wrapper>
      <Container>{msg}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 3%;
  height: auto;
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  width: 100%;
  font-size: 1rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  background-color: #c2c2c2;
  color: black;
  text-align: center;
  line-height: 1.5rem;
`;
