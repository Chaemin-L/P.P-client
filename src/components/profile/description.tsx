import { styled } from "styled-components";

type DescriptionProps = {
  className?: string;
  text: string;
};

export const Description = ({
  className = "",
  text = "",
}: DescriptionProps) => {
  return (
    <DescriptionWrapper className={className}>
      {text.split("\\n").map((item) => (
        <div key={item}>{item}</div>
      ))}
    </DescriptionWrapper>
  );
};

const DescriptionWrapper = styled.div`
  width: 100%;
  margin-top: 35px;
  text-align: center;
  font-size: 1.38rem;
  line-height: 120%;
  color: black;
`;
