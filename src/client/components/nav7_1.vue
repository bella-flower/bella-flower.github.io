<template>
  <el-container class="main nav7_1">
    <div class="content">
      <div class="header">
        <div>{{$t('nav7_1.title')}}</div>
        <div class="rightbtn">
          <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px;">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-circle-plus-outline" @click="dialogAddVisible=true" style="margin-right: 5px;">{{$t('nav7_1.buttonGroup.addDepartment')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" @click="del()" style="margin-right: 5px;">{{$t('nav7_1.buttonGroup.delDepartment')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <div class="left">
          <div class="ztreeLeft">
            <el-tree :data="directInfo" :props="defaultProps" show-checkbox node-key="id" ref="tree" :expand-on-click-node="true" ></el-tree>
          </div>
        </div>
        <div class="right">
          <div class="table_header">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;height: 14px; line-height: 23px;">
              <el-breadcrumb-item>{{$t('nav7_1.title2')}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="rightTable">
            <el-table v-loading="tableloading" ref="departmentTable" @selection-change="selectFun" :row-style="rowClass"  @row-dblclick="rowClick" :border=true :data="departmentTable" height="calc()">
              <el-table-column type="selection" width="50" prop="select" @selection-change="selectFun"></el-table-column>
              <el-table-column prop="id" :label="'ID'"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="name" :label="$t('nav7_1.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="time" :label="$t('nav7_1.table.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="remark" :label="$t('nav7_1.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
      </el-row>
      <!--添加部门-->
      <el-dialog :title="$t('nav7_1.addDialog.title')" :visible.sync="dialogAddVisible" ref="adddialog"  width="680px" :before-close="closenewdialog">
        <el-form  :model="adddialog" ref="addform">
          <el-form-item :label="'ID'" :label-width="adddialog.formLabelWidth">
            <el-input v-model="adddialog.id"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav7_1.addDialog.cell_1')" :label-width="adddialog.formLabelWidth">
            <el-input v-model="adddialog.name"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav7_1.addDialog.cell_2')" :label-width="adddialog.formLabelWidth">
            <el-input v-model="adddialog.remark"  type="textarea" :rows="8" style="width:86%;" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleannewform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addSubmit('newform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--编辑-->
      <el-dialog :title="$t('nav7_1.detailInfo.editDialog.title')" :visible.sync="infoTables.dialogEditVisible" ref="editDialog"  width="680px" :before-close="closeeditdialog">
        <el-form  :model="infoTables.editDialog" ref="editform">
          <el-form-item :label="$t('nav7_1.detailInfo.editDialog.cell_1')" :label-width="adddialog.formLabelWidth">
            <el-input v-model="infoTables.editDialog.department"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav7_1.detailInfo.editDialog.cell_2')" :label-width="adddialog.formLabelWidth">
            <el-input v-model="infoTables.editDialog.remark"  type="textarea" :rows="8" style="width:86%;" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleaneditform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="edltSubmit('editform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--部门添加用户-->
      <el-dialog :title="$t('nav7_1.detailInfo.addUserDialog.title')" :visible.sync="infoTables.addUserDialog" ref="addUserDialog" width="680px" :before-close="closeTable">
        <div class="dialog_header">
          <div>{{$t('nav7_1.detailInfo.title3')}}</div>
          <div class="rightbtn">
            <el-select v-model="infoTables.projectValue" :placeholder="$t('nav2_1.select.placeholder')" size="small" style="width:130px;margin-right:5px;" >
              <el-option :key="this.$t('nav4_1.select.option1')" :label="this.$t('nav4_1.select.option1')" :value="this.$t('nav4_1.select.option1')">
              </el-option>
              <el-option  v-for="(item, index) in infoTables.projectOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input :placeholder="$t('nav7_1.detailInfo.addUserDialog.placeholder')"  size="small" v-model="infoTables.searchData" class="input-with-select" style="width:190px;" >
              <el-button slot="append"  size="small" style="background-color: #3abb53;color:#fff;"  icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <el-row class="userTables">
          <el-table v-loading="tableloading" ref="addUserTable" :open="showmodel()" :row-style="rowClass" @selection-change="changeFun2" :border=true :data="infoTables.addUserTable"  height="calc()" style="text-align: left"  >
            <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun2"></el-table-column>
            <el-table-column prop="user" :label="$t('nav7_1.detailInfo.addUserDialog.table.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="department" :label="$t('nav7_1.detailInfo.addUserDialog.table.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="created" :label="$t('nav7_1.detailInfo.addUserDialog.table.cell_3')"  :sortable="true" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanTable">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addUserSubmit()">{{$t('nav7_1.detailInfo.addUserDialog.addBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--添加角色-->
      <el-dialog :title="$t('nav7_1.detailInfo.setRoleDialog.title')" :visible.sync="infoTables.setRoleDialog" ref="setRoleDialog"  width="480px">
        <el-form  :model="infoTables.setRole" ref="setRoleform">
          <el-form-item :label="$t('nav7_1.detailInfo.setRoleDialog.cell_1')" prop="new" :label-width="adddialog.formLabelWidth">
            <el-select v-model="infoTables.setRole.setRoleValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in infoTables.setRole.Role" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="infoTables.setRoleDialog=false">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="setRoleSubmit('setRoleform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-show="RowContent" class="content rowcontent">
      <div class="header">
        <div><span style="color: #2cc362;cursor: pointer;font-weight: 600" @click="RowContent=false">{{$t('nav7_1.title')}}</span> ><span>{{$t('nav7_1.detailInfo.title')}}</span></div>
        <el-button icon="el-icon-refresh"  plain size="small">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
      </div>
      <div class="infoContent">
        <div class="basic-info">
          <div class="header_table">
            <div class="table_title">{{$t('nav7_1.detailInfo.title2')}}</div>
            <el-button icon="el-icon-edit"  plain size="small" @click="infoTables.dialogEditVisible=true">{{$t('nav7_1.detailInfo.buttonGroup.btn_1')}}</el-button>
          </div>
          <div class="top-table">
            <el-table v-loading="tableloading" :row-style="rowClass"  :border=true :data="infoTables.info_table" height="calc()" style="text-align: left;width: 100%"  >
              <el-table-column prop="id" :label="'ID'" show-overflow-tooltip></el-table-column>
              <el-table-column prop="department" :label="$t('nav7_1.detailInfo.table1.cell_1')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="created" :label="$t('nav7_1.detailInfo.table1.cell_2')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="updated" :label="$t('nav7_1.detailInfo.table1.cell_3')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="remark" :label="$t('nav7_1.detailInfo.table1.cell_4')" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="host-list">
          <div class="header_table">
            <div class="table_title">{{$t('nav7_1.detailInfo.title3')}}</div>
            <div>
              <el-button icon="el-icon-circle-plus-outline" @click="infoTables.addUserDialog=true"  plain size="small">{{$t('nav7_1.detailInfo.buttonGroup.btn_2')}}</el-button>
              <el-button icon="el-icon-delete"  @click="delUser()" plain size="small">{{$t('nav7_1.detailInfo.buttonGroup.btn_3')}}</el-button>
              <el-button icon="el-icon-setting"  plain size="small" @click="infoTables.setRoleDialog=true">{{$t('nav7_1.detailInfo.buttonGroup.btn_4')}}</el-button>
            </div>
          </div>
          <div class="bottom-table">
            <el-table v-loading="tableloading"  :row-style="rowClass" :border=true  @selection-change="changeFun1" :data="infoTables.user_table" height="calc()"  style="text-align: left"  >
              <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun1"></el-table-column>
              <el-table-column prop="user" :label="$t('nav7_1.detailInfo.table2.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="department" :label="$t('nav7_1.detailInfo.table2.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="project" :label="$t('nav7_1.detailInfo.table2.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
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
        RowContent:false,
        dialogAddVisible:false,/*添加部门*/
        adddialog:{
          id:'',
          name:'',
          remark:'',
          formLabelWidth:'120px'
        },/*新建框*/
        departmentTable:[
          {
            id:'111',
            name:'CAE',
            time:'2017-10-19 10:20:30',
            remark:''
          },
          {
            id:'112',
            name:'EDA',
            time:'2017-02-19 13:20:30',
            remark:''
          },
          {
            id:'113',
            name:'日产',
            time:'2017-10-17 09:20:30',
            remark:''
          },
        ],/*作业数据详情表*/
        departmentActive:[],/*作业数据选中值*/
        directInfo: [
          {
            id: 1,
            label: 'CAE',
            children: [{
              id: 4,
              label: '7898',
              children: [{
                id: 5,
                label: '7788',
              }]
            }],
          },
          {
            id: 2,
            label: 'EDA',
            children: [{
              id: 5,
              label: '7898'
            }, {
              id: 6,
              label: '7689'
            }]
          },
          {
            id:3,
            label:'日产',
          }],/*部门tree信息*/
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        infoTables:{
          dialogEditVisible:false,
          addUserDialog:false,
          setRoleDialog:false,
          info_table:[{
            id:'111',
            department:'CAE',
            created:'2017-10-19 10:20:30',
            updated:'2018-11-12 12:44:33',
            remark:'0',
          }],
          user_table:[
            {
              user:'Lily',
              department:'CAE',
              project:'',
            },
            {
              user:'Tom',
              department:'CAE',
              project:'',
            }
          ],
          userSelect:[],
          editDialog:{
            department:'',
            remark:''
          },
          searchData:'',
          addUserTable:[
            {
              user:'demo',
              department:'测试部门',
              created:'2017-11-14 12:15:55'
            },{
              user:'demo1',
              department:'管理部门',
              created:'2017-11-14 12:15:55'
            },{
              user:'demo2',
              department:'技术部门',
              created:'2017-11-14 12:15:55'
            }
          ],
          addUserSelect:[],
          projectOptions:[
            {
              value:'EP01',
              label:'EP01',
            }
          ],
          projectValue:'',
          setRole:{
            Role:[
              {
                value:'general',
                label:'general',
              },{
                value:'ceshi',
                label:'ceshi',
              }
            ],
            setRoleValue:'general',
          },
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
      $(".list-item .ztreeLeft").slimScroll({
        width:'260px', //可滚动区域宽度
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
      });//列表滚动
      $(".list-item .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 70px - 100px - 18px)', //可滚动区域高度
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
      },
      changeLanguage (){
        this.i18nChart();
      },

    },
    methods: {
      showmodel:function(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".userTables  .el-table__body-wrapper").slimScroll({
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
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      },
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },/*列表每行添加小手*/
      selectFun(val) {
        this.departmentActive = val;
      },/*复选框状态改变*/
      changeFun1(val) {
        this.infoTables.userSelect = val;
      },/*复选框状态改变*/
      changeFun2(val) {
        this.infoTables.addUserSelect = val;
      },/*复选框状态改变*/
      del:function(){
        if(this.departmentActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.departmentActive);
        }
      },
      delUser:function(){
        if(this.infoTables.userSelect.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.infoTables.userSelect);
        }
      },
      rowClick(row){
        this.openRowContent(row.queueName);
      },
      openRowContent(){
        this.RowContent = true;
        //+ajax请求
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

      },//根据条件获取图表数据
      addSubmit:function(form){},/*添加部门*/
      edltSubmit:function(form){},/*编辑*/
      addUserSubmit:function(){},/*添加用户*/
      setRoleSubmit:function(form){},/*设置角色*/
      cleannewform(){
        this.$refs['addform'].resetFields();
        this.dialogAddVisible = false;
      },//清除新建表单数据
      closenewdialog(done){
        this.cleannewform();
        done();
      },//关闭新建对话框回调
      cleaneditform(){
        this.$refs['editform'].resetFields();
        this.infoTables.dialogEditVisible = false;
      },//清除编辑表单数据
      closeeditdialog(done){
        this.cleaneditform();
        done();
      },//关闭编辑对话框回调
      cleanTable(){
        this.$refs.addUserTable.clearSelection();
        this.infoTables.addUserDialog = false
      },
      closeTable(done){
        this.cleanTable();
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
  .left{
    width:260px;
    height:calc(100vh - 60px - 50px - 100px);
    margin-right:20px;
    border: #d7d7d7 1px solid;
  }
  .right{
    width: calc(100% - 280px );
    height:calc(100vh - 60px - 50px - 100px);
  }
  .rightTable{
    width:100%;
    height:calc(100vh - 60px - 50px - 100px - 30px);
    border: #d7d7d7 1px solid;
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
    height:160px;
  }
  .header_table{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    margin-bottom:5px;
    height:36px;
  }
  .host-list{
    height:calc(100vh  - 60px - 50px - 70px - 415px);
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
  .dialog_header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height:40px;width:100%;
    margin-bottom:3px;
  }
</style>
<style>
  .nav7_1 .el-textarea__inner{resize:none;}
</style>
