<template>
    <el-container class="main nav2_2_1">
      <div class="content">
        <div class="header">
          <div>{{$t('nav2_2_1.title')}}</div>
          <div class="rightbtn">
            <el-select v-model="value" :placeholder="$t('nav2_1.select.placeholder')" size="small" style="width:100px;margin-right:5px;"  @change="searchItem">
              <el-option id="option1" :key="this.$t('nav2_1.select.allDepartments')" :label=" this.$t('nav2_1.select.allDepartments')" :value="this.$t('nav2_1.select.allDepartments')">
              </el-option>
              <el-option  v-for="(item, index) in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button icon="el-icon-refresh" plain size="small" style="margin-right: 5px;margin-left:10px;" @click="refreshTable">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
            <el-button icon="el-icon-document" plain size="small" style="margin-right: 5px"  @click="open()">{{$t('nav2_1.buttonGroup.openBtn')}}</el-button>
            <el-button icon="el-icon-date" plain size="small" style="margin-right: 5px" @click="order()">{{$t('nav2_2_1.buttonGroup.orderBtn')}}</el-button>
            <el-button icon="el-icon-circle-plus-outline" plain :open="showmodel()"  size="small" style="margin-right: 5px" @click="addVNC()">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
            <el-button icon="el-icon-edit" plain size="small" style="margin-right: 5px" @click="edit()">{{$t('nav2_2_1.buttonGroup.editBtn')}}</el-button>
            <el-button icon="el-icon-circle-close-outline" plain size="small" style="margin-right: 5px" @click="logout()">{{$t('nav2_2_1.buttonGroup.logoutBtn')}}</el-button>
            <el-button icon="fa fa-television" plain size="small" style="margin-right: 5px" @click="lockHost()">{{$t('nav2_2_1.buttonGroup.lockBtn')}}</el-button>
            <el-button icon="el-icon-delete" plain size="small" @click="deleteHost" style="margin-right: 5px">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
            <el-radio-group v-model="activeItem" size="small">
              <el-radio-button label="1" ><i class="el-icon-menu"></i></el-radio-button>
              <el-radio-button label="2" ><i class="fa fa-bars" aria-hidden="true"></i></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <el-row class="view-item" v-bind:class="{ activeItem:activeItem ==1}">
          <ul>
            <li class="li-item" v-for="(item,index) in windowTable"  @click="itemSelected(index)" :class="{item_hover: activeIndex == index}">
              <div class="li-item-top">
                <div class="hostimg"></div>
                <div class="item-con">
                  <div class="li-item-strip textover">
                    <div class="item-label">{{$t('nav2_2_1.listview.windowtable.cell_1')}}:</div>
                    <div class="item-info" v-bind:title="item.hostName">{{item.hostName}}</div>
                  </div>
                  <div class="li-item-strip textover">
                    <div class="item-label">{{$t('nav2_2_1.listview.windowtable.cell_2')}}:</div>
                    <div class="item-info" v-bind:title="item.type">{{item.type}}</div>
                  </div>
                  <div class="li-item-strip">
                    <div class="item-label">{{$t('nav2_2_1.listview.windowtable.cell_3')}}:</div>
                    <div class="item-info" v-bind:title="item.user">{{item.user}}</div>
                  </div>
                </div>
              </div>
              <div class="li-item-bottom">
                <div class="li-item-strip textover">
                  <div class="item-label">{{$t('nav2_2_1.listview.windowtable.cell_4')}}:</div>
                  <div class="item-info" v-bind:title="item.department==='publicHost'?$t('nav2_1.dialog.publicHost'):item.department">{{item.department==='publicHost'?$t('nav2_1.dialog.publicHost'):item.department}}</div>
                </div>
                <div class="li-item-strip textover">
                  <div class="item-label">{{$t('nav2_2_1.listview.windowtable.cell_5')}}:</div>
                  <div class="item-info" v-bind:title="item.date">{{item.date}}</div>
                </div>
                <div class="li-item-strip textover" >
                  <div class="item-label">{{$t('nav2_2_1.listview.windowtable.cell_6')}}:</div>
                  <div class="item-info" v-bind:title="item.orderUser">{{item.orderUser}}</div>
                </div>
                <div class="li-item-strip textover ">
                  <div class="item-label">{{$t('nav2_2_1.listview.windowtable.cell_7')}}:</div>
                  <div class="item-info" v-bind:title="item.orderTime">{{item.orderTime}}</div>
                </div>
                <div class="li-item-strip textover ">
                  <div class="item-label">{{$t('nav2_2_1.listview.windowtable.cell_8')}}:</div>
                  <div class="item-info" v-bind:title="item.expireTime">{{item.expireTime}}</div>
                </div>
              </div>
            </li>
          </ul>
        </el-row>
        <el-row class="list-item" v-bind:class="{ activeItem:activeItem ==2}">
          <el-table v-loading="tableloading"  ref="windowTable" :row-style="rowClass"  highlight-current-row  @sort-change="qwe()"  @row-click="rowClick" @current-change="checkRow" :border=true :data="windowTable"  height="calc()"  style="text-align: left"  >
            <el-table-column label="" width="100">
              <template scope="scope">
                <div class="head_pic"></div>
              </template>
            </el-table-column>
            <el-table-column prop="hostName" :label="$t('nav2_2_1.listview.windowtable.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>  <!--@sort-change="clearCurrent"-->
            <el-table-column prop="user" :label="$t('nav2_2_1.listview.windowtable.cell_3')" :sortable="true"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="department" :label="$t('nav2_2_1.listview.windowtable.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="date" :label="$t('nav2_2_1.listview.windowtable.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-row>
        <!--添加框-->
        <el-dialog :title="addTitle" :visible.sync="dialogFormVisible" width="680px" ref="dialog" :before-close="closedialog">
          <el-form  :model="addSession.form" ref="form" :rules="addSession.rules">
            <el-form-item label="IP" prop="ip" :label-width="addSession.formLabelWidth">
              <el-input v-model="addSession.form.ip"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav2_1.dialog.hostName')"  prop="hostName" :label-width="addSession.formLabelWidth">
              <el-input v-model="addSession.form.hostName"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav2_2_1.addDialog.type')" :label-width="addSession.formLabelWidth">
              <el-select v-model="addSession.form.value" :placeholder="$t('nav2_1.select.placeholder')" size="small">
                <el-option  v-for="(item, index) in addSession.form.type" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('nav2_1.dialog.system')" :label-width="addSession.formLabelWidth">
              <span>{{"Windows"}}</span>
            </el-form-item>
           <!--<el-form-item :label="$t('nav2_1.dialog.publicHost')"  :label-width="addSession.formLabelWidth">-->
              <!--<el-switch style="display: block" v-model="addSession.onOffPublic" @change="onOffPubHost" active-color="#13ce66" :active-text="$t('nav2_1.dialog.selectPublic')"></el-switch>-->
            <!--</el-form-item>-->
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
                <el-tree :data="addSession.departmentInfo" :props="addSession.defaultProps" show-checkbox node-key="id" ref="tree" :expand-on-click-node="true" :filter-node-method="filterNode" ></el-tree>
                </div>
              </div>
            </el-form-item>
            <el-form-item :label="$t('nav2_1.dialog.remark')" :label-width="addSession.formLabelWidth">
              <el-input v-model="addSession.form.remark" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
            <el-button type="primary"  @click="addWindowsDesktop('form')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
          </div>
        </el-dialog>
        <!--预约框-->
        <el-dialog :title="$t('nav2_2_1.orderDialog.title')" :visible.sync="dialogOrderVisible" width="480px" ref="dialogOrder" :before-close="closeOrderDialog">
          <el-form  :model="orderDialog.oderForm" ref="oderForm">
            <el-form-item :label="$t('nav2_2_1.orderDialog.orderHost')" :label-width="addSession.formLabelWidth">
              <span v-text="orderDialog.oderForm.orderHost"></span>
            </el-form-item>
            <el-form-item :label="$t('nav2_2_1.orderDialog.orderTime')" :label-width="addSession.formLabelWidth">
              <el-date-picker v-model="orderDialog.oderForm.orderTime" value-format="yyyy-MM-dd HH:mm:ss" :editable="false" type="datetime" :placeholder="$t('nav2_2_1.orderDialog.orderPlaceholder')"></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('nav2_2_1.orderDialog.expireTime')" :label-width="addSession.formLabelWidth">
              <el-date-picker v-model="orderDialog.oderForm.expireTime"  value-format="yyyy-MM-dd HH:mm:ss" :editable="false" type="datetime" :placeholder="$t('nav2_2_1.orderDialog.expirePlaceholder')"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cleanOrderForm">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
            <el-button type="primary"  @click="windowsOrder('oderForm')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
          </div>
        </el-dialog>
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
      return {
        title:'RVCP-工业仿真平台',
        activeItem:1,
        addTitle:'',
        options: [
          {
            value: 'CAE',
            label: 'CAE'
          },{
            value: 'EDA',
            label: 'EDA'
          },{
            value: '日产',
            label: '日产'
          }
        ],/*部门选择*/
        value: this.$t('nav2_1.select.allDepartments'),/*默认选中部门*/
        tableloading:false, //表格加载动画,
        windowTable:[
          {
            hostId:'1',
            hostName: 'RVC01',
            type:'VNC',
            user:'rvcpadm',
            department:'EDA、CAE',
            date:'2017/12/30 17:20:34',
            orderUser: 'demoserver',
            orderTime:'2017/11/30 17:20:34',
            expireTime:'2018/12/30 17:20:34',
          },
          {
            hostId:'2',
            hostName: 'RVC02',
            type:'VNC',
            user:'rvcpadm',
            department:'EDA、CAE',
            date:'2017/12/30 17:20:34',
            orderUser: 'demoserver',
            orderTime:'2017/11/30 17:20:34',
            expireTime:'2018/12/30 17:20:34',
          },
          {
            hostId:'3',
            hostName: 'RVC03',
            type:'VNC',
            user:'rvcpadm',
            department:'EDA',
            date:'2017/12/30 17:20:34',
            orderUser: 'demoserver',
            orderTime:'2017/11/30 17:20:34',
            expireTime:'2018/12/30 17:20:34',
          },
          {
            hostId:'4',
            hostName: 'RVC04',
            type:'VNC',
            user:'rvcpadm',
            department:'CAE',
            date:'2017/12/30 17:20:34',
            orderUser: 'demoserver',
            orderTime:'2017/11/30 17:20:34',
            expireTime:'2018/12/30 17:20:34',
          },
          {
            hostId:'5',
            hostName: 'RVC05',
            type:'VNC',
            user:'rvcpadm',
            department:'日产',
            date:'2017/12/30 17:20:34',
            orderUser: 'demoserver',
            orderTime:'2017/11/30 17:20:34',
            expireTime:'2018/12/30 17:20:34',
          },
          {
            hostId:'6',
            hostName: 'RVC06',
            type:'VNC',
            user:'rvcpadm',
            department:'publicHost',
            date:'2017/12/30 17:20:34',
            orderUser: 'demoserver',
            orderTime:'2017/11/30 17:20:34',
            expireTime:'2018/12/30 17:20:34',
          },
        ],/*Window机器列表*/
        activeIndex:'-1',/*视图模式选择index值*/
        activeTableName:'',/*列表模式WindowTable选中值*/
        dialogFormVisible: false,/*添加对话框显示状态*/
        dialogOrderVisible: false,/*预约对话框显示状态*/
        addSession:{
          onOffPublic:'Y',/*是否为公共机器*/
          onTrue:true,/*部门是否可选*/
          form: {
            ip:'',
            hostName:'',
            maxnum:'0',
            remark: '',
            type:[
              {
                value: 'VNC',
                label: 'VNC'
              },
              {
                value: 'RGS',
                label: 'RGS'
              }
            ],
            value:'VNC',/*默认选中部门*/
          },/*添加对话框中表单*/
          formLabelWidth: '120px',/*表单label宽度*/
          rules: {
            ip: [
              { required: true,validator:ipRules,trigger: 'change'},
            ],
            hostName: [
              { required: true, validator:hostNameRules,trigger: 'blur' },
            ]
          },/*表单验证*/

          departmentInfo: [
            {
              id: 1,
              label: 'CAE',
              children: [{
                 id: 4,
                 label: '7898'
               }]
            }, {
              id: 2,
              label: 'EDA',
               children: [{
                 id: 5,
                 label: '7898'
               }, {
                 id: 6,
                 label: '7896'
               }]
            },{
              id:3,
              label:'日产'
            }],/*部门tree信息*/
          defaultProps: {
            children: 'children',
            label: 'label'
          },
        },/*添加表单*/
        filterText: '',/*搜索部门*/
        orderDialog:{
          oderForm: {
            orderHost:'RVC02',
            orderTime:'',
            expireTime: '',
          },/*预约对话框中表单*/
        }
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
      },/*添加dialog内部门搜索*/
      activeItem:function(){
        if(this.activeItem==1){
          this.activeTableName='';
          this.$refs.windowTable.setCurrentRow();
        }else{
          this.activeIndex=-1;
        }
      },/*监听视图模式和列表模式*/

    },
    methods: {
      qwe(){
        this.$refs.windowTable.setCurrentRow();
      },
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/');
        return urlStrArr[urlStrArr.length - 1]
      },
      itemSelected:function(index){
        this.activeIndex=index;
      },/*视图模式选中*/
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },/*列表每行添加小手*/
      checkRow:function(val){
        this.currentRow = val;
        // this.$refs.windowTable.setCurrentRow(val);
      },/*windowTable选中值*/
      rowClick:function(row){
        this.activeTableName=row.hostName;
      },/*windowTable表格点击*/
      searchItem:function(){
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
      openRowContent:function(hostName){
        this.RowContent = true;
        //+ajax请求


      },/*表格数据加载*/
      refreshTable:function(){

      },/*刷新*/
      open:function(){
        if(this.activeItem==1){
          /*视图模式*/
          if(this.activeIndex!=-1){
            console.log(this.activeIndex);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }else{
          /*列表模式*/
          if(this.activeTableName!==''){
            console.log(this.activeTableName);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }
      },/*打开*/
      order:function(){
        if(this.activeItem==1){
          /*视图模式*/
          if(this.activeIndex!=-1){
            this.dialogOrderVisible=true;
            console.log(this.activeIndex);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }else{
          /*列表模式*/
          if(this.activeTableName!==''){
            this.dialogOrderVisible=true;
            console.log(this.activeTableName);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }
      },/*调预约对话框*/
      addVNC:function(){
        this.addTitle=this.$t('nav2_1.dialog.title');
        this.dialogFormVisible = true;
      },
      edit:function(){
        if(this.activeItem==1){
          /*视图模式*/
          if(this.activeIndex!=-1){
            this.addTitle=this.$t('nav2_1.dialog.title2');
            this.dialogFormVisible=true;
            console.log(this.activeIndex);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }else{
          /*列表模式*/
          if(this.activeTableName!==''){
            this.addTitle=this.$t('nav2_1.dialog.title2');
            this.dialogFormVisible=true;
            console.log(this.activeTableName);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }
      },/*编辑*/
      logout:function(){
        if(this.activeItem==1){
          /*视图模式*/
          if(this.activeIndex!=-1){
            console.log(this.activeIndex);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }else{
          /*列表模式*/
          if(this.activeTableName!==''){
            console.log(this.activeTableName);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }
      },/*注销*/
      lockHost:function(){
        if(this.activeItem==1){
          /*视图模式*/
          if(this.activeIndex!=-1){
            console.log(this.activeIndex);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }else{
          /*列表模式*/
          if(this.activeTableName!==''){
            console.log(this.activeTableName);
          }else{
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }
        }
      },/*锁屏*/
      deleteHost:function(){
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
      showmodel:function(){
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
      filterNode:function(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },/*添加中tree搜索部门*/
      addWindowsDesktop:function(form) {
        var _this=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log('success');
            this.cleanform()
          } else {
            console.log('error');
            return false;
          }
        })
      },/*添加vnc提交*/
      windowsOrder:function(form){
        var _this=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            var orderTime=this.orderDialog.oderForm.orderTime;
            var expireTime=this.orderDialog.oderForm.expireTime;
            if(expireTime<orderTime){
              this.$message.error(this.$t('rules.dateError'));
              return;
            }
            console.log('success');
            this.cleanOrderForm();
          } else {
            console.log('error');
            return false;
          }
        })
      },/*提交预约对话框*/
      cleanform(){
        this.$refs['form'].resetFields();
        this.dialogFormVisible = false
      },//清除添加表单数据
      closedialog(done){
        this.cleanform();
        done();
      },//关闭对话框回调
      cleanOrderForm(){
        this.$refs['oderForm'].resetFields();
        this.orderDialog.oderForm.orderTime='';
        this.orderDialog.oderForm.expireTime='';
        this.dialogOrderVisible = false
      },//清除预约表单数据
      closeOrderDialog(done){
        this.cleanOrderForm();
        done();
      },//关闭预约对话框回调
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog .el-input,.el-dialog .el-select {width:86%;}
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
    background: url("../../../static/img/window-icon.png") no-repeat;
    background-size: contain;
    width:70px;
    height:60px;
    margin:0 10px 0 0;
  }
  .head_pic{
    width:30px;height:25px;
    background:url("../../../static/img/window-icon.png") no-repeat;
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
  .nav2_2_1 .el-switch__label{height:40px;}
  .nav2_2_1 .el-switch__label.is-active{color:#5a5e66;}
  .nav2_2_1 .el-table__body tr.current-row:hover>td{background-color:rgb(234, 249, 239);}
</style>

