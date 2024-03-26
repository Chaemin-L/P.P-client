import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { InstanceResponseData } from "./type";

import getRefreshToken from "@/utils/token";

const Instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}`,
  timeout: 5000,
  withCredentials: true,
});

Instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { method, url } = config;
    console.log(`[API - REQUEST] ${method?.toUpperCase()} ${url}`);

    // let token: string | null = null;

    // // 토큰 설정 해줘야함
    // if (config.url === process.env.REACT_APP_REFRESH_URL) {
    //   token = localStorage.getItem("refreshToken");
    // } else {
    //   token = localStorage.getItem("accessToken");
    // }

    // if (token !== null) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error: AxiosError) => {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    console.log(`[API - REQUEST ERROR] ${method?.toUpperCase()} ${url}`);

    // 어떻게 처리하면 좋을까 ~?

    return Promise.reject(error);
  },
);

Instance.interceptors.response.use(
  (
    response: AxiosResponse<InstanceResponseData>,
  ): AxiosResponse<InstanceResponseData> => {
    const { method, url } = response.config;
    const stauts = response.status;
    const { code, message } = response.data;

    if (stauts === 404) {
      console.log(
        `[API - RESPONSE 404] ${method?.toUpperCase()} ${url} | ${code} : ${message}`,
      );
    }

    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      const { config } = error as { config: InternalAxiosRequestConfig };
      const { method, url } = config;
      const status = error.response.status;

      if (status === 401) {
        console.log(
          `[API - RESPONSE 401] ${method?.toUpperCase()} ${url} | ${status} : ${error.message} | refresh Token`,
        );

        // const accessToken = await getRefreshToken();
        // if (accessToken !== undefined) {
        //   config.headers.Authorization = `Bearer ${accessToken}`;
        // }

        // return axios(config);
      } else {
        console.log(
          `[API - RESPONSE ERROR] ${method?.toUpperCase()} ${url} | ${status} : ${error.message}`,
        );
        return Promise.reject(error);
      }
    }
  },
);

export default Instance;
