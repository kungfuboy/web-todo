<template>
  <section class="content">
    <app-main></app-main>
    <float-select></float-select>
    {{padding}}
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppMain from '@/components/AppMain.vue'

import FloatSelect from '@/components/FloatSelect.vue'

@Component({
  components: {
    FloatSelect,
    AppMain
  }
})
export default class App extends Vue {
  public list: any = []
  private padding: number = 0

  private mounted() {
    // 获取十五天内数据，赋值给list
    this.padding = this.countX(50)
  }
  private countX(n: number) {
    const padding = n * 2
    return padding
  }
}
</script>

<style lang="less">
@import './assets/styles/reset.less';

.content {
  height: 100%;
}
</style>
