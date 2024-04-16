import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { InstanceResponseData } from "./types/common-type";

import getRefreshToken from "@/utils/token";

const Instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

Instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { method, url, headers } = config;

    const token = localStorage.getItem("accessToken");

    if (token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[API - REQUEST] ${method?.toUpperCase()} ${url}`);
    return { ...config, headers };
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

    if (stauts === 404) {
      console.log(`[API - RESPONSE 404] ${method?.toUpperCase()} ${url} | `);
    }

    console.log(`[API-RESPONSE ${stauts}] `, response);

    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      const { config } = error as { config: InternalAxiosRequestConfig };
      const { method, url } = config;
      const status = error.response.status;

      console.log(`[API-RESPONSE ${status}] `, error);

      if (status === 401) {
        console.log(
          `[API - RESPONSE 401] ${method?.toUpperCase()} ${url} | ${status} : ${error.message} | refresh Token`,
        );

        const reissueData = await getRefreshToken();
        if (reissueData !== undefined) {
          config.headers.Authorization = `Bearer ${reissueData.accessToken}`;
        }

        return axios(config);
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
