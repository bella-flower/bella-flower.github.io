<template>
    <el-container class="main nav1_4">
      <div class="content">
         <div class="header">
          <div>{{$t('nav1_4.title')}}</div>
          <div class="rightbtn">
            <el-button icon="el-icon-refresh" plain size="small" style="margin-right: 5px" @click="refreshTable">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
            <el-radio-group v-model="activeItem" size="small">
              <el-radio-button label="1" ><i class="el-icon-menu"></i></el-radio-button>
              <el-radio-button label="2" ><i class="fa fa-bars" aria-hidden="true"></i></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <el-row class="view-item" v-bind:class="{ activeItem:activeItem ==1}">
          <ul>
            <li class="li-item" v-for="(item,index) in hostTable">
              <div class="li-item-top">
                <div class="hostimg"></div>
                <div class="item-con">
                  <div class="li-item-strip textover"><div class="item-label">{{$t('nav1_4.listview.hosttable.cell_1')}}:</div><div class="item-info" v-bind:title="item.hostName">{{item.hostName}}</div></div>
                  <div class="li-item-strip"><div class="item-label">{{$t('nav1_4.listview.hosttable.cell_2')}}:</div><div  class="item-info">
                    <span :class="item.hostState === 'state1' ? 'green' : ''||item.hostState === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{item.hostState === 'state1'? $t('nav1_4.listview.hosttable.state1') : ''||item.hostState === 'state2'? $t('nav1_4.listview.hosttable.state2') : ''}}
                    </span>
                  </div></div>
                  <div class="li-item-strip textover"><div class="item-label">{{$t('nav1_4.listview.hosttable.cell_3')}}:</div><div  class="item-info" v-bind:title="item.hostType">{{item.hostType}}</div></div>
                </div>
              </div>
              <div class="li-item-bottom">
                <div class="li-item-strip">
                  <div class="item-label">{{$t('nav1_4.viewitem.cell_1')}}:</div>
                  <el-progress class="item-info" :text-inside="true" :stroke-width="18" :percentage="60"></el-progress>
                </div>
                <div class="li-item-strip">
                  <div class="item-label">{{$t('nav1_4.viewitem.cell_2')}}:</div>
                  <el-progress class="item-info" :text-inside="true" :stroke-width="18" :percentage="80"></el-progress>
                </div>
              </div>
            </li>
          </ul>
        </el-row>
        <el-row class="list-item" v-bind:class="{ activeItem:activeItem ==2}">
          <el-table v-loading="tableloading" @selection-change="changeFun"  :row-style="rowClass" :border=true :data="hostTable"  height="calc()" style="text-align: left"  >
            <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
            <el-table-column prop="hostName" :label="$t('nav1_4.listview.hosttable.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hostState" :label="$t('nav1_4.listview.hosttable.cell_2')" :sortable="true" show-overflow-tooltip>
              <template slot-scope="scope">
                  <span :class="scope.row.hostState === 'state1' ? 'green' : ''||scope.row.hostState === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.hostState === 'state1'? $t('nav1_4.listview.hosttable.state1') : ''||scope.row.hostState === 'state2'? $t('nav1_4.listview.hosttable.state2') : ''}}
                  </span>
              </template>
            </el-table-column>
            <el-table-column prop="hostType" :label="$t('nav1_4.listview.hosttable.cell_3')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="CPU_Rate" :label="$t('nav1_4.listview.hosttable.cell_4')" :sortable="true" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.CPU_Rate"></el-progress>
              </template>
            </el-table-column>
            <el-table-column prop="memory" :label="$t('nav1_4.listview.hosttable.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exchangeSpace" :label="$t('nav1_4.listview.hosttable.cell_6')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="loginName" :label="$t('nav1_4.listview.hosttable.cell_7')" :sortable="true" show-overflow-tooltip></el-table-column>

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
        activeItem:1,
        tableloading:false, //表格加载动画,
        hostTable:[
          {
            hostName: '1102',
            hostState:'state1',
            hostType:'Redhat6',
            CPU_Rate: 50,
            memory: '20.54GB/25.00GB',
            exchangeSpace:'20.54GB/25.00GB',
            loginName:'rvcpadm',
          },
          {
            hostName: '1101',
            hostState:'state2',
            hostType:'Redhat7',
            CPU_Rate: 80,
            memory: '20.54GB/25.00GB',
            exchangeSpace:'20.54GB/25.00GB',
            loginName:'rvcpadm',
          },
        ],
        multipleSelection:[],//多选
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
      });//列表滚动
      $(".view-item ul").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 100px)', //可滚动区域高度
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
      });//视图滚动
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
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },
      changeFun(val) {
        this.multipleSelection = val;
      },/*复选框状态改变*/
      refreshTable(){

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
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .textover{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor:pointer;
  }
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
  .rightbtn{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .view-item{
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
  .view-item ul{
    font-size: 14px;
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
  .activeItem{
    z-index:51!important;
  }
  .li-item{
    display: inline-block;
    border: solid 1px #d7d7d7;
    border-radius: 8px;
    width:calc( 20% - 24px );
    height:auto;
    margin:10px 5px;
    padding: 5px;
    cursor: pointer;
    overflow: hidden;
  }
  .li-item:hover{
    border:#2cc362 solid 1px ;
    border-radius: 8px;
  }
  .li-item .hostimg{
    background: url("../../../static/img/hostimg.png") no-repeat;
    background-size: contain;
    width: 50px;
    height: 84px;
    margin:0 10px 0 0;
  }
  .li-item-top{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #d7d7d7;
  }
  .li-item-strip{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin:5px;
  }
  .item-con{
    width:calc( 100% - 60px );
  }
  .item-label{
    width: 80px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item-info{
    width: calc(100% - 80px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
