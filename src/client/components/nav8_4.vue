<template>
  <el-container class="main nav8_4">
    <div class="content">
      <div class="header">
        <div>{{$t('nav8_4.title')}}</div>
        <div class="rightbtn">
          <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px;">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-circle-plus-outline" @click="add()" style="margin-right: 5px;">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-edit" @click="edit()"  style="margin-right: 5px;">{{$t('nav8_2.editBtn')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" @click="del()" style="margin-right: 5px;">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <el-table v-loading="tableloading" ref="appTable"  @selection-change="changeFun" :row-style="rowClass"  :border=true :data="appTable"  height="calc()" style="text-align: left"  >
          <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="name" :label="$t('nav8_4.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="code" :label="$t('nav8_4.table.cell_2')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="version" :label="$t('nav8_4.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vendor" :label="$t('nav8_4.table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog :title="titleDialog"  :visible.sync="dialogFormVisible" :open="showmodel1()" width="680px" ref="dialog" :before-close="closedialog">
        <div class="formBody">
          <el-form :model="addApp.form" ref="form">
            <el-form-item :label="$t('nav8_4.addDialog.cell_1')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.code"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_2')" :label-width="addApp.formLabelWidth">
              <el-select v-model="addApp.form.typeValue" @change="typeSelSub()" :placeholder="$t('nav2_1.select.placeholder')" size="small">
                <el-option  v-for="(item, index) in addApp.form.type" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_3')" :label-width="addApp.formLabelWidth">
              <el-select v-model="addApp.form.subjectValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
                <el-option  v-for="(item, index) in addApp.form.subject" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_4')" :label-width="addApp.formLabelWidth">
              <el-select v-model="addApp.form.homeValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
                <el-option  v-for="(item, index) in addApp.form.homeSoftware" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_5')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.name"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_6')" :label-width="addApp.formLabelWidth">
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button plain size="small"  type="info" style="padding:9px 35px;">{{$t('nav8_4.addDialog.uploadBtn')}}</el-button>
              </el-upload>
              <div class="imgShow">
                <img v-bind:src="addApp.form.iconSrc" alt="" width="100px" height="100px">
              </div>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_7')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.version"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_8')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.vendor"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_9')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.introduce"  type="textarea" :rows="8" style="width:86%;" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_10')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.agent"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_11')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.tel"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_12')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.contact"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_13')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.support"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_14')" :label-width="addApp.formLabelWidth">
              <el-input v-model="addApp.form.supportTel"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav8_4.addDialog.cell_15')" :label-width="addApp.formLabelWidth">
              <el-checkbox-group v-model="addApp.form.serviceCheck">
                <el-checkbox label="1">{{$t('nav8_4.addDialog.check_1')}}</el-checkbox>
                <el-checkbox label="2">{{$t('nav8_4.addDialog.check_2')}}</el-checkbox>
                <el-checkbox label="3">{{$t('nav8_4.addDialog.check_3')}}</el-checkbox>
                <el-checkbox label="4">{{$t('nav8_4.addDialog.check_4')}}</el-checkbox>
                <el-checkbox label="5">{{$t('nav8_4.addDialog.check_5')}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
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
        appTable:[
          {
            name:'ABAQUS',
            code: '1.63',
            version:'1.63',
            vendor:'DAICY',
          },
        ],/*节点资源库列表*/
        multipleSelection:[],/*列表模式选中值*/
        dialogFormVisible:false,
        addApp:{
          form:{
            code: '',
            type:[
              {
                value: 'CAD',
                label: 'CAD',
              },
              {
                value: 'CAM',
                label: 'CAM',
              },{
                value: 'CAE',
                label: 'CAE',
              },
              {
                value: 'CFD',
                label: 'CFD',
              },
              {
                value: 'EDA',
                label: 'EDA',
              },
              {
                value: 'HPC',
                label: 'HPC',
              },
              {
                value: 'IT',
                label: 'IT',
              }],
            typeValue:'CAD',
            subject:[
              {
                value:this.$t('nav8_2.subject.option1'),
                label:this.$t('nav8_2.subject.option1'),
              },{
                value:this.$t('nav8_2.subject.option2'),
                label:this.$t('nav8_2.subject.option2'),
              },
            ],
            subjectValue:this.$t('nav8_2.subject.option1'),
            homeSoftware:[
              {
                value:'ABAQUS',
                label:'ABAQUS',
              },{
                value:'POWERFLOW',
                label:'POWERFLOW',
              }
            ],
            homeValue:'POWERFLOW',
            name:'',
            iconSrc:'',
            version:'',
            vendor:'',
            introduce:'',
            agent:'',
            tel:'',
            contact:'',
            support:'',
            supportTel:'',
            serviceCheck:[],
          },
          formLabelWidth:'165px',
        },
        CAD:[this.$t('nav8_2.subject.option1'),this.$t('nav8_2.subject.option2')],
        CAM:[this.$t('nav8_2.subject.option3')],
        CAE:[this.$t('nav8_2.subject.option4'),this.$t('nav8_2.subject.option5'),this.$t('nav8_2.subject.option6'),this.$t('nav8_2.subject.option7'),this.$t('nav8_2.subject.option8'),this.$t('nav8_2.subject.option9'),this.$t('nav8_2.subject.option10')],
        CFD:[this.$t('nav8_2.subject.option11')],
        EDA:[this.$t('nav8_2.subject.option12')],
        HPC:[this.$t('nav8_2.subject.option13')],
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
      showmodel1:function(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".formBody").slimScroll({
            width: '100%', //可滚动区域宽度
            height: 'calc(100vh - 15vh - 50px - 50px - 65px - 30px)', //可滚动区域高度
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
        }, 1);
      },
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
        this.titleDialog=this.$t('nav8_4.addDialog.title1');
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
          this.titleDialog=this.$t('nav8_4.addDialog.title2');
          this.dialogFormVisible=true;
          console.log(this.multipleSelection);
        }

      },/*编辑*/
      typeSelSub:function(){
        if(this.addApp.form.typeValue=='CAD'){
          this.addApp.form.subject=this.CAD.map(item => {
            return { value: item, label: item };
          });
          this.addApp.form.subjectValue=this.CAD[0];
        }else if(this.addApp.form.typeValue=='CAM'){
          this.addApp.form.subject=this.CAM.map(item => {
            return { value: item, label: item };
          });
          this.addApp.form.subjectValue=this.CAM[0];
        }else if(this.addApp.form.typeValue=='CAE'){
          this.addApp.form.subject=this.CAE.map(item => {
            return { value: item, label: item };
          });
          this.addApp.form.subjectValue=this.CAE[0];
        }else if(this.addApp.form.typeValue=='CFD'){
          this.addApp.form.subject=this.CFD.map(item => {
            return { value: item, label: item };
          });
          this.addApp.form.subjectValue=this.CFD[0];
        }else if(this.addApp.form.typeValue=='EDA'){
          this.addApp.form.subject=this.EDA.map(item => {
            return { value: item, label: item };
          });
          this.addApp.form.subjectValue=this.EDA[0];
        }else if(this.addApp.form.typeValue=='HPC'){
          this.addApp.form.subject=this.HPC.map(item => {
            return { value: item, label: item };
          });
          this.addApp.form.subjectValue=this.HPC[0];
        }else{
          this.addApp.form.subject=[];
          this.addApp.form.subjectValue='';
        }
      },
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
        this.CAD=[this.$t('nav8_2.subject.option1'),this.$t('nav8_2.subject.option2')];
        this.CAM=[this.$t('nav8_2.subject.option3')];
        this.CAE=[this.$t('nav8_2.subject.option4'),this.$t('nav8_2.subject.option5'),this.$t('nav8_2.subject.option6'),this.$t('nav8_2.subject.option7'),this.$t('nav8_2.subject.option8'),this.$t('nav8_2.subject.option9'),this.$t('nav8_2.subject.option10')];
        this.CFD=[this.$t('nav8_2.subject.option11')];
        this.EDA=[this.$t('nav8_2.subject.option12')];
        this.HPC=[this.$t('nav8_2.subject.option13')];
        this.addApp.form.subject=[
          {value:this.$t('nav8_2.subject.option1'), label:this.$t('nav8_2.subject.option1')},
          {value:this.$t('nav8_2.subject.option2'), label:this.$t('nav8_2.subject.option2')},
        ];
        this.addApp.form.subjectValue=this.$t('nav8_2.subject.option1');
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
  .imgShow{
    width:120px;height:120px;
    border:1px dashed #d7d7d7;
    padding:10px;
    box-sizing:border-box;
    margin-top: 15px;
  }
</style>
<style>
  .nav8_4 .el-button--info.is-plain:hover{background: #b2b2b3 !important;border-color: #cfd1d6!important;color:#ffffff;}
  .nav8_4 .el-button--info.is-plain:active{background: #b2b2b3 !important;border-color: #cfd1d6!important;color:#ffffff;}
  .nav8_4 .el-button--info.is-plain:focus{background: #b2b2b3 !important;border-color: #cfd1d6!important;color:#ffffff;}
  .nav8_4 .el-textarea__inner{resize:none;}
  .nav8_4 .el-dialog__body{padding:15px 0;}
</style>
