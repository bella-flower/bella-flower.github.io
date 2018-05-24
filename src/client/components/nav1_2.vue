<template>
  <el-container class="main nav1_2">
    <div class="content">
      <div class="header">
        <div>{{$t('nav1_2.title')}}</div>
        <div class="rightbtn">
          <el-button icon="el-icon-refresh" plain size="small"  @click="refreshTable" style="margin-right: 5px">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-radio-group v-model="activeItem" size="small">
            <el-radio-button label="1" ><i class="el-icon-menu"></i></el-radio-button>
            <el-radio-button label="2" ><i class="fa fa-bars" aria-hidden="true"></i></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-row class="view-item" v-bind:class="{ activeItem:activeItem ==1}">
        <ul>
          <li class="li-item"  v-for="(item,index) in hostTable" @click="itemActives(index)" @dblclick="rowClick(item)" :class="{ itemActive:index == itemActive  }">
            <template >
              <div class="li-item-01">
                <div class="hostimg"></div>
                <div class="item-con">
                  <div class="li-item-02-1"><div class="item-con-01">{{$t('nav1_2.listview.hosttable.cell_1')}}:</div><div class="item-con-02" :title="item.hostid">{{item.hostid}}</div></div>
                  <div class="li-item-02-1"><div class="item-con-01">{{$t('nav1_2.listview.hosttable.cell_2')}}:</div><div  class="item-con-02">
                    <span :class="item.hoststate === 'state1' ? 'green' : ''||item.hoststate === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{item.hoststate === 'state1'? $t('nav1_2.listview.hosttable.state1') : ''||item.hoststate === 'state2'? $t('nav1_2.listview.hosttable.state2') : ''}}
                    </span>
                  </div></div>
                  <div class="li-item-02-1"><div class="item-con-01">{{$t('nav1_2.listview.hosttable.cell_6')}}:</div><div  class="item-con-02">{{item.hosttype}}</div></div>
                </div>
              </div>
              <div class="li-item-02">
                <div class="li-item-02-1">
                  <div class="item-con-01">{{$t('nav1_2.viewitem.cell_1')}}:</div>
                  <el-progress class="item-con-02" :text-inside="true" :stroke-width="18" :percentage="item.cpurate"></el-progress>
                </div>
                <div class="li-item-02-1">
                  <div class="item-con-01">{{$t('nav1_2.viewitem.cell_2')}}:</div>
                  <el-progress class="item-con-02" :text-inside="true" :stroke-width="18" :percentage="item.coreUser"></el-progress>
                </div>
              </div>
            </template>
          </li>
        </ul>
      </el-row>
      <el-row class="list-item" v-bind:class="{ activeItem:activeItem ==2}">
        <el-table v-loading="tableloading" @row-dblclick="rowClick" :border=true  :row-style="rowClass"  :data="hostTable"  height="calc()" :stripe=true style="text-align: left"  >
          <el-table-column prop="hostid" :label="$t('nav1_2.listview.hosttable.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hoststate" :label="$t('nav1_2.listview.hosttable.cell_2')" :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
                  <span :class="scope.row.hoststate === 'state1' ? 'green' : ''||scope.row.hoststate === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.hoststate === 'state1'? $t('nav1_2.listview.hosttable.state1') : ''||scope.row.hoststate === 'state2'? $t('nav1_2.listview.hosttable.state2') : ''}}
                  </span>
            </template>
          </el-table-column>
          <el-table-column prop="resource" :label="$t('nav1_2.listview.hosttable.cell_3')"  :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
                  <span>
                       {{scope.row.resource === 'resource1'? $t('nav1_2.listview.hosttable.resource1'):''||scope.row.resource === 'resource2'? $t('nav1_2.listview.hosttable.resource2'):''}}
                  </span>
            </template>
          </el-table-column>
          <el-table-column prop="memory" :label="$t('nav1_2.listview.hosttable.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="core" :label="$t('nav1_2.listview.hosttable.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hosttype" :label="$t('nav1_2.listview.hosttable.cell_6')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cpurate" :label="$t('nav1_2.listview.hosttable.cell_7')" :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.cpurate"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="disk" :label="$t('nav1_2.listview.hosttable.cell_8')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
    </div>
    <div v-show="RowContent" class="content rowcontent">
      <div class="header">
        <div><span style="color: #2cc362;cursor: pointer;font-weight: 600" @click="RowContent=false">{{$t('nav1_2.title')}}</span> > <span>{{openRowcon.hostname}}</span></div>
        <el-button icon="el-icon-refresh"  plain size="small" id="refreshInfo" @click="refreshInfo();">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
      </div>
      <div class="rowcon">
        <div class="top-con">
          <div class="left-con">
            <div class="left-con-1">{{$t('nav1_2.rowcon.left_title')}}</div>
            <div class="left-con-2">
              <div class="left-con-2-1">
                <div class="left-con-2-1-1"><div style="font-weight: 600">{{$t('nav1_2.listview.hosttable.cell_1')}}</div><div class="left-con-2-1-1-1 textover">{{openRowcon.hostname}}</div></div>
                <div class="left-con-2-1-2">
                  <div class="left-con-2-1-2-1 textover">
                    <div class="textover" style="font-weight: 600">{{$t('nav1_2.listview.hosttable.cell_2')}}</div>
                    <div class="textover">
                        <span :class="openRowcon.hoststate === 'state1' ? 'green' : ''||openRowcon.hoststate === 'state2' ? 'red' : ''">
                          <i class="el-icon-star-on"></i>{{openRowcon.hoststate === 'state1'? $t('nav1_2.listview.hosttable.state1') : ''||openRowcon.hoststate === 'state2'? $t('nav1_2.listview.hosttable.state2') : ''}}
                        </span>
                    </div>
                  </div>
                  <div class="left-con-2-1-2-2 textover">
                    <div style="font-weight: 600">{{$t('nav1_2.listview.hosttable.cell_3')}}</div>
                    <div>
                      {{openRowcon.resource === 'resource1'? $t('nav1_2.listview.hosttable.resource1'):''||openRowcon.resource === 'resource2'? $t('nav1_2.listview.hosttable.resource2'):''}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="left-con-2-2">
                <div class="left-con-2-2-1">{{$t('nav1_2.listview.hosttable.cell_7')}}</div>
                <div class="left-con-2-2-2"><el-progress type="circle" :width=100 :percentage="this.openRowcon.cpurate"></el-progress></div>
                <div class="left-con-2-2-3"><span>CPU:</span>{{openRowcon.cpunum}}/{{openRowcon.cputotal}}</div>
              </div>
              <div class="left-con-2-3">
                <div class="left-con-2-3-1">
                  <div class="left-con-2-3-1-1 textover">{{$t('nav1_2.rowcon.left_con_2_3_1')}}</div>
                  <div class="left-con-2-3-1-2 textover">{{openRowcon.temporaryspaces}}</div>
                </div>
                <div class="left-con-2-3-2">
                  <div class="left-con-2-3-1-1 textover" title="$t('nav1_2.rowcon.left_con_2_3_2')">{{$t('nav1_2.rowcon.left_con_2_3_2')}}</div>
                  <div class="left-con-2-3-1-2 textover">{{openRowcon.disk}}</div>
                </div>
              </div>
            </div>
            <div class="left-con-3">
              <div class="left-con-3-item">
                <div class="left-con-3-item-1">{{$t('nav1_2.rowcon.left_con_3_1')}}</div><div  class="left-con-3-item-2 left-con-3-item-2-1"><el-progress :text-inside="true" :stroke-width="18" :percentage="this.openRowcon.memoryrate"></el-progress></div><div  class="left-con-3-item-3">{{openRowcon.memorynum}}/{{openRowcon.memorytotal}}</div>
              </div>
              <div class="left-con-3-item">
                <div class="left-con-3-item-1">{{$t('nav1_2.rowcon.left_con_3_2')}}</div><div  class="left-con-3-item-2 left-con-3-item-2-2"><el-progress :text-inside="true" :stroke-width="18" :percentage="this.openRowcon.exchangerate"></el-progress></div><div  class="left-con-3-item-3">{{openRowcon.exchangenum}}/{{openRowcon.exchangetotal}}</div>
              </div>
              <div class="left-con-3-item">
                <div class="left-con-3-item-1">{{$t('nav1_2.rowcon.left_con_3_3')}}</div><div  class="left-con-3-item-2 left-con-3-item-2-3"><el-progress :text-inside="true" :stroke-width="18" :percentage="this.openRowcon.corerate"></el-progress></div><div  class="left-con-3-item-3">{{openRowcon.coreuse}}/{{openRowcon.coretotal}}</div>
              </div>
            </div>
          </div>
          <div class="right-con">
            <div class="right-con-title">{{$t('nav1_2.rowcon.right_title')}}</div>
            <div class="right-con-table">
              <el-table v-loading="tableloading" :data="openRowcon.diskinfotable" :border=true :stripe=true style="text-align: left"  >
                <el-table-column prop="filesystem" :label="$t('nav1_2.rowcon.diskinfotable_cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="diskuse" :label="$t('nav1_2.rowcon.diskinfotable_cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="diskrate" :label="$t('nav1_2.rowcon.diskinfotable_cell_3')" :sortable="true" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.diskrate"></el-progress>
                  </template>
                </el-table-column>
                <el-table-column prop="addr" :label="$t('nav1_2.rowcon.diskinfotable_cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="bottom-con">
          <el-table v-loading="tableloading"  :border=true   :data="openRowcon.jobtable" height="calc()" :stripe=true style="text-align: left"  >
            <el-table-column prop="jobid" :label="$t('nav1_1.rightdiv.alljob.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobname" :label="$t('nav1_1.rightdiv.alljob.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="application" :label="$t('nav1_1.rightdiv.alljob.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="queue" :label="$t('nav1_1.rightdiv.alljob.cell_6')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="user" :label="$t('nav1_1.rightdiv.alljob.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="state" :label="$t('nav1_1.rightdiv.alljob.cell_5')" width="100"  :sortable="true" show-overflow-tooltip>
              <!--<template slot-scope="scope">
                  <span :class="scope.row.state === 'state1' ? 'green' : ''||scope.row.state === 'state2' ? 'red' : ''||scope.row.state === 'state3' ? 'blue' : ''||scope.row.state === 'state4'? 'origin' : ''||scope.row.state === 'state5' ? 'glay' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.state === 'state1'? $t('nav1_1.rightdiv.state1') : ''||scope.row.state === 'state2'? $t('nav1_1.rightdiv.state2') : ''||scope.row.state === 'state3'? $t('nav1_1.rightdiv.state3') : ''||scope.row.state === 'state4'? $t('nav1_1.rightdiv.state4') : ''||scope.row.state === 'state5'? $t('nav1_1.rightdiv.state5') : ''}}
                  </span>
              </template>-->
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <loadfooter style="width: 100%"></loadfooter>
  </el-container>
</template>
<script>
  import  axios from 'axios'
  import  router from '../router/index'
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      return {
        title:'',
        activeItem:1,
        itemActive:null,
        tableloading:false, //表格加载动画,
        hostId:'null',
        hostTable:[
          /*{
            hostid: '1101',
            hoststate:'state1',
            resource: 'resource1',
            memory: '20.54GB/25.00GB',
            core:'2/24',
            hosttype: 'Redhat1',
            disk:'256KB/s',
            cpurate:80,
            coreUser:30,
          },
          {
            hostid: '1102',
            hoststate:'state2',
            resource: 'resource2',
            memory: '20.54GB/25.00GB',
            core:'2/24',
            hosttype: 'Redhat2',
            disk:'256KB/s',
            cpurate:50,
            coreUser:40,
          },*/
         /* {
            hostid: '1103',
            hoststate:'state1',
            resource: 'resource1',
            memory: '20.54GB/25.00GB',
            core:'2/24',
            hosttype: 'Redhat3',
            disk:'256KB/s',
            cpurate:56,
            coreUser:26,
          },
          {
            hostid: '1104',
            hoststate:'state2',
            resource: 'resource2',
            memory: '20.54GB/25.00GB',
            core:'2/24',
            hosttype: 'Redhat4',
            disk:'256KB/s',
            cpurate:36,
            coreUser:48,
          },
          {
            hostid: '1105',
            hoststate:'state1',
            resource: 'resource1',
            memory: '20.54GB/25.00GB',
            core:'2/24',
            hosttype: 'Redhat5',
            disk:'256KB/s',
            cpurate:55,
            coreUser:28,
          },
          {
            hostid: '1106',
            hoststate:'state2',
            resource: 'resource2',
            memory: '20.54GB/25.00GB',
            core:'2/24',
            hosttype: 'Redhat6',
            disk:'256KB/s',
            cpurate:76,
            coreUser:26,
          },
          {
            hostid: '1107',
            hoststate:'state1',
            resource: 'resource1',
            memory: '20.54GB/25.00GB',
            core:'2/24',
            hosttype: 'Redhat7',
            disk:'256KB/s',
            cpurate:66,
            coreUser:46,
          },
          {
            hostid: '1108',
            hoststate:'state2',
            resource: 'resource2',
            memory: '20.54GB/25.00GB',
            core:'2/24',
            hosttype: 'Redhat8',
            disk:'256KB/s',
            cpurate:50,
            coreUser:40,
          },
          {
            hostid: '1109',
            hoststate:'state1',
            resource: 'resource1',
            memory: '20.54GB/25.00GB',
            core:'2/24',
            hosttype: 'Redhat9',
            disk:'256KB/s',
            cpurate:50,
            coreUser:40,
          },*/
        ],
        RowContent:false,
        openRowcon:{
       /*   hostid:'001',
          hostname:'1101',
          hoststate:'state1',
          resource:'resource1',
          cpurate:20,*/
          cpunum:'1',
          /*cputotal:'100',*/
          /*temporaryspaces:"46.00GB",
          disk:'60KB/s',*/
         /* memoryrate:40,
          memorynum:'200MB',
          memorytotal:'5.00GB',*/
         /* exchangerate:6,
          exchangenum:'6.20GB',
          exchangetotal:'20.80GB',*/
          /*corerate:60,
          coreuse:30,
          coretotal:50,*/
          diskinfotable:[
           /* {
              filesystem:'/dev/vda2',
              diskuse:'2.84GB/45.68GB',
              diskrate:60,
              addr:'/dev/shm',
            }, */

          ],
          jobtable: [
           /* {
              jobid: '1101',
              jobname: 'job1',
              application: 'FLEX',
              user:'admin',
              state:'state1',
              queue:'abaqus',
            },*/

          ],
        },
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
      $(".right-con-table .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(290px)', //可滚动区域高度
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
      $(".bottom-con .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh  - 60px - 50px - 70px - 480px)', //可滚动区域高度
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
      this.getPagedata();
    },//初始函数
    watch: {
      /*主要用于点击不同参数相同组件路由不刷新问题*/
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.getStatus(this.$route.path)
      }
    },
    methods: {
      itemActives(index){
        this.itemActive = index;
      },/*视图模式点击选中第几个*/
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      },
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },
      rowClick(row){
        this.openRowContent(row.hostid);
        this.hostId=row.hostid;
      },
      openRowContent(hostid){
        /*console.log(hostid);*/
        if(hostid=='' || hostid==undefined){
          return;
        }
        //+各种请求
        var _this = this;
        axios.get(path + '/hostlist_cs.json').then(function (response) {
          var result=response.data;
          if(result.status==0){
            _this.$message.error(_this.$t('rvcpinfo.getListError'));
            /* thisVue.$message.error("获取列表失败");*/
          }else if(result.status==1) {
            var data = result.data;
            for (var i = 0; i < data.length; i++) {
              if (data[i].name == hostid) {
                  _this.openRowcon.hostid = data[i].name;
                  _this.openRowcon.hostname = data[i].name;
                  if (data[i].status == "ok") {
                    _this.openRowcon.hoststate = "state1";
                  } else {
                    _this.openRowcon.hoststate = "state2";
                  }
                  if (data[i].mg == true) {
                    _this.openRowcon.resource = "resource1";
                  } else {
                    _this.openRowcon.resource = "resource2";
                  }
                _this.openRowcon.cpurate = Number((data[i].cpuUt).toFixed(2));
                _this.openRowcon.cputotal=data[i].nCpu;
                _this.openRowcon.temporaryspaces=countFileSize(data[i].temp);
                _this.openRowcon.disk=countFileSize(data[i].io)+'/s';
                /*_this.openRowcon.memoryrate= Number(((data[i].maxMem-data[i].mem)/data[i].maxMem).toFixed(2));
                _this.openRowcon.memorynum=countFileSize(data[i].maxMem-data[i].mem);*/
                _this.openRowcon.memoryrate= Number((data[i].mem/data[i].maxMem*100).toFixed(2));
                _this.openRowcon.memorynum=countFileSize(data[i].mem);
                _this.openRowcon.memorytotal=countFileSize(data[i].maxMem);
                _this.openRowcon.exchangerate=Number((data[i].swap/data[i].maxSwap*100).toFixed(2));
                _this.openRowcon.exchangenum= countFileSize(data[i].swap);
                _this.openRowcon.exchangetotal=countFileSize(data[i].maxSwap);
                _this.openRowcon.corerate=Number((data[i].runSlots*100/data[i].maxSlots).toFixed(2));
                _this.openRowcon.coreuse=data[i].runSlots;
                _this.openRowcon.coretotal=data[i].maxSlots;

              }
            }
            _this.RowContent = true;
          }
        }).catch(function (error) {
          console.log(error);
        });
        axios.get(path + '/host_disk_'+hostid +'_cs.json').then(function (response) {
          var result=response.data;
          if(result.status==0){
           /* _this.$message.error(_this.$t('rvcpinfo.getListError'));*/
            /* thisVue.$message.error("获取列表失败");*/
            _this.openRowcon.diskinfotable=[];
          }else if(result.status==1) {
            var data = result.data;
        /*    console.log(data);*/
            var disk_table=[];
            for(var i=0;i<data.length;i++){
              var obj={};
              obj.filesystem=data[i].fs;
              obj.diskuse=countFileSize(data[i].used)+'/'+countFileSize(data[i].available+data[i].used);
              obj.diskrate=parseInt(data[i].usage);
              obj.addr=data[i].mounted;
              disk_table[i]=obj;
            }
            _this.openRowcon.diskinfotable=disk_table;

          }
        }).catch(function (error) {
          console.log(error);
        });
        axios.get(path + '/host_joblist_'+hostid +'_cs.json').then(function (response) {
          var result=response.data;
          if(result.status==0){
            /* _this.$message.error(_this.$t('rvcpinfo.getListError'));*/
            /* thisVue.$message.error("获取列表失败");*/
            _this.openRowcon.jobtable=[];
          }else if(result.status==1) {
            var data = result.data.items;
           /* console.log(data);*/
           var job_table=[];
            for(var i=0;i<data.length;i++){
              var obj={};
              obj.jobid=data[i].id;
              obj.jobname=data[i].name;
              obj.application=data[i].application;
              obj.user=data[i].username;
              obj.state=data[i].status;
              obj.queue=data[i].queue;
              job_table[i]=obj;
            }
            _this.openRowcon.jobtable=job_table;

          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getPagedata:function () {
        var _this = this;
        axios.get(path + '/hostlist_cs.json').then(function (response) {
          var result=response.data;
          if(result.status==0){
            _this.$message.error(_this.$t('rvcpinfo.getListError'));
           /* thisVue.$message.error("获取列表失败");*/
          }else if(result.status==1){
            var data=result.data;
            var host_t=[];
            for(var i=0;i<data.length;i++){
              var obj = {};
              obj.hostid = data[i].name;
              if(data[i].mg==true){
                obj.resource = "resource1";
              }else{
                obj.resource = "resource2";
              }
              if(data[i].status=="ok"){
                obj.hoststate = "state1";
              }else{
                obj.hoststate = "state2";
              }
              obj.memory =countFileSize(data[i].maxMem-data[i].mem)+'/'+countFileSize(data[i].maxMem);
              obj.core =data[i].runSlots+'/'+data[i].maxSlots;
              obj.hosttype=data[i].type;
              obj.disk=countFileSize(data[i].io)+'/s';
              obj.cpurate=Number((data[i].cpuUt).toFixed(2));
              obj.coreUser=Number((data[i].runSlots*100/data[i].maxSlots).toFixed(2));
              host_t[i] = obj
            }
            _this.hostTable = host_t;
          }

        }).catch(function (error) {
          console.log(error);
        });

      },//数据加载
      refreshTable(){
      /*  alert(this.itemActive);*/
        this.getPagedata();
      },/*刷新*/
      refreshInfo(){
        this.openRowContent(this.hostId);
        /*console.log(this.hostId)*/
      }
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .textover{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    course:hand;
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
    padding: 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
    position: absolute;
    top: 55px;
    left: 0px;
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
  .itemActive{
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
  .li-item-01{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #d7d7d7;
  }
  .li-item-02-1{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin:5px;
  }
  .item-con{
    width:calc( 100% - 60px );
  }
  .item-con-01{
    width: 80px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item-con-02{
    width: calc(100% - 80px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .rowcon{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
  }
  .top-con{
    width:100%;
    height: 400px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  .bottom-con{
    width:calc(100% - 30px);
    height:calc(100vh  - 60px - 50px - 70px - 415px);
    border: 1px solid #d7d7d7;
    border-radius: 8px;
    margin: 10px;

  }
  .left-con{
    width: 700px;
    border-right: 1px solid #d7d7d7;
    margin: 10px 0 10px 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
  }
  .right-con{
    width:calc( 100% - 700px);
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
  }
  .right-con-title{
    font-weight: 600;
    font-weight: 600;
    margin-bottom:5px;
    heitht:20px;
  }
  .right-con-table{
    width:calc(100% - 10px);
    height:360px;
    border: 1px solid #d7d7d7;
    border-radius: 8px;
  }
  .left-con-1{
    font-weight: 600;
    margin-bottom:5px;
    heitht:20px;
  }
  .left-con-2{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:flex-start;
    height: 200px;
  }
  .left-con-3{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:flex-start;
    height: 150px;
    border:1px solid #d7d7d7;
    border-radius: 8px;
    width: 670px;
    padding: 5px;
  }
  .left-con-3-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items:center;
    padding:10px;
  }
  .left-con-3-item-1{
    width: 150px;
  }
  .left-con-3-item-2{
    width: 280px;
    margin:0 5px;
  }
  .left-con-3-item-3{
    width: 220px;
  }
  .left-con-2-1{
    border:1px solid #d7d7d7;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width:320px;
    height:190px;
    margin:0 5px 0 0;
    text-align: center;
  }
  .left-con-2-1-1{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border-bottom:1px solid #d7d7d7;
    height: 95px;
    width: 90%;
  }
  .left-con-2-1-1-1{
    width:100%;
    text-align: center;
    padding-top: 5px;
  }
  .left-con-2-1-2{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    height: 95px;
    width: 90%;
  }
  .left-con-2-1-2-1{
    border-right:1px solid #d7d7d7;
    width:50%;
    text-align: center;
  }
  .left-con-2-1-2-2{
    width:50%;
    text-align: center;
  }
  .left-con-2-2{
    border:1px solid #d7d7d7;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width:167px;
    height:190px;
    margin:0 5px;
  }
  .left-con-2-3{
    border:1px solid #d7d7d7;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width:167px;
    height:190px;
    margin:0 5px;
  }
  .left-con-2-3-1{
    border-bottom:1px solid #d7d7d7;
    width: 90%;
    height: 95px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }
  .left-con-2-3-1-1{
    width:100%;
    text-align: center;
    font-weight: 600;
  }
  .left-con-2-3-1-2{
    width:100%;
    text-align: center;
    padding-top: 10px;
  }
  .left-con-2-3-2{
    width: 90%;
    height: 95px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }
  .left-con-2-2-1{
    height:20px;
    font-weight: 600;
  }
  .left-con-2-2-2{
    height:100px;
  }
  .left-con-2-2-3{
    height:20px;
    padding-top: 10px;
  }
  .rightbtn{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
</style>
<style>
  .nav1_2 .list-item .el-progress-bar__inner{
    background-color: #2cc362!important;
  }
  .nav1_2 .left-con-2-2-2 .el-progress-circle__path{
    stroke:#fc843c!important;
  }
  .nav1_2 .left-con-3-item-2-1 .el-progress-bar__inner{
    background-color: #67c23a!important;
  }
  .nav1_2 .left-con-3-item-2-2 .el-progress-bar__inner{
    background-color: #ffc62e!important;
  }
  .nav1_2 .left-con-3-item-2-3 .el-progress-bar__inner{
    background-color: #20a0ff!important;
  }
</style>
