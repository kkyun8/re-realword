import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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
        const message =
          error.response?.data?.message || "Something went wrong!";
        throw new Error(message);
      } else {
        console.error(error);
        throw new Error("Network error occurred.");
      }
    }
  }
}
