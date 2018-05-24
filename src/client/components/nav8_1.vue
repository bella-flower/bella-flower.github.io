<template>
    <el-container class="main nav8_1">
        <div class="content">
          <div class="header">
            <div>{{$t('nav8_1.title')}}</div>
            <div class="rightbtn">
              <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px;">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
            </div>
          </div>
          <el-row class="list-item">
            <div class="list-header">
              <div></div>
              <div class="rightbtn">
                <el-select v-model="sourceValue" :placeholder="$t('nav2_1.select.placeholder')" size="small" style="width:120px;margin-right:5px;" >
                  <el-option :key="this.$t('nav8_1.select.option1')" :label="this.$t('nav8_1.select.option1')" :value="this.$t('nav8_1.select.option1')">
                  </el-option>
                  <el-option  v-for="(item, index) in sourceOption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div class="searchTable">
                  <el-input :placeholder="$t('nav4_1.listview.placeholder')"  size="small" v-model="searchData" class="input-with-select" style="width:367px;" >
                    <el-select v-model="softValue" slot="prepend" :placeholder="$t('nav4_1.listview.placeholder2')" size="small" style="width:120px;">
                      <el-option  v-for="(item, index) in softOption" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                    <el-button slot="append"  size="small" style="background-color: #3abb53;color:#fff;"  icon="el-icon-search"></el-button>
                  </el-input>
                </div>
              </div>
            </div>
            <div class="list-bottom">
              <div class="left">
                <div class="list-title">
                  {{$t('nav8_1.title1')}}
                </div>
                <div class="left-info">
                  <ul class="software">
                    <li class="li-item" v-for="(item,index) in list1">
                      <div class="softImg" :style="{background: 'url('+ item.src +')no-repeat'}">
                        <div class="activeBg">
                          <div class="softBug">
                            <p @click="introduce(item.src)">{{$t('nav8_1.buttonGroup.btn3')}}></p>
                            <p @click="tel(item.src)">{{$t('nav8_1.buttonGroup.btn4')}}></p>
                          </div>
                        </div>
                      </div>
                      <p class="textover"><span>{{$t('nav8_1.list.cell_1')}}:</span><span :title="item.name">{{item.name}}</span></p>
                      <p class="textover"><span>{{$t('nav8_1.list.cell_2')}}:</span><span>{{item.version}}</span></p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="fenge"></div>
              <div class="right">
                <div class="list-title" style="margin-left:15px;">
                  {{$t('nav8_1.title2')}}
                </div>
                <div class="right-info">
                  <ul class="software">
                      <li class="li-item" v-for="(item,index) in list2">
                        <div class="softImg" :style="{ background:'url('+item.src+')no-repeat'}">
                          <div class="activeBg">
                            <div class="softBug">
                              <p @click="introduce(item.src)">{{$t('nav8_1.buttonGroup.btn3')}}></p>
                              <p @click="tel(item.src)">{{$t('nav8_1.buttonGroup.btn4')}}></p>
                            </div>
                          </div>
                        </div>
                        <p class="textover"><span>{{$t('nav8_1.list.cell_1')}}:</span><span :title="item.name">{{item.name}}</span></p>
                        <p class="textover"><span>{{$t('nav8_1.list.cell_2')}}:</span><span>{{item.version}}</span></p>
                      </li>
                    </ul>
                </div>
              </div>
            </div>
          </el-row>
          <!--软件介绍-->
          <el-dialog :title="$t('nav8_1.introduce.title')" :visible.sync="dialogFormVisible" ref="dialog" width="680px">
            <div class="dialogMain">
              <div class="leftDialog">
                <div class="inImg" :style="{ background:'url('+activeSrc+')'}"></div>
                <div>
                  <p>{{$t('nav8_1.introduce.cell_10')}}:</p>
                  <p style="width:170px;">{{introducts.introduct}}</p>
                </div>
              </div>
              <div class="rightDialog">
                <ul class="inlist">
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_1')}}:</span>
                    <span>{{introducts.name}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_2')}}:</span>
                    <span>{{introducts.version}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_3')}}:</span>
                    <span>{{introducts.vendor}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_4')}}:</span>
                    <span>{{introducts.code}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_5')}}:</span>
                    <span>{{introducts.type}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_6')}}:</span>
                    <span>{{introducts.agent}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_7')}}:</span>
                    <span>{{introducts.tel}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_8')}}:</span>
                    <span>{{introducts.support}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_9')}}:</span>
                    <span>{{introducts.sContact}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible=false">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
            </div>
          </el-dialog>
          <!--联系方式-->
          <el-dialog :title="$t('nav8_1.introduce.title2')" :visible.sync="dialogTelVisible" width="680px">
            <div class="dialogMain">
              <div class="leftDialog">
                <div class="inImg" :style="{ background:'url('+activeSrc+')'}"></div>
              </div>
              <div class="rightDialog">
                <ul class="inlist">
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_1')}}:</span>
                    <span>{{contacts.name}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_6')}}:</span>
                    <span>{{contacts.agent}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_7')}}:</span>
                    <span>{{contacts.contact}}</span>
                  </li>
                  <li>
                    <span>{{$t('nav8_1.introduce.cell_11')}}:</span>
                    <span>{{contacts.service}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible=false">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
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
        dialogFormVisible:false,
        dialogTelVisible:false,
        sourceValue: this.$t('nav8_1.select.option1'),/*默认选中*/
        activeSrc:'',
        sourceOption: [
          {
            value:'CAD',
            label:'CAD'
          },
          {
            value:'CAM',
            label:'CAM',
          },
        ],/*是否选择*/
        softOption: [
          {
            value: this.$t('nav8_1.select.option2'),/*软件名称*/
            label: this.$t('nav8_1.select.option2'),/*软件名称*/
          },
          {
            value: this.$t('nav8_1.select.option3'),/*软件编号*/
            label: this.$t('nav8_1.select.option3'),/*软件编号*/
          },
        ],
        softValue: this.$t('nav8_1.select.option2'),
        searchData:'',/*搜索*/
        list1:[
          {
          name:'ABAQUS',
          version:'1.63',
          src:'../../../static/img/soft/soft_1.png',
          },
          {
            name:'NASTRAN',
            version:'2014',
            src:'../../../static/img/soft/soft_1.png',
          },
        ],
        list2:[
          {
            name:'ANS-DYNA-BATCH',
            version:'1.63',
            src:'../../../static/img/soft/soft_1.png',
          },
          {
            name:'NASTRAN',
            version:'2014',
            src:'../../../static/img/soft/soft_1.png',
          },
          {
            name:'ANSYS',
            version:'17.0',
            src:'../../../static/img/soft/soft_2.png',
          },
          {
            name:'STAR-CCM+',
            version:'19',
            src:'../../../static/img/soft/soft_3.png',
          },
          {
            name:'LS-DYNA',
            version:'R7',
            src:'../../../static/img/soft/soft_4.png',
          },
          {
            name:'ACTRAN',
            version:'16',
            src:'../../../static/img/soft/soft_1.png',
          },
          {
            name:'ADS',
            version:'2016',
            src:'../../../static/img/soft/soft_5.png',
          },
          {
            name:'AVL',
            version:'2.2',
            src:'../../../static/img/soft/soft_6.png',
          },
          {
            name:'POWERFLOW',
            version:'2016',
            src:'../../../static/img/soft/soft_7.png',
          },
        ],
        introducts:{
          name:'ABAQUS',
          version:'1.63',
          vendor:'SIMULIA ABAQUS',
          code:'1.63',
          type:'CAD',
          agent:'DAICY',
          tel:'13564500124',
          support:'DEMO',
          sContact:'13564500124',
          introduct:'MSC.NASTRAN是一具有高度可靠性的结构有限元分析软件  2014 '+
          'Ansys ANSYS  NSYS软件是融结构、流体、电场、磁场、声场分析于一体的大型通用有限元分析软件',
        },
        contacts:{
          name:'ABAQUS',
          agent:'DAICY',
          contact:'13564500124',
          service:'安装、优化、工程咨询'
        }
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
      $(".list-item .software").slimScroll({
        width: '100%', //可滚动区域宽度
        height:'calc(100vh  - 60px - 50px - 70px - 60px - 30px)', //可滚动区域高度
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
      introduce:function(src){
        this.activeSrc=src;
        this.dialogFormVisible=true;
      },
      tel:function(src){
        this.activeSrc=src;
        this.dialogTelVisible=true;
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
      i18nChart : function () {
        this.sourceValue =this.$t('nav8_1.select.option1');
        this.softValue =this.$t('nav8_1.select.option2');
        this.softOption[0].value=this.$t('nav8_1.select.option2');
        this.softOption[0].label =this.$t('nav8_1.select.option2');
        this.softOption[1].value=this.$t('nav8_1.select.option3');
        this.softOption[1].label =this.$t('nav8_1.select.option3');
      },//国际化chart
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    justify-content:flex-end ;
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
  .list-bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .list-title{
    height:26px;
    line-height:26px;
  }
  .fenge{
    height:calc(100vh  - 60px - 50px - 70px - 60px);
    border: 1px solid #d7d7d7;
  }
  .software{
    padding:20px;
    box-sizing: border-box;
  }
  .left{
    width:50%;
    height:calc(100vh  - 60px - 50px - 70px - 60px);
  }
  .left-info{
    width:calc(100% - 15px);
    height:calc(100vh  - 60px - 50px - 70px - 60px - 30px);
    border: 1px solid #d7d7d7;
  }
  .right{
    width:50%;
    height:calc(100vh  - 60px - 50px - 70px - 60px);
  }
  .right-info{
    width:calc(100% - 15px);
    height:calc(100vh  - 60px - 50px - 70px - 60px - 30px);
    margin-left:15px;
    border: 1px solid #d7d7d7;
  }
  .li-item{
    display: inline-block;
    width:calc(33.33% - 38px);
    height:auto;
    margin:10px;
    padding: 5px;
    cursor: pointer;
    overflow: hidden;
  }
  .li-item .softImg{
    /*background: url(../../../static/img/soft/soft_1.png) no-repeat;*/
    background-size: contain !important;
    width:100%;
    max-width: 170px;
    height:104px;
    margin-bottom:10px;
    position: relative;
    transition:1s;
  }
  .li-item .softImg:hover{
    transform:scale(1.1);
  }
  .li-item .softImg:hover .activeBg{
    top:0;
  }
  .activeBg{
    width:100%;height:100%;
    position:absolute;
    top:calc( -100% - 5px);left:0;
    background:rgba(0,0,0,.6);
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    transition:1s;
  }
  .activeBg p{
    color:#ffffff;
    cursor:pointer;
  }
  .li-item p{
    height:22px;
    line-height:22px;
    margin:0;
  }
  .textover{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor:pointer;
  }
  .dialogMain{
    width:80%;
    margin:0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .inImg{
   /* background: url(../../../static/img/soft/soft_1.png) no-repeat;*/
    background-repeat:no-repeat;
    width: 170px;
    height:104px;
    margin-bottom:10px;
  }
  .leftDialog{
    width:calc(100% - 50% - 20px);
    margin-right:20px;
  }
  .rightDialog{
    width:50%;
  }
  .inlist li{
    margin-bottom:10px;
  }
</style>
<style>
  .nav8_1 .searchTable .el-input-group__prepend{
    background-color: #fff;
  }
</style>
