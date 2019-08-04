<template>
  <el-dialog title="任务添加"
             :visible.sync="visible"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="handleClose">
    <h1>{{demo}}</h1>
    <h1>{{visible}}</h1>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取消</el-button>
      <el-button type="primary" @click.native="editFormSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      demo: ''

    },
    data() {
      return {
      }
    },
    methods: {
      editFormSubmit() {
        this.$message.success("保存提示");
      },
      // 关闭
      handleClose() {
        this.$emit('update:visible', false);
      }
    }
  }
</script>
