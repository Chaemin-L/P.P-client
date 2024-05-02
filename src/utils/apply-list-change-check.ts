import { ApplyListType } from "@/components/apply/type";

const equals = ({ a, b }: { a: ApplyListType[]; b: ApplyListType[] }) =>
  JSON.stringify(a) === JSON.stringify(b);

export const checkChange = ({
  a,
  b,
}: {
  a: ApplyListType[];
  b: ApplyListType[];
}) => {
  a.sort();
  b.sort();
  return equals({ a: a, b: b });
};
