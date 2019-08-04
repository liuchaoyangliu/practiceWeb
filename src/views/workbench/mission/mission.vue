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
            prop="id"
            label="id"
            width="120">
          </el-table-column>
          <el-table-column
            prop="workNumber"
            label="操作者工号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="operation"
            label="动作"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="创建时间"
            show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteLog(scope.row.id)">删除</el-button>
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

  </div>

</template>
<style>

</style>
<script>
  import API from '../../../api/api_user'
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

    created () {
      this.getData()
    },
    methods: {

      showUpdateDialog(){
        this.updateVisible = true;
      },

      toggleSelection(rows) {

        console.log(rows);
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      getdataOrSearch(){
        this.loading = true;

        if(this.filters.keyword == null || this.filters.keyword == ''){
          this.getData();
        }else{
          console.log(this.filters.keyword);
          let params = {
            page: 1,
            pageSize: 10,
            search: this.filters.keyword
          };
          console.log(params);
          let _this = this;

          API.searchLogList(params).then(function (data) {
            _this.tableData = data.records;
            _this.total = data.total;
            _this.currentPage = data.current;
          });
        }
        this.loading = false
      },


      async getData () {

        let params = {
          page: this.currentPage,
          pageSize: this.pageSize,
        };

        let _this = this;
        this.loading = true;
        API.getLogList(params).then(function (data) {
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
      deleteLog(data){
        let params = {
          id: data,
        };
        console.log(data);
        API.deleteLog(params);
        this.$Message.success("删除成功");
        this.getdataOrSearch();
      },
      handleSizeChange(val) {

        this.pageSize = val;
        this.currentPage = 1;
        this.getdataOrSearch();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getdataOrSearch();
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

        API.searchLogList(params).then(function (data) {
          _this.tableData = data.records;
          _this.total = data.total;
          _this.currentPage = data.current;
        });
        this.loading = false

      },

    }
  }
</script>
