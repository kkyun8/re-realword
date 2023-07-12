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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
