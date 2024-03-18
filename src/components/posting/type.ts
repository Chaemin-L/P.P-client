import React, { ChangeEvent } from "react";

export type InputType = {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
