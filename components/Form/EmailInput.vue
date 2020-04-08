<template>
  <span>{{ message }}</span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class EmailInput extends Vue {
  message: string = 'hello Typescript'
}
</script>

<style scoped>

</style>
