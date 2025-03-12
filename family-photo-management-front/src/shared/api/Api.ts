import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { API } from "./apiUtils";
import BaseApiInstance from "./BaseApiInstance";

export class Api extends BaseApiInstance {
  constructor() {
    super(API.DEFAULT_CONFIG);
  }

  protected initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  protected initializeResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const apiInstance = new Api();
export default apiInstance;
