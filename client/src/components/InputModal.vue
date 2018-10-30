<template>
    <section class="modal">
        <div class="cnt">
            <textarea ref="input" type="text" v-model="value"></textarea>
            <div class="btn">
                <span class="cancel" @click="saveData(text)">取消</span>
                <span class="confirm" @click="saveData(value)">确认</span>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class InputModal extends Vue {
  @Prop(String) public text!: string

  private value = ''

  private mounted() {
    this.value = this.text
    console.log(this.$refs.input)
  }
  private saveData(data: any) {
    this.$emit('saveEvent', data)
  }
}
</script>
<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  z-index: 20;
  .cnt {
    background: #fff;
    width: 80%;
    margin-top: 60px;
    height: 200px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    textarea {
      flex: 1;
      overflow: auto;
      font-size: 14px;
      display: block;
      padding: 15px;
      box-sizing: border-box;
      margin: 0;
      width: 100%;
    }
    .btn {
      display: flex;
      height: 40px;
      flex-shrink: 0;
      span {
        width: 50%;
        background: rgba(0, 0, 0, 0);
        font-size: 16px;
        border: none;
        box-shadow: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        &.cancel {
          color: #888;
        }
        &.confirm {
          color: #233;
        }
      }
    }
  }
}
</style>


