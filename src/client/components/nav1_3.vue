<template>
    <el-container class="main nav1_3">
      <div class="content">
        <div class="header">
          <div>{{$t('nav1_3.title')}}</div>
          <div>
            <el-button icon="el-icon-circle-check-outline" @click="activationNode" size="small">{{$t('nav1_3.buttonGroup.activationBtn')}}</el-button>
            <el-button icon="el-icon-circle-close-outline" @click="closeNode" size="small">{{$t('nav1_3.buttonGroup.closeBtn')}}</el-button>
            <el-button icon="el-icon-refresh" @click="refreshTable" size="small">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          </div>
        </div>
        <el-row class="list-item">
          <el-table v-loading="tableloading" :border=true :row-style="rowClass"  highlight-current-row  @sort-change="qwe()" @row-click="tableRowClick" @current-change="checkRow" :data="nodeTable"  height="calc()" style="text-align: left"  >
            <el-table-column prop="queueName" :label="$t('nav1_3.listview.nodetable.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hostState" :label="$t('nav1_3.listview.nodetable.cell_2')" :sortable="true" show-overflow-tooltip>
              <template slot-scope="scope">
                <span :class="scope.row.hostState === 'restart' ? 'restart' : ''||
                  scope.row.hostState === 'pasue' ? 'pasue' : ''||
                  scope.row.hostState === 'run' ? 'run' : ''||
                  scope.row.hostState === 'read' ? 'read' : ''||
                  scope.row.hostState === 'shutdown' ? 'shutdown' : ''||
                  scope.row.hostState === 'free' ? 'free' : ''">
                    <i class="el-icon-star-on"></i> {{scope.row.hostState === 'restart'? $t('nav1_3.listview.nodetable.restart') : ''||
                        scope.row.hostState === 'pasue'? $t('nav1_3.listview.nodetable.pasue') : ''||
                        scope.row.hostState === 'run'? $t('nav1_3.listview.nodetable.run') : ''||
                        scope.row.hostState === 'read'? $t('nav1_3.listview.nodetable.read') : ''||
                        scope.row.hostState === 'shutdown'? $t('nav1_3.listview.nodetable.shutdown') : ''||
                        scope.row.hostState === 'free'? $t('nav1_3.listview.nodetable.free') : ''
                    }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="jobCore" :label="$t('nav1_3.listview.nodetable.cell_3')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="automaticPasue" :label="$t('nav1_3.listview.nodetable.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="manualPasue" :label="$t('nav1_3.listview.nodetable.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-row>
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
        nodeTable:[
          {
            queueName: 'demoserver',
            hostState:'restart',
            jobCore: '5',
            automaticPasue: '0',
            manualPasue:'0',
          },
          {
            queueName: 'rhe01',
            hostState:'pasue',
            jobCore: '3',
            automaticPasue: '0',
            manualPasue:'0',
          },
          {
            queueName: 'rhe02',
            hostState:'read',
            jobCore: '5',
            automaticPasue: '0',
            manualPasue:'0',
          },
          {
            queueName: 'rhe02',
            hostState:'run',
            jobCore: '8',
            automaticPasue: '0',
            manualPasue:'0',
          },
          {
            queueName: 'rhe03',
            hostState:'shutdown',
            jobCore: '5',
            automaticPasue: '0',
            manualPasue:'0',
          },
          {
            queueName: 'rhe04',
            hostState:'free',
            jobCore: '6',
            automaticPasue: '0',
            manualPasue:'0',
          },
          {
            queueName: 'rhe01',
            hostState:'shutdown',
            jobCore: '3',
            automaticPasue: '0',
            manualPasue:'0',
          },
        ],
        activeTableName:'',
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
    },//初始函数
    watch: {
      /*主要用于点击不同参数相同组件路由不刷新问题*/
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

      },//数据加载
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },/*表格行鼠标小手*/
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
  .green{
    color:#2cc362;
  }
  .red{
    color:#f96a6a;
  }
  .restart{color: #ff9054;}
  .pasue{color: #ffc730 ;}
  .run{color: #67c33a  ;}
  .read{color: #409eff;}
  .shutdown{color: #f86b6b }
  .free{color: #9fa4ad;}
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
    left: 0px;
    z-index: 50;
  }
</style>
<style>
  .nav1_3 .el-button:active {
    color: #5a5e66;
    border-color:#d8dce5;
    outline: 0;
  }
  .nav1_3 .el-button:focus {
    color: #5a5e66;
    border-color:#d8dce5;
    background-color:#ffffff;
    outline: 0;
  }
  .nav1_3 .el-table__body tr.current-row:hover>td{background-color:rgb(234, 249, 239);}
</style>
