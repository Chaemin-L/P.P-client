import React from "react";

export type InputType = {
  value: string;
  onChange: (newValue: string) => void;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;
