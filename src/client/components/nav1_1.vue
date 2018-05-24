<template xmlns="http://www.w3.org/1999/html">
    <el-container>
      <div class="main nav1_1">
        <div id="content"  class="content" style="text-align: left;width: 100%;">
          <el-row>
            <el-col :span="8" class="con-item">
              <div id="myChart1" class="con-chart"></div>
            </el-col>
            <el-col :span="8" class="con-item">
              <div id="myChart2" class="con-chart"></div>
            </el-col>
            <el-col :span="8" class="con-item">
              <div class="con-chart">
                <div class="process-div">
                <div class="process-title">{{$t('nav1_1.process.title1')}}</div>
                <div class="process-item process-item01">
                  <div class="process-item-title">{{$t('nav1_1.process.span1')}}:</div>
                  <el-progress class="process-line" :text-inside="true" :stroke-width="18" :percentage="82"></el-progress>
                </div>
                <div class="process-item process-item02">
                  <div class="process-item-title">{{$t('nav1_1.process.span2')}}:</div>
                  <el-progress class="process-line" :text-inside="true" :stroke-width="18" :percentage="54"></el-progress>
                </div>
                </div>
                <div class="process-div">
                <div class="process-title">{{$t('nav1_1.process.title2')}}</div>
                <div class="process-item process-item03">
                  <div class="process-item-title">{{$t('nav1_1.process.span1')}}:</div>
                  <el-progress class="process-line" :text-inside="true" :stroke-width="18" :percentage="36"></el-progress>
                </div>
                <div class="process-item process-item04">
                  <div class="process-item-title">{{$t('nav1_1.process.span2')}}:</div>
                  <el-progress class="process-line" :text-inside="true" :stroke-width="18" :percentage="87"></el-progress>
                </div>
                </div>
              </div>
            </el-col>
          </el-row>
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
        <loadfooter style="width: 100%"></loadfooter>
      </div>
      <transition name="slide-fade">
      <div v-show="rightdiv" class="righthidediv">
        <div class="rightdivtitle">
          <div class="rightdivtitleleft">
            <i class="fa fa-wpforms" aria-hidden="true"></i>
            <span>{{$t('nav1_1.rightdiv.title')}}</span>
          </div>
          <div class="rightdivtitleright">
            <el-button>{{$t('nav1_1.rightdiv.btn_1')}}</el-button>
            <el-button>{{$t('nav1_1.rightdiv.btn_2')}}</el-button>
          </div>
        </div>
        <div class="tableitem" >
          <div class="itemheader">
            <div class="">{{$t('nav1_1.rightdiv.myjob.title')}}</div>
            <div class="itemheader-ico"><i size="mini" class="fa fa-pause-circle-o" :title="$t('nav1_1.rightdiv.myjob.btn_1')" @click="delGroup"  aria-hidden="true"></i><i size="mini" @click="delGroup"  class="fa fa-reply" :title="$t('nav1_1.rightdiv.myjob.btn_2')" aria-hidden="true"></i><i size="mini" @click="delGroup"   class="fa fa-ban"  :title="$t('nav1_1.rightdiv.myjob.btn_3')" aria-hidden="true"></i><i size="mini" @click="delGroup"  class="fa fa-history"  :title="$t('nav1_1.rightdiv.myjob.btn_4')" aria-hidden="true"></i><i size="mini" @click="delGroup"  class="fa fa-navicon"  :title="$t('nav1_1.rightdiv.myjob.btn_5')" aria-hidden="true"></i><i size="mini" @click="delGroup"  class="fa fa-eye" :title="$t('nav1_1.rightdiv.myjob.btn_6')" aria-hidden="true"></i></div>
          </div>
          <div class="itemtable">
            <el-table v-loading="tableloading"  :border=true  :row-style="rowClass" :data="tableMyjob"  @selection-change="handleSelectionChange" height="calc()" :stripe=true style="text-align: left"  >
              <el-table-column type="selection" prop="select"  width="50"></el-table-column>
              <el-table-column prop="jobid" :label="$t('nav1_1.rightdiv.myjob.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="jobname" :label="$t('nav1_1.rightdiv.myjob.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="application" :label="$t('nav1_1.rightdiv.myjob.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="user" :label="$t('nav1_1.rightdiv.myjob.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="state" :label="$t('nav1_1.rightdiv.myjob.cell_5')"width="100"  :sortable="true" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span :class="scope.row.state === 'state1' ? 'green' : ''||scope.row.state === 'state2' ? 'red' : ''||scope.row.state === 'state3' ? 'blue' : ''||scope.row.state === 'state4'? 'origin' : ''||scope.row.state === 'state5' ? 'glay' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.state === 'state1'? $t('nav1_1.rightdiv.state1') : ''||scope.row.state === 'state2'? $t('nav1_1.rightdiv.state2') : ''||scope.row.state === 'state3'? $t('nav1_1.rightdiv.state3') : ''||scope.row.state === 'state4'? $t('nav1_1.rightdiv.state4') : ''||scope.row.state === 'state5'? $t('nav1_1.rightdiv.state5') : ''}}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="tableitem" >
          <div class="itemheader">
            <div class="">{{$t('nav1_1.rightdiv.alljob.title')}}</div>
            <div class="itemheader-ico"></div>
          </div>
          <div class="itemtable">
            <el-table v-loading="tableloading"  :border=true  :row-style="rowClass"  :data="tableAlljob" height="calc()" :stripe=true style="text-align: left"  >
              <el-table-column prop="jobid" :label="$t('nav1_1.rightdiv.alljob.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="jobname" :label="$t('nav1_1.rightdiv.alljob.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="application" :label="$t('nav1_1.rightdiv.alljob.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="user" :label="$t('nav1_1.rightdiv.alljob.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="state" :label="$t('nav1_1.rightdiv.alljob.cell_5')"width="100"  :sortable="true" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span :class="scope.row.state === 'state1' ? 'green' : ''||scope.row.state === 'state2' ? 'red' : ''||scope.row.state === 'state3' ? 'blue' : ''||scope.row.state === 'state4'? 'origin' : ''||scope.row.state === 'state5' ? 'glay' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.state === 'state1'? $t('nav1_1.rightdiv.state1') : ''||scope.row.state === 'state2'? $t('nav1_1.rightdiv.state2') : ''||scope.row.state === 'state3'? $t('nav1_1.rightdiv.state3') : ''||scope.row.state === 'state4'? $t('nav1_1.rightdiv.state4') : ''||scope.row.state === 'state5'? $t('nav1_1.rightdiv.state5') : ''}}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="rightdivclose" @click="rightdivclose()"></div>
      </div>
      </transition>
      <div class="rightdivopen" @click="rightdivopen()"></div>
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
        showchart:1,
        option1 :{
          title : {
            text:this.$t('nav1_1.option1.title.text'),
            x:'left'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            data:[this.$t('nav1_1.option1.legend.data1'),this.$t('nav1_1.option1.legend.data2')]
          },
          series: [
            {
              name:this.$t('nav1_1.option1.series.name'),
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:2, name:this.$t('nav1_1.option1.series.data.name1')},
                {value:13, name:this.$t('nav1_1.option1.series.data.name2')},
              ],
              itemStyle: {
                normal:{
                        color: function (params){
                          var colorList = ['#40c470','#B5e984'];
                          return colorList[params.dataIndex];
                        }
                      }
                    },
            }
          ]
        },
        option2 :{
          title : {
            text:this.$t('nav1_1.option2.title.text'),
            x:'left'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            data:[this.$t('nav1_1.option2.legend.data1'),this.$t('nav1_1.option2.legend.data2')]
          },
          series: [
            {
              name:this.$t('nav1_1.option2.series.name'),
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:2, name:this.$t('nav1_1.option2.series.data.name1')},
                {value:13, name:this.$t('nav1_1.option2.series.data.name2')},
              ],
              itemStyle: {
                normal:{
                  color: function (params){
                    var colorList = ['#ffb312','#f8e268'];
                    return colorList[params.dataIndex];
                  }
                }
              },
            }
          ]
        },
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
        tableMyjob: [
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state1',
        },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state2',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state3',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state4',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state5',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state1',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state2',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state2',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state3',
          },
        ],
        multipleSelection:[],//多选
        tableAlljob: [
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state1',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state2',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state3',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state1',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state5',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state2',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state3',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state4',
          },
          {
            jobid: '1101',
            jobname: '任务一',
            application: 'FLEX',
            user:'admin',
            state:'state5',
          },
        ],
        rightdiv:false,
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
      this.reloadChart();
      $(" .itemtable .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(30vh)', //可滚动区域高度
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
      });//菜单滚动条
    },//初始函数
    watch: {
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.getStatus(this.$route.path)
      },
      changeLanguage (){
        this.i18nChart();
      }
    },
    methods: {
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },
      delGroup() {
        var jobid = this.multipleSelection.map(item => item.jobid).join()//获取所有选中行的id组成的字符串，以逗号分隔
        if(jobid == ""){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else {
          console.log(jobid);
        }
      }, //批量删除
      delrow(e){
        console.log(e.jobid);
      }, //单条删除
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },//多选数组赋值
      filtertype(value, row) {
        return row.dingdanstate == value;
      },
      rightdivopen(){
        this.rightdiv = true;
      },
      rightdivclose(){
        this.rightdiv = false;
      },
      reloadChart:function () {
        if(resize){resize.remove()}
        var mychart1 = this.echarts.init(document.getElementById('myChart1'));
        var mychart2 = this.echarts.init(document.getElementById('myChart2'));
        var mychart3= this.echarts.init(document.getElementById('myChart3'));
        var mychart4= this.echarts.init(document.getElementById('myChart4'));
        var mychart5= this.echarts.init(document.getElementById('myChart5'));
        mychart1.setOption(this.option1);
        mychart2.setOption(this.option2);
        mychart3.setOption(this.option3);
        mychart4.setOption(this.option4);
        mychart5.setOption(this.option5);
        var charts=[mychart1,mychart2,mychart3,mychart4,mychart5,];
        var resize= $('#content').resize(function () {
          for(var i = 0; i < charts.length; i++){
            charts[i].resize();
          }
        });
      },//刷新Chart图表界面
      i18nChart : function () {
        var mychart1 = this.echarts.init(document.getElementById('myChart1'));
        this.option1.title.text = this.$t('nav1_1.option1.title.text');
        this.option1.legend.data = [this.$t('nav1_1.option1.legend.data1'),this.$t('nav1_1.option1.legend.data2')];
        this.option1.series[0].name =this.$t('nav1_1.option1.series.name');
        this.option1.series[0].data[0].name =this.$t('nav1_1.option1.series.data.name1');
        this.option1.series[0].data[1].name =this.$t('nav1_1.option1.series.data.name2');
        mychart1.setOption(this.option1);
        var mychart2 = this.echarts.init(document.getElementById('myChart2'));
        this.option2.title.text = this.$t('nav1_1.option2.title.text');
        this.option2.legend.data = [this.$t('nav1_1.option2.legend.data1'),this.$t('nav1_1.option2.legend.data2')];
        this.option2.series[0].name =this.$t('nav1_1.option2.series.name');
        this.option2.series[0].data[0].name =this.$t('nav1_1.option2.series.data.name1');
        this.option2.series[0].data[1].name =this.$t('nav1_1.option2.series.data.name2');
        mychart2.setOption(this.option2);
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
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
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
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .green{
    color:#2cc362;
  }
  .origin{
    color:#ffc731;
  }
  .red{
    color:#f96a6a;
  }
  .blue{
    color:#3f9dff;
  }
  .glay{
    color: #5a5e66;
  }
  .main{
    color:#3e3e3e;
    height:calc(100vh - 60px) !important;
    width:100%;
    margin:0 auto;
    text-align: center;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
  }
  .content{
    height:calc(100vh - 60px - 50px) !important;
  }
  .con-item{
    position: relative;
  }
  .process-title{
    padding: 10px;
    padding-top: 0px;
    border-bottom: 1px solid #d7d7d7;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 600;
  }
  .process-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin:15px 15px;
  }
  .process-item-title{
    width:80px;
    font-size: 14px;
    padding:0 5px;
  }
  .process-line{
    width:calc(100% - 80px);
    padding:0 5px;
  }
  .con-chart{
    background-color: #ffffff!important;
    height:300px;
    border:1px solid #d7d7d7;
    border-radius: 10px;
    margin: 20px;
    padding-top:5px;
  }
  #myChart3,#myChart4,#myChart5{
    width: calc( 100% - 40px );
    height:calc(100vh - 60px - 50px - 350px - 30px);
    position: absolute;
    top:0;
    z-index: 50;
    margin-bottom: 0px;
  }
  .righthidediv{
    position:fixed;
    top:5vh;
    right: 0;
    border:1px solid #d7d7d7;
    border-radius: 16px;
    width: 680px;
    height: 90vh;
    background-color: #ffffff;
    z-index: 2000;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
  }
 .rightdivclose{
   position: absolute;
   top: 40vh;
   left: -15px;
   background: url("../../../static/img/ico/icon-rightbtn01.png") no-repeat;
   background-size: contain;
   height: 80px;
   width: 15px;
   z-index: 10;
   cursor: pointer;
 }
 .rightdivopen{
   position: fixed;
   right: -1px;
   top: 45vh;
   background: url("../../../static/img/ico/icon-rightbtn02.png") no-repeat;
   background-size: contain;
   width: 15px;
   height: 80px;
   z-index: 1999;
   cursor: pointer;
 }
 .activeChart{
   z-index:51!important;
 }
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(1000px);
    opacity: 0;
  }
  .rightdivtitle{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: solid 1px #d7d7d7;
  }
  .rightdivtitleleft{
    font-size:16px;
    font-weight: 600;
  }
  .rightdivtitleleft i{
    font-size:18px;
  }
  .righthidediv{
    padding:15px;
  }
  .itemheader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
  }
  .itemheader-ico i{
    cursor: pointer;
    margin: 0 5px;
    font-size: 18px;
    padding:0;
    border: 0px;
  }
  .itemheader-ico i:hover{
    color: #2cc362;
  }
  .itemtable{
    border:1px solid #d7d7d7;
    border-radius: 8px;
  }
</style>
<style>
  .nav1_1 .process-item01 .el-progress-bar__inner{
    background: #ff7e7e!important;
  }
  .nav1_1  .process-item02 .el-progress-bar__inner{
    background: #409efe!important;
  }
  .nav1_1  .process-item03 .el-progress-bar__inner{
    background: #67c13a!important;
  }
  .nav1_1  .process-item04 .el-progress-bar__inner{
    background: #ffc830!important;
  }
  .nav1_1  .rightdivtitleright .el-button{
  padding:5px 10px;
  }
</style>
