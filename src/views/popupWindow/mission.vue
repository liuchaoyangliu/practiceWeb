<template>
  <div >
    <el-row>

      <el-col :span="24" class="toolbar">
        <el-button @click="showAddDialog">新增</el-button>
      </el-col>

      <el-col :span="24" class="toolbar">
        <el-button @click="showLookDialog">查看</el-button>
      </el-col>

    </el-row>

    <mission-add ref="addMission"
                 v-if="addVisible"
                 :visible.sync="addVisible"
                 :demo.sync="demo">

    </mission-add>

    <look ref="look"
          v-if="lookVisible"
          :visible.sync="lookVisible"
          :demo.sync="demo">

    </look>

  </div>
</template>
<script>
  import MissionAdd from './add'
  import Look from './look'
  export default {
    name: 'mission',
    data: function(){
      return {
        addVisible: false, // 添加弹窗flag
        lookVisible: false,
        demo: "刘朝阳"
      };
    },
    components: {
      'mission-add': MissionAdd,
      'look': Look,
    },
    methods: {
      // 添加弹窗
      showAddDialog(){
        this.addVisible = true;
      },

      showLookDialog(){
        this.lookVisible = true;
      },

    }
  }
</script>
