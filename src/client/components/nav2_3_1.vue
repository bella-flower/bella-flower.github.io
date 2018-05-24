<template>
  <el-container class="main nav2_3_1">
      <div class="content">
        <div class="header">
          <div>{{$t('nav2_3_1.title')}}</div>
          <div class="rightbtn">
            <el-button icon="el-icon-news" plain size="small" style="margin-right: 5px">{{$t('nav2_3_1.buttonGroup.newSessionBtn')}}</el-button>
            <el-button icon="el-icon-circle-plus-outline" plain size="small" style="margin-right: 5px" @click="dialogFormVisible = true" >{{$t('nav2_3_1.buttonGroup.addNodeBtn')}}</el-button>
            <el-button icon="el-icon-delete" plain size="small" @click="deleteHost" style="margin-right: 5px" >{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
            <el-button icon="el-icon-refresh" plain size="small" style="margin-right: 5px;margin-left:10px;" @click="refreshTable">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          </div>
        </div>
        <el-row class="view-item">
          <ul>
            <li class="li-item" v-for="(item,index) in serviceData"  @click="itemSelected(index)" :class="{item_hover: activeIndex == index}">
              <div class="li-item-top">
                <div class="hostimg"></div>
                <div class="item-con">
                  <div class="li-item-strip textover"><div class="item-label">{{$t('nav2_3_1.listview.serviceData.cell_1')}}:</div><div class="item-info" v-bind:title="item.hostName">{{item.hostName}}</div></div>
                  <div class="li-item-strip textover"><div class="item-label">{{"IP"}}:</div><div class="item-info" v-bind:title="item.ip">{{item.ip}}</div></div>
                  <div class="li-item-strip"><div class="item-label">{{$t('nav2_3_1.listview.serviceData.cell_2')}}:</div><div  class="item-info">
                    <span :class="item.connectState === 'state1' ? 'green' : ''||item.connectState === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{item.connectState === 'state1'? $t('nav2_3_1.listview.serviceData.state1') : ''||item.connectState === 'state2'? $t('nav2_3_1.listview.serviceData.state2') : ''}}
                    </span>
                  </div></div>
                </div>
              </div>
            </li>
          </ul>
        </el-row>
        <!--添加框-->
        <el-dialog :title="$t('nav2_1.dialog.title')" :visible.sync="dialogFormVisible" width="680px" ref="dialog" :before-close="closedialog">
          <el-form :model="addNode.form" ref="form" :rules="addNode.rules">
            <el-form-item label="IP" prop="ip" :label-width="addNode.formLabelWidth">
              <el-input v-model="addNode.form.ip"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav2_3_2.addDialog.hostName')"  prop="hostName" :label-width="addNode.formLabelWidth">
              <el-input v-model="addNode.form.hostName"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav2_3_2.addDialog.type')" :label-width="addNode.formLabelWidth">
              <el-select v-model="addNode.form.value" :placeholder="$t('nav2_1.select.placeholder')" size="small">
                <el-option  v-for="(item, index) in addNode.form.type" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('nav2_3_2.addDialog.system')" :label-width="addNode.formLabelWidth">
              <el-input v-model="addNode.form.system" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
            <el-button type="primary"  @click="addNodeSubmit('form')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
          </div>
        </el-dialog>
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
        activeIndex:'-1',
        dialogFormVisible:false,
        serviceData:[
          {
            hostName:'RVC01',
            ip:'192.168.100.111',
            connectState:'state1',
          },
          {
            hostName:'RVC01',
            ip:'192.168.100.111',
            connectState:'state2',
          },
          {
            hostName:'RVC01',
            ip:'192.168.100.111',
            connectState:'state1',
          },
          {
            hostName:'RVC01',
            ip:'192.168.100.111',
            connectState:'state2',
          },
          {
            hostName:'RVC01',
            ip:'192.168.100.111',
            connectState:'state1',
          },
          {
            hostName:'RVC01',
            ip:'192.168.100.111',
            connectState:'state2',
          },
          {
            hostName:'RVC01',
            ip:'192.168.100.111',
            connectState:'state1',
          },
          {
            hostName:'RVC01',
            ip:'192.168.100.111',
            connectState:'state2',
          },
        ],
        addNode:{
          form: {
            ip:'',
            hostName:'',
            system: 'Windows',
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
            ],
          },/*表单验证*/
        },/*添加表单*/
      }
    },
    created: function () {
      document.title = this.title;
    },
    mounted(){
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
    },//初始函数
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.getStatus(this.$route.path)
      }
    },
    methods: {
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      },
      itemSelected(index){
        this.activeIndex=index;
      },/*视图模式选中*/
      refreshTable(){

      },/*刷新*/
      deleteHost(){
        if(this.activeIndex!=-1){
          console.log(this.activeIndex);
        }else{
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }
      },/*删除机器*/
      addNodeSubmit:function(form) {
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
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog .el-input,.el-dialog .el-select{width:86%;}
  .textover{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor:pointer;
  }
  .green{
    /*color:#2cc362;*/
    color:#67c23a;
  }
  .red{
    /*color:#f96a6a;*/
    color:#f86b6b;
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
  .li-item-top{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
   /* border-bottom: 1px solid #d7d7d7;*/
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
</style>
