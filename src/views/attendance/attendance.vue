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
            label="编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="workNumber"
            label="工号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="note"
            label="备注">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="updateStatus(scope.row.id, '未到')">未到</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="updateStatus(scope.row.id, '以到')">以到</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="updateStatus(scope.row.id, '签到')">签到</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="updateStatus(scope.row.id, '请假')">请假</el-button>
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

<script>
  import API from '../../api/api_user'
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

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      getDataOrSearch(){

        // if(this.filters.keyword == null || this.filters.keyword == ''){
        //   this.getData();
        // }else {
        //   this.loading = true;
        //   console.log(this.filters.keyword);
        //   let params = {
        //     page: this.currentPage,
        //     pageSize: this.pageSize,
        //     search: this.filters.keyword
        //   };
        //   console.log(params);
        //   let _this = this;
        //   API.searchList(params).then(function (data) {
        //     _this.tableData = data.records;
        //     _this.total = data.total;
        //     _this.currentPage = data.current;
        //   });
        //   this.loading = false
        // }

      },

      async getData () {

        let params = {
          page: this.currentPage,
          pageSize: this.pageSize,
        };

        let _this = this;
        this.loading = true;
        API.getAttendanceList(params).then(function (data) {
          _this.tableData = data.records;
          console.log(_this.tableData);
          _this.total = data.total;
          _this.currentPage = data.current;
        });
        this.loading = false
      },


      updateStatus(data, status){
        console.log(data + ' ' + status);
        let params = {
          id: data,
          status: status,
        };
        API.updateAttendance(params);
        this.$Message.success("更改成功");
        this.getDataOrSearch()
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

<style>
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
