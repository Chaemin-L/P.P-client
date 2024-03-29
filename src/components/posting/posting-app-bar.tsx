import { AppBar } from "@/components/common/app-bar";
import { AppBarProps } from "@/components/common/type";

export const PostingAppBar = (props: AppBarProps) => {
  return (
    <AppBar isBorderExist={true}>
      <AppBar.AppBarNavigate>
        <AppBar.BackButton onClick={props.onClick} />
        <AppBar.HeaderText>{props.children}</AppBar.HeaderText>
      </AppBar.AppBarNavigate>
    </AppBar>
  );
};
