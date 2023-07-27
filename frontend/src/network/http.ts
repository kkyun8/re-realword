import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { dispatchError } from "@/util/customError";

export default class HttpClient {
  constructor(private baseURL: string) {
    this.baseURL = baseURL;
  }

  get _baseURL() {
    return this.baseURL;
  }

  async fetch<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios({
        method: options?.method,
        url: `${this._baseURL}${url}`,
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        // const message = error.response?.data?.errors.body[0];
        if (status) {
          dispatchError(status);
        }
        throw new Error("someting wrong!!");
      } else {
        console.error(error);
        throw new Error("Network error occurred.");
      }
    }
  }
}
