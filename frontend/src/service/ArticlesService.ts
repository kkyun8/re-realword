import HttpClient from "@/network/http";
import { ArticlesResponse } from "@/types/realWorldTypes";

export default class ArticlesService {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async getArticles(): Promise<ArticlesResponse> {
    return await this.http.fetch("/articles", {
      method: "get",
      params: {
        limit: 5,
      },
    });
  }
}
