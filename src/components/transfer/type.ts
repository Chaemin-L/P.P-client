export type TransferDetailProps = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  memberCount?: number;
};

export type memberItem = {
  isTrue: boolean;
  setIsTrue: () => void;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type TransferProps = {
  onClick: () => void;
  memberCount: number;
};
