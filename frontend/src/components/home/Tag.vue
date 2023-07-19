<template>
  <a href="" class="tag-pill tag-default">{{ tag }}</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Tag extends Vue {
  @Prop({ default: null })
  tag: string | undefined;
}
</script>

<style scoped></style>
