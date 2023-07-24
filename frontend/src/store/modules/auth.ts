import { SigninReqest, SignupReqest, User } from "@/types/realWorldTypes";
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

const baseURL = "http://localhost:3000/api";
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
  async postSignup(user: SignupReqest) {
    const userData: User = await authService.signup(user);
    return {
      user: userData.user,
      isAuthenticated: true,
    };
  }

  @MutationAction
  async postSignin(user: SigninReqest) {
    const userData: User = await authService.login(user);
    return {
      user: userData.user,
      isAuthenticated: true,
    };
  }

  @MutationAction
  async getUSer() {
    const userData: User = await authService.getUser();
    return {
      user: userData.user,
    };
  }

  @MutationAction
  async checkAuthStatus() {
    const token = tokenStorage.getToken();
    if (token) {
      return {
        isAuthenticated: true,
      };
    } else {
      return {
        isAuthenticated: false,
      };
    }
  }
}

export default getModule(AuthStore);
