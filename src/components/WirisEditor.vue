<template>
  <div>
    <div class="editor-tinymce-box-new">
      <div>
        <div :id="editID"></div>
      </div>
    </div>
  </div>
</template>

<script>
import tinymce from "/public/static/tinymce5/tinymce";

export default {
  props: {
    editID: {
      type: String,
      default: () => {
        return (
          "vue-tinymce-" +
          +Date.now() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    value: {
      type: String,
      default: "",
    },
    showImage: {
      type: Boolean,
      default: true,
    },
    // 组件挂载时自动初始化编辑器
    initOnMounted: {
      type: Boolean,
      default: true,
    },
    // 失去焦点隐藏编辑器
    hiddenEditorOnBlur: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isInit: false,
      // 图片上传最大,单位M
      fileUploadMaxSize: 5,
      loading: null,
      // 是否失去焦点
      isBlur: true,
      latexMap: [],
      toolbar:
        "tiny_mce_wiris_formulaEditor | tiny_mce_wiris_formulaEditorChemistry",
    };
  },
  computed: {},
  created() {},
  mounted() {
    if (this.initOnMounted) {
      this.initEdit();
    }
  },
  beforeDestroy() {
    console.log("beforeDestroy :>> ");
    // this.destroy();
    tinymce.remove();
  },

  methods: {
    initEdit() {
      if (this.showImage) this.toolbar = "image | " + this.toolbar;
      // 初始化时获取latex公式 如果编辑器有内容
      this._initEdit();
    },
    _initEdit() {
      let that = this;
      tinymce.init({
        mathTypeParameters: {
          serviceProviderProperties: {
            URI: "/dev-api/integrations/tinymce/tinymce6/plugins/tiny_mce_wiris/integration",
            server: "php",
          },
        },
        selector: `#${that.editID}`,
        auto_focus: true,
        hidden_input: false,
        draggable_modal: true,
        toolbar: that.toolbar,
        language: "zh-Hans",
        menubar: "",
        plugins: [that.showImage && "image", "tiny_mce_wiris"],
        min_height: 200,
        images_upload_handler: (blobInfo, success, failure) => {
          var formData = new FormData();
          var file = blobInfo.blob();
          if (file.size > this.fileUploadMaxSize * 1024 * 1024) {
            failure("文件大小不能超过" + this.fileUploadMaxSize + "M");
            return;
          }
          let temp = [];
          temp = blobInfo.filename().split(".");

          formData.append(
            "file",
            file,
            `${Date.now()}.${temp[temp.length - 1]}`
          );
          this.fileUpload(formData).then(
            (response) => {
              success(response.data.url);
            },
            (err) => {
              failure(err);
            }
          );
        },
        urlconverter_callback: (url, node) => {
          if (node == "img" && url.startsWith("blob")) {
            tinymce.activeEditor && tinymce.activeEditor.uploadImages();
          }
          return url;
        },
        //监听初始化完成事件
        setup: (editor) => {
          editor.on("ExecCommand", (e) => {
            if (e.command === "updateFormula") {
              const id = Date.now().toString(32);
              editor.insertContent(`<span id="${id}"></span>`);
              // mathML
            }
          });
          editor.on("init", () => {
            console.log("init :>> 1");

            editor.setContent(this.value);
          });
          editor.on("remove", (e) => {
            console.log("remove :>> ", e);

            editor.setContent(this.value);
          });
        },
        //监听input和change事件， 实时更新value
        init_instance_callback: (editor) => {
          editor.on("blur", (e) => {
            e.preventDefault();
            console.log("blur :>> 2", e);
          });
          // 输入事件
          editor.on("input", (e) => {
            console.log("input :>> ", e);
          });
          // change事件
          editor.on("change", (e) => {
            console.log("change :>> ", e);
          });
        },
      });
    },

    fileUpload() {},

    destroy() {
      // 手动销毁插件
      tinymce.remove();
    },

    empty() {
      if (this.isInit) {
        tinymce.editors[this.editID].setContent("");
      }
      this.$emit("input", "");
      this.$emit("change", "");
    },
    // 父组件调用的时候
    setContent(content) {
      if (this.isInit) {
        tinymce.editors[this.editID].setContent(content);
        // 处理latex公式
      } else {
        // 如果需要补充逻辑(父组件有做处理)
      }
    },
  },
  components: {},
};
</script>

<style lang="less">
.tox.tox-silver-sink.tox-tinymce-aux {
  z-index: 9999;
}
.tox-statusbar {
  // display: none !important;
}
.editor-tinymce-box-new {
  position: relative;
  .editot_html_box {
    min-height: 200px;
    padding: 5px 15px;
    border: 1px solid #e1e1ef;
    border-radius: 6px;
    font-size: 16px;
    br {
      display: block;
    }
  }
  .tox-tinymce {
    // padding-bottom: 60px;
    border-radius: 6px;
  }

  .editor-tinymce-edit {
    display: block;
    background: #fcfdff;
    border-radius: 6px;
    border: 1px solid #e1e1ef;
    font-size: 16px;
    line-height: 22px;
    color: #2f2e4c;
    padding: 20px;
    min-height: 200px;
    overflow-y: auto;
    img {
      max-width: 100%;
      height: auto;
      display: inline-block;
    }
  }

  button {
    position: absolute;
    bottom: 15px;
    width: 65px;
    height: 30px;
    line-height: 27px;
    background: #ffffff;
    border-radius: 50px;
    border: 1px solid #3d4cd0;
    font-size: 14px;
    font-weight: 500;
    color: #3d4cd0;
    right: 20px;
    box-sizing: border-box;
    cursor: pointer;
    &.save {
      background: #3d4cd0;
      color: #fff;
      right: 15px;
    }
    &.disabled {
      border-color: #ccc;
      background: #ccc;
    }
  }
}
</style>
