<template>
  <el-container class="main nav2_1">
    <div class="content">
      <div class="header">
        <div>{{$t('nav2_1.title')}}</div>
        <div class="rightbtn">
          <el-select v-model="value" :placeholder="$t('nav2_1.select.placeholder')" size="small" style="width:100px;margin-right:5px;"  @change="searchItem">
            <el-option id="option1" :key="this.$t('nav2_1.select.allDepartments')" :label=" this.$t('nav2_1.select.allDepartments')" :value="this.$t('nav2_1.select.allDepartments')">
            </el-option>
            <el-option  v-for="(item, index) in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button icon="el-icon-refresh" plain size="small" style="margin-right: 5px;margin-left:10px;" @click="refreshTable">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button icon="el-icon-circle-plus-outline" plain :open="showmodel()" size="small" style="margin-right: 5px" @click="dialogFormVisible = true">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" @click="deleteHost" style="margin-right: 5px">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
          <el-radio-group v-model="activeItem" size="small">
            <el-radio-button label="1" ><i class="el-icon-menu"></i></el-radio-button>
            <el-radio-button label="2" ><i class="fa fa-bars" aria-hidden="true"></i></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-row class="view-item" v-bind:class="{ activeItem:activeItem ==1}">
        <ul>
          <li class="li-item" v-for="(item,index) in linuxTable"  @click="itemSelected(index)" :class="{item_hover: activeIndex == index}"  @dblclick="itemClick(item)">
            <div class="li-item-top">
              <div class="hostimg"></div>
              <div class="item-con">
                <div class="li-item-strip textover"><div class="item-label">{{"IP"}}:</div><div class="item-info" v-bind:title="item.ip">{{item.ip}}</div></div>
                <div class="li-item-strip textover"><div class="item-label">{{$t('nav2_1.listview.linuxtable.cell_1')}}:</div><div class="item-info" v-bind:title="item.hostName">{{item.hostName}}</div></div>
                <div class="li-item-strip"><div class="item-label">{{$t('nav2_1.listview.linuxtable.cell_2')}}:</div><div  class="item-info">
                    <span :class="item.connectState === 'state1' ? 'green' : ''||item.connectState === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{item.connectState === 'state1'? $t('nav2_1.listview.linuxtable.state1') : ''||item.connectState === 'state2'? $t('nav2_1.listview.linuxtable.state2') : ''}}
                    </span>
                </div></div>
              </div>
            </div>
            <div class="li-item-bottom">
              <div class="li-item-strip textover"><div class="item-label">{{$t('nav2_1.listview.linuxtable.cell_3')}}:</div><div class="item-info">{{item.connectNumber}}</div></div>
              <div class="li-item-strip textover" >
                <div class="item-label">{{$t('nav2_1.listview.linuxtable.cell_4')}}:</div>
                <div class="item-info" v-bind:title="item.department==='publicHost'?$t('nav2_1.dialog.publicHost'):item.department">{{item.department==='publicHost'?$t('nav2_1.dialog.publicHost'):item.department}}</div>
              </div>
              <div class="li-item-strip textover ">
                <div class="item-label">{{$t('nav2_1.listview.linuxtable.cell_5')}}:</div>
                <div class="item-info" v-bind:title="item.remark">{{item.remark}}</div>
              </div>
            </div>
          </li>
        </ul>
      </el-row>
      <el-row class="list-item" v-bind:class="{ activeItem:activeItem ==2}">
        <el-table v-loading="tableloading" ref="linuxTable" :row-style="rowClass" highlight-current-row  @sort-change="qwe()" @row-click="tableRowClick" @current-change="checkRow"  @row-dblclick="rowClick" :border=true :data="linuxTable"  height="calc()" style="text-align: left"  >
          <el-table-column label="" width="100">
            <template scope="scope">
              <div class="head_pic"></div>
            </template>
          </el-table-column>
          <el-table-column prop="ip" :label="'IP'"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hostName" :label="$t('nav2_1.listview.linuxtable.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="connectState" :label="$t('nav2_1.listview.linuxtable.cell_2')"  :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
                  <span :class="scope.row.connectState === 'state1' ? 'green' : ''||scope.row.connectState === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.connectState === 'state1'? $t('nav2_1.listview.linuxtable.state1') : ''||scope.row.connectState === 'state2'? $t('nav2_1.listview.linuxtable.state2') : ''}}
                  </span>
            </template>
          </el-table-column>
          <el-table-column prop="connectNumber" :label="$t('nav2_1.listview.linuxtable.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="department" :label="$t('nav2_1.listview.linuxtable.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remark" :label="$t('nav2_1.listview.linuxtable.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog :title="$t('nav2_1.dialog.title')" :visible.sync="dialogFormVisible" ref="dialog" width="680px" :before-close="closedialog">
        <el-form  :model="addSession.form" ref="form" :rules="addSession.rules">
          <el-form-item label="IP" prop="ip" :label-width="addSession.formLabelWidth">
            <el-input v-model="addSession.form.ip"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav2_1.dialog.hostName')"  prop="hostName" :label-width="addSession.formLabelWidth">
            <el-input v-model="addSession.form.hostName"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav2_1.dialog.system')" :label-width="addSession.formLabelWidth">
            <span>{{"Linux"}}</span>
          </el-form-item>
          <el-form-item :label="$t('nav2_1.dialog.maxnum')" prop="maxnum" :label-width="addSession.formLabelWidth">
            <el-input v-model="addSession.form.maxnum" auto-complete="off"></el-input>
          </el-form-item>
         <!-- <el-form-item :label="$t('nav2_1.dialog.publicHost')"  :label-width="addSession.formLabelWidth">
            <el-switch style="display: block" v-model="addSession.onOffPublic" @change="onOffPubHost" active-color="#13ce66" :active-text="$t('nav2_1.dialog.selectPublic')">&lt;!&ndash;inactive-color="#ff4949"&ndash;&gt;</el-switch>
          </el-form-item>-->
          <el-form-item :label="$t('nav2_1.dialog.publicHost')" :label-width="addSession.formLabelWidth">
            <el-radio-group v-model="addSession.onOffPublic" @change="onOffPubHost">
              <el-radio label="Y">{{$t('nav2_1.dialog.YesPublic')}}</el-radio>
              <el-radio label="N">{{$t('nav2_1.dialog.NoPublic')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('nav2_1.dialog.department')"  style="height:220px;" :label-width="addSession.formLabelWidth">
            <div class="area" :class="{onOFF:addSession.onTrue==true}">
              <el-input :placeholder="$t('nav2_1.select.searchDepartment')"  v-model="filterText" auto-complete="off" style="width:100%;padding:10px;box-sizing:border-box;" ></el-input>
              <div class="treearea">
                <el-tree id="tree" :data="addSession.departmentInfo" :props="defaultProps" show-checkbox node-key="id" ref="tree" :expand-on-click-node="true" :filter-node-method="filterNode" ></el-tree>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('nav2_1.dialog.remark')" :label-width="addSession.formLabelWidth">
            <el-input v-model="addSession.form.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addLinuxDesktop('form')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-show="RowContent" class="content rowcontent">
      <div class="header">
        <div><span style="color: #2cc362;cursor: pointer;font-weight: 600"  @click="RowContent=false">{{$t('nav2_1.title')}}</span> ><span>{{detailInfo.pathName}}</span><span></span></div>
        <div class="rightbtn">
          <span style="margin-right:5px;">{{$t('nav2_1.buttonGroup.fenbianBtn')}}</span>
          <el-select v-model="detailInfo.valueFenBian" placeholder="请选择" size="small" style="width:120px;margin-right:5px;">
            <el-option v-for="item in detailInfo.fenBian" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button plain size="small">{{$t('nav2_1.buttonGroup.openBtn')}}</el-button>
          <el-button icon="el-icon-circle-close-outline"  plain size="small" @click="closeSession">{{$t('nav2_1.buttonGroup.deleteTalkBtn')}}</el-button>
        </div>
      </div>
      <div class="infoContent">
        <div class="session-list">
          <div class="table_title">
            <div><span>{{$t('nav2_1.listview.linuxtable.cell_1')}}:</span><span>{{detailInfo.pathName}}</span></div>
            <div><span>{{$t('nav2_1.buttonGroup.usedNum')}}:</span><span>{{detailInfo.connectNumber}}</span></div>
          </div>
          <div class="bottom-table">
            <el-table v-loading="tableloading" ref="sessionTable" :row-style="rowClass" highlight-current-row  @sort-change="sessionTableCurrent()" @row-click="sessionRowClick" @current-change="checkRow"  :border=true :data="detailInfo.sessionTable" height="calc()" style="text-align: left"  >
              <el-table-column prop="userName" :label="$t('nav2_1.listview.sessiontable.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="fenbian" :label="$t('nav2_1.listview.sessiontable.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <loadfooter style="width: 100%"></loadfooter>
  </el-container>
</template>
<script>
  import Vue from 'vue'
  import  router from '../router/index'
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      var ipRules = (rule, value, callback) => {
        var ipRge= /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        if(value==''){
          return callback(new Error(this.$t('rules.ipEmpty')));
        }else if(!ipRge.test(value)){
          return callback(new Error(this.$t('rules.ipError')));
        }else {
          callback();
        }
      }; //IP验证
      var hostNameRules = (rule, value, callback) => {
        var nameRge=/^[a-zA-Z0-9]{1,30}$/;
        if(value==''){
          return callback(new Error(this.$t('rules.hostEmpty')));
        }else if(!nameRge.test(value)){
          return callback(new Error(this.$t('rules.hostError')));
        }else {
          callback();
        }
      }; //主机名验证
      var maxNumRules = (rule, value, callback) => {
        var numReg=/[^\d]/g; //数字
        if(value==''){
          return callback(new Error(this.$t('rules.maxnumEmpty')));
        }else if(numReg.test(value)){
          return callback(new Error(this.$t('rules.maxnumError')));
        }else {
          callback();
        }
      }; //最大连接数验证
      return {
        title:'RVCP-工业仿真平台',
        activeItem:1,
        options: [
          {
            value: 'CAE',
            label: 'CAE'
          },
          {
            value: 'EDA',
            label: 'EDA'
          },
          {
            value: '日产',
            label: '日产'
          }
        ],/*部门选择*/
        value: this.$t('nav2_1.select.allDepartments'),/*默认选中部门*/
        tableloading:false, //表格加载动画,
        linuxTable:[
          {
            ip: '192.168.100.221',
            hostName:'demoserver',
            connectState:'state1',
            connectNumber:'5/20',
            department: 'CAE',
            remark:'12345678945222',
          },
          {
            ip: '192.168.100.121',
            hostName:'demoserver',
            connectState:'state1',
            connectNumber:'5/20',
            department: 'EDA',
            remark:'12345678945222',
          },
          {
            ip: '192.168.100.28',
            hostName:'demoserver1',
            connectState:'state2',
            connectNumber:'5/20',
            department: 'publicHost',
            remark:'12345678945222',
          },
          {
            ip: '192.168.100.23',
            hostName:'demoserver2',
            connectState:'state2',
            connectNumber:'5/20',
            department: '日产',
            remark:'12345678945222',
          },
          {
            ip: '192.168.100.35',
            hostName:'demoserver3',
            connectState:'state2',
            connectNumber:'5/20',
            department: 'CAE、日产',
            remark:'12345678945222',
          },
          {
            ip: '192.168.100.33',
            hostName:'demoserver4',
            connectState:'state2',
            connectNumber:'5/20',
            department: 'CAE、EDA',
            remark:'12345678945222',
          },
          {
            ip: '192.168.100.68',
            hostName:'demoserver5',
            connectState:'state2',
            connectNumber:'5/20',
            department: 'CAE、EDA',
            remark:'12345678945222',
          },
        ],/*Linux机器列表*/
        RowContent:false,/*详细信息初始不显示，双击时改为true，为显示状态*/
        activeIndex:'-1',/*视图模式选择index值*/
        activeTableName:'',/*列表模式选中值*/
        dialogFormVisible: false,/*添加对话框显示状态*/
        detailInfo:{
          pathName:'',/*跳转选中的name值*/
          connectNumber:5,/*已使用连接数*/
          fenBian:[
            {
              value:'',
              label:"1920*1080",
            }
          ],/*分辨率*/
          valueFenBian:"1920*1080",/*默认选中分辨率*/
          sessionTable:[
            {
              userName:'root',
              fenbian:'1920*768'
            },
            {
              userName:'rvcpadm',
              fenbian:'1920*768'
            },
            {
              userName:'rvcp',
              fenbian:'1920*768'
            },
            {
              userName:'daicy',
              fenbian:'1920*768'
            }
          ],/*会话列表*/
          sessionActiveName:'',/*会话列表选中值*/
        },/*详细信息*/
        addSession:{
          onOffPublic: 'Y',/*是否为公共机器*/
          onTrue:true,/*部门是否可选*/
          form: {
            ip:'',
            hostName:'',
            maxnum:'0',
            remark: ''
          },/*添加对话框中表单*/
          formLabelWidth: '120px',/*表单label宽度*/
          rules: {
            ip: [
              { required: true,validator:ipRules,trigger: 'change'},
            ],
            hostName: [
              { required: true, validator:hostNameRules,trigger: 'blur' },
            ],
            maxnum:[
              { required: true,validator:maxNumRules,trigger: 'blur'}
            ]
          },/*表单验证*/
          departmentInfo: [
            {
              id: 1,
              label: 'CAE',
              children: [{
                id: 4,
                label: '二级 1-1'
              }]
            }, {
              id: 2,
              label: 'EDA',
              children: [{
                id: 5,
                label: '二级 2-1'
              }, {
                id: 6,
                label: '二级 2-2'
              }]
            },{
              id:3,
              label:'日产'
            }],/*部门tree信息*/

        },/*添加表单*/
        filterText: '',/*搜索部门*/
        defaultProps: {
          children: 'children',
          label: 'label'
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
      $(".bottom-table .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 100px - 85px)', //可滚动区域高度
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
    },//初始函数
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.getStatus(this.$route.path)
      },
      changeLanguage (){
        this.i18nChart();
      },
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      activeItem:function(){
        if(this.activeItem==1){
          this.activeTableName='';
          this.$refs.linuxTable.setCurrentRow();
        }else{
          this.activeIndex=-1;
        }
      },/*监听视图模式和列表模式*/
    },
    methods: {
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
      searchItem(){
        console.log(this.value);
        //+ajax请求
        /* var _this=this;
         this.linuxTable.forEach(function (item,index) {
           console.log(index);
           if(item.department.indexOf('公共机器')){
             $('.li-item').eq(index).show();
             console.log(item.ip);
             if(_this.value=='全部部门'||_this.value=='All Departments'){
               $('.li-item').show();
             }else if(item.department.indexOf(_this.value)>-1){
               $('.li-item').eq(index).show();
               console.log(item.ip);
             }else{
               $('.li-item').eq(index).hide();
               console.log(item.ip);
             }
           }
         });*/
      },/*搜索部门查询数据*/
      itemClick(item){
        this.openRowContent(item.hostName);
        this.detailInfo.pathName=item.hostName;
      },/*视图模式双击*/
      rowClick(row){
        this.openRowContent(row.hostName);
        this.detailInfo.pathName=row.hostName;
      },/*列表模式双击*/
      sessionTableCurrent:function(){
        this.$refs.sessionTable.setCurrentRow();
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
      sessionRowClick:function(row){
        this.detailInfo.sessionActiveName=row.userName;
      },/*表格点击*/
      openRowContent(hostName){
        this.RowContent = true;
        //+ajax请求
      },/*表格数据加载*/
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
          if(this.activeTableName==''){
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }else{
            console.log(this.activeTableName);
          }
        }
      },/*删除机器*/
      i18nChart : function () {
        this.value =this.$t('nav2_1.select.allDepartments');
      },//国际化chart
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
      closeSession:function(){
        if(this.detailInfo.sessionActiveName!==''){
          console.log(this.detailInfo.sessionActiveName);
        }else{
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }
      },/*关闭会话*/
      showmodel(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".treearea").slimScroll({
            width: '100%', //可滚动区域宽度
            height: '160px', //可滚动区域高度
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
      },/*添加dialog中滚动条*/
      onOffPubHost:function(){
        if(this.addSession.onOffPublic=='Y'){
          this.addSession.onTrue=true;
          this.$refs.tree.setCheckedKeys([]);/*清空tree所有选择*/
        }else{
          this.addSession.onTrue=false;
        }
      },/*公共机器选择*/
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },/*添加中tree搜索部门*/
      addLinuxDesktop:function(form) {
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
      cleanform(){
        this.$refs['form'].resetFields();
        this.dialogFormVisible = false
      },//清除表单数据
      closedialog(done){
        this.cleanform();
        done();
      },//关闭对话框回调
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog .el-input{width:86%;}
  .el-switch{height:40px;line-height: 40px;}
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
  .li-item .hostimg{
    background: url("../../../static/img/lin-icon.png") no-repeat;
    background-size: contain;
    width:70px;
    height:60px;
    margin:0 10px 0 0;
  }
  .head_pic{
    width:30px;height:25px;
    background:url("../../../static/img/lin-icon.png") no-repeat;
    background-size: contain;
    margin:0 auto;
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
  .infoContent{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
  }
  .session-list{
    width:calc(100% - 30px);
    height:calc(100vh  - 60px - 50px - 70px - 415px);
    /*border: 1px solid #d7d7d7;*/
    border-radius: 8px;
    margin: 10px;
  }
  .table_title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    margin-bottom:5px;
    height:20px;
  }
  .area{
    width:86%;height:220px;
    overflow:auto;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
  }
  .onOFF{
    pointer-events:none;
    /*cursor:not-allowed;*/
    opacity: .5;
  }
</style>
<style>
  .nav2_1 .el-switch__label{height:40px;}
  .nav2_1 .el-switch__label.is-active{color:#5a5e66;}
  .nav2_1 .el-table__body tr.current-row:hover>td{background-color:rgb(234, 249, 239);}
</style>
