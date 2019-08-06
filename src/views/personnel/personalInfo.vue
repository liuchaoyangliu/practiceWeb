<template>

  <div class="warp-main" >
    <h2>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp个人信息展示</h2>
    <h2>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</h2>

  <div>

    <el-row v-loading="loading" element-loading-text="拼命加载中">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="工号" label-width="110px">
        <el-input v-model="form.workNumber" size="medium" style="width: 600px" readonly></el-input>
      </el-form-item>

      <el-form-item label="姓名" label-width="110px">
        <el-input v-model="form.name" size="medium" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="性别" label-width="110px">
        <el-input v-model="form.sex" size="medium" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="年龄" label-width="110px">
        <el-input v-model="form.age" size="medium" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="住址" label-width="110px">
        <el-input v-model="form.address" size="medium" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="电话" label-width="110px">
        <el-input v-model="form.phone" size="medium" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="密码" label-width="110px">
        <el-input v-model="form.password" size="medium" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="职位" label-width="110px">
        <el-input v-model="form.position" size="medium" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="薪酬" label-width="110px">
        <el-input v-model="form.salary" size="medium" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="机构" label-width="110px">
        <el-input v-model="form.institutionsName" size="medium" style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定修改</el-button>
        <el-button type="warning" @click="cancel">取消修改</el-button>
      </el-form-item>

    </el-form>

    </el-row>
  </div>
  </div>
</template>

<script>


  import API from '../../api/api_user'

  export default {
    data() {
      return {
        loading: false,
        form: {
          address: '',
          age: '',
          flag: '',
          institutions: '',
          name: '',
          password: '',
          phone: '',
          position: '',
          salary: '',
          sex: '',
          workNumber: '',
          institutionsName: ''
        }
      }
    },
    created () {
      this.initData()
    },
    methods: {

      async initData(){
        this.loading = true;
        let _this = this;
        await API.getCurrentUser().then(function (data) {
          _this.form.address = data.address;
          _this.form.age = data.age;
          _this.form.institutions = data.institutions;
          _this.form.name = data.name;
          _this.form.password = data.password;
          _this.form.phone = data.phone;
          _this.form.position = data.position;
          _this.form.salary = data.salary;
          _this.form.sex = data.sex;
          _this.form.workNumber = data.workNumber;

        });
        this.getInstitutions();

        this.loading = false;
      },

      async onSubmit() {
        this.loading = true;
        let params = {
          address: this.form.address,
          age: this.form.age,
          institutions: this.form.institutions,
          name: this.form.name,
          password: this.form.password,
          phone: this.form.phone,
          position: this.form.position,
          salary: this.form.salary,
          sex: this.form.sex,
          workNumber: this.form.workNumber
        };

        await API.updateUser(params);
        this.initData();
        this.$message.success('修改成功');
        this.loading = false;
      },
      cancel(){
        this.initData();
      },
      getInstitutions(){
        let _this = this;
        let params = {
          id: this.form.institutions
        };
        API.getInstitutions(params).then(function (data) {
          _this.form.institutionsName = data.name;

        });
      },
    }
  }
</script>
