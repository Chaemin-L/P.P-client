import { useContext } from "react";

import { ActivityBoxContext } from "@/components/common/activity-box";
import { ActivityBoxContextType } from "@/components/common/type";

export function useActivityBox() {
  const context = useContext<ActivityBoxContextType | undefined>(
    ActivityBoxContext,
  );
  if (context === undefined)
    throw new Error("ActivityBox 내에서만 사용 가능한 context입니다.");
  return context;
}
