<template>
  <el-dialog title="机构信息修改"
             :visible.sync="visible"
             :before-close="handleClose"
             width="500px">
    <el-form :model="form" label-width="70px">

      <el-form-item label="机构：" >
        <el-input v-model="form.name" autocomplete="off" ></el-input>
      </el-form-item>

      <el-form-item label="描述：" >
        <el-input v-model="form.describe" autocomplete="off" ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取消</el-button>
      <el-button type="primary" @click.native="updateInstitutions">提交</el-button>
    </div>

  </el-dialog>
</template>
<script>
  import API from '../../api/api_user'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      id: ''
    },
    data() {
      return {
        form: {
          name: '',
          describe: '',
        },
      }
    },
    created(){
      this.initData();
    },
    methods: {

      async initData(){
        let _this = this;
        let params = {
          id:this.id
        };
        await API.getInstitutions(params).then(function (data) {
          _this.form.name = data.name;
          _this.form.describe = data.describe;
        });
      },

      handleClose() {
        this.$emit('update:visible', false);
        this.initData();
      },
      async updateInstitutions(){
        console.log(this.form);

        let params = {
          id: this.id,
          name: this.form.name,
          describe: this.form.describe,
        };
        await API.updateInstitutions(params);
        this.$Message.success("修改成功");
        await this.initData();
      },
      handleClose() {
        this.$emit('update:visible', false);
      }
    }
  }
</script>

