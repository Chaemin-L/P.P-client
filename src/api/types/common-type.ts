export type InstanceResponseData = {
  code: string;
  message: string;
};

export type FinalResponse<T extends object = Record<string, unknown>> = {
  status: number;
  code: string;
  msg: string;
  detailMsg: string;
  data: T;
};
