<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <Article
            v-for="(article, index) in articles"
            :key="index"
            :article="article"
          />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <Tag v-for="(tag, index) in tags" :key="index" :tag="tag" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticlesStore from "@/store/modules/articles";
import TagsStore from "@/store/modules/tags";
import Article from "./Article.vue";
import Tag from "./Tag.vue";

@Component({
  components: {
    Article,
    Tag,
  },
})
export default class Home extends Vue {
  get articles() {
    return ArticlesStore.articles;
  }
  get tags() {
    return TagsStore.tags;
  }

  async created() {
    Promise.all([
      await ArticlesStore.fetchArticles(),
      await TagsStore.fetchTags(),
    ]);
  }
}
</script>

<style scoped></style>
