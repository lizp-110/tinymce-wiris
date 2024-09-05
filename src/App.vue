<template>
  <div id="app">
    <h1>关于wiris节点销毁问题的demo</h1>
    <Button type="text" @click="dialogVisible = true">click open Dialog</Button>
    <p>1. 打开弹窗添加多个Editor</p>
    <p>2. 为每个Editor插入一个公式</p>
    <p>3. 关闭弹窗</p>
    <p>
      4. 可以看到
      挂载在Body上的id为"wrs_modal_dialogContainer[number]"的DIV并未移除,
      控制台可以看到Editor是正常销毁的
    </p>
    <input type="text" @blur="inputBlur" @change="inputChange" />
    <Button type="text" @click="btnClick">点击</Button>

    <Dialog
      title="dialog 演示"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <Button type="primary" @click="addNewEditor">click add new Editor</Button>
      <!-- 默认存在一个编辑器 -->
      <Editor v-model="text" />
      <!-- 可以新增很多个 -->
      <div class="box">
        <div v-for="item in data" :key="item.key">
          <Editor v-model="item.value" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <Button @click="handleClose">Cancel</Button>
        <Button type="primary" @click="handleClose">Sure</Button>
      </span>
    </Dialog>
  </div>
</template>
<script>
import Editor from "@/components/WirisEditor.vue";
import { Dialog, Button } from "element-ui";
export default {
  components: { Dialog, Editor, Button },
  data() {
    return {
      dialogVisible: false,
      text: "默认存在的一个编辑器",
      data: [],
    };
  },

  methods: {
    addNewEditor() {
      this.data.push({
        value: "一个新的 Editor",
        key: Date.now().toString(32),
      });
    },
    handleClose() {
      console.log("click out area :>> ");
      this.data = [];
      this.dialogVisible = false;
    },
    inputBlur() {
      console.log("inputBlur :>> ");
    },
    inputChange() {
      console.log("inputChange :>> ");
    },
    btnClick() {
      console.log("btnClick :>> ");
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  > div {
    width: 50%;
  }
}
</style>
