import { motion } from "framer-motion";
import { styled } from "styled-components";

import { PostingAppBarProps } from "./type";

import { AppBar } from "@/components/common/app-bar";
import { colorTheme } from "@/style/color-theme";

export const PostingAppBar = (props: PostingAppBarProps) => {
  return (
    <AppBar isBorderExist={true}>
      <AppBar.AppBarNavigate>
        <AppBar.BackButton onClick={props.onClick} />
        <AppBar.HeaderText>{props.nowPage}/7</AppBar.HeaderText>
        <div style={{ width: "30px" }} />
      </AppBar.AppBarNavigate>
      <StateLine>
        <NowStateLine
          initial={{ width: `calc((100% / 7) * ${props.nowPage - 1})` }}
          animate={{ width: `calc((100% / 7) * ${props.nowPage})` }}
        />
      </StateLine>
    </AppBar>
  );
};

const StateLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 0.44rem;
  background-color: ${colorTheme.blue100};
`;

const NowStateLine = styled(motion.div)`
  background-color: ${colorTheme.orange400};
  height: 0.44rem;
`;
