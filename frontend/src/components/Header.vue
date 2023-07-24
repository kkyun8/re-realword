<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul v-show="!isAuth" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Sign up</router-link>
        </li>
      </ul>
      <ul v-show="isAuth" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <a class="nav-link active" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/editor">
            <i class="ion-compose"></i>&nbsp;New Article
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/profile/eric-simons">
            <img :src="user.image" class="user-pic" />
            {{ user.username }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthStore from "@/store/modules/auth";

@Component
export default class Header extends Vue {
  get isAuth() {
    return AuthStore.isAuthenticated;
  }

  get user() {
    return AuthStore.user;
  }

  async created() {
    await AuthStore.checkAuthStatus();
  }
}
</script>

<style scoped></style>
