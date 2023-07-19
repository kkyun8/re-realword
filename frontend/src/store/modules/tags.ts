import { Tags } from "@/types/realWorldTypes";
import {
  Module,
  VuexModule,
  getModule,
  MutationAction,
} from "vuex-module-decorators";
import HttpClient from "@/network/http";
import TagsService from "@/service/TagsService";
import store from "../index";

const baseURL = "https://api.realworld.io/api";
const httpClient = new HttpClient(baseURL);
const tagsService = new TagsService(httpClient);

@Module({ store, name: "tags", namespaced: true, dynamic: true })
class TagsStore extends VuexModule {
  tags: string[] | null = [];

  @MutationAction
  async fetchTags() {
    const tags: Tags = await tagsService.getTags();
    return {
      tags: tags.tags,
    };
  }
}

export default getModule(TagsStore);
