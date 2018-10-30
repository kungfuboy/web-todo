<template>
    <div class="touch" @touchstart.stop="touchStart" @touchend.stop="touchEnd" @touchmove.stop="touchMove">
        <span></span>
        <i v-show="showStatus" class="show-date" :style="'transform:translateX(' + clientX + 'px)'">{{clientX}}</i>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FloatSelect extends Vue {
  @Prop(Array) public list!: any

  private touchStartX: number = 0
  private clientX: string | number = ''
  private showStatus: boolean = false
  private offWidth:number = 0

  private mounted() {
      this.offWidth = document.body.offsetWidth
  }

  private touchStart(e: any) {
    this.showStatus = true
  }

  private touchMove(e: any) {
    this.clientX = e.changedTouches[0].clientX
  }

  private touchEnd(e: any) {
    this.showStatus = false
    this.clientX = ''
  }
}
</script>
<style lang="less" scoped>
.touch {
  position: fixed;
  
  right: 0;
  left: 0;
  height: 12px;
  bottom: 25px;
  display: flex;
  span {
    border-bottom: 1px solid #233;
    border-left: 1px solid #233;
    border-right: 1px solid #233;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    flex: 1;
    margin: 0 50px;
    &:before {
      content: 'Today';
      display: block;
      transform: translateX(-40px);
      font-size: 12px;
    }
    &:after {
      content: 'Ago';
      display: block;
      font-size: 12px;
      transform: translateX(30px);
    }
  }
 
  .show-date {
    position: absolute;
    display: block;
    height: 100%;
    font-size: 16px;
    bottom: 60px;
    left: -60px;
  }
}
</style>
