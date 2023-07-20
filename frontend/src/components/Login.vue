<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ signUp ? "Sign up" : "Sign in" }}</h1>
          <p class="text-xs-center">
            <a href="">{{
              signUp ? "Have an account?" : "Need an account?"
            }}</a>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form method="post" @submit.prevent="userSignIn">
            <fieldset v-if="signUp" class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              {{ signUp ? "Sign up" : "Sign in" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthStore from "@/store/modules/auth";

@Component
export default class Login extends Vue {
  signUp: boolean = false;
  username: string = "";
  email: string = "";
  password: string = "";

  created() {
    if (this.$route.name === "register") {
      this.signUp = true;
    }
  }

  async userSignUp() {
    await AuthStore.postSignup(this.username, this.email, this.password);
  }

  async userSignIn() {
    await AuthStore.postSignin(this.email, this.password);
  }
}
</script>

<style scoped></style>
