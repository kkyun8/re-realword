import { SigninReqest, SignupReqest, User } from "@/types/realWorldTypes";
import {
  Module,
  VuexModule,
  getModule,
  MutationAction,
  Mutation,
  Action,
} from "vuex-module-decorators";
import HttpClient from "@/network/http";
import AuthService from "@/service/AuthService";
import TokenStorage from "@/db/token";
import store from "../index";
// import { CustomError } from "@/util/customError";

const baseURL = "http://localhost:3000/api";
const httpClient = new HttpClient(baseURL);
const tokenStorage = new TokenStorage();
const authService = new AuthService(httpClient, tokenStorage);

@Module({ store, name: "auth", namespaced: true, dynamic: true })
class AuthStore extends VuexModule {
  errorMessages: string | null = null;
  isAuthenticated: boolean = false;
  user = {
    email: "",
    token: "",
    username: "",
    bio: "",
    image: "",
  };

  @Mutation
  setErrorMessage(message: string) {
    this.errorMessages = message;
  }

  @Mutation
  setAuthenticated(auth: boolean) {
    this.isAuthenticated = auth;
  }

  @Mutation
  setUser(user: User) {
    this.user = user.user;
  }

  @Action({ rawError: true })
  async postSignin(user: SigninReqest) {
    try {
      const userData: User = await authService.login(user);
      this.setUser(userData);
      this.setAuthenticated(true);
      return userData;
    } catch (error) {
      if (error instanceof Error) {
        this.setErrorMessage(error.message);
      }
    }
  }

  @Action({ rawError: true })
  async postSignup(user: SignupReqest) {
    try {
      const userData: User = await authService.signup(user);
      this.setUser(userData);
      this.setAuthenticated(true);
      return userData;
    } catch (error) {
      if (error instanceof Error) {
        this.setErrorMessage(error.message);
      }
    }
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
