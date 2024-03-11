import React, { ChangeEvent, FormEvent } from "react";

export type InputType = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
