import { User } from "@/types/realWorldTypes";
import {
  Module,
  VuexModule,
  getModule,
  MutationAction,
} from "vuex-module-decorators";
import HttpClient from "@/network/http";
import AuthService from "@/service/AuthService";
import TokenStorage from "@/db/token";
import store from "../index";

const baseURL = "https://api.realworld.io/api";
const httpClient = new HttpClient(baseURL);
const tokenStorage = new TokenStorage();
const authService = new AuthService(httpClient, tokenStorage);

@Module({ store, name: "auth", namespaced: true, dynamic: true })
class AuthStore extends VuexModule {
  isAuthenticated: boolean = false;
  user = {
    email: "",
    token: "",
    username: "",
    bio: "",
    image: "",
  };

  @MutationAction
  async postSignup(username: string, email: string, password: string) {
    const user: User = await authService.signup(username, email, password);
    return {
      user: user.user,
    };
  }

  @MutationAction
  async postSignin(email: string, password: string) {
    const user: User = await authService.login(email, password);
    return {
      user: user.user,
    };
  }
}

export default getModule(AuthStore);
