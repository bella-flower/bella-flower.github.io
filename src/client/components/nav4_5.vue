<template>
    <el-container class="main">
      <div class="content">
        <div class="header">
          <div>{{$t('nav4_5.title')}}</div>
          <div class="rightbtn">
            <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
            <el-button  size="small" icon="el-icon-circle-plus-outline" style="margin-right: 5px" @click="dialogNewVisible=true">{{$t('nav4_1.detailInfo.buttonGroup.newBtn')}}</el-button>
            <el-button icon="el-icon-delete" plain size="small" style="margin-right: 5px" @click="del()">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" style="margin:0 15px 0 10px">
              <el-button icon="el-icon-upload2" plain size="small" >{{$t('nav4_1.detailInfo.buttonGroup.uploadBtn')}}</el-button>
            </el-upload>
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
              <el-button  size="small" icon="el-icon-back">{{$t('nav4_1.detailInfo.buttonGroup.parentBtn')}}</el-button>
              <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;margin-left: 20px;height: 14px; line-height: 23px;">
                <el-breadcrumb-item>{{$t('nav4_1.detailInfo.buttonGroup.home')}}</el-breadcrumb-item>
                <el-breadcrumb-item>hcdata</el-breadcrumb-item>
                <el-breadcrumb-item>users</el-breadcrumb-item>
                <el-breadcrumb-item>rvcpadm</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="rightTable">
              <el-table v-loading="tableloading" ref="detailTable" @selection-change="selectFun" :row-style="rowClass"  :border=true :data="jobDataTable" height="calc()">
                <el-table-column type="selection" width="50" prop="select" @selection-change="selectFun"></el-table-column>
                <el-table-column prop="name" :label="$t('nav4_1.detailInfo.infoTable.cell_1')"  :sortable="true" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <img src="../../../static/img/folder.png" alt="">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="owner" :label="$t('nav4_1.detailInfo.infoTable.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="size" :label="$t('nav4_1.detailInfo.infoTable.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="type" :label="$t('nav4_1.detailInfo.infoTable.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updated" :label="$t('nav4_1.detailInfo.infoTable.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
          </div>
        </el-row>
        <!--新建框-->
        <el-dialog :title="$t('nav4_1.detailInfo.newdialog.title')" :visible.sync="dialogNewVisible" ref="newdialog"  width="480px" :before-close="closenewdialog">
          <el-form  :model="newdialog" ref="newform">
            <el-form-item :label="$t('nav4_1.detailInfo.newdialog.label')" prop="new" :label-width="newdialog.formLabelWidth">
              <el-input v-model="newdialog.new"  auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cleannewform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
            <el-button type="primary"  @click="newSubmit('newform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
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
        title: 'RVCP-工业仿真平台',
        tableloading:false, //表格加载动画,
        dialogNewVisible:false,/*新建*/
        newdialog:{
          new:'',
          formLabelWidth:'120px'
        },/*新建框*/
        jobDataTable:[
          {
            name:'Desktop',
            owner:'rvcpadm',
            size:'13KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'Public',
            owner:'rvcpadm',
            size:'13KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'Videos',
            owner:'rvcpadm',
            size:'13KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'Templates',
            owner:'rvcpadm',
            size:'13KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'ABAQUS5',
            owner:'rvcpadm',
            size:'13KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'ABAQUS6',
            owner:'rvcpadm',
            size:'13KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'sql',
            owner:'rvcpadm',
            size:'13KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
        ],/*作业数据详情表*/
        jobDataActive:[],/*作业数据选中值*/
        directInfo: [
          {
            id: 1,
            label: 'CAE',
            children: [{
              id: 4,
              label: '7898',
              children: [{
                id: 5,
                label: '7896',
              }]
            }],
          },
          {
            id: 2,
            label: 'EDA',
            children: [{
              id: 5,
              label: '7896'
            }, {
              id: 6,
              label: '7898'
            }]
          },
          {
            id:3,
            label:'日产'
          }],/*部门tree信息*/
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
        height: 'calc(100vh - 60px - 50px - 70px - 100px - 36px)', //可滚动区域高度
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
      selectFun(val) {
        this.jobDataActive = val;
      },/*复选框状态改变*/
      del:function(){
        if(this.jobDataActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.jobDataActive);
        }
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
      cleannewform(){
        this.$refs['newform'].resetFields();
        this.dialogNewVisible = false
      },//清除新建表单数据
      closenewdialog(done){
        this.cleannewform();
        done();
      },//关闭新建对话框回调
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
    height:calc(100vh - 60px - 50px - 100px - 46px);
    border: #d7d7d7 1px solid;
  }
  .table_header{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    margin-bottom:5px;
    height:40px;
  }
  .table_header span{
    font-weight:500;
  }
</style>
<style>
</style>
