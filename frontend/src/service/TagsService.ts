import HttpClient from "@/network/http";
import { Tags } from "@/types/realWorldTypes";

export default class TagsService {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async getTags(): Promise<Tags> {
    return await this.http.fetch("/tags", {
      method: "get",
    });
  }
}
