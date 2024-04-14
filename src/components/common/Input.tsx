import { motion } from "framer-motion";
import { styled } from "styled-components";

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
  padding: 0 0 5% 7%;
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
