export type TransferProps = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export type memberItem = {
  isTrue: boolean;
  setIsTrue: () => void;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;
