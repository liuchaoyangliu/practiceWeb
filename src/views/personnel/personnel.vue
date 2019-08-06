<template>
  <div class="warp-main" >

    <el-row v-loading="loading" element-loading-text="拼命加载中">

      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.keyword" placeholder="请输入关键字搜索" auto-complete="off" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <template>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection(multipleSelection)">确定删除</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="workNumber"
            label="工号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="position"
            label="职位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="editor(scope.row.workNumber)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteUser(scope.row.workNumber)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-col :span="24" class="toolbar">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <update ref="update"
            v-if="updateVisible"
            :visible.sync="updateVisible"
            :workNumber.sync="workNumber">
    </update>

  </div>

</template>
<style>

</style>
<script>
  import API from '../../api/api_user'
  import Update from './update'
  export default {
    name: 'plan',
    data (){
      return {
        id: '',
        loading: false,
        search: '',
        filters: {
          keyword: ''
        },
        total: 100,
        currentPage: 1,
        pageSize: 10,

        tableData: [],
        multipleSelection: [],
        updateVisible: false,
      }
    },
    components: {
      'update': Update,
    },
    created () {
      this.getData()
    },
    methods: {

      showUpdateDialog(){
        this.updateVisible = true;
      },

      async toggleSelection(rows) {

        if (rows) {
          console.log(rows);
          await API.deleteListUser(rows);
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
          this.getData();
        } else {
          this.$refs.multipleTable.clearSelection();
        };
        this.getData();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      getDataOrSearch(){

        if(this.filters.keyword == null || this.filters.keyword == ''){
          this.getData();
        }else {
          this.loading = true;
          console.log(this.filters.keyword);
          let params = {
            page: this.currentPage,
            pageSize: this.pageSize,
            search: this.filters.keyword
          };
          console.log(params);
          let _this = this;
          API.searchList(params).then(function (data) {
            _this.tableData = data.records;
            _this.total = data.total;
            _this.currentPage = data.current;
          });
          this.loading = false
        }

      },

      async getData () {

        let params = {
          page: this.currentPage,
          pageSize: this.pageSize,
        };

        let _this = this;
        this.loading = true;
        API.getList(params).then(function (data) {
          _this.tableData = data.records;
          _this.total = data.total;
          _this.currentPage = data.current;
        });
        this.loading = false
      },

      editor(data){
        this.workNumber = data;
        this.showUpdateDialog();
        console.log(data);

      },

      async deleteUser(data){
        let params = {
          deleteUser: data,
        };
        console.log(data);
        await API.deleteUser(params);
        this.$Message.success("删除成功");
        await this.getDataOrSearch()
      },

      handleSizeChange(val) {

        this.pageSize = val;
        this.currentPage = 1;
        this.getDataOrSearch();
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.getDataOrSearch();
      },

      handleSearch() {

        this.loading = true;
        console.log(this.filters.keyword);
        let params = {
          page: 1,
          pageSize: 10,
          search: this.filters.keyword
        };
        console.log(params);
        let _this = this;
        API.searchList(params).then(function (data) {
          _this.tableData = data.records;
          _this.total = data.total;
          _this.currentPage = data.current;
        });
        this.loading = false

      },

    }
  }
</script>
