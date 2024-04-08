export type ReportButtonProps = {
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type ReportProps = {
  postId: string;
  onSuccessReport: () => void;
};
