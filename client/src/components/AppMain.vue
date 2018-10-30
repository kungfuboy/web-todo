<template>
    <section class="main">
        <div class="add">
            <input type="text" v-model="value" placeholder="添加新的事项..." @focus="hanldeFocus" />
            <span class="btn" type="button" @click="addFun(value)">Add</span>
        </div>
        <ul>
            <li v-for="(item, index) in list" :key="index" :class="{done: !item.status, handle: item.handle}">
                <i class="check" @click.stop="switchStatus(item, index)"></i>
                <span @touchstart="swipeStart" @touchend="swipeEnd($event, index)">{{ item.msg }}</span>
                <i class="edit" @click.stop="handleEdit(index)"></i>
                <i class="delete" @click.stop="handleDelete(index)"></i>
            </li>
        </ul>
        <input-modal v-if="editValue.text" :text="editValue.text" @saveEvent="handleUpdate"></input-modal>
    </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InputModal from '@/components/InputModal.vue'

@Component({
    components: {
        InputModal
    }
})
export default class AppMain extends Vue {
    private value: string = ''
  private touchStartX: number = 0
  private editValue: any = {
    index: 0,
    text: ''
  }
  private modalStatus = false
  private list: any = []
    // {
    //   status: true,
    //   handle: false,
    //   msg: '进击的巨人'
    // }
  private switchStatus(data: any, i: number) {
    data.status = !data.status
    this.list.splice(i, 1)
    if (data.status) {
      // 移动到最前面
      this.list.unshift(data)
    } else {
      // 移动到最后面
      this.list.push(data)
    }
  }
  private addFun(data: any) {
    this.list.unshift({ status: true, handle: false, msg: data })
    this.value = ''
  }
  private swipeStart(e: any) {
    this.touchStartX = e.changedTouches[0].clientX
  }
  private swipeEnd(e: any, i: number) {
    const start = this.touchStartX
    const end = e.changedTouches[0].clientX
    if (start - end > 30) {
      // 向左滑动, 切换状态
      this.list[i].handle = true
    } else {
      // 向右滑动, 恢复状态
      this.list[i].handle = false
    }
    this.touchStartX = 0
  }
  private hanldeFocus() {
    // 获取输入焦点
    this.list.forEach((item: any) => {
      item.handle = false
    })
  }
  private handleDelete(i: number) {
    // 删除操作
    this.list.splice(i, 1)
  }
  private handleEdit(i: number) {
    // 编辑操作
    const data = this.list[i]
    this.editValue = {
      index: i,
      text: data.msg
    }
    this.modalStatus = true
  }
  private handleUpdate(data: any) {
    // 更新视图
    const i = this.editValue.index
    this.list[i].msg = data
    this.list[i].handle = false
    this.editValue = {
      index: 0,
      text: ''
    }
    this.modalStatus = false
  }
}
</script>
<style lang="less">
.main {
    .add {
        display: flex;
        padding: 0 15px;
        margin-bottom: 20px;
        height: 30px;
        input {
            height: 100%;
            flex: 1;
            margin-right: 10px;
            border: none;
            border-bottom: 1px solid green;
            padding: 0 5px;
            &[placeholder] {
            font-size: 14px;
            font-style: oblique;
            }
        }
        .btn {
            height: 100%;
            flex-shrink: 0;
            width: 50px;
            border-radius: 2px;
            background: green;
            font-size: 14px;
            color: #fff;
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
    }
    ul,
  li {
    padding: 0;
    margin: 0;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 16px;
    margin: 10px 0;
    span {
      min-height: 30px;
      line-height: 30px;
      width: 100%;
      color: #233;
      transform: translateX(0);
      transition: 0.4s ease all;
      border-bottom: 1px solid #e4e4e4;
    }
    i.check {
      border: 1px solid #233;
      display: inline-flex;
      align-self: flex-start;
      margin-top: 7px;
      width: 15px;
      height: 15px;
      margin-right: 8px;
      opacity: 1;
      flex-shrink: 0;
    }
    &.done {
      position: relative;
      span {
        color: #bdc0ba;
        text-decoration: line-through;
        text-decoration-color: #888;
        border: none;
      }
      i.check {
        background-image: url('../assets/icon/done.svg');
        background-position: center center;
        background-size: 100%;
        background-repeat: none;
        border-color: #bdc0ba;
      }
    }
    &.handle {
      span {
        transition: 0.4s ease all;
        transform: translateX(-80px);
      }
      .check {
        opacity: 0;
      }
      i {
        display: inline-block;
        width: 35px;
        height: 30px;
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        position: absolute;
        &.delete {
          right: 10px;
          background-image: url('../assets/icon/delete.svg');
        }
        &.edit {
          right: 60px;
          background-image: url('../assets/icon/edit.svg');
        }
      }
    }
  }
}
</style>
