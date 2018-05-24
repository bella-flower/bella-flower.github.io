<template>
  <el-container class="main nav1_5">
    <div class="content">
      <div class="header">
        <div>{{$t('nav1_5.title')}}</div>
        <div>
          <el-button icon="el-icon-circle-check-outline" plain @click="activationNode" size="small">{{$t('nav1_3.buttonGroup.activationBtn')}}</el-button>
          <el-button icon="el-icon-circle-close-outline" plain @click="closeNode" size="small">{{$t('nav1_3.buttonGroup.closeBtn')}}</el-button>
          <el-button icon="el-icon-refresh"  plain @click="refreshTable" size="small">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <el-table v-loading="tableloading" :row-style="rowClass" highlight-current-row  @sort-change="qwe()" @row-click="tableRowClick" @current-change="checkRow"  :border=true  @row-dblclick="rowClick" :data="queueListTable"  height="calc()"  style="text-align: left"  >
          <el-table-column prop="queueName" :label="$t('nav1_5.listview.queueListTable.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="maxCore" :label="$t('nav1_5.listview.queueListTable.cell_2')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="runCore" :label="$t('nav1_5.listview.queueListTable.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="PasueCore" :label="$t('nav1_5.listview.queueListTable.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
    </div>
    <div v-show="RowContent" class="content rowcontent">
      <div class="header">
        <div><span style="color: #2cc362;cursor: pointer;font-weight: 600" @click="RowContent=false">{{$t('nav1_5.title')}}</span> ><span>{{infoTables.pathName}}</span></div>
        <el-button icon="el-icon-refresh"  plain size="small">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
      </div>
      <div class="infoContent">
        <div class="basic-info">
          <div class="table_title">{{$t('nav1_5.table_title.basic')}}</div>
          <div class="top-table">
            <el-table v-loading="tableloading" :row-style="rowClass"  :border=true :data="infoTables.basic_table" height="calc()" style="text-align: left;width: 100%"  >
              <el-table-column prop="queue_name" :label="$t('nav1_5.infotables.basic_table.cell_1')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="max_core" :label="$t('nav1_5.infotables.basic_table.cell_2')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="job_core" :label="$t('nav1_5.infotables.basic_table.cell_3')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="pause_core" :label="$t('nav1_5.infotables.basic_table.cell_4')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="run_core" :label="$t('nav1_5.infotables.basic_table.cell_5')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="reserve_core" :label="$t('nav1_5.infotables.basic_table.cell_6')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="wait_core" :label="$t('nav1_5.infotables.basic_table.cell_7')" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="host-list">
          <div class="table_title">{{$t('nav1_5.table_title.hostList')}}</div>
          <div class="bottom-table">
            <el-table v-loading="tableloading"  :row-style="rowClass" :border=true :data="infoTables.host_list_table" height="calc()"  style="text-align: left"  >
              <el-table-column prop="hostName" :label="$t('nav1_5.infotables.host_table.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="hostState" :label="$t('nav1_5.infotables.host_table.cell_2')" :sortable="true" show-overflow-tooltip>
                <template slot-scope="scope">
                 <span :class="scope.row.hostState === 'state1' ? 'green' : ''||scope.row.hostState === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.hostState === 'state1'? $t('nav1_5.infotables.host_table.state1') : ''||scope.row.hostState === 'state2'? $t('nav1_5.infotables.host_table.state2') : ''}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="resources" :label="$t('nav1_5.infotables.host_table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="memory" :label="$t('nav1_5.infotables.host_table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="core" :label="$t('nav1_5.infotables.host_table.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="hostType" :label="$t('nav1_5.infotables.host_table.cell_6')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="cpuRate" :label="$t('nav1_5.infotables.host_table.cell_7')" :sortable="true" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.cpuRate"></el-progress>
                  </template>
              </el-table-column>
              <el-table-column prop="disk" :label="$t('nav1_5.infotables.host_table.cell_8')" :sortable="true" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <loadfooter style="width: 100%"></loadfooter>
  </el-container>
</template>
<script>
  import  router from '../router/index'
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      return {
        title:'RVCP-工业仿真平台',
        tableloading:false, //表格加载动画,
        queueListTable:[
          {
            queueName: 'abaqus',
            maxCore: '5',
            runCore: '0',
            PasueCore:'0',
          },
          {
            queueName: 'ansys',
            maxCore: '1',
            runCore: '0',
            PasueCore:'0',
          },
          {
            queueName: 'cfx',
            maxCore: '10',
            runCore: '0',
            PasueCore:'0',
          },
          {
            queueName: 'xflow',
            maxCore: '8',
            runCore: '0',
            PasueCore:'0',
          },
        ],
        RowContent:false,
        infoTables:{
           pathName:'',
            basic_table:[{
              queue_name:'ansys',
              max_core:'12',
              job_core:'0',
              pause_core:'0',
              run_core:'0',
              reserve_core:'0',
              wait_core:'0',
              }],
            host_list_table:[
              {
                hostName:'ansys',
                hostState:'state1',
                resources:'管理节点',
                memory:'20.22GB/55.52GB',
                core:'4/4',
                hostType:'Redhat6',
                cpuRate:50,
                disk:'2855KB/s',
              },
              {
                hostName:'xflow',
                hostState:'state2',
                resources:'计算节点',
                memory:'20.22GB/55.52GB',
                core:'0/22',
                hostType:'Redhat6',
                cpuRate:76,
                disk:'2855KB/s',
              }
          ],
          },
        activeTableName:'',/*列表模式单击选中值*/
        }
    },
    created: function () {
      document.title = this.title;
    },
    mounted(){
      $(".list-item .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 70px - 100px)', //可滚动区域高度
        size: '10px', //组件宽度
        color: '#000', //滚动条颜色
        position: 'right', //组件位置：left/right
        distance: '0px', //组件与侧边之间的距离
        start: 'top', //默认滚动位置：top/bottom
        opacity: .2, //滚动条透明度
        alwaysVisible: true, //是否 始终显示组件
        disableFadeOut: true, //是否 鼠标经过可滚动区域时显示组件，离开时隐藏组件
        railVisible: true, //是否 显示轨道
        railColor: '#333', //轨道颜色
        railOpacity: .1, //轨道透明度
        railDraggable: true, //是否 滚动条可拖动
        railClass: 'slimScrollRail', //轨道div类名
        barClass: 'slimScrollBar', //滚动条div类名
        wrapperClass: 'slimScrollDiv', //外包div类名
        allowPageScroll: true, //是否 使用滚轮到达顶端/底端时，滚动窗口
        wheelStep: 10, //滚轮滚动量
        touchScrollStep: 200, //滚动量当用户使用手势
        borderRadius: '10px', //滚动条圆角
        railBorderRadius: '10px' //轨道圆角
      })//列表滚动
      $(".bottom-table .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh  - 60px - 50px - 70px - 290px)', //可滚动区域高度
        size: '10px', //组件宽度
        color: '#000', //滚动条颜色
        position: 'right', //组件位置：left/right
        distance: '0px', //组件与侧边之间的距离
        start: 'top', //默认滚动位置：top/bottom
        opacity: .2, //滚动条透明度
        alwaysVisible: true, //是否 始终显示组件
        disableFadeOut: true, //是否 鼠标经过可滚动区域时显示组件，离开时隐藏组件
        railVisible: true, //是否 显示轨道
        railColor: '#333', //轨道颜色
        railOpacity: .1, //轨道透明度
        railDraggable: true, //是否 滚动条可拖动
        railClass: 'slimScrollRail', //轨道div类名
        barClass: 'slimScrollBar', //滚动条div类名
        wrapperClass: 'slimScrollDiv', //外包div类名
        allowPageScroll: true, //是否 使用滚轮到达顶端/底端时，滚动窗口
        wheelStep: 10, //滚轮滚动量
        touchScrollStep: 200, //滚动量当用户使用手势
        borderRadius: '10px', //滚动条圆角
        railBorderRadius: '10px' //轨道圆角
      });//列表滚动
    },//初始函数
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.getStatus(this.$route.path)
      }
    },
    methods: {
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/');
        return urlStrArr[urlStrArr.length - 1]
      },
      getPagedata:function () {
        var thisVue = this;
        thisVue.ajax({
          method: 'post',
 /*         url:thisVue.localhost,*/
          headers:{
           /* "Conten-Type":thisVue.localhost*/
          },
          data: {
          }
        })
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          });

      },//数据
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },
      qwe(){
        this.$refs.linuxTable.setCurrentRow();
      },
      checkRow:function(val){
        this.currentRow = val;
        // this.$refs.windowTable.setCurrentRow(val);
      },/*表格选中行*/
      tableRowClick:function(row){
        this.activeTableName=row.hostName;
      },/*表格点击*/
     rowClick(row){
        this.openRowContent(row.queueName);
        this.infoTables.pathName=row.queueName;
      },
     openRowContent(queueName){
        this.RowContent = true;
        //+ajax请求
      },
      activationNode(){
        if(this.activeTableName==''){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{

        }
      },/*激活节点*/
      closeNode(){
        if(this.activeTableName==''){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{

        }
      },/*关闭节点*/
      refreshTable(){

      },/*刷新*/
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    color: #3e3e3e;
    height:calc(100vh - 60px);
    width:100%;
    margin:0 auto;
    text-align: center;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .content{
    height:calc(100vh - 60px - 50px);
    text-align: left;width: 100%;
  }
  .rowcontent{
    position: absolute;
    z-index: 55!important;
    top: 0px;
    left: 0px;
  }
  .header{
    height:40px;
    margin:15px;
    background-color: #ffffff;
    border: #ffffff 1px solid;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:0 20px;
    font-size: 12px;
    font-weight: 600;
  }
  .green{
    color:#2cc362;
  }
  .red{
    color:#f96a6a;
  }
  .list-item{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    padding: 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
    position: absolute;
    top: 55px;
    left: 0;
    z-index: 50;
  }
  .infoContent{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
  }
  .basic-info{
    height:160px;
  }
  .host-list{
    height:calc(100vh  - 60px - 50px - 70px - 415px);
  }
  .basic-info,.host-list{
    width:calc(100% - 30px);
    /*border: 1px solid #d7d7d7;*/
    border-radius: 8px;
    margin: 10px;
  }
  .table_title{
    font-weight: 600;
    margin-bottom:5px;
    height:20px;
  }
</style>
<style>
  .nav1_5 .el-table__body tr.current-row:hover>td{background-color:rgb(234, 249, 239);}
</style>
