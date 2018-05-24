<template>
  <el-container class="main nav6_1">
    <div id="content" class="content">
      <div class="header">
        <div>{{$t('nav6_1.title')}}</div>
        <div class="rightbtn">
          <el-button icon="el-icon-refresh" plain size="small" style="margin-right: 5px;margin-left:10px;" @click="refreshTable">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button icon="el-icon-circle-plus-outline" plain size="small" style="margin-right: 5px" @click="dialogFormVisible = true">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" @click="deleteHost" style="margin-right: 5px">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
          <el-radio-group v-model="activeItem" size="small">
            <el-radio-button label="1" ><i class="el-icon-menu"></i></el-radio-button>
            <el-radio-button label="2" ><i class="fa fa-bars" aria-hidden="true"></i></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-row class="view-item" v-bind:class="{ activeItem:activeItem ==1}">
        <ul>
          <li class="li-item" v-for="(item,index) in monitorTable"  @click="itemSelected(index)" :class="{item_hover: activeIndex == index}"  @dblclick="itemClick(item)">
            <div class="li-item-top">
              <div class="item-con">
                <div class="li-item-strip textover">
                  <div class="item-label">{{$t('nav6_1.table.cell_1')}}:</div>
                  <div class="item-info" v-bind:title="item.name">{{item.name}}</div>
                </div>
                <div class="li-item-strip textover">
                  <div class="item-label">{{$t('nav6_1.table.cell_9')}}:</div>
                  <div class="item-info" v-bind:title="item.servers">{{item.servers}}</div>
                </div>
                <div class="li-item-strip textover">
                  <div class="item-label">{{$t('nav6_1.table.cell_5')}}:</div>
                  <div class="item-info" v-bind:title="item.type">{{item.type}}</div>
                </div>
                <div class="li-item-strip textover">
                  <div class="item-label">{{$t('nav6_1.table.cell_8')}}:</div>
                  <div class="item-info" v-bind:title="item.osType">{{item.osType}}</div>
                </div>
              </div>
            </div>
            <div class="li-item-bottom">
              <div class="li-item-left" style="margin-right:5px;">
                <el-progress type="circle" :width="66" :percentage="item.usage"></el-progress>
              </div>
              <div class="li-item-right">
                <div class="li-item-strip"><div class="item-label2">{{$t('nav6_1.table.cell_6')}}:</div><div  class="item-info2">
                   <!-- <span :class="item.status === 'state1' ? 'green' : ''||item.status === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{item.status === 'state1'? $t('nav6_1.table.state1') : ''||item.status === 'state2'?  $t('nav6_1.table.state2') : ''}}
                    </span>-->
                  {{item.status}}
                </div></div>
                <div class="li-item-strip textover">
                  <div class="item-label2">{{$t('nav6_1.table.cell_3')}}:</div>
                  <div class="item-info2">{{item.port}}</div>
                </div>
                <div class="li-item-strip textover ">
                  <div class="item-label2">{{$t('nav6_1.table.cell_4')}}:</div>
                  <div class="item-info2" v-bind:title="item.licVersion">{{item.licVersion}}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-row>
      <el-row class="list-item" v-bind:class="{ activeItem:activeItem ==2}">
        <el-table v-loading="tableloading" ref="monitorTable" :row-style="rowClass" @selection-change="changeFun"   @row-dblclick="rowClick" :border=true :data="monitorTable"  height="calc()" style="text-align: left"  >
          <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="name" :label="$t('nav6_1.table.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="servers" :label="$t('nav6_1.table.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="port" :label="$t('nav6_1.table.cell_3')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="licVersion" :label="$t('nav6_1.table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" :label="$t('nav6_1.table.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" :label="$t('nav6_1.table.cell_6')" :sortable="true" show-overflow-tooltip>
           <!-- <template slot-scope="scope">
                  <span :class="scope.row.status === 'state1' ? 'green' : ''||scope.row.status === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.status === 'state1'? $t('nav6_1.table.state1') : ''||scope.row.status === 'state2'? $t('nav6_1.table.state2') : ''}}
                  </span>
            </template>-->
          </el-table-column>
          <el-table-column prop="usage" :label="$t('nav6_1.table.cell_7')" :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.usage"></el-progress>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog :title="$t('nav6_1.addDialog.title')" :visible.sync="dialogFormVisible" ref="dialog" width="680px" :before-close="closedialog">
        <el-form  :model="addDialog.form" ref="form">
          <el-form-item :label="$t('nav6_1.addDialog.label_1')" :label-width="addDialog.formLabelWidth">
            <el-input v-model="addDialog.form.software"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav6_1.addDialog.label_2')" :label-width="addDialog.formLabelWidth">
            <el-input v-model="addDialog.form.version"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav6_1.addDialog.label_3')" :label-width="addDialog.formLabelWidth">
            <el-select v-model="addDialog.form.typeValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in addDialog.form.type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav6_1.addDialog.label_4')" :label-width="addDialog.formLabelWidth">
            <el-select v-model="addDialog.form.sys_T_Value" :placeholder="$t('nav2_1.select.placeholder')" @change="changeType()" size="small">
              <el-option  v-for="(item, index) in addDialog.form.sys_Type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav6_1.addDialog.label_5')" :label-width="addDialog.formLabelWidth">
            <el-select v-model="addDialog.form.ser_Ty_Value" :placeholder="$t('nav2_1.select.placeholder')" @change="changeSer_Type()" size="small">
              <el-option  v-for="(item, index) in addDialog.form.ser_Type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav6_1.addDialog.label_6')" :label-width="addDialog.formLabelWidth">
            <el-input v-model="addDialog.form.ser_Name"  auto-complete="off"></el-input>
            <div :class="{manySer_Name:addDialog.manyShow}" style="margin-top:5px;margin-bottom:5px;">
              <el-input v-model="addDialog.form.ser_Name"  auto-complete="off"></el-input>
            </div>
            <div :class="{manySer_Name:addDialog.manyShow}" style="margin-bottom:5px;">
              <el-input v-model="addDialog.form.ser_Name"  auto-complete="off"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('nav6_1.addDialog.label_7')" :label-width="addDialog.formLabelWidth">
            <el-input v-model="addDialog.form.port"  style="width:70%;" auto-complete="off"></el-input>
            <el-button plain  style="margin-left:10px;" >{{$t('nav6_1.addDialog.testBtn')}}</el-button>
          </el-form-item>
          <el-form-item :label="$t('nav6_1.addDialog.label_8')" :class="{hideFile:addDialog.hideInput}" :label-width="addDialog.formLabelWidth">
            <el-input v-model="addDialog.form.lic_File"  auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addLicence('form')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--模块框-->
      <el-dialog :title="$t('nav6_1.moduleDialog.title')" :visible.sync="moduleVisible" ref="moduleDialog" width="680px" :before-close="closeTable">
        <div class="dialog_header">
            <el-button  plain size="small" style="margin-right: 5px;" @click="release()"><i class="fa fa-dot-circle-o" style="margin-right: 5px;"></i>{{$t('nav6_1.moduleDialog.btn')}}</el-button>
        </div>
        <el-row class="moduleTables">
          <el-table v-loading="tableloading" ref="moduleTable" :open="showmodel()" :row-style="rowClass" @selection-change="changeFun2"  :border=true :data="moduleDialog.moduleTable"  height="calc()" style="text-align: left"  >
            <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun2"></el-table-column>
            <el-table-column prop="user" :label="$t('nav6_1.moduleDialog.table.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="runhost" :label="$t('nav6_1.moduleDialog.table.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="checkoutTime" :label="$t('nav6_1.moduleDialog.table.cell_3')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="usage" :label="$t('nav6_1.moduleDialog.table.cell_3')"  :sortable="true" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanTable">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-show="RowContent" class="content rowcontent">
      <div class="header">
        <div><span style="color: #2cc362;cursor: pointer;font-weight: 600"  @click="RowContent=false">{{$t('nav6_1.title')}}</span> ><span>{{detailInfo.pathName}}</span><span></span></div>
      </div>
      <div class="infoContent">
        <div class="session-list">
          <div class="left-table">
            <el-table v-loading="tableloading" ref="moduleTable" :row-style="rowClass" :border=true :data="detailInfo.moduleTable" height="calc()" style="text-align: left"  >
              <el-table-column prop="name" :label="$t('nav6_1.detailInfo.table.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="time" :label="$t('nav6_1.detailInfo.table.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="usage" :label="$t('nav6_1.detailInfo.table.cell_3')"  :sortable="true" show-overflow-tooltip>
                <template slot-scope="scope">
                  <a class="useCount" @click="moduleInfo(scope.row.name)">{{scope.row.usage}}</a>&nbsp;&nbsp;/&nbsp;&nbsp;<span>{{scope.row.total}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="percentNum" :label="$t('nav6_1.detailInfo.table.cell_4')" :sortable="true" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.percentNum"></el-progress>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="right-chart">
              <div style="margin:10px;">{{$t('nav6_1.detailInfo.chart_title')}}</div>
              <div id="myChart" class="con-chart"></div>
          </div>
        </div>
      </div>
    </div>
    <loadfooter style="width: 100%"></loadfooter>
  </el-container>
</template>
<script>
  import  axios from 'axios'
  import Vue from 'vue'
  import  router from '../router/index'
  var echarts = require('echarts');
  var colors = ['#5793f3', '#3e3e3e', '#675bba'];
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      return {
        title:'RVCP-工业仿真平台',
        activeItem:1,
        tableloading:false, //表格加载动画,
        monitorTable:[
         /* {
          id:22,
          name:'ansys',
          servers:'192.168.100.235',
          port:'2055',
          licVersion:'14.5',
          type:'FLEXLM',
          status:'state1',
          usage:25,
          osType:'LINUX',
        },*//*{
          software:'catia',
          server:'192.168.100.232',
          port:'4085',
          version:'v5',
          type:'DSLS',
          status:'state2',
          usage:60,
          S_Types:'NT',
        }*/],
        multipleSelection:[],
        RowContent:false,/*详细信息初始不显示，双击时改为true，为显示状态*/
        activeIndex:'-1',/*视图模式选择index值*/
        dialogFormVisible: false,/*添加对话框显示状态*/
        moduleVisible:false,/*模块*/
        detailInfo:{
          pathName:'',/*跳转选中的name值*/
          moduleTable:[
            /*{
              name:'academic',
              time:'2015-12-30 00:00:00',
              usage:'5',
              total:'1024',
              percent:50,
            }, {
              module:'acp',
              time:'2015-11-30 00:00:00',
              useCount:'3',
              total:'1024',
              usage:11,
            },*/
          ],
          option:{
            toolbox: {
              left:"center",
              show: true,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            dataZoom: [
              {   // 这个dataZoom组件，默认控制x轴。
                type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                start: 0,
                end: 100
              }
            ],
            tooltip : {
              trigger: 'axis'
            },
            xAxis : [
              {
                type : 'category',
                /*  boundaryGap : false,*/
                data : ['acdemic','acp','adams','afcv5_structural','afcv5_thermal','ams','aqua','atorn','atorn_smooth','available'],
                axisLabel:{interval: 0}
              }
            ],
            yAxis : [
              {
                type : 'value',
                axisLabel : {
                  /* formatter:this.$t('nav1_1.option3.formatter')*/
                }
              }
            ],
            series : [
              {
                // name:this.$t('nav1_1.option3.series.name'),
                type:'bar',
                smooth: true,
                data:[50, 11, 15, 13, 11, 15, 13, 11,20,55],
                itemStyle: {
                  //通常情况下：
                  normal:{
                    //颜色数组循环版
                    color: function (params){
                      var index = params.dataIndex;//表示当前的数据条的索引
                      var alternateNumber = 14;//表示按几种颜色交替出现
                      var newColor="";//表示最终显示的颜色
                      var colorList = ['#F3A43B','#FAD860','#60C0DD', '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0','#f1717c','#d4a0c7','#68b4e6','#7cebe2','#8cd67d','#fec59a'];
                      if(index < alternateNumber){
                        newColor = colorList[index];
                      }else{
                        var rowNumber=Math.floor(index/alternateNumber);
                        newColor = colorList[index-rowNumber*alternateNumber];
                      }
                      return newColor
                    }
                  }
                },
              }]
          },
        },/*详细信息*/
        addDialog:{
          hideInput:true,
          manyShow:true,
          form: {
            software:'',
            version:'',
            type:[{
              value:'FLEXLM',
              label:'FLEXLM',
            },{
              value:'LS_DYNA',
              label:'LS_DYNA',
            },{
              value:'DALS',
              label:'DALS',
            },{
              value:'LM-X',
              label:'LM-X',
            }],
            typeValue:'FLEXLM',
            sys_Type:[{
              value:'WINDOWS',
              label:'WINDOWS',
            },{
              value:'LINUX',
              label:'LINUX',
            }],
            sys_T_Value:'WINDOWS',
            ser_Type:[{
              value:'S',
              label:this.$t('nav6_1.addDialog.select1')
            },{
              value:'R',
              label:this.$t('nav6_1.addDialog.select2')
            }],
            ser_Ty_Value:'S',
            ser_Name:'',
            port:'',
            lic_File: ''
          },/*添加对话框中表单*/
          formLabelWidth: '120px',/*表单label宽度*/
        },/*添加表单*/
        moduleDialog:{
          moduleTable:[
            {
              user:'rvcpadm',
              runhost:'hpccn03',
              checkoutTime:'Fri 1/19 10:22',
              usage:'13',
            },
            {
              username:'rvcpadm',
              runhost:'hpccn03',
              checkoutTime:'Fri 1/19 10:22',
              checkNumber:'13'
            },
            {
              username:'rvcpadm',
              runhost:'hpccn03',
              checkoutTime:'Fri 1/19 10:22',
              checkNumber:'13'
            },
          ],
          moduleSelected:'',
        },
      }
    },
    created: function () {
      document.title = this.title;
    },
    computed:{
      changeLanguage: function () {
        return  Vue.config.lang
      }
    },
    mounted(){
      var myChart = echarts.init(document.getElementById('myChart'));
      myChart.setOption(this.detailInfo.option);
      window.onresize = myChart.resize;
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
      $(".left-table .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 100px - 45px)', //可滚动区域高度
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
      });//滚动
      this.getPagedata();
     /* this.reloadChart();*/
    },//初始函数
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.getStatus(this.$route.path)
      },
      changeLanguage (){
        this.i18nChart();
      },
      activeItem:function(){
        if(this.activeItem==1){
          this.$refs.monitorTable.clearSelection();
        }else{
          this.activeIndex=-1;
        }
      },/*监听视图模式和列表模式*/
    },
    methods: {
      showmodel:function(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".moduleTables  .el-table__body-wrapper").slimScroll({
            width: '100%', //可滚动区域宽度
            height: '400px', //可滚动区域高度
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
          });//滚动
        }, 1);
      },
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/');
        return urlStrArr[urlStrArr.length - 1]
      },
      itemSelected(index){
        this.activeIndex=index;
      },/*视图模式选中*/
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },/*列表每行添加小手*/
      refreshTable(){

      },/*刷新*/
      itemClick(item){
        this.detailInfo.pathName=item.name;
        this.openRowContent(item.name,item.id);

      },/*视图模式双击*/
      rowClick(row){
        this.openRowContent(row.hostName);
        this.detailInfo.pathName=row.software;
      },/*列表模式双击*/
      changeFun(val) {
        this.multipleSelection = val;
      },/*复选框状态改变*/
      changeFun2(val) {
        this.moduleDialog.moduleSelected = val;
      },/*复选框状态改变*/
      deleteHost(){
        if(this.activeItem==1){
          /*视图模式*/
          if(this.activeIndex!=-1){
            console.log(this.activeIndex);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }else{
          /*列表模式*/
          if(this.multipleSelection.length<=0){
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }else{
            console.log(this.multipleSelection);
          }
        }
      },/*删除机器*/
      i18nChart : function () {
        this.addDialog.form.ser_Type[0].label=this.$t('nav6_1.addDialog.select1');
        this.addDialog.form.ser_Type[1].label=this.$t('nav6_1.addDialog.select2')
      },//国际化chart
      getPagedata:function () {
        var _this = this;
        axios.get(path + '/xuke_monitor.json').then(function (response) {
          var result=response.data;
          /*console.log(result);*/
          if(result.status==0){
            _this.$message.error(_this.$t('rvcpinfo.getListError'));
            /* thisVue.$message.error("获取列表失败");*/
          }else if(result.status==1) {
              var data=result.data.response.records;
             /* console.log(data);*/
             _this.monitorTable=data;
          }
        }).catch(function (error) {
          console.log(error);
        })


      },//数据
      openRowContent:function(name,id){
        var _this = this;
        axios.get(path + '/xuke_'+name+id+'.json').then(function (response) {
          var result=response.data;
          /*console.log(result);*/
          if(result.status==0){
            _this.$message.error(_this.$t('rvcpinfo.getListError'));
            /* thisVue.$message.error("获取列表失败");*/
          }else if(result.status==1) {
            var data=result.data.features;
            console.log(data);
            var module_table=[];
            for(var i=0;i<data.length;i++){
              var obj={};
              obj.name=data[i].name;
              obj.time=format(data[i].expires);
              obj.usage=data[i].usage;
              obj.total=data[i].total;
              if(data[i].total == 0) {
                obj.percentNum =0.00;
              } else {
                obj.percentNum=Number((data[i].usage/data[i].total*100).toFixed(2));
              }
              obj.useds=data[i].useds;/*此条数据用在moduleInfo模块数据中*/
              module_table[i]=obj;
            }
            _this.detailInfo.moduleTable=module_table;
          }
        }).catch(function (error) {
          console.log(error);
        })
        this.RowContent = true;
        //+ajax请求
      },/*表格数据加载*/
      moduleInfo:function(name){
        var _this=this;
        _this.moduleDialog.moduleTable=[];
        var moduleData=_this.detailInfo.moduleTable;
        for(var i=0;i<moduleData.length;i++){
          if(name == moduleData[i].name && moduleData[i].usage>0){
            _this.moduleDialog.moduleTable=moduleData[i].useds;
          }
        }
        _this.moduleVisible=true;
      },/*模块数据*/
     /* reloadChart:function () {
        if(resize){resize.remove()}
        var mychart= this.echarts.init(document.getElementById('myChart'));
       var resize= mychart.setOption(this.detailInfo.option);
        $('#content').resize(function () {
          mychart.resize();
        });
      },//刷新Chart图表界面*/
      addLicence:function(form) {
        var _this=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log('success');
            _this.dialogFormVisible=false;
          } else {
            console.log('error');
            return false;
          }
        })
      },/*添加vnc提交*/
      changeType:function(){
        if(this.addDialog.form.sys_T_Value=='WINDOWS'){
          this.addDialog.hideInput=true;
        }else{
          this.addDialog.hideInput=false;
        }
      },/*选择系统类型*/
      changeSer_Type:function(){
        if(this.addDialog.form.ser_Ty_Value=='S'){
          this.addDialog.manyShow=true;
        }else{
          this.addDialog.manyShow=false;
        }
      },/*选择服务模式*/
      release:function(){
        if(this.moduleDialog.moduleSelected.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'))
        }else if(this.moduleDialog.moduleSelected.length>1){
          this.$message.error(this.$t('rvcpinfo.notsellectAll'));
        }else{
          console.log(this.moduleDialog.moduleSelected);
        }
      },/*强制释放*/
      cleanform(){
        this.$refs['form'].resetFields();
        this.dialogFormVisible = false
      },//清除表单数据
      closedialog(done){
        this.cleanform();
        done();
      },//关闭对话框回调
      cleanTable(){
        this.$refs.moduleTable.clearSelection();
        this.moduleVisible = false
      },
      closeTable(done){
        this.cleanTable();
        done();
      },//关闭对话框回调
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog .el-input,.el-dialog .el-select{width:86%;}
  .el-switch{height:40px;line-height: 40px;}
  .hideFile{display:none;}
  .manySer_Name{display:none;}
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
  .rowcontent{
    position: absolute;
    z-index: 55!important;
    top: 0;
    left: 0;
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
    left: 0;
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
  .item_hover{
    border:#2cc362 solid 1px ;
    border-radius: 8px;
  }
  .li-item-top{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #d7d7d7;
  }
  .li-item-bottom{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .li-item-strip{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin:5px;
  }
  .item-con{
    width:100%;
  }
  .item-label{
    width:110px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item-label2{
    width:75px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item-info{
    width: calc(100% - 110px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item-info2{
    width: calc(100% - 75px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .infoContent{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
  }
  .session-list{
    width:calc(100% - 20px);
    height:calc(100vh  - 60px - 50px - 70px - 20px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
  }
  .left-table{
    width:calc(100% - 60% - 20px);
    height:calc(100vh  - 60px - 50px - 70px - 20px);
    margin-right:20px;
    border: 1px solid #d7d7d7;
  }
  .right-chart{
    width:60%;
    height:calc(100vh  - 60px - 50px - 70px - 20px);
    overflow-x: auto;
    overflow-y:hidden;
    border-left: 1px solid #d7d7d7;
    position:relative;
  }
  .con-chart{
    width:1020px;
    min-width:600px;
    height:calc(100vh  - 60px - 50px - 70px - 70px);
    background-color: #ffffff!important;
    padding-top:5px;
  }
  .area{
    width:86%;height:220px;
    overflow:auto;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
  }
  .useCount{
    color:#2cc362;
    text-decoration:underline;
  }
  .onOFF{
    pointer-events:none;
    /*cursor:not-allowed;*/
    opacity: .5;
  }

  .dialog_header{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height:40px;width:100%;
    border: 1px solid #d7d7d7;
    margin-bottom:3px;
  }

</style>
<style>
  .nav6_1 .el-switch__label{height:40px;}
  .nav6_1 .el-switch__label.is-active{color:#5a5e66;}
  .nav6_1 .el-table__body tr.current-row:hover>td{background-color:rgb(234, 249, 239);}
</style>
