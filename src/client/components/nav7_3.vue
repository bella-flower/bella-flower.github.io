<template>
  <el-container class="main nav7_3">
    <div class="content">
      <div class="header">
        <div>{{$t('nav7_3.title')}}</div>
        <div class="rightbtn">
          <el-button icon="el-icon-refresh" plain size="small"  @click="refreshTable" style="margin-right: 5px;" >{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button icon="el-icon-circle-plus-outline" plain  size="small" @click="dialogFormVisible=true" style="margin-right: 5px">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" @click='del()' style="margin-right: 5px">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <el-table v-loading="tableloading" ref="projectTable"  @selection-change="changeFun" :row-style="rowClass"  @row-dblclick="rowClick" :border=true :data="projectTable"  height="calc()" style="text-align: left"  >
          <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="id" label="ID"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="project" :label="$t('nav7_3.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="created" :label="$t('nav7_3.table.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="start" :label="$t('nav7_3.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="end" :label="$t('nav7_3.table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="delay" :label="$t('nav7_3.table.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" :label="$t('nav7_3.table.cell_6')" :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="scope.row.status === 'state1' ? 'color1' : ''||scope.row.status === 'state2' ? 'color2' : ''||scope.row.status === 'state3' ? 'color3' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.status === 'state1'? $t('nav7_3.table.state1') : ''||scope.row.status === 'state2'? $t('nav7_3.table.state2') : ''||scope.row.status === 'state3'? $t('nav7_3.table.state3') : ''}}
                  </span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="$t('nav7_3.table.cell_7')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog :title="$t('nav7_3.addDialog.title')" :visible.sync="dialogFormVisible" ref="dialog" width="680px" :before-close="closedialog">
        <el-form :model="addPro.form" ref="form">
          <el-form-item label="ID" prop="id" :label-width="addPro.formLabelWidth">
            <el-input v-model="addPro.form.id"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav7_3.addDialog.cell_1')"  :label-width="addPro.formLabelWidth">
            <el-input v-model="addPro.form.project"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav7_3.addDialog.cell_2')"  :label-width="addPro.formLabelWidth">
            <el-date-picker style="width:86%;" v-model="addPro.form.time" type="daterange" align="right" unlink-panels :range-separator="$t('nav5_1.header.range')" :start-placeholder="$t('nav5_1.header.start')" :end-placeholder="$t('nav5_1.header.end')" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('nav7_3.addDialog.cell_3')" :label-width="addPro.formLabelWidth">
            <el-input v-model="addPro.form.remark"  type="textarea" :rows="8" style="width:86%;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav7_3.addDialog.cell_4')" :label-width="addPro.formLabelWidth">
            <el-switch style="display: block;height:40px;line-height:40px;" v-model="addPro.form.backup" active-color="#13ce66"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addProSubmit('form')">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--编辑-->
      <el-dialog :title="$t('nav7_3.detailInfo.updateDialog.title')" :visible.sync="infoTables.dialogEditVisible" ref="editDialog"  width="680px" :before-close="closeeditdialog">
        <el-form  :model="infoTables.editDialog" ref="editform">
          <el-form-item :label="$t('nav7_3.detailInfo.updateDialog.cell_1')" :label-width="addPro.formLabelWidth">
            <el-input v-model="infoTables.editDialog.project"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav7_3.detailInfo.updateDialog.cell_2')" :label-width="addPro.formLabelWidth">
            <span>{{infoTables.editDialog.created}}</span>
          </el-form-item>
          <el-form-item :label="$t('nav7_3.detailInfo.updateDialog.cell_3')" :label-width="addPro.formLabelWidth">
            <span>{{infoTables.editDialog.end}}</span>
          </el-form-item>
          <el-form-item :label="$t('nav7_3.detailInfo.updateDialog.cell_4')" :label-width="addPro.formLabelWidth">
            <el-date-picker v-model="infoTables.editDialog.delay" type="datetime" :placeholder="$t('nav7_3.detailInfo.updateDialog.placeholder')">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('nav7_3.detailInfo.updateDialog.cell_5')" :label-width="addPro.formLabelWidth">
            <el-input v-model="infoTables.editDialog.remark"  type="textarea" :rows="8" style="width:86%;" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleaneditform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="edltSubmit('editform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--部门添加用户-->
      <el-dialog :title="$t('nav7_3.detailInfo.addUserDialog.title')" :visible.sync="infoTables.addUserDialog" ref="addUserDialog" width="680px" :before-close="closeTable">
        <div class="dialog_header">
          <div>{{$t('nav7_1.detailInfo.title3')}}</div>
          <div class="rightbtn">
            <el-select v-model="infoTables.departmentValue" :placeholder="$t('nav2_1.select.placeholder')" size="small" style="width:130px;margin-right:5px;" >
              <el-option :key="this.$t('nav4_1.select.option1')" :label="this.$t('nav4_1.select.option1')" :value="this.$t('nav4_1.select.option1')">
              </el-option>
              <el-option  v-for="(item, index) in infoTables.departmentOptions" :key="item.value" :label="item.label" :value="item.value">
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
            <el-table-column prop="user" :label="$t('nav7_3.detailInfo.addUserDialog.table.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="project" :label="$t('nav7_3.detailInfo.addUserDialog.table.cell_2')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="department" :label="$t('nav7_3.detailInfo.addUserDialog.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanTable">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addUserSubmit()">{{$t('nav7_1.detailInfo.addUserDialog.addBtn')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-show="RowContent" class="content rowcontent">
      <div class="header">
        <div><span style="color: #2cc362;cursor: pointer;font-weight: 600" @click="RowContent=false">{{$t('nav7_3.title')}}</span> ><span>{{$t('nav7_3.detailInfo.title')}}</span></div>
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
              <el-table-column prop="project" :label="$t('nav7_3.table.cell_1')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="created" :label="$t('nav7_3.table.cell_2')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="start" :label="$t('nav7_3.table.cell_3')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="end" :label="$t('nav7_3.table.cell_4')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="delay" :label="$t('nav7_3.table.cell_5')" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" :label="$t('nav7_3.table.cell_6')" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span :class="scope.row.status === 'state1' ? 'color1' : ''||scope.row.status === 'state2' ? 'color2' : ''||scope.row.status === 'state3' ? 'color3' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.status === 'state1'? $t('nav7_3.table.state1') : ''||scope.row.status === 'state2'? $t('nav7_3.table.state2') : ''||scope.row.status === 'state3'? $t('nav7_3.table.state3') : ''}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" :label="$t('nav7_3.table.cell_7')" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="host-list">
          <div class="header_table">
            <div class="table_title">{{$t('nav7_1.detailInfo.title3')}}</div>
            <div>
              <el-button icon="el-icon-circle-plus-outline" plain  size="small" @click="infoTables.addUserDialog=true" style="margin-right: 5px">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
              <el-button icon="el-icon-delete" plain size="small" @click="delUserTable()" style="margin-right: 5px">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
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
        dialogFormVisible:false,
        RowContent:false,/*详细信息初始不显示，双击时改为true，为显示状态*/
        projectTable:[
          {
            id:'demo01',
            project:'EP01',
            created:'2017-12-21 17:22:55',
            start:'2017-12-21 17:22:55',
            end:'2017-12-21 17:22:55',
            delay:'0',
            status:'state1',
            remark:''
          },
          {
            id:'demo02',
            project:'EP01',
            created:'2017-12-21 17:22:55',
            start:'2017-12-21 17:22:55',
            end:'2017-12-21 17:22:55',
            delay:'0',
            status:'state2',
            remark:''
          },
          {
            id:'demo03',
            project:'EP01',
            created:'2017-12-21 17:22:55',
            start:'2017-12-21 17:22:55',
            end:'2017-12-21 17:22:55',
            delay:'0',
            status:'state3',
            remark:''
          },
        ],/*列表*/
        multipleSelection:[],/*列表模式选中值*/
        infoTables:{
          dialogEditVisible:false,
          addUserDialog:false,
          info_table:[{
              id:'demo01',
              project:'EP01',
              created:'2017-12-21 17:22:55',
              start:'2017-12-21 17:22:55',
              end:'2017-12-21 17:22:55',
              delay:'0',
              status:'state1',
              remark:''
          }],
          user_table:[
            {
              user:'Lily',
              department:'CAE',
              project:'EP01',
            },
            {
              user:'Tom',
              department:'CAE',
              project:'EP01',
            }
          ],
          userSelect:[],
          editDialog:{
            project:'EP01',
            created:'2017-11-21 11:22:55',
            end:'2018-01-21 11:22:55',
            delay:'',
            remark:''
          },
          searchData:'',
          addUserTable:[
            {
              user:'demo',
              project:'EP01',
              department:'测试部门',

            },{
              user:'demo',
              project:'EP01',
              department:'测试部门',

            },{
              user:'demo',
              project:'EP01',
              department:'测试部门',
            }
          ],
          addUserSelect:[],
          departmentOptions:[
            {
              value:'CAE',
              label:'CAE',
            },
            {
              value:'EDA',
              label:'EDA',
            }
          ],
          departmentValue:'',
        },
        addPro:{
          form: {
            id:'',
            project:'',
            time:'',
            remark: '',
            backup:true,
          },/*添加对话框中表单*/
          formLabelWidth: '120px',/*表单label宽度*/
        },/*添加表单*/
        pickerOptions2: {
          shortcuts: [{
            text: this.$t('nav5_1.header.pickerOptions2.text1'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: this.$t('nav5_1.header.pickerOptions2.text2'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: this.$t('nav5_1.header.pickerOptions2.text3'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
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
        var urlStrArr = urlStr.split('/');
        return urlStrArr[urlStrArr.length - 1]
      },
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },/*列表每行添加小手*/
      changeFun(val) {
        this.multipleSelection = val;
      },/*复选框状态改变*/
      changeFun1(val) {
        this.infoTables.userSelect = val;
      },/*复选框状态改变*/
      changeFun2(val) {
        this.infoTables.addUserSelect = val;
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
      delUserTable:function(){
        if(this.infoTables.userSelect.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.infoTables.userSelect);
        }
      },/*删除用户表*/
      rowClick(row){
        this.openRowContent(row.hostName);
      },/*列表模式双击*/
      addProSubmit:function(form) {
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
      addUserSubmit:function(form) {
      },/*添加用户提交*/
      edltSubmit:function(form){
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
      },
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
      cleaneditform(){
        this.$refs['editform'].resetFields();
        this.infoTables.editDialog.delay='';
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
        this.pickerOptions2.shortcuts[0].text = this.$t('nav5_1.header.pickerOptions2.text1');
        this.pickerOptions2.shortcuts[1].text = this.$t('nav5_1.header.pickerOptions2.text2');
        this.pickerOptions2.shortcuts[2].text = this.$t('nav5_1.header.pickerOptions2.text3');      },//国际化chart
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog .el-input,.el-dialog .el-select {width:86%;}
  .color1{
    color:#409efe;
  }
  .color2{
    color:#68c339;
  }
  .color3{
    color:#ffc732;
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
  .nav7_3 .el-textarea__inner{resize:none;}
</style>
