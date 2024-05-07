export type ReportButtonProps = {
  children: React.ReactNode;
  state: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type ReportProps = {
  postId: string;
  onSuccessReport: () => void;
  creatorId: string;
};
