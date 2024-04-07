import { styled } from "styled-components";

export const PostingStateBar = ({
  now,
  total,
}: {
  now: number;
  total: number;
}) => {
  return (
    <Wrapper>
      <div></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 8px;
  display: flex;
`;
