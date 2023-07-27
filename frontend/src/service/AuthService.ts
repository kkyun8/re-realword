import HttpClient from "@/network/http";
import TokenStorage from "@/db/token";
import { SigninReqest, SignupReqest, User } from "@/types/realWorldTypes";

export default class AuthService {
  private http: HttpClient;
  private tokenStorage: TokenStorage;
  constructor(http: HttpClient, tokenStorage: TokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(user: SignupReqest): Promise<User> {
    const editedData = {
      user: user,
    };
    const data: User = await this.http.fetch("/users", {
      method: "post",
      data: JSON.stringify(editedData),
    });
    // token save
    this.tokenStorage.saveToken(data.user.token);
    return data;
  }

  async login(user: SigninReqest): Promise<User> {
    const editedData = {
      user: user,
    };
    const data: User = await this.http.fetch("/users/login", {
      method: "post",
      data: JSON.stringify(editedData),
    });
    // token save
    this.tokenStorage.saveToken(data.user.token);
    return data;
  }

  async getUser(): Promise<User> {
    const token = this.tokenStorage.getToken();
    const data: User = await this.http.fetch("/users", {
      method: "get",
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }
}
