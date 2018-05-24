<template>
  <el-container class="main nav2_7_1">
    <div class="content">
      <div class="header">
        <div>{{$t('nav2_7_1.title')}}</div>
        <div class="rightbtn">
          <el-button icon="el-icon-document" plain size="small" style="margin-right: 5px" @click="open()">{{$t('nav2_4.buttonGroup.openBtn')}}</el-button>
          <el-button icon="el-icon-edit" plain size="small" style="margin-right: 5px"  @click="edit()">{{$t('nav2_7_1.buttonGroup.editBtn')}}</el-button>
          <el-button icon="el-icon-refresh" plain size="small" style="margin-right: 5px">{{$t('nav1_4.buttonGroup.refreshBtn')}}</el-button>
        </div>
      </div>
      <el-row class="view-item">
        <ul>
          <li class="li-item" v-for="(item,index) in officeData" @click="itemSelected(index)" :class="{item_hover: activeIndex == index}">
            <img v-bind:src="item.src" alt="">
            <div>{{item.imgName}}</div>
          </li>
        </ul>
      </el-row>
      <!--编辑框-->
      <el-dialog :title="$t('nav2_7_1.editDialog.title')" :visible.sync="dialogFormVisible" width="680px" ref="dialog" :before-close="closedialog">
        <el-form :model="editApp.form" ref="form" >
          <el-form-item :label="$t('nav2_7_1.editDialog.softName')" :label-width="editApp.formLabelWidth">
            <span>{{editApp.form.softname}}</span>
          </el-form-item>
          <el-form-item :label="$t('nav2_7_1.editDialog.softIcon')" :label-width="editApp.formLabelWidth">
            <el-button plain size="small"  type="info" style="padding:9px 35px;" @click="IconVisible=true">{{$t('nav2_7_1.buttonGroup.iconKu')}}</el-button>
            <div class="imgShow">
              <img v-bind:src="editApp.form.src" alt="" width="100px" height="100px">
            </div>
          </el-form-item>
          <el-form-item :label="$t('nav2_7_1.editDialog.softType')" :label-width="editApp.formLabelWidth">
            <el-select v-model="editApp.form.value" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in editApp.form.type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav2_7_1.editDialog.remark')" :label-width="editApp.formLabelWidth">
            <el-input type="textarea" :rows="8" v-model="editApp.form.remark" style="width:86%;"></el-input>
          </el-form-item>
        </el-form>
        <el-dialog  :title="$t('nav2_7_1.iconDialog.iconKu')" :visible.sync="IconVisible" ref="iconDialog"  append-to-body :open="iconslimScroll()"  :before-close="closeIcondialog">
            <div class="iconKu">
              <img  v-for="(item, index) in iconMange.iconImg" :src="item.src" alt="" class="iconImgs"  @click="iconSelected(index)"  :class="{icon_hover:iconMange.iconIndex==index}">
            </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelIcon()">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
            <el-button type="primary"  @click="updateIcon()">{{$t('nav2_7_1.iconDialog.uploadBtn')}}</el-button>
          </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="updateSubmit('form')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
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
        activeIndex:'-1',
        officeData:[
          {
            src:'../../../static/img/Access.png',
            imgName:'Access'
          },
          {
            src:'../../../static/img/Caloulator.png',
            imgName:'Caloulator'
          },
          {
            src:'../../../static/img/Access.png',
            imgName:'Access'
          },
          {
            src:'../../../static/img/Caloulator.png',
            imgName:'Caloulator'
          },
          {
            src:'../../../static/img/Access.png',
            imgName:'Access'
          },
          {
            src:'../../../static/img/Caloulator.png',
            imgName:'Caloulator'
          },
          {
            src:'../../../static/img/Access.png',
            imgName:'Access'
          },
          {
            src:'../../../static/img/Caloulator.png',
            imgName:'Caloulator'
          },
          {
            src:'../../../static/img/Access.png',
            imgName:'Access'
          },
          {
            src:'../../../static/img/Caloulator.png',
            imgName:'Caloulator'
          },
          {
            src:'../../../static/img/Access.png',
            imgName:'Access'
          },
          {
            src:'../../../static/img/Caloulator.png',
            imgName:'Caloulator'
          },
        ],/*应用管理数据*/
        dialogFormVisible:false,/*编辑修改弹框*/
        IconVisible:false,/*图标弹框*/
        editApp:{
          form: {
            softname:'',
            src:"",
            type:[
             /* {
                value:'办公云',
                label:'办公云'
              },{
                value:'设计云',
                label:'设计云'
              },{
                value:'仿真云',
                label:'仿真云'
              },{
                value:'不显示',
                label:'不显示'
              }*/
              {
                value: this.$t('nav2_7_1.dialogSelect.officeCloud'),
                label: this.$t('nav2_7_1.dialogSelect.officeCloud')
              },
              {
                value: this.$t('nav2_7_1.dialogSelect.cadCloud'),
                label: this.$t('nav2_7_1.dialogSelect.cadCloud')
              },
              {
                value: this.$t('nav2_7_1.dialogSelect.caeCloud'),
                label: this.$t('nav2_7_1.dialogSelect.caeCloud')
              },
              {
                value: this.$t('nav2_7_1.dialogSelect.noShow'),
                label: this.$t('nav2_7_1.dialogSelect.noShow')
              },
            ],
            value:this.$t('nav2_7_1.dialogSelect.cadCloud'),/*默认选中部门*/
            remark:'',
          },/*添加对话框中表单*/
          formLabelWidth: '120px',/*表单label宽度*/
        },/*修改应用*/
        iconMange:{
          iconIndex:'-1',
          iconImg:[
            { src:'../../../static/img/Access.png'},
            { src:'../../../static/img/Caloulator.png'},
            { src:'../../../static/img/Access.png'},
            { src:'../../../static/img/Caloulator.png'},
            { src:'../../../static/img/Access.png'},
            { src:'../../../static/img/Caloulator.png'},
            { src:'../../../static/img/Access.png'},
            { src:'../../../static/img/Caloulator.png'},
            { src:'../../../static/img/Access.png'},
            { src:'../../../static/img/Caloulator.png'},
            { src:'../../../static/img/Access.png'},
            { src:'../../../static/img/Caloulator.png'},
            { src:'../../../static/img/Access.png'},
            { src:'../../../static/img/Caloulator.png'},
            { src:'../../../static/img/Access.png'},
            { src:'../../../static/img/Caloulator.png'},
            { src:'../../../static/img/Access.png'},
            { src:'../../../static/img/Caloulator.png'},
          ],
        },/*图标数据*/
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
      iconslimScroll:function(){
        $(" .iconKu").slimScroll({
          width: '100%', //可滚动区域宽度
          height: '500px', //可滚动区域高度
          size: '10px', //组件宽度
          color: '#000', //滚动条颜色
          position: 'right', //组件位置：left/right
          distance: '0px', //组件与侧边之间的距离
          start: 'top', //默认滚动位置：top/bottom
          opacity: .2, //滚动条透明度
          alwaysVisible: true, //是否 始终显示组件
          disableFadeOut: false, //是否 鼠标经过可滚动区域时显示组件，离开时隐藏组件
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
        });//图标滚动条
      },/*图标滚动条*/
      itemSelected(index){
        this.activeIndex=index;
      },/*视图模式选中*/
      iconSelected:function(index){
        this.iconMange.iconIndex=index;
      },/*图标选中*/
      open:function(){
        if( this.activeIndex!=-1){
          console.log(this.activeIndex);
        }else{
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }
      },/*打开*/
      edit:function(){
        if(this.activeIndex!=-1){
          this.editApp.form.softname=this.officeData[this.activeIndex].imgName;
          this.editApp.form.src=this.officeData[this.activeIndex].src;
          this.dialogFormVisible=true;
          console.log(this.activeIndex);
        }else{
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }
      },/*编辑*/
      cleanform(){
        this.$refs['form'].resetFields();
        this.dialogFormVisible = false
      },//清除添加表单数据
      closedialog(done){
        this.cleanform();
        done();
      },//关闭对话框回调
      cancelIcon:function(){
        this.IconVisible=false;
        this.iconMange.iconIndex=-1;
      },/*关闭图标库框*/
      closeIcondialog(done){
        this.cancelIcon();
        done();
      },//关闭图标对话框回调
      updateIcon:function(){
        if(this.iconMange.iconIndex!=-1){
          this.editApp.form.src=this.iconMange.iconImg[this.iconMange.iconIndex].src;
          console.log( this.editApp.form.src);
          console.log('success');
          this.cancelIcon();
        }else{
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }
      },/*选择替换图标*/
      updateSubmit:function(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.officeData[this.activeIndex].src=this.editApp.form.src;
            console.log('success');
            this.cleanform();
          } else {
            console.log('error');
            return false;
          }
        })
      },/*上传替换图标*/
      i18nChart : function () {
        this.editApp.form.value =this.$t('nav2_7_1.dialogSelect.cadCloud');
        this.editApp.form.type[0].value=this.$t('nav2_7_1.dialogSelect.officeCloud');
        this.editApp.form.type[0].label =this.$t('nav2_7_1.dialogSelect.officeCloud');
        this.editApp.form.type[1].value=this.$t('nav2_7_1.dialogSelect.cadCloud');
        this.editApp.form.type[1].label =this.$t('nav2_7_1.dialogSelect.cadCloud');
        this.editApp.form.type[2].value=this.$t('nav2_7_1.dialogSelect.caeCloud');
        this.editApp.form.type[2].label =this.$t('nav2_7_1.dialogSelect.caeCloud');
        this.editApp.form.type[3].value=this.$t('nav2_7_1.dialogSelect.noShow');
        this.editApp.form.type[3].label =this.$t('nav2_7_1.dialogSelect.noShow');
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

      },//根据条件获取图表数据


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
    width:calc( 11.15% - 24px );
    height:auto;
    text-align: center;
    margin:10px 5px;
    padding:20px 5px;
    cursor: pointer;
    overflow: hidden;
  }
  .item_hover{
    border:#2cc362 solid 1px ;
    border-radius: 8px;
  }
  .imgShow{
    width:120px;height:120px;
    border:1px solid #d7d7d7;
    padding:10px;
    box-sizing:border-box;
    margin-top: 15px;
  }
  .iconKu{
    width:100%;
    height:500px;
    border:1px solid #d7d7d7;
    box-sizing:border-box;
    padding:15px 0;
  }
  .iconImgs{
     width:70px;height:70px;
     margin:0 20px 10px;
     cursor:pointer;
     border:1px solid #ffffff;
   }
  .iconImgs:hover{border:1px solid #d7d7d7;}
  .icon_hover{border:#2cc362 solid 1px ;}
  .iconImgs.icon_hover:hover{ border:#2cc362 solid 1px ;}
</style>
<style>
  .nav2_7_1 .el-button--info.is-plain:hover{background: #b2b2b3 !important;border-color: #cfd1d6!important;color:#ffffff;}
  .nav2_7_1 .el-button--info.is-plain:active{background: #b2b2b3 !important;border-color: #cfd1d6!important;color:#ffffff;}
  .nav2_7_1 .el-button--info.is-plain:focus{background: #b2b2b3 !important;border-color: #cfd1d6!important;color:#ffffff;}
  .nav2_7_1  .el-textarea__inner{resize:none;}
</style>
