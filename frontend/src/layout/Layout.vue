<template>
  <div>
    <Header />
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class Layout extends Vue {}
</script>

<style scoped></style>
