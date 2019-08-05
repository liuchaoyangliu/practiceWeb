<template>

  <div style="margin-top: 10px" v-loading="fullloading">

    <el-button type="primary" @click="refresh">刷新</el-button>
    <div style="display: flex;justify-content: space-around;flex-wrap: wrap;text-align: left">

      <el-card style="width: 280px; margin-bottom: 20px" v-for="(item,index) in tableData" :key="item.id">
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
            <div><span class="user-info">机构:{{item.name}}</span></div>
            <div><span class="user-info">描述:{{item.describe}}</span></div>
            <div>
              <el-button type="primary" plain size="mini" @click="employed(item.id)">查看人员</el-button>
              <el-button type="primary" plain size="mini" @click="editor(item.id)">修改信息</el-button></div>
          </div>
        </div>
      </el-card>

    <el-col :span="24" class="toolbar">
      <el-button type="primary" plain @click="addInstitutions">增加机构</el-button>
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


  <template>
    <update ref="update"
            v-if="updateVisible"
            :visible.sync="updateVisible"
            :id.sync="id">
    </update>

    <detail ref="detail"
            v-if="detailVisible"
            :visible.sync="detailVisible"
            :id.sync="id">

    </detail>

    <add ref="add"
         v-if="addVisible"
         :visible.sync="addVisible"
         :id.sync="id">

    </add>
  </template>
  </div>
</template>

<script>
  import Update from './update'
  import Add from './add'
  import Detail from './detail'
  import API from '../../api/api_user'
  export default{
    components: {Add, Detail, Update},
    data(){
      return {
        id: '',
        updateVisible: false,
        addVisible: false,
        detailVisible: false,

        fullloading: false,
        tableData: [],

        total: 100,
        currentPage: 1,
        pageSize: 9,
      }
    },
    comments: {
      'update': Update,
      'add': Add,
      'detail': Detail
    },
    mounted: function () {
      this.initData();

    },
    methods: {
      async employed(data){
        console.log(data);
        this.id = data;
        this.detailVisible = true;

      },

      addInstitutions(){
        this.addVisible = true;
      },

      initData(){
        let _this = this;
        let params = {
          page: this.currentPage,
          pageSize: this.pageSize,
        };
        API.getInstitutionsList(params).then(function (data) {
          _this.tableData = data.records;
          _this.total = data.total;
          _this.currentPage = data.current;

        });
      },
      async deleteHr(data){
        let params = {
          id: data,
        };
        await API.removeInstitutions(params);
        console.log(data);
        this.initData();

      },
      editor(data){
        this.id = data;
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
      },

    }
  }
</script>
<style>
  .user-info {
    font-size: 12px;
    color: #09c0f6;
  }
</style>

