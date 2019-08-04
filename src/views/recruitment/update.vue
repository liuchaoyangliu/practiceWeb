<template>
  <el-dialog title="员工信息修改"
             :visible.sync="visible"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="handleClose" width="500px">
    <el-form :model="form" label-width="70px">

      <el-form-item label="工号：" >
        <el-input v-model="form.id" autocomplete="off" readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" >
        <el-input v-model="form.name" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="年龄：" >
        <el-input v-model="form.age" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="性别：" >
        <el-input v-model="form.sex" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="密码：" >
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址：" >
        <el-input v-model="form.address" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="电话：" >
        <el-input v-model="form.phone" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="职位：" >
        <el-input v-model="form.position" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="机构：" >
        <el-input v-model="form.institutionsName" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="薪酬：" >
        <el-input v-model="form.salary" autocomplete="off" ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取消</el-button>
      <el-button type="primary" @click.native="updateUser">提交</el-button>
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
          id: '',
          name: '',
          age: '1',
          sex: '',
          password: '',
          address: '',
          phone: '',
          position: '',
          institutions: '',
          institutionsName: '',
          salary: '',
          flag: ''
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
          id: _this.id,
        };
        await API.getUser(params).then(function (data) {
          _this.form.id = data.id;
          _this.form.name = data.name;
          _this.form.age = data.age;
          _this.form.sex = data.sex;
          _this.form.password = data.password;
          _this.form.address = data.address;
          _this.form.phone = data.phone;
          _this.form.position = data.position;
          _this.form.institutions = data.institutions;
          _this.form.salary = data.salary;
          _this.form.flag = data.flag;
        });
        let params2 = {
          id: _this.form.institutions
        };
        API.getInstitutions(params2).then(function (data) {
          _this.form.institutionsName = data.name

        })
      },

      handleClose() {
        this.$emit('update:visible', false);
        this.initData();
      },
      async updateInstitutions(){
        console.log(this.form);

        let params = {
          id: this.form.id,
          name: this.form.name,
          age: this.form.age,
          sex: this.form.sex,
          password: this.form.password,
          address: this.form.address,
          phone: this.form.phone,
          position: this.form.position,
          institutions: this.form.institutions,
          salary: this.form.salary,
          flag: this.form.flag
        };
        await API.updateInstitutions(params);
        this.$Message.success("修改成功");
        await this.initData();
      }
    }
  }
</script>

