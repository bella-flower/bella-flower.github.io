<template>
  <el-container class="main nav6_2">
    <div class="content">
      <div class="header">
        <div>{{$t('nav6_2.title')}}</div>
        <div class="rightbtn">
          <el-button icon="el-icon-refresh" plain size="small"  @click="refreshTable" style="margin-right: 5px;" >{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button icon="el-icon-circle-plus-outline" plain  size="small" @click="dialogFormVisible=true" style="margin-right: 5px">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" @click='del()' style="margin-right: 5px">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <el-table v-loading="tableloading" ref="serverTable"  @selection-change="changeFun" :row-style="rowClass"  @row-dblclick="rowClick" :border=true :data="serverTable"  height="calc()" style="text-align: left"  >
          <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="hostname" :label="$t('nav6_2.table.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ip" :label="'IP'" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="license_Num" :label="$t('nav6_2.table.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="state" :label="$t('nav6_2.table.cell_3')" :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="scope.row.state === 'state1' ? 'green' : ''||scope.row.state === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.state === 'state1'? $t('nav6_2.table.state1') : ''||scope.row.state === 'state2'? $t('nav6_2.table.state2') : ''}}
                  </span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog :title="$t('nav6_2.addDialog.title')" :visible.sync="dialogFormVisible" ref="dialog" width="680px" :before-close="closedialog">
        <el-form :model="addLS.form" ref="form" :rules="addLS.rules">
          <el-form-item :label="$t('nav6_2.addDialog.cell_1')" :label-width="addLS.formLabelWidth">
            <el-select v-model="addLS.form.value" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in addLS.form.OS" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP" prop="ip" :label-width="addLS.formLabelWidth">
            <el-input v-model="addLS.form.ip"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav6_2.addDialog.cell_2')"  prop="hostName" :label-width="addLS.formLabelWidth">
            <el-input v-model="addLS.form.hostName"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav6_2.addDialog.cell_3')" :label-width="addLS.formLabelWidth">
            <el-input v-model="addLS.form.remark"  type="textarea" :rows="8" style="width:86%;" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addLSSubmit('form')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-show="RowContent" class="content rowcontent">
      <div class="header">
        <div><span style="color: #2cc362;cursor: pointer;font-weight: 600"  @click="RowContent=false">{{$t('nav6_2.title')}}</span> >
          <span>{{$t('nav6_2.detailInfo.title')}}</span></div>
        <div class="rightbtn">
          <el-button icon="el-icon-delete" plain size="small" style="margin-right: 5px" @click="detailListDel()">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
        </div>
      </div>
      <div class="infoContent">
        <div class="session-list">
          <div class="bottom-table">
            <el-table v-loading="tableloading" ref="detailTable" @selection-change="selectFun" :row-style="rowClass"  :border=true :data="detailInfo.detailTable" height="calc()" style="text-align: left"  >
              <el-table-column type="selection" width="50" prop="select" @selection-change="selectFun"></el-table-column>
              <el-table-column prop="name" :label="$t('nav6_2.detailInfo.table.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="version" :label="$t('nav6_2.detailInfo.table.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="port" :label="$t('nav6_2.detailInfo.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="type" :label="$t('nav6_2.detailInfo.table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" :label="$t('nav6_2.detailInfo.table.cell_5')" :sortable="true" show-overflow-tooltip>
                <template slot-scope="scope">
              <span :class="scope.row.status === 'state1' ? 'green' : ''||scope.row.status === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.status === 'state1'? $t('nav6_2.detailInfo.table.state1') : ''||scope.row.status === 'state2'? $t('nav6_2.detailInfo.table.state2') : ''}}
                  </span>
                </template>
              </el-table-column>
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
      return {
        title: 'RVCP-工业仿真平台',
        tableloading:false, //表格加载动画,
        dialogFormVisible:false,
        RowContent:false,/*详细信息初始不显示，双击时改为true，为显示状态*/
        serverTable:[
          {
            hostname: '192.168.100.235',
            ip:'192.168.100.235',
            license_Num:'6',
            state:'state1',
          },
          {
            hostname: '192.168.100.205',
            ip:'192.168.100.205',
            license_Num:'0',
            state:'state2',
          },
        ],/*节点资源库列表*/
        multipleSelection:[],/*列表模式选中值*/
        detailInfo:{
          detailTable:[
            {
              name:'abaqus',
              version:'14.5',
              port:'23102',
              type:'FLEXLM',
              status:'state1'
            },
            {
              name:'ansys',
              version:'12.1',
              port:'27530',
              type:'FLEXLM',
              status:'state1'
            },
            {
              name:'nastran',
              version:'18.9',
              port:'27520',
              type:'FLEXLM',
              status:'state2'
            },
          ],/*主机详情表*/
          detailActive:[],/*主机详情选中值*/
        },/*详细信息*/
        addLS:{
          form: {
            OS:[
              {
                value: 'Windows',
                label: 'Windows'
              },
              {
                value: 'Linux',
                label: 'Linux'
              }
            ],
            value:'Windows',/*默认选中部门*/
            ip:'',
            hostName:'',
            remark: '',
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
      selectFun(val) {
        this.detailInfo.detailActive = val;
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
      detailListDel:function(){
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.detailActive);
        }
      },
      rowClick(row){
        this.openRowContent(row.hostName);

        this.$refs.detailTable.clearSelection();/*清空选中*/
      },/*列表模式双击*/
      addLSSubmit:function(form) {
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
  .list-item{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    padding:15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
    position: absolute;
    top: 55px;
    left: 0;
    z-index: 50;
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
    height:calc(100vh - 60px - 50px - 70px - 100px);
    /*border: 1px solid #d7d7d7;*/
    border-radius: 8px;
    padding:15px;
  }
</style>
<style>
  .nav6_2 .el-textarea__inner{resize:none;}
</style>
