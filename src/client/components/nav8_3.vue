<template>
  <el-container class="main nav8_3">
    <div class="content">
      <div class="header">
        <div>{{$t('nav8_3.title')}}</div>
        <div class="rightbtn">
          <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px;">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-circle-plus-outline" @click="add()" style="margin-right: 5px;">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-edit" @click="edit()"  style="margin-right: 5px;">{{$t('nav8_2.editBtn')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" @click="del()" style="margin-right: 5px;">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <el-table v-loading="tableloading" ref="agentTable"  @selection-change="changeFun" :row-style="rowClass"  :border=true :data="agentTable"  height="calc()" style="text-align: left"  >
          <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="name" :label="$t('nav8_3.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="code" :label="$t('nav8_3.table.cell_2')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="software" :label="$t('nav8_3.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="contacts" :label="$t('nav8_3.table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" :label="$t('nav8_3.table.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="agentLevel" :label="$t('nav8_3.table.cell_6')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="serverLevel" :label="$t('nav8_3.table.cell_7')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog :title="titleDialog"  :visible.sync="dialogFormVisible" ref="dialog" width="680px" :before-close="closedialog">
        <el-form :model="addAgent.form" ref="form">
          <el-form-item :label="$t('nav8_3.table.cell_2')" :label-width="addAgent.formLabelWidth">
              <el-input v-model="addAgent.form.code"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav8_3.addDialog.cell_1')" :label-width="addAgent.formLabelWidth">
            <el-input v-model="addAgent.form.name"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav8_3.table.cell_3')" :label-width="addAgent.formLabelWidth">
            <el-input v-model="addAgent.form.software"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav8_3.table.cell_4')" :label-width="addAgent.formLabelWidth">
            <el-input v-model="addAgent.form.contacts"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav8_3.table.cell_5')" :label-width="addAgent.formLabelWidth">
            <el-input v-model="addAgent.form.phone"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav8_3.table.cell_6')" :label-width="addAgent.formLabelWidth">
            <el-input v-model="addAgent.form.agentLevel"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav8_3.table.cell_7')" :label-width="addAgent.formLabelWidth">
            <el-input v-model="addAgent.form.serverLevel"  auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="addSubmit('form')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
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
      return {
        title:'RVCP-工业仿真平台',
        tableloading:false, //表格加载动画,
        titleDialog:'',
        agentTable:[
          {
            name:'DAICY',
            code: '1.63',
            software:'ABAQUS',
            contacts:'DEMO',
            phone:'13254545151',
            agentLevel:'1',
            serverLevel:'1',
          },
        ],/*节点资源库列表*/
        multipleSelection:[],/*列表模式选中值*/
        dialogFormVisible:false,
        addAgent:{
          form:{
            code: '',
            name:'DAICY',
            software:'',
            contacts:'',
            phone:'',
            agentLevel:'',
            serverLevel:'',
          },
          formLabelWidth:'120px',
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
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      },
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },/*列表每行添加小手*/
      changeFun(val) {
        this.multipleSelection = val;
      },/*复选框状态改变*/
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
      refreshTable(){

      },/*刷新*/
      add:function(){
        this.titleDialog=this.$t('nav8_3.addDialog.title1');
        this.dialogFormVisible=true;
      },/*添加*/
      del:function(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*删除*/
      edit:function(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          this.titleDialog=this.$t('nav8_3.addDialog.title2');
          this.dialogFormVisible=true;
          console.log(this.multipleSelection);
        }

      },/*编辑*/
      addSubmit:function(form){
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
      },/*添加用户*/
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
</style>
<style>
</style>
