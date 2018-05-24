<template>
  <el-container class="main nav7_4">
    <div class="content">
      <div class="header">
        <div>{{$t('nav7_4.title')}}</div>
        <div class="rightbtn">
          <el-button icon="el-icon-refresh" plain size="small"  @click="refreshTable" style="margin-right: 5px;" >{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button icon="el-icon-circle-plus-outline" plain  size="small" @click="dialogFormVisible=true" style="margin-right: 5px">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" @click='del()' style="margin-right: 5px">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <el-table v-loading="tableloading" ref="roleTable"  @selection-change="changeFun" :row-style="rowClass"  @row-dblclick="rowClick" :border=true :data="roleTable"  height="calc()" style="text-align: left"  >
          <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="roleName" :label="$t('nav7_4.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="created" :label="$t('nav7_4.table.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="updated" :label="$t('nav7_4.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remark" :label="$t('nav7_4.table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog :title="$t('nav7_4.addDialog.title')" :visible.sync="dialogFormVisible" ref="dialog" width="680px" :before-close="closedialog">
        <el-form :model="addRole.form" ref="form">
          <el-form-item :label="$t('nav7_4.addDialog.cell_1')" :label-width="addRole.formLabelWidth">
            <el-input v-model="addRole.form.role"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav7_3.addDialog.cell_3')" :label-width="addRole.formLabelWidth">
            <el-input v-model="addRole.form.remark"  type="textarea" :rows="8" style="width:86%;" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addRoleSubmit('form')">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-show="RowContent" class="content rowcontent">
      <div class="header">
        <div><span style="color: #2cc362;cursor: pointer;font-weight: 600" @click="RowContent=false">{{$t('nav7_4.title')}}</span> ><span>{{role}}</span></div>
        <div class="rightbtn">
          <el-button icon="el-icon-refresh"  plain size="small">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button icon="el-icon-edit" :class="{editMask:infoTables.editTrue}"  @click="edit()"  plain size="small">{{$t('nav7_1.detailInfo.buttonGroup.btn_1')}}</el-button>
          <el-button icon="el-icon-circle-check-outline" :class="{mask:infoTables.onTrue}" plain size="small">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
          <el-button icon="el-icon-circle-close-outline" @click="RowContent=false" plain size="small">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
        </div>
      </div>
      <div class="infoContent">
        <div class="basic-info">
          <div class="header_table">
            <div class="table_title">{{$t('nav7_4.detailInfo.toptitle')}}</div>
          </div>
          <div class="top-table" :class="{mask:infoTables.onTrue}">
            <el-table v-loading="tableloading"  :row-style="rowClass" :border=true  :data="infoTables.Apptable" height="calc()"  style="text-align: left"  >
              <el-table-column prop="user" :label="$t('nav7_4.detailInfo.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column :label="$t('nav7_4.detailInfo.table.cell_2')" prop="view">
                <template  slot-scope="scope">
                  <el-checkbox v-model="scope.row.view"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column :label="$t('nav7_4.detailInfo.table.cell_3')" prop="control" >
                <template  slot-scope="scope">
                  <el-checkbox v-model="scope.row.control"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column :label="$t('nav7_4.detailInfo.table.cell_4')" prop="manage"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="host-list">
          <div class="header_table">
            <div class="table_title">{{$t('nav7_4.detailInfo.bottomtitle')}}</div>
          </div>
          <div class="bottom-table" :class="{mask:infoTables.onTrue}">
            <el-table v-loading="tableloading"  :row-style="rowClass" :border=true  :data="infoTables.menuTable" height="calc()"  style="text-align: left"  >
              <el-table-column prop="user" :label="$t('nav7_4.detailInfo.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column :label="$t('nav7_4.detailInfo.table.cell_2')" prop="view">
                <template  slot-scope="scope">
                  <el-checkbox v-model="scope.row.view"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column :label="$t('nav7_4.detailInfo.table.cell_3')" prop="control" >
                <template  slot-scope="scope">
                  <el-checkbox v-model="scope.row.control"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column :label="$t('nav7_4.detailInfo.table.cell_4')" prop="manage"></el-table-column>
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
      return {
        title: 'RVCP-工业仿真平台',
        tableloading:false, //表格加载动画,
        dialogFormVisible:false,
        RowContent:false,/*详细信息初始不显示，双击时改为true，为显示状态*/
        role:'',
        roleTable:[
          {
            roleName:'ceshi',
            created:'2017-12-21 17:22:55',
            updated:'2017-12-21 17:22:55',
            remark:''
          },
          {
            roleName:'admin',
            created:'2017-12-21 17:22:55',
            updated:'2017-12-21 17:22:55',
            remark:''
          },
          {
            roleName:'test',
            created:'2017-12-21 17:22:55',
            updated:'2017-12-21 17:22:55',
            remark:''
          },
        ],/*节点资源库列表*/
        multipleSelection:[],/*列表模式选中值*/
        infoTables:{
          onTrue:true,
          editTrue:false,
          Apptable:[
            {
              user:'demoserver1',
              view:'',
              control:'',
              manage:'',
            },
            {
              user:'demoserver2',
              view:'',
              control:'',
              manage:'',
            }
            ],
          menuTable:[
            {
              user:'demoserver1',
              view:'',
              control:'',
              manage:'',
            },
            {
              user:'demoserver2',
              view:'',
              control:'',
              manage:'',
            }
          ],
        },
        addRole:{
          form: {
            role:'',
            remark: '',
          },/*添加对话框中表单*/
          formLabelWidth: '120px',/*表单label宽度*/
        },/*添加表单*/
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
      $(".bottom-table .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh  - 60px - 50px - 70px - 290px - 215px )', //可滚动区域高度
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
      $(".top-table .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh  - 60px - 50px - 70px - 290px - 215px)', //可滚动区域高度
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
      },
      changeLanguage (){
        this.i18nChart();
      },
    },
    methods: {
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/');
        return urlStrArr[urlStrArr.length - 1]
      },
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },/*列表每行添加小手*/
      changeFun(val) {
        this.multipleSelection = val;
      },/*复选框状态改变*/
      refreshTable(){

      },/*刷新*/
      del:function(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*删除*/
      edit:function(){
        this.infoTables.onTrue=false;
        this.infoTables.editTrue=true;
      },
      rowClick(row){
        this.openRowContent(row.roleName);
        this.role=row.roleName;
        this.infoTables.onTrue=true;
        this.infoTables.editTrue=false;
      },/*列表模式双击*/
      addRoleSubmit:function(form) {
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
      },/*添加项目提交*/
      openRowContent(hostName){
        this.RowContent = true;
        //+ajax请求
      },/*表格数据加载*/
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

      },//根据条件获取图表数据
      cleanform(){
        this.$refs['form'].resetFields();
        this.dialogFormVisible = false
      },//清除表单数据
      closedialog(done){
        this.cleanform();
        done();
      },//关闭对话框回调
      i18nChart : function () {

      },//国际化chart
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog .el-input,.el-dialog .el-select {width:86%;}
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
  .infoContent{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
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
  .list-header{
    height:40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .rightbtn{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .list-item{
    height:calc(100vh - 60px - 50px - 70px);
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    padding: 0 15px 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
    position: absolute;
    top: 55px;
    left: 0;
    z-index: 50;
  }
  .table_header{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    margin-bottom:5px;
    height:22px;
  }
  .table_header span{
    font-weight:500;
  }
  .basic-info{
    /*height:160px;*/
  }
  .header_table{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    height:36px;
  }
  .host-list{
    /*height:calc(100vh  - 60px - 50px - 70px - 415px);*/
  }
  .basic-info,.host-list{
    width:calc(100% - 30px);
    /*border: 1px solid #d7d7d7;*/
    border-radius: 8px;
    margin: 0 10px;
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
  .mask{
    pointer-events:none;
    /*cursor:not-allowed;*/
    opacity: .5;
  }
  .editMask{
    pointer-events:none;
    /*cursor:not-allowed;*/
    opacity: .5;
  }
</style>
<style>
  .nav7_4 .el-textarea__inner{resize:none;}
</style>
