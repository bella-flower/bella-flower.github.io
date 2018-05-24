<template>
  <el-container class="main nav3_1">
    <div id="content" class="content">
      <div class="header">
        <div class="scroll-pane horizontal-only">
          <ul id="wrapper">
            <li v-for="(item,index) in softArray " @click="itemActives(item.id,index)"  :class="{ itemActive:index == itemActive  }">{{item.id}}</li>
          </ul>
        </div>
      </div>
      <div class="con">
        <div class="leftdiv">
          <el-form ref="form" v-model="softModule" label-width="200px" id="softModule">
            <el-collapse  v-model="activeNames">
              <el-collapse-item v-for="(item,index) in softModule" :name="index" :title="item.info">
                <template v-for="(list,index) in item.items">
                  <template v-if="list.type=='cloud.app.option.type.label'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label" class="listLabel"  :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <p v-text="list.id" style="margin:0;"></p>
                        <span v-show="list.required==true" class="mi">*</span>
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.text'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <el-input></el-input>
                        <span v-show="list.required==true" class="mi">*</span>
                        <span class="helptext" :title="list.helpText"  v-text="list.helpText"></span>
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.list'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item :label="list.label"  class="listLabel"  :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <!--<el-select v-model="list.id">
                         <template v-for="(v,index) in list.items">
                            <el-option v-if = "v.selected" :label="v.id" :id="v.id" :value="v.value"  selected></el-option>
                           <el-option v-else :label="v.id" :id="v.id" :value="v.value"></el-option>
                          </template>
                        </el-select>-->
                        <select class="select_list">
                          <template v-for="(v,index) in list.items">
                            <option v-if = "v.selected" :label="v.id" :id="v.id" :value="v.value"  selected></option>
                            <option v-else :label="v.id" :id="v.id" :value="v.value"></option>
                          </template>
                        </select>
                        <span v-show="list.required==true" class="mi">*</span>
                        <span class="helptext" :title="list.helpText"  v-text="list.helpText"></span>
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.date'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <el-input :value="list.defaultValue" readonly></el-input>
                        <span v-show="list.required==true" class="mi">*</span>
                        <span class="helptext" :title="list.helpText" v-text="list.helpText"></span>
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.radio'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <template v-for="(v,index) in list.items">
                          <template v-if="v.selected">
                            <input type="radio" :name="list.id" :id="v.id" checked>
                            <span v-text="v.value"></span>
                          </template>
                          <template v-else>
                            <input type="radio" :name="list.id"  :id="v.id">
                            <span v-text="v.value"></span>
                          </template>
                        </template>
                        <span v-show="list.required==true" class="mi">*</span>
                        <span class="helptext" :title="list.helpText" v-text="list.helpText"></span>
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.checkbox'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <div class="el-transfer" style="width:400px;">
                          <div class="el-transfer-panel" style="width:160px;">
                            <p class="el-transfer-panel__header">
                              <label class="el-checkbox">
                                    <span aria-checked="mixed" class="el-checkbox__input">
                                      <input type="checkbox" @click="selectAll($event)" class="select_all">
                                    </span>
                                <span class="el-checkbox__label">未有角色</span>
                              </label>
                            </p>
                            <div class="el-transfer-panel__body" id="noRole">
                              <div role="group" aria-label="checkbox-group" class="el-checkbox-group el-transfer-panel__list">
                                <template v-for="(v,index) in list.items">
                                  <template v-if="!v.selected">
                                    <label class="el-checkbox el-transfer-panel__item">
                                          <span aria-checked="mixed" class="el-checkbox__input">
                                            <!--<span class="el-checkbox__inner"></span>-->
                                            <!--<input type="checkbox" class="el-checkbox__original">-->
                                            <input type="checkbox">
                                          </span>
                                      <span class="el-checkbox__label"><span v-text="v.value"></span></span>
                                    </label>
                                  </template>
                                </template>
                              </div>
                            </div>
                          </div>
                          <div class="el-transfer__buttons" style="padding:0 10px;">
                            <el-button type="button" style="margin-bottom: 10px;" @click="leftRoleChange($event)" class="left_Btn el-transfer__button">
                              <span><i class="el-icon-arrow-left" @click="leftRoleChange($event)"></i></span>
                            </el-button>
                            <el-button type="button" @click="rightRoleChange($event)" class="right_Btn el-transfer__button">
                              <span><i class="el-icon-arrow-right" @click="rightRoleChange($event)"></i></span>
                            </el-button>
                          </div>
                          <div class="el-transfer-panel" style="width:160px;">
                            <p class="el-transfer-panel__header">
                              <label class="el-checkbox">
                                <!-- <span aria-checked="mixed" class="el-checkbox__input">
                                   <span class="el-checkbox__inner"></span>
                                   <input type="checkbox" class="el-checkbox__original" value="">
                                 </span>-->
                                <span aria-checked="mixed" class="el-checkbox__input">
                                      <input type="checkbox" @click="selectAll($event)" class="select_all">
                                    </span>
                                <span class="el-checkbox__label">已有角色</span>
                              </label>
                            </p>
                            <div class="el-transfer-panel__body">
                              <div role="group" aria-label="checkbox-group" class="el-checkbox-group el-transfer-panel__list">
                                <template v-for="(v,index) in list.items">
                                  <template v-if="v.selected">
                                    <label class="el-checkbox el-transfer-panel__item">
                                          <span aria-checked="mixed" class="el-checkbox__input">
                                            <!--<span class="el-checkbox__inner"></span>-->
                                            <input type="checkbox" >
                                          </span>
                                      <span class="el-checkbox__label"><span v-text="v.value"></span></span>
                                    </label>
                                  </template>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span v-show="list.required==true" class="mi" style="left:390px;top:130px;">*</span>
                        <span class="helptext" :title="list.helpText" style="top:125px;left:400px;width:60px;" v-text="list.helpText"></span>
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.password'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <el-input type="password"></el-input>
                        <span v-show="list.required==true" class="mi">*</span>
                        <span class="helptext" :title="list.helpText"  v-text="list.helpText"></span>
                      </el-form-item>
                      <el-form-item  label="确认密码"  class="listLabel"  :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <!--<p class="listP">[ID:{{list.id}}]</p>-->
                        <el-input type="password"></el-input>
                        <!--<span class="helptext" :title="list.helpText"  v-text="list.helpText"></span>-->
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.command.file'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label"  class="listLabel" style="position: relative;" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                                   :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed">
                          <el-button size="small">{{$t('nav3_1.leftitem_9')}}</el-button>
                        </el-upload>
                        <el-button size="small" style="margin-left:20px;position:absolute;top:5px;left:130px;">{{$t('nav3_1.leftitem_10')}}</el-button>
                        <span v-show="list.required==true" style="left:265px;" class="mi">*</span>
                        <span class="helptext" :title="list.helpText" style="left:275px;" v-text="list.helpText"></span>
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.remote.file'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <el-button size="small">{{$t('nav3_1.leftitem_10')}}</el-button>
                        <span v-show="list.required==true" style="left:115px;" class="mi">*</span>
                        <span class="helptext" :title="list.helpText" style="left:125px;"  v-text="list.helpText"></span>
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.remotelocate.file'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label"  class="listLabel" style="position: relative;" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"  :on-preview="handlePreview"
                                   :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed">
                          <el-button size="small">{{$t('nav3_1.leftitem_9')}}</el-button>
                        </el-upload>
                        <el-button size="small" style="margin-left:20px;position:absolute;top:5px;left:130px;">{{$t('nav3_1.leftitem_10')}}</el-button>
                        <span v-show="list.required==true" style="left:265px;" class="mi">*</span>
                        <span class="helptext" style="left:275px;" :title="list.helpText" v-text="list.helpText"></span>
                      </el-form-item>
                    </div>
                  </template>
                  <template v-if="list.type=='cloud.app.option.type.remote.dir'">
                    <div @click="ListClick(index,item.id)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                      <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                        <el-button size="small">{{$t('nav3_1.leftitem_10')}}</el-button>
                        <span v-show="list.required==true" style="left:115px;" class="mi">*</span>
                        <span class="helptext" style="left:125px;" :title="list.helpText" v-text="list.helpText"></span>
                      </el-form-item>
                    </div>
                  </template>
                </template>
              </el-collapse-item>

            <el-form-item style="margin-top: 15px;">
              <el-button type="primary" @click="">{{$t('nav3_1.leftitem_12')}}</el-button>
              <el-button  @click="resetForm('form')">{{$t('nav3_1.leftitem_13')}}</el-button>
            </el-form-item>
            </el-collapse>
          </el-form>
        </div>
        <div class="rightdiv">
          <div class="rightbox">
            <div class="rightheader">{{$t('nav1_1.option2.title.text')}}</div>
            <ul class="rightcon">
              <li class="rightcon1">
                <div>{{$t('nav1_1.option2.series.name')}}</div><div>12</div>
              </li>
              <li class="rightcon2">
                <div>{{$t('nav1_1.option2.series.data.name1')}}</div><div>8</div>
              </li>
              <li class="rightcon3">
                <div>{{$t('nav1_1.option2.series.data.name2')}}</div><div>4</div>
              </li>
            </ul>
          </div>
          <el-row>
            <el-col :span="24" class="con-item">
              <el-radio-group v-model="showchart" size="mini" style="position: absolute;top: 30px;right: 40px;z-index: 1001">
                <el-radio-button  label="1">{{$t('nav1_1.option3.title.text')}}</el-radio-button>
                <el-radio-button  label="2">{{$t('nav1_1.option4.title.text')}}</el-radio-button>
                <el-radio-button  label="3">{{$t('nav1_1.option5.title.text')}}</el-radio-button>
              </el-radio-group>
              <div id="myChart3" class="con-chart" v-bind:class="{ activeChart:showchart ==1}"></div>
              <div id="myChart4" class="con-chart" v-bind:class="{ activeChart:showchart ==2}"></div>
              <div id="myChart5" class="con-chart" v-bind:class="{ activeChart:showchart==3 }"></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <loadfooter style="width: 100%"></loadfooter>
  </el-container>
</template>
<script>
  import  axios from 'axios'
  import Vue from 'vue'
  import  router from '../router/index'
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      return {
        title:'RVCP 工业仿真平台',
        itemActive:0,
        activeNames:[],/*用于折叠面板展开*/
        softArray:[
          /*{id:'ABAQUS'}*/
        /*  {
            softid:0,softName:'ABAQUS'
          },
          {
            softid:1,softName:'ABAQUS'
          },
          {
            softid:2,softName:'ANS-DYNA'
          },*/


        ],
        softModule:[],
        option3:{
          title:{
            show:"true",//是否显示标题，默认显示，可以不设置
            text:this.$t('nav1_1.option3.title.text'),
            left:"left"
          },
          toolbox: {
            left:"center",
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
              type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
              start: 0,
              end: 100
            }
          ],
          tooltip : {
            trigger: 'axis'
          },
          xAxis : [
            {
              type : 'category',
              /*  boundaryGap : false,*/
              data : ['ANSYS','ABAQUS','NCODE','NASTRAN','CFX','FEMFAT','FLUENT','LS-NYNA']
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel : {
                formatter:this.$t('nav1_1.option3.formatter')
              }
            }
          ],
          series : [
            {
              name:this.$t('nav1_1.option3.series.name'),
              type:'bar',
              smooth: true,
              data:[50, 11, 15, 13, 11, 15, 13, 11],
              itemStyle: {
                //通常情况下：
                normal:{
                  //颜色数组循环版
                  color: function (params){
                    var index = params.dataIndex;//表示当前的数据条的索引
                    var alternateNumber = 14;//表示按几种颜色交替出现
                    var newColor="";//表示最终显示的颜色
                    var colorList = ['#F3A43B','#FAD860','#60C0DD', '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0','#f1717c','#d4a0c7','#68b4e6','#7cebe2','#8cd67d','#fec59a'];
                    if(index < alternateNumber){
                      newColor = colorList[index];
                    }else{
                      var rowNumber=Math.floor(index/alternateNumber);
                      newColor = colorList[index-rowNumber*alternateNumber];
                    }
                    return newColor
                  }
                }
              },
            }]
        },
        option4:{
          title:{
            show:"true",//是否显示标题，默认显示，可以不设置
            text:this.$t('nav1_1.option4.title.text'),
            left:"left"
          },
          toolbox: {
            left:"center",
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
              type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
              start: 0,
              end: 100
            }
          ],
          tooltip : {
            trigger: 'axis'
          },
          xAxis : [
            {
              type : 'category',
              /*  boundaryGap : false,*/
              data : ['user01','user02','user03','user04','user05','user06','user07','user08']
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel : {
                formatter:this.$t('nav1_1.option4.formatter')
              }
            }
          ],
          series : [
            {
              name:this.$t('nav1_1.option4.series.name'),
              type:'bar',
              smooth: true,
              data:[10, 21, 35, 43, 21, 5, 43, 21],
              itemStyle: {
                //通常情况下：
                normal:{
                  //颜色数组循环版
                  color: function (params){
                    var index = params.dataIndex;//表示当前的数据条的索引
                    var alternateNumber = 14;//表示按几种颜色交替出现
                    var newColor="";//表示最终显示的颜色
                    var colorList = ['#F3A43B','#FAD860','#60C0DD', '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0','#f1717c','#d4a0c7','#68b4e6','#7cebe2','#8cd67d','#fec59a'];
                    if(index < alternateNumber){
                      newColor = colorList[index];
                    }else{
                      var rowNumber=Math.floor(index/alternateNumber);
                      newColor = colorList[index-rowNumber*alternateNumber];
                    }
                    return newColor
                  }
                }
              },
            }]
        },
        option5:{
          title:{
            show:"true",//是否显示标题，默认显示，可以不设置
            text:this.$t('nav1_1.option5.title.text'),
            left:"left"
          },
          toolbox: {
            left:"center",
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
              type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
              start: 0,
              end: 100
            }
          ],
          tooltip : {
            trigger: 'axis'
          },
          xAxis : [
            {
              type : 'category',
              /*  boundaryGap : false,*/
              data : ['机器01','机器02','机器03','机器04','机器05','机器06','机器07','机器08']
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel : {
                formatter:this.$t('nav1_1.option5.formatter')
              }
            }
          ],
          series : [
            {
              name:this.$t('nav1_1.option5.series.name'),
              type:'bar',
              smooth: true,
              data:[8, 51, 45, 31, 21, 5, 32, 16],
              itemStyle: {
                //通常情况下：
                normal:{
                  //颜色数组循环版
                  color: function (params){
                    var index = params.dataIndex;//表示当前的数据条的索引
                    var alternateNumber = 14;//表示按几种颜色交替出现
                    var newColor="";//表示最终显示的颜色
                    var colorList = ['#F3A43B','#FAD860','#60C0DD', '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0','#f1717c','#d4a0c7','#68b4e6','#7cebe2','#8cd67d','#fec59a'];
                    if(index < alternateNumber){
                      newColor = colorList[index];
                    }else{
                      var rowNumber=Math.floor(index/alternateNumber);
                      newColor = colorList[index-rowNumber*alternateNumber];
                    }
                    return newColor
                  }
                }
              },
            }]
        },
        /*form: {
          jobname1: '',
          corenumber1: '4',
          queue2: 'ansys',
          jobname2: '',
          corenumber2: '4',
          queue3: 'DMP',
          queue1: 'ansys',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },*/
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        showchart:1,
        appModule:{
          itemId:'',  /*模板中分类id名 基本参数--应用参数--输入文件*/
          listIndex:-1,/*模板中点击条数的index值*/
          listType:'',/*模板中点击条数的type类型*/
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
      this.headerscroll();//横滚动条
      $(".leftdiv").slimScroll({
        width: '830px', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 75px);', //可滚动区域高度
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
        wrapperClass: 'slimScrollDiv1', //外包div类名
        allowPageScroll: true, //是否 使用滚轮到达顶端/底端时，滚动窗口
        wheelStep: 10, //滚轮滚动量
        touchScrollStep: 200, //滚动量当用户使用手势
        borderRadius: '10px', //滚动条圆角
        railBorderRadius: '10px' //轨道圆角
      });//列表滚动
      $(".slimScrollDiv1").eq(0).css("min-width"," 830px");
      this.reloadChart();//加载图表
      this.getPagedata();

    },//初始函数
    watch: {
      /*主要用于点击不同参数相同组件路由不刷新问题*/
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.getStatus(this.$route.path)
      },
      changeLanguage (){
        this.i18nChart();
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      reloadChart:function () {
        if(resize){resize.remove()}
        var mychart3= this.echarts.init(document.getElementById('myChart3'));
        var mychart4= this.echarts.init(document.getElementById('myChart4'));
        var mychart5= this.echarts.init(document.getElementById('myChart5'));
        mychart3.setOption(this.option3);
        mychart4.setOption(this.option4);
        mychart5.setOption(this.option5);
        var charts=[mychart3,mychart4,mychart5,];
        var resize= $('#content').resize(function () {
          for(var i = 0; i < charts.length; i++){
            charts[i].resize();
          }
        });
      },//刷新Chart图表界面
      i18nChart : function () {
        var mychart3 = this.echarts.init(document.getElementById('myChart3'));
        this.option3.title.text = this.$t('nav1_1.option3.title.text');
        this.option3.yAxis[0].axisLabel.formatter = this.$t('nav1_1.option3.formatter');
        this.option3.series[0].name =this.$t('nav1_1.option3.series.name');
        mychart3.setOption(this.option3);
        var mychart4 = this.echarts.init(document.getElementById('myChart4'));
        this.option4.title.text = this.$t('nav1_1.option4.title.text');
        this.option4.yAxis[0].axisLabel.formatter = this.$t('nav1_1.option4.formatter');
        this.option4.series[0].name =this.$t('nav1_1.option4.series.name');
        mychart4.setOption(this.option4);
        var mychart5 = this.echarts.init(document.getElementById('myChart5'));
        this.option5.title.text = this.$t('nav1_1.option5.title.text');
        this.option5.yAxis[0].axisLabel.formatter = this.$t('nav1_1.option5.formatter');
        this.option5.series[0].name =this.$t('nav1_1.option5.series.name');
        mychart5.setOption(this.option5);
      },//国际化chart
      itemActives(id,index){
        var _this=this;
        this.itemActive = index;
        axios.get(path + '/'+id+'.json').then(function (response) {
          var result=response.data;
          if(result.status==0){
            _this.$message.error(_this.$t('rvcpinfo.getListError'));
            /* thisVue.$message.error("获取列表失败");*/
          }else if(result.status==1) {
            var data = result.data.de.options;
            /*console.log(data);*/
            _this.softModule=data;
            /* _this.activeNames用于折叠面板展开*/
            _this.activeNames=[];
            for(var i=0;i<data.length;i++){
              _this.activeNames[i]=i;
            }

          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      headerscroll(){
        var bars = '.jspHorizontalBar, .jspVerticalBar';
       $('.scroll-pane').bind('jsp-initialised', function (event, isScrollable) {
          $(this).find(bars).show();
        }).jScrollPane();
        var resize = $('#content').resize(function () {
          $('.scroll-pane').jScrollPane();
          $('.jspPane').css('left','0px')
        });
     },//横向滚动条
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      },
      getPagedata:function () {
        var _this = this;
        axios.get(path + '/job_software.json').then(function (response) {
          var result=response.data;
          if(result.status==0){
            _this.$message.error(_this.$t('rvcpinfo.getListError'));
            /* thisVue.$message.error("获取列表失败");*/
          }else if(result.status==1) {
            var data = result.data;
           /* console.log(data);*/
            _this.softArray=data;
          }
        }).catch(function (error) {
          console.log(error);
        });
        axios.get(path + '/ABAQUS.json').then(function (response) {
          var result=response.data;
          if(result.status==0){
            _this.$message.error(_this.$t('rvcpinfo.getListError'));
            /* thisVue.$message.error("获取列表失败");*/
          }else if(result.status==1) {
            var data = result.data.de.options;
           /*console.log(data);*/
            _this.softModule=data;

            _this.activeNames=[];/*用于折叠面板展开*/
            for(var i=0;i<data.length;i++){
              _this.activeNames[i]=i;
            }
          }
        }).catch(function (error) {
          console.log(error);
        });


      },//数据加载
      ListClick:function(index,id,type){
        this.appModule.listIndex=index;/*每条数据的index值*/
        this.appModule.itemId=id;/*模块id 基本参数--应用参数--输入文件等*/
        this.appModule.listType=type;/*每条的type值*/

      },/*点击编辑模板每一条显示删除和编辑按钮*/
      leftRoleChange:function(event){
        var _this=this;
        var el_inputs='';
        if(event.target.className=='el-icon-arrow-left'){
          el_inputs=$(event.target).parents('.el-transfer__buttons').next().find('.el-transfer-panel__body').find("input[type='checkbox']:checked");
        }else{
          el_inputs=$(event.target).parent().next().find('.el-transfer-panel__body').find("input[type='checkbox']:checked");
        }
        // var yesRole= $("#yesRole input[type='checkbox']:checked");
        var yesRole=el_inputs;
        var listIndex=this.appModule.listIndex;
        var itemId=this.appModule.itemId;
        var checkItems=[];
        var i_s='';
        for(var i=0;i<_this.softModule.length;i++){
          if(_this.softModule[i].id==itemId){
            checkItems=_this.softModule[i].items[listIndex].items;
            i_s=i;
          }
        }
        if(yesRole.length>0){
          var items=[];
          for(var k=0;k<checkItems.length;k++){
            var obj={};
            for(var i=0;i<yesRole.length;i++){
              var optionValue=yesRole.eq(i).parent().next().children().text();
              if(optionValue==checkItems[k].value){
                obj.value=yesRole.eq(i).parent().next().children().text();
                obj.id=yesRole.eq(i).parent().next().children().text();
                obj.selected=false;
                break;
              }else{
                obj.value=checkItems[k].value;
                obj.id=checkItems[k].value;
                obj.selected=checkItems[k].selected;
              }
            }
            items[k]=obj;
          }
          _this.softModule[i_s].items[listIndex].items=items;
          $(".select_all").prop("checked",false);
        }
      },/*角色转换*/
      rightRoleChange:function(event){
        var _this=this;
        var el_inputs='';
        if(event.target.className=='el-icon-arrow-right'){
          el_inputs=$(event.target).parents('.el-transfer__buttons').prev().find('.el-transfer-panel__body').find("input[type='checkbox']:checked");
        }else{
          el_inputs=$(event.target).parent().prev().find('.el-transfer-panel__body').find("input[type='checkbox']:checked");
        }
        // console.log(el_inputs.length);
        var noRole=el_inputs;

        // var noRole= $("#noRole input[type='checkbox']:checked");
        var listIndex=this.appModule.listIndex;
        var itemId=this.appModule.itemId;
        var checkItems=[];
        var i_s='';
        for(var i=0;i<_this.softModule.length;i++){
          if(_this.softModule[i].id==itemId){
            checkItems=_this.softModule[i].items[listIndex].items;
            i_s=i;
          }
        }
        if(noRole.length>0){
          var items=[];
          for(var k=0;k<checkItems.length;k++){
            var obj={};
            for(var i=0;i<noRole.length;i++){
              var optionValue=noRole.eq(i).parent().next().children().text();
              if(optionValue==checkItems[k].value){
                obj.value=noRole.eq(i).parent().next().children().text();
                obj.id=noRole.eq(i).parent().next().children().text();
                obj.selected=true;
                break;
              }else{
                obj.value=checkItems[k].value;
                obj.id=checkItems[k].value;
                obj.selected=checkItems[k].selected;
              }
            }
            items[k]=obj;
          }
          _this.softModule[i_s].items[listIndex].items=items;
          $(".select_all").prop("checked",false);
        }
      },/*角色转换*/
      selectAll:function(event){
        if(event.target.checked==true){
          $(event.target).parents('.el-transfer-panel__header').next().find("input[type='checkbox']").prop("checked",true);
        }else{
          $(event.target).parents('.el-transfer-panel__header').next().find("input[type='checkbox']").prop("checked",false);
        }
      },/*角色全选*/
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .textover{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    course:hand;
  }
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
    text-align: left;
    width: 100%;
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
    overflow: hidden;
  }
  #wrapper{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin:8px auto 0 auto;
  height: 24px;
}
  #wrapper li{
    padding: 4px 10px;
    cursor: pointer;
  }
  #wrapper li:hover{
    color: #2cc362;
  }
  .scroll-pane {
    width: 100%;
    height: 40px;
    overflow: auto;
    white-space:nowrap;
  }
  .scroll-pane:focus{
    outline: -webkit-focus-ring-color auto 0px;
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 0px;
  }
  .scroll-pane ul{
    white-space:nowrap;
  }
  .itemActive{
    color: #2cc362;
    border-bottom: 2px #2cc362 solid;
  }
  .con{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height:calc(100vh - 60px - 50px - 75px);
  }
  .leftdiv{
    height:calc(100vh - 60px - 50px - 75px);
    width: 780px!important;
    min-width:780px;;
    background-color: #ffffff;
    margin:0 15px;
    padding:0 20px;
    border:#d7d7d7 solid 1px;
    border-radius: 8px;
  }
  .rightdiv{
    height:calc(100vh - 60px - 50px - 75px);
    width:calc(100% - 800px);
    background-color: #ffffff;
    margin:0 15px;
    border:#d7d7d7 solid 1px;
    border-radius: 8px;
  }
  .rightbox{
    padding: 15px 20px;
    height: 180px;
    min-height: 180px;
  }
  .rightheader{
    font-weight: 600;
    height:30px;
  }
  .rightcon{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 150px;
    border: 1px solid #d7d7d7;
  }
  .rightcon>li>div{
    margin: 10px;
  }
  .rightcon1{
    width:calc( 100% - 40px );
    padding: 20px;
    border-right: 1px solid #d7d7d7;
    display:flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
     }
  .rightcon2{
    width:calc( 100% - 40px );
    padding: 20px;
    border-right: 1px solid #d7d7d7;
    display:flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .rightcon3{
    width:calc( 100% - 40px );
    padding: 20px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .con-item{
    position: relative;
  }
  .con-chart{
    background-color: #ffffff!important;
    height:300px;
    margin: 20px;
    padding-top:5px;
  }
  .bgList{
    background:#d8d8d8;
  }
  .noClick{
    pointer-events: none;
    opacity:.5;
  }
  #myChart3,#myChart4,#myChart5{
    width: calc( 100% - 40px );
    height:calc(100vh - 60px - 50px - 75px - 300px );
    position: absolute;
    top:0;
    z-index: 50;
    margin-bottom: 0px;
  }
  .activeChart{
    z-index:51!important;
  }
 /* .upload-demo{
    width: 600px;
    margin-left: 80px;
    margin-bottom: 20px;
  }*/
/*  .upload-demo-title{
    display: inline-block;
    margin-right: 5px;
    width: 150px;
    min-width: 100px;
  }*/
 /* .el-form-item__content input{
    width: 400px;
  }*/
  .el-form-item__content .textover{
    margin-left: 8px;
    width: 280px;
    text-align: left;
    color:red;
  }
  .upload-remark{

  }
  .upload-must{
    color: red;font-weight:900;font-size: 18px;margin-left: 5px;
  }
  .select_list{
    width: 360px;
    height: 40px;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    background-color: #fff;
    /* box-sizing: border-box; */
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
  }
  .helptext{
    position:absolute;
    left:375px;top:0;
    width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #softModule .upload-demo{display:inline-block;}
  #softModule .el-button--small, .el-button--small.is-round{
    padding:9px 30px;
  }
  .mi{
    color: #ff0000;
    font-size: 20px;
    position: absolute;
    top: 4px;left:365px;
    display: block;
  }
</style>
<style>
  .nav3_1 .el-collapse-item__header{
   font-weight: 600;
  }
  .nav3_1 .el-form-item__content{
    line-height: 40px;
    position: relative;
    font-size: 14px;
  }
  .el-form-item__content {
  }
/*  .nav3_1 .el-form-item__content .el-input{
    width: 400px;
  }*/
  #softModule input[type="radio"],
  #softModule input[type="checkbox"]{
    width:13px !important;height:13px !important;
  }
  .nav3_1 .el-upload--text{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
  }
  .nav3_1 .leftdiv .el-input__inner {
    width: 360px;
  }
  .nav3_1 .el-collapse-item__wrap{
    border-bottom: 1px solid #d7d7d7;
  }
  #softModule .el-transfer__button{
    display: block;
    margin: 0 auto;
    padding: 10px;
    border-radius: 50%;
    background-color: #f5f7fa;
    color:#5a5e66;
    font-size: 0;
  }
  #softModule .el-transfer__button_l.is-disabled{
    border: 1px solid #d8dce5;
    background-color: #f5f7fa;
    color: #b4bccc;
  }
</style>


