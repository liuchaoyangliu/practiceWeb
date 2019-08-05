<template>
  <div >
<!--    <el-row>-->

<!--      <el-col :span="24" class="toolbar">-->
<!--        <el-button @click="showAddDialog">新增</el-button>-->
<!--      </el-col>-->

<!--      <el-col :span="24" class="toolbar">-->
<!--        <el-button @click="showLookDialog">查看</el-button>-->
<!--      </el-col>-->

<!--    </el-row>-->

<!--    <mission-add ref="addMission"-->
<!--                 v-if="addVisible"-->
<!--                 :visible.sync="addVisible"-->
<!--                 :demo.sync="demo">-->

<!--    </mission-add>-->

<!--    <look ref="look"-->
<!--          v-if="lookVisible"-->
<!--          :visible.sync="lookVisible"-->
<!--          :demo.sync="demo">-->

<!--    </look>-->



    <div>

      <el-dropdown class="dropdown el-dropdown-link">
    <span>
        <i class="iconfont icon-size-and-color">选择部门</i>
    </span>
        <el-dropdown-menu slot="dropdown" v-if="true">
          <template v-for="item in data">
            <el-dropdown-item @click.native="showData(item.name)">{{ item.name }}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-dropdown>
        <el-button type="primary">
          更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" v-if="true">
          <template v-for="item in data">
            <el-dropdown-item @click.native="showData(item.name)">黄金糕</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

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
        data: [
          {name: 'qqq'},
          {name: 'www'},
          {name: 'eee'},
          {name: 'rrr'},
        ]

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
      showData(data){
        console.log(data);
      }

    }
  }
</script>
