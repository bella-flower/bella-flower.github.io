<template>
  <el-container class="main nav2_2_2">
    <div class="content">
      <div class="header">
        <div>{{$t('nav2_2_2.title')}}</div>
        <div>
          <el-button icon="el-icon-refresh" @click="refreshTable" size="small">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <el-table v-loading="tableloading" :row-style="rowClass" :border=true :data="listTable"  height="calc()" style="text-align: left">
          <el-table-column prop="hostName" :label="$t('nav2_2_2.listview.listtable.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="userName" :label="$t('nav2_2_2.listview.listtable.cell_2')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" :label="$t('nav2_2_2.listview.listtable.cell_3')" :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
                  <span :class="scope.row.status === 'state1' ? 'green' : ''||scope.row.status === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.status === 'state1'? $t('nav2_2_2.listview.listtable.state1') : ''||scope.row.status === 'state2'?  $t('nav2_2_2.listview.listtable.state2')  : ''}}
                  </span>
            </template>
          </el-table-column>
          <el-table-column prop="process" :label="$t('nav2_2_2.listview.listtable.cell_4')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="monitorTime" :label="$t('nav2_2_2.listview.listtable.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
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
        listTable:[
          {
            hostName:'RVC01',
            userName:'rvcpadm',
            status:'state1',
            process:'',
            monitorTime:'2018-12-7 15:55:44',
          },
          {
            hostName:'RVC03',
            userName:'rvcpadm',
            status:'state2',
            process:'',
            monitorTime:'2018-12-7 15:55:44',
          },
          {
            hostName:'RVC04',
            userName:'rvcpadm',
            status:'state2',
            process:'',
            monitorTime:'2018-12-7 15:55:44',
          },
          {
            hostName:'RVC06',
            userName:'rvcpadm',
            status:'state1',
            process:'',
            monitorTime:'2018-12-7 15:55:44',
          },
          {
            hostName:'RVC08',
            userName:'rvcpadm',
            status:'state2',
            process:'',
            monitorTime:'2018-12-7 15:55:44',
          },
        ]
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
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.getStatus(this.$route.path)
      }
    },
    methods: {
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/')
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
  .nav2_2_2 .el-table__body tr.current-row:hover>td{background-color:rgb(234, 249, 239);}
</style>
