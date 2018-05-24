<template>
  <el-container class="main nav8_2">
    <div class="content">
      <div class="header">
        <div>{{$t('nav8_2.title')}}</div>
        <div class="rightbtn">
          <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px;">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-circle-plus-outline" @click="add()" style="margin-right: 5px;">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-edit" @click="edit()"  style="margin-right: 5px;">{{$t('nav8_2.editBtn')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" @click="del()" style="margin-right: 5px;">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <div class="list-header">
          <div class="rightbtn">
            <el-select v-model="typeValue"  size="small" @change="typeSelSub1()" style="width:130px;margin-right:5px;" >
              <el-option :label="$t('nav8_2.option1')" :value="$t('nav8_2.option1')"></el-option>
              <el-option  v-for="(item, index) in typeOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="subjectValue"  size="small"  style="width:130px;margin-right:5px;" >
              <el-option :label="$t('nav8_2.option2')" id="subjectOption1" :value="$t('nav8_2.option2')"></el-option>
              <el-option  v-for="(item, index) in subjectOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div class="searchTable">
              <el-input :placeholder="$t('nav8_2.placeholder')"  size="small" v-model="searchData" class="input-with-select" style="width:190px;" >
                <el-button slot="append"  size="small" style="background-color: #3abb53;color:#fff;"  icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </div>
        <el-table v-loading="tableloading" ref="softwareTable"  @selection-change="changeFun" :row-style="rowClass"  :border=true :data="softwareTable"  height="calc()" style="text-align: left"  >
          <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="type" :label="$t('nav8_2.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="subject" :label="$t('nav8_2.table.cell_2')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="homeSoftware" :label="$t('nav8_2.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="foreign" :label="$t('nav8_2.table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="contrast" width="600" :label="$t('nav8_2.table.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog :title="titleDialog"  :visible.sync="dialogFormVisible" ref="dialog" width="680px" :before-close="closedialog">
        <el-form :model="software.form" ref="form">
          <el-form-item :label="$t('nav8_2.table.cell_1')" :label-width="software.formLabelWidth">
            <el-select v-model="software.form.typeValue" @change="typeSelSub()" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in software.form.type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav8_2.table.cell_2')" :label-width="software.formLabelWidth">
            <el-select v-model="software.form.subjectValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in software.form.subject" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav8_2.table.cell_3')" :label-width="software.formLabelWidth">
            <el-select v-model="software.form.homeValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in software.form.homeSoftware" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav8_2.table.cell_4')" :label-width="software.formLabelWidth">
            <el-select v-model="software.form.foreignValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in software.form.foreign" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav8_2.table.cell_5')" :label-width="software.formLabelWidth">
            <el-input v-model="software.contrast"  type="textarea" :rows="8" style="width:86%;" auto-complete="off"></el-input>
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
        softwareTable:[
          {
            type:'CAD',
            subject: this.$t('nav8_2.subject.option2'),
            homeSoftware:'POWERFLOW',
            foreign:'ABAQUS',
            contrast:'',
          },
          {
            type:'CAM',
            subject: this.$t('nav8_2.subject.option1'),
            homeSoftware:'POWERFLOW',
            foreign:'ABAQUS',
            contrast:'',
          },
          {
            type:'CFD',
            subject: this.$t('nav8_2.subject.option3'),
            homeSoftware:'POWERFLOW',
            foreign:'ABAQUS',
            contrast:'',
          },
        ],/*节点资源库列表*/
        multipleSelection:[],/*列表模式选中值*/
        searchData:'',/*搜索*/
        typeOption: [
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
          }
        ],/*软件类型*/
        typeValue:this.$t('nav8_2.option1'),/*默认选中*/
        subjectOption:[
          {
            value:this.$t('nav8_2.subject.option1'),
            label:this.$t('nav8_2.subject.option1'),
          },{
            value:this.$t('nav8_2.subject.option2'),
            label:this.$t('nav8_2.subject.option2'),
          },
          {
            value:this.$t('nav8_2.subject.option3'),
            label:this.$t('nav8_2.subject.option3'),
          },
          {
            value:this.$t('nav8_2.subject.option4'),
            label:this.$t('nav8_2.subject.option4'),
          },
          {
            value:this.$t('nav8_2.subject.option5'),
            label:this.$t('nav8_2.subject.option5'),
          },{
            value:this.$t('nav8_2.subject.option6'),
            label:this.$t('nav8_2.subject.option6'),
          },{
            value:this.$t('nav8_2.subject.option7'),
            label:this.$t('nav8_2.subject.option7'),
          },{
            value:this.$t('nav8_2.subject.option8'),
            label:this.$t('nav8_2.subject.option8'),
          },{
            value:this.$t('nav8_2.subject.option9'),
            label:this.$t('nav8_2.subject.option9'),
          },{
            value:this.$t('nav8_2.subject.option10'),
            label:this.$t('nav8_2.subject.option10'),
          },{
            value:this.$t('nav8_2.subject.option11'),
            label:this.$t('nav8_2.subject.option11'),
          },{
            value:this.$t('nav8_2.subject.option12'),
            label:this.$t('nav8_2.subject.option12'),
          },{
            value:this.$t('nav8_2.subject.option13'),
            label:this.$t('nav8_2.subject.option13'),
          }
        ],/*应用选择*/
        subjectValue:this.$t('nav8_2.option2'),
        dialogFormVisible:false,
        software:{
          form:{
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
            foreign:[
            {
              value:'ABAQUS',
              label:'ABAQUS',
            },{
                value:'NASTRAN',
                label:'NASTRAN',
            },{
                value:'ANSYS',
                label:'NASTRAN',
            },
              {
                value:'STAR-CCM+',
                label:'STAR-CCM+',
              },
              {
                value:'LS-DYNA',
                label:'LS-DYNA',
              },
              {
                value:'ACTRAN',
                label:'ACTRAN',
              },
              {
                value:'ADS',
                label:'ADS',
              }

            ],
            foreignValue:'ABAQUS',
            contrast:''
          },

          formLabelWidth:'150px',
        },
        AllProject:[this.$t('nav8_2.subject.option1'),this.$t('nav8_2.subject.option2'),this.$t('nav8_2.subject.option3'),this.$t('nav8_2.subject.option4'),this.$t('nav8_2.subject.option5'),
          this.$t('nav8_2.subject.option6'),this.$t('nav8_2.subject.option7'),this.$t('nav8_2.subject.option8'),this.$t('nav8_2.subject.option9'),this.$t('nav8_2.subject.option10'),
          this.$t('nav8_2.subject.option11'),this.$t('nav8_2.subject.option12'),this.$t('nav8_2.subject.option13')],
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
        height: 'calc(100vh - 60px - 50px - 70px - 100px - 20px)', //可滚动区域高度
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
        this.titleDialog=this.$t('nav8_2.addDialog.title1');
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
          this.titleDialog=this.$t('nav8_2.addDialog.title2');
          this.dialogFormVisible=true;
          console.log(this.multipleSelection);
        }

      },/*编辑*/
      typeSelSub1:function(){
        if(this.typeValue=='CAD'){
          $('#subjectOption1').hide();
          this.subjectOption=this.CAD.map(item => {
            return { value: item, label: item };
          });
          this.subjectValue=this.CAD[0];
        }else if(this.typeValue=='CAM'){
          $('#subjectOption1').hide();
          this.subjectOption=this.CAM.map(item => {
            return { value: item, label: item };
          });
          this.subjectValue=this.CAM[0];
        }else if(this.typeValue=='CAE'){
          $('#subjectOption1').hide();
          this.subjectOption=this.CAE.map(item => {
            return { value: item, label: item };
          });
          this.subjectValue=this.CAE[0];
        }else if(this.typeValue=='CFD'){
          $('#subjectOption1').hide();
          this.subjectOption=this.CFD.map(item => {
            return { value: item, label: item };
          });
          this.subjectValue=this.CFD[0];
        }else if(this.typeValue=='EDA'){
          $('#subjectOption1').hide();
          this.subjectOption=this.EDA.map(item => {
            return { value: item, label: item };
          });
          this.subjectValue=this.EDA[0];
        }else if(this.typeValue=='HPC'){
          $('#subjectOption1').hide();
          this.subjectOption=this.HPC.map(item => {
            return { value: item, label: item };
          });
          this.subjectValue=this.HPC[0];
        }else if(this.typeValue==this.$t('nav8_2.option1')){
          $('#subjectOption1').show();
          this.subjectOption=this.AllProject.map(item => {
            return { value: item, label: item };
          });
          this.subjectValue=this.$t('nav8_2.option2');
        }else{
          $('#subjectOption1').hide();
          this.subjectValue='';
          this.subjectOption=[];
        }
      },
      typeSelSub:function(){
        if(this.software.form.typeValue=='CAD'){
            this.software.form.subject=this.CAD.map(item => {
              return { value: item, label: item };
            });
          this.software.form.subjectValue=this.CAD[0];
        }else if(this.software.form.typeValue=='CAM'){
          this.software.form.subject=this.CAM.map(item => {
            return { value: item, label: item };
          });
          this.software.form.subjectValue=this.CAM[0];
        }else if(this.software.form.typeValue=='CAE'){
          this.software.form.subject=this.CAE.map(item => {
            return { value: item, label: item };
          });
          this.software.form.subjectValue=this.CAE[0];
        }else if(this.software.form.typeValue=='CFD'){
          this.software.form.subject=this.CFD.map(item => {
            return { value: item, label: item };
          });
          this.software.form.subjectValue=this.CFD[0];
        }else if(this.software.form.typeValue=='EDA'){
          this.software.form.subject=this.EDA.map(item => {
            return { value: item, label: item };
          });
          this.software.form.subjectValue=this.EDA[0];
        }else if(this.software.form.typeValue=='HPC'){
          this.software.form.subject=this.HPC.map(item => {
            return { value: item, label: item };
          });
          this.software.form.subjectValue=this.HPC[0];
        }else{
          this.software.form.subject=[];
          this.software.form.subjectValue='';
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
        this.typeValue=this.$t('nav8_2.option1');
        this.subjectValue=this.$t('nav8_2.option2');
        this.subjectOption=[
          {value:this.$t('nav8_2.subject.option1'), label:this.$t('nav8_2.subject.option1')},
          {value:this.$t('nav8_2.subject.option2'), label:this.$t('nav8_2.subject.option2')},
          {value:this.$t('nav8_2.subject.option3'), label:this.$t('nav8_2.subject.option3')},
          {value:this.$t('nav8_2.subject.option4'), label:this.$t('nav8_2.subject.option4')},
          {value:this.$t('nav8_2.subject.option5'), label:this.$t('nav8_2.subject.option5')},
          {value:this.$t('nav8_2.subject.option6'), label:this.$t('nav8_2.subject.option6')},
          {value:this.$t('nav8_2.subject.option7'), label:this.$t('nav8_2.subject.option7')},
          {value:this.$t('nav8_2.subject.option8'), label:this.$t('nav8_2.subject.option8')},
          {value:this.$t('nav8_2.subject.option9'), label:this.$t('nav8_2.subject.option9')},
          {value:this.$t('nav8_2.subject.option10'),label:this.$t('nav8_2.subject.option10')},
          {value:this.$t('nav8_2.subject.option11'),label:this.$t('nav8_2.subject.option11')},
          {value:this.$t('nav8_2.subject.option12'),label:this.$t('nav8_2.subject.option12')},
          {value:this.$t('nav8_2.subject.option13'),label:this.$t('nav8_2.subject.option13')}
        ];
        this.AllProject=[this.$t('nav8_2.subject.option1'),this.$t('nav8_2.subject.option2'),this.$t('nav8_2.subject.option3'),this.$t('nav8_2.subject.option4'),this.$t('nav8_2.subject.option5'),
          this.$t('nav8_2.subject.option6'),this.$t('nav8_2.subject.option7'),this.$t('nav8_2.subject.option8'),this.$t('nav8_2.subject.option9'),this.$t('nav8_2.subject.option10'),
          this.$t('nav8_2.subject.option11'),this.$t('nav8_2.subject.option12'),this.$t('nav8_2.subject.option13')],
        this.CAD=[this.$t('nav8_2.subject.option1'),this.$t('nav8_2.subject.option2')];
        this.CAM=[this.$t('nav8_2.subject.option3')];
        this.CAE=[this.$t('nav8_2.subject.option4'),this.$t('nav8_2.subject.option5'),this.$t('nav8_2.subject.option6'),this.$t('nav8_2.subject.option7'),this.$t('nav8_2.subject.option8'),this.$t('nav8_2.subject.option9'),this.$t('nav8_2.subject.option10')];
        this.CFD=[this.$t('nav8_2.subject.option11')];
        this.EDA=[this.$t('nav8_2.subject.option12')];
        this.HPC=[this.$t('nav8_2.subject.option13')];
        this.software.form.subject=[
          {value:this.$t('nav8_2.subject.option1'), label:this.$t('nav8_2.subject.option1')},
          {value:this.$t('nav8_2.subject.option2'), label:this.$t('nav8_2.subject.option2')},
        ];
        this.software.form.subjectValue=this.$t('nav8_2.subject.option1');
        this.softwareTable[0].subject = this.$t('nav8_2.subject.option2');
        this.softwareTable[1].subject = this.$t('nav8_2.subject.option1');
        this.softwareTable[2].subject = this.$t('nav8_2.subject.option3');
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
    justify-content: flex-end;
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
  .area{
    width:86%;height:220px;
    overflow:auto;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
  }

</style>
<style>
  .nav8_2 .el-textarea__inner{resize:none;}
</style>
