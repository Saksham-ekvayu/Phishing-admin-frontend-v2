"use client"

import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { useRouter } from "next/navigation";

import { LocalStorageEnum, RoutePathEnum } from "@/enum";
import { StorageUtill } from "@/utills";

axios.defaults.headers.common.timezone =
  Intl.DateTimeFormat().resolvedOptions().timeZone;
axios.defaults.headers.common["Cache-Control"] = "no-cache";

/** Api Helper Class */
export class ApiHelper {
  /**
   * @functions {send} -To make generic  api call i.e. post, get, delete, update etc.
   * @param {AxiosRequestConfig} config
   * @return {Promise<AxiosResponse<T>>}
   */
  public static async send<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const res: AxiosResponse<T, T> = await axios(config);
    return res;
  }

  /**
   * @functions {initRequestManager} Manage Request
   */
  public static initRequestManager() {
    axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const newConfig = config;
        const token = StorageUtill.getLocalStorage(LocalStorageEnum.TOKEN);
        newConfig.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error: AxiosError) => Promise.resolve(error)
    );
  }

  /**
   * @functions  {responseHandler} Manage response through interceptor
   */
  public static responseHandler() {
    const router = useRouter();
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,

      (error: AxiosError) => {
        if (error?.response?.status === 401) {
          router.push(window.location.origin + RoutePathEnum.SIGN_IN);
          StorageUtill.clearLocalStorage();
        }
        return Promise.reject(error.response?.data);
      }
    );
  }

  /**
   *  @functions {init} To Initiate  api call
   */
  public static init() {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
    ApiHelper.initRequestManager();
  }
}

ApiHelper.init();
