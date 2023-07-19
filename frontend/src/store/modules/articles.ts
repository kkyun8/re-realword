import { Article, ArticlesResponse } from "@/types/realWorldTypes";
import {
  Module,
  VuexModule,
  getModule,
  MutationAction,
} from "vuex-module-decorators";
import HttpClient from "@/network/http";
import ArticlesService from "@/service/ArticlesService";
import store from "../index";

const baseURL = "https://api.realworld.io/api";
const httpClient = new HttpClient(baseURL);
const articlesService = new ArticlesService(httpClient);

@Module({ store, name: "articles", namespaced: true, dynamic: true })
class ArticlesStore extends VuexModule {
  articles: Article[] = [];

  @MutationAction
  async fetchArticles() {
    const feeds: ArticlesResponse = await articlesService.getArticles();
    return {
      articles: feeds.articles,
    };
  }
}

export default getModule(ArticlesStore);
