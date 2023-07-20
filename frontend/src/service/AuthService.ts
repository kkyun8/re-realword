import HttpClient from "@/network/http";
import TokenStorage from "@/db/token";
import { User } from "@/types/realWorldTypes";

export default class AuthService {
  private http: HttpClient;
  private tokenStorage: TokenStorage;
  constructor(http: HttpClient, tokenStorage: TokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const data: User = await this.http.fetch("/users", {
      method: "post",
      data: { username, email, password },
    });
    // token save
    this.tokenStorage.saveToken(data.user.token);
    return data;
  }

  async login(email: string, password: string): Promise<User> {
    const data: User = await this.http.fetch("/users/login", {
      method: "post",
      data: { email, password },
    });
    // token save
    this.tokenStorage.saveToken(data.user.token);
    return data;
  }
}
