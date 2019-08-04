<template>
  <div style="margin-top: 10px" v-loading="fullloading">

    <el-button type="primary" @click="refresh">刷新</el-button>

    <div style="display: flex;justify-content: space-around;flex-wrap: wrap;text-align: left">
      <el-card style="width: 350px;margin-bottom: 20px" v-for="(item,index) in tableData" :key="item.id">
        <div slot="header" class="clearfix">
          <span>{{item.name}}</span>
          <el-button type="text"
                     style="color: #f6061b;margin: 0px;float: right; padding: 3px 0;width: 15px;height:15px"
                     icon="el-icon-delete" @click="deleteHr(item.id)"></el-button>
        </div>
        <div>
          <div style="width: 100%;display: flex;justify-content: center">
            <img src="../../assets/timg.jpg" alt="item.name" style="width: 70px;height: 70px;border-radius: 70px">
          </div>
          <div style="margin-top: 20px">
            <div><span class="user-info">工号:{{item.id}}</span></div>
            <div><span class="user-info">姓名:{{item.name}}</span></div>
            <div><span class="user-info">性别:{{item.sex}}</span></div>
            <div><span class="user-info">年龄:{{item.age}}</span></div>
            <div><span class="user-info">手机:{{item.phone}}</span></div>
            <div><span class="user-info">住址:{{item.address}}</span></div>
            <div><span class="user-info">职位:{{item.position}}</span></div>
            <div><span class="user-info">薪酬:{{item.salary}}</span></div>
            <div>
              <el-button type="primary" plain size="mini" @click="employed(item.id)">录用</el-button>
              <el-button type="primary" plain size="mini" @click="editor(item.id)">修改信息</el-button></div>
          </div>
        </div>
      </el-card>

      <el-col :span="24" class="toolbar">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[6, 9, 18, 42]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>

    </div>

    <update ref="update"
            v-if="updateVisible"
            :visible.sync="updateVisible"
            :workNumber.sync="workNumber">

    </update>

  </div>

</template>
<script>
  import Update from './update'
  import API from '../../api/api_user'
  export default{
    components: {Update},
    data(){
      return {
        id: '',
        updateVisible: false,
        fullloading: false,
        tableData: [],

        total: 100,
        currentPage: 1,
        pageSize: 9,
      }
    },
    comments: {
      'update': Update,
    },
    mounted: function () {
      this.initData();

    },
    methods: {
      async employed(data){
        console.log(data);
        let params = {
          id: data,
        };
        await API.acceptedUser(params);

        this.initData();
      },
      initData(){
        let _this = this;
        let params = {
          page: this.currentPage,
          pageSize: this.pageSize,
        };
        API.getNotAcceptedList(params).then(function (data) {
          _this.tableData = data.records;
          _this.total = data.total;
          _this.currentPage = data.current;

        });
      },
      async deleteHr(data){
        let params = {
          SignIn: data,
        };
        await API.SignIn(params);
        console.log(data);
        this.initData();
      },
      editor(data){
        this.workNumber = data;
        this.updateVisible = true;
        console.log(data);

      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.initData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.initData();
      },
      refresh(){
        this.initData()
      }
    }
  }
</script>
<style>
  .user-info {
    font-size: 12px;
    color: #09c0f6;
  }
</style>

