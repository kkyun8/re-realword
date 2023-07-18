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

          <form>
            <fieldset v-if="signUp" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
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

@Component
export default class Login extends Vue {
  signUp: boolean = false;
  created() {
    if (this.$route.name === "register") {
      this.signUp = true;
    }
  }
  mounted() {
    console.log(this.$route.name);
  }
}
</script>

<style scoped></style>
