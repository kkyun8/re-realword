<template>
  <div id="app">
    <Layout>
      <p>Home</p>
      <p>Login/Register</p>
      <p>Profile</p>
      <p>Settings</p>
      <p>Create/Edit Article</p>
      <p>Article</p>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Layout from "./layout/Layout.vue";

@Component({
  components: {
    Layout,
  },
})
export default class App extends Vue {}
</script>

<style>
html {
  box-sizing: border-box;
  font-size: 16px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
