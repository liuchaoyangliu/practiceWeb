<template>
  <el-dialog title="查看机构员工"
             :visible.sync="visible"
             :before-close="handleClose" width="800px">

<div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

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
      </el-table>



    <el-col  class="toolbar">
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


    <h1>---------------------------------------------------------------------------------</h1>
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
        total: 100,
        currentPage: 1,
        pageSize: 7,

        tableData: [],
        updateVisible: false,
      }
    },
    created(){
      this.initData();
    },
    methods: {

      async initData(){
        let params = {
          page: this.currentPage,
          pageSize: this.pageSize,
        };
        let _this = this;
        API.getList(params).then(function (data) {
          _this.tableData = data.records;
          _this.total = data.total;
          _this.currentPage = data.current;
        });
      },

      handleSizeChange(val) {

        this.pageSize = val;
        this.currentPage = 1;
      },

      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleClose() {
        this.$emit('update:visible', false);
      }

    }
  }
</script>


