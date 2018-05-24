<template>
  <el-container class="footer">
    <span class="logo"></span><span>Copyright @ 1998-2016 DAICY. All rights reserved</span><span>RVCP 丨HPC Version 2016 Release 5.0 2017/10/28</span>
  </el-container>
</template>
<script>
  export default {
    data () {
      return {
        navarry:[{name:'nav1_1',con:'云平台监控'},{name:'nav2_1',con:'仿真设计'},{name:'nav3_1',con:'高性能计算'},{name:'nav4_1',con:'仿真数据'},{name:'nav5_1',con:'统计分析'},{name:'nav6_1',con:'许可管理'},{name:'nav7_1',con:'系统设置'},{name:'nav8_1',con:'应用商店'}],
        username:"rvcpadmin",
        dialogSetting:false,
        settingform:{
          localhost:"http://localhost:8080/"
        },
      }
    },
    created:function () {
    },
    computed:{
    },
    methods:{
    }
  }
</script>

<style scoped>
  .footer{
    height:50px;
    background-color: #f6f6f6;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #888888;
    font-size: 12px;
    padding:5px 0;
  }
  .footer span{
    margin:0 10px;
  }
  .logo{
    display: inline-block;
    width: 80px;
    height:40px;
    background: url("../../../static/img/logo2.png") no-repeat;
    background-size: contain;
  }
</style>
