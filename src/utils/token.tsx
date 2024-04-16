import { TRefreshToken } from "./types/refresh-token-type";

import Instance from "@/api/axios-instance";

const getRefreshToken = async (): Promise<string | void> => {
  try {
    const {
      data: { accessToken, refreshToken },
    } = await Instance.post<TRefreshToken>(
      process.env.REACT_APP_REFRESH_URL as string,
      {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      },
    );

    localStorage.setItem("accessToken", accessToken);

    if (refreshToken !== null) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    return accessToken;
  } catch (e) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export default getRefreshToken;
