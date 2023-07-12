<template>
  <div>
    <Header />
    <main>
      <slot></slot>
    </main>

    <footer>
      <!-- 푸터 내용 -->
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "../components/Header.vue";

@Component({
  components: {
    Header,
  },
})
export default class Layout extends Vue {}
</script>

<style scoped></style>
