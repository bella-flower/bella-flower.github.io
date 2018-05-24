<template>
  <el-container class="main nav2_9">
    <div class="content">
      <div class="header">
        <div>{{$t('nav2_9.title')}}</div>
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
          <li class="li-item" v-for="(item,index) in resourceTable"  @click="itemSelected(index)" :class="{item_hover: activeIndex == index}"  @dblclick="itemClick(item)">
            <div class="li-item-top">
              <div class="hostimg"></div>
              <div class="item-con">
                <div class="li-item-strip textover"><div class="item-label">{{$t('nav2_9.listview.resourceTable.cell_1')}}:</div><div class="item-info" v-bind:title="item.hostName">{{item.hostName}}</div></div>
                <div class="li-item-strip textover"><div class="item-label">{{"IP"}}:</div><div class="item-info" v-bind:title="item.ip">{{item.ip}}</div></div>
                <div class="li-item-strip"><div class="item-label">{{$t('nav2_9.listview.resourceTable.cell_2')}}:</div><div  class="item-info">
                    <span :class="item.state === 'state1' ? 'green' : ''||item.state === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{item.state === 'state1'? $t('nav2_9.listview.resourceTable.state1') : ''||item.state === 'state2'? $t('nav2_9.listview.resourceTable.state2') : ''}}
                    </span>
                </div></div>
              </div>
            </div>
            <div class="li-item-bottom">
              <div class="li-item-strip textover">
                <div class="item-label">{{$t('nav2_9.listview.resourceTable.cell_6')}}:</div>
                <div class="item-info">{{item.number}}</div>
              </div>
              <div class="li-item-strip textover" >
                <div class="item-label">{{$t('nav2_9.listview.resourceTable.cell_7')}}:</div>
                <div class="item-info" v-bind:title="item.type">{{item.type}}</div>
              </div>
              <div class="li-item-strip textover ">
                <div class="item-label">{{$t('nav2_9.listview.resourceTable.cell_9')}}:</div>
                <div class="item-info" v-bind:title="item.remark">{{item.remark}}</div>
              </div>
            </div>
          </li>
        </ul>
      </el-row>
      <el-row class="list-item" v-bind:class="{ activeItem:activeItem ==2}">
        <el-table v-loading="tableloading" ref="resourceTable"  @selection-change="changeFun" :row-style="rowClass"  @row-dblclick="rowClick" :border=true :data="resourceTable"  height="calc()" style="text-align: left"  >
          <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="hostName" :label="$t('nav2_9.listview.resourceTable.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ip" :label="'IP'"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="state" :label="$t('nav2_9.listview.resourceTable.cell_2')"  :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
                  <span :class="scope.row.state === 'state1' ? 'green' : ''||scope.row.state === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.state === 'state1'? $t('nav2_9.listview.resourceTable.state1') : ''||scope.row.state === 'state2'? $t('nav2_9.listview.resourceTable.state2') : ''}}
                  </span>
            </template>
          </el-table-column>
          <el-table-column prop="coreNumber" :label="$t('nav2_9.listview.resourceTable.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="memory" :label="$t('nav2_9.listview.resourceTable.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="memoryUsage" :label="$t('nav2_9.listview.resourceTable.cell_5')" :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.memoryUsage"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="number" :label="$t('nav2_9.listview.resourceTable.cell_6')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" :label="$t('nav2_9.listview.resourceTable.cell_7')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" :label="$t('nav2_9.listview.resourceTable.cell_8')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remark" :label="$t('nav2_9.listview.resourceTable.cell_9')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog :title="$t('nav2_9.addDialog.title')" :visible.sync="dialogFormVisible" ref="dialog" width="680px" :before-close="closedialog">
        <el-form  :model="addHost.form" ref="form" :rules="addHost.rules">
          <el-form-item label="IP" prop="ip" :label-width="addHost.formLabelWidth">
            <el-input v-model="addHost.form.ip"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav2_9.addDialog.label.hostName')"  prop="hostName" :label-width="addHost.formLabelWidth">
            <el-input v-model="addHost.form.hostName"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav2_9.addDialog.label.type')" :label-width="addHost.formLabelWidth">
            <el-select v-model="addHost.form.typeValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in addHost.form.type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav2_9.addDialog.label.bridge')" :label-width="addHost.formLabelWidth">
            <el-input v-model="addHost.form.bridge" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav2_9.addDialog.label.password')" :label-width="addHost.formLabelWidth">
            <el-input v-model="addHost.form.password" type="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav2_9.addDialog.label.remark')" :label-width="addHost.formLabelWidth">
            <el-input v-model="addHost.form.remark"  type="textarea" :rows="8" style="width:86%;" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>{{$t('nav2_9.addDialog.footerBtn.testBtn')}}</el-button>
          <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addHosttest('form')">{{$t('nav2_9.addDialog.footerBtn.addBtn')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-show="RowContent" class="content rowcontent">
      <div class="header">
        <div><span style="color: #2cc362;cursor: pointer;font-weight: 600"  @click="RowContent=false">{{$t('nav2_9.hostDetail.buttonGroup.hostDetail')}}</span> ><span>{{detailInfo.pathName}}</span><span></span></div>
        <div class="rightbtn">
          <el-button plain size="small" style="margin-right: 5px" @click="start()"><i class="fa fa-play-circle-o"></i><span>{{$t('nav2_9.hostDetail.buttonGroup.startBtn')}}</span></el-button>
          <el-button plain size="small" style="margin-right: 5px" @click="pause()"><i class="fa fa-pause-circle-o"></i><span>{{$t('nav2_9.hostDetail.buttonGroup.suspendBtn')}}</span></el-button>
          <el-button plain size="small" style="margin-right: 5px" @click="shut()"><i class="fa fa-power-off"></i><span>{{$t('nav2_9.hostDetail.buttonGroup.shutBtn')}}</span></el-button>
          <el-button plain size="small" style="margin-right: 5px" @click="resumet()"><i class="fa fa-reply"></i><span>{{$t('nav2_9.hostDetail.buttonGroup.resumetBtn')}}</span></el-button>
          <el-button plain size="small" @click="restart()"><i class="fa fa-history"></i><span>{{$t('nav2_9.hostDetail.buttonGroup.restartBtn')}}</span></el-button>
        </div>
      </div>
      <div class="infoContent">
        <div class="session-list">
          <div class="table_title">
            <div><span>{{$t('nav2_9.hostDetail.buttonGroup.xuni_number')}}:</span><span>{{detailInfo.number}}</span></div>
          </div>
          <div class="bottom-table">
            <el-table v-loading="tableloading" ref="detailTable" @selection-change="selectFun" :row-style="rowClass"  :border=true :data="detailInfo.detailTable" height="calc()" style="text-align: left"  >
              <el-table-column type="selection" width="50" prop="select" @selection-change="selectFun"></el-table-column>
              <el-table-column prop="name" :label="$t('nav2_9.hostDetail.detailTable.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="state" :label="$t('nav2_9.hostDetail.detailTable.cell_2')" :sortable="true" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span :class="scope.row.state === 'state1' ? 'green' : ''||
                                scope.row.state === 'state2' ? 'red' : ''||
                                scope.row.state === 'state3' ? 'yellow' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.state === 'state1'? $t('nav2_9.hostDetail.detailTable.state1') : ''||
                     scope.row.state === 'state2'? $t('nav2_9.hostDetail.detailTable.state2') : ''||
                     scope.row.state === 'state3'? $t('nav2_9.hostDetail.detailTable.state3') : ''}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="coreNumber" :label="$t('nav2_9.hostDetail.detailTable.cell_3')"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="memory" :label="$t('nav2_9.hostDetail.detailTable.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
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
        tableloading:false, //表格加载动画,
        resourceTable:[
          {
            hostName:'demoserver',
            ip: '192.168.100.221',
            state:'state1',
            coreNumber:'5',
            memory: '3.78G',
            memoryUsage:30,
            number:'12',
            type:'XENSERVER',
            createTime:'1992-11-55 12:55:88',
            remark:''
          },
          {
            hostName:'xenserver',
            ip: '192.168.100.211',
            state:'state2',
            coreNumber:'5',
            memory: '3.78G',
            memoryUsage:80,
            number:'12',
            type:'XENSERVER',
            createTime:'1992-11-55 12:55:88',
            remark:''
          },
        ],/*节点资源库列表*/
        RowContent:false,/*详细信息初始不显示，双击时改为true，为显示状态*/
        activeIndex:'-1',/*视图模式选择index值*/
        multipleSelection:[],/*列表模式选中值*/
        dialogFormVisible: false,/*添加对话框显示状态*/
        detailInfo:{
          pathName:'',/*跳转选中的name值*/
          number:'',/*虚拟机使用数量*/
          detailTable:[
            {
              name:'RVC01',
              state:'state1',
              coreNumber:'15',
              memory:'1.28G'
            },
            {
              name:'RVC02',
              state:'state2',
              coreNumber:'15',
              memory:'1.28G'
            },
            {
              name:'RVC03',
              state:'state3',
              coreNumber:'15',
              memory:'1.28G'
            },
            {
              name:'RVC04',
              state:'state2',
              coreNumber:'15',
              memory:'1.28G'
            },
            {
              name:'RVC05',
              state:'state3',
              coreNumber:'15',
              memory:'1.28G'
            },
          ],/*主机详情表*/
          detailActive:[],/*主机详情选中值*/
        },/*详细信息*/
        addHost:{
          form: {
            ip:'',
            hostName:'',
            type:[
              {
                value:'KVM SERVER',
                label:'KVM SERVER',
              },
              {
                value:'XEN SERVER',
                label:'XEN SERVER',
              }
            ],
            bridge:'',
            password:'',
            remark: '',
            typeValue:'KVM SERVER',
          },/*添加对话框中表单*/
          formLabelWidth: '120px',/*表单label宽度*/
          rules: {
            ip: [
              { required: true,validator:ipRules,trigger: 'change'},
            ],
            hostName: [
              { required: true, validator:hostNameRules,trigger: 'blur' },
            ],
          },/*表单验证*/
          filterText: '',/*搜索部门*/
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
      }
    },
    created: function () {
      document.title = this.title;
    },
    computed:{
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
      activeItem:function(){
        if(this.activeItem==1){
          this.activeTableName='';
          this.$refs.resourceTable.clearSelection();
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
      itemClick(item){
        this.openRowContent(item.hostName);
        this.detailInfo.pathName=item.hostName;
        this.detailInfo.number=item.number;
        this.$refs.detailTable.clearSelection();/*清空选中*/
      },/*视图模式双击*/
      rowClick(row){
        this.openRowContent(row.hostName);
        this.detailInfo.pathName=row.hostName;
        this.detailInfo.number=row.number;
        this.$refs.detailTable.clearSelection();/*清空选中*/
      },/*列表模式双击*/
      changeFun(val) {
        this.multipleSelection = val;
      },/*复选框状态改变*/
      selectFun(val) {
        this.detailInfo.detailActive = val;
      },/*复选框状态改变*/
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
          if(this.multipleSelection.length<=0){
            this.$message.error(this.$t('rvcpinfo.nosellect'));
          }else{
            console.log(this.multipleSelection);
          }
        }
      },/*删除机器*/
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
      start:function(){
        /*列表模式*/
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.detailActive);
        }
      },/*开机*/
      pause:function(){
        /*列表模式*/
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.detailActive);
        }
      },/*暂停*/
      shut:function(){
        /*列表模式*/
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.detailActive);
        }
      },/*关机*/
      resumet:function(){
        /*列表模式*/
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.detailActive);
        }
      },/*恢复*/
      restart:function(){
        /*列表模式*/
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.detailActive);
        }
      },/*重启*/
      addHosttest:function(form) {
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
  .el-button [class*=fa]+span{margin-left:5px;}
  .el-dialog .el-input,.el-dialog .el-select {width:86%;}
  .el-switch{height:40px;line-height: 40px;}
  .textover{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor:pointer;
  }
  .yellow{
    color:#ffc731;
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
  .nav2_9 .el-switch__label{height:40px;}
  .nav2_9 .el-switch__label.is-active{color:#5a5e66;}
  .nav2_9 .el-table__body tr.current-row:hover>td{background-color:rgb(234, 249, 239);}
  .nav2_9 .el-textarea__inner{resize:none;}
</style>
