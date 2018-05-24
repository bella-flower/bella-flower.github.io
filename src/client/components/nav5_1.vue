<template  xmlns="http://www.w3.org/1999/html">
    <el-container>
      <div  class="main nav5_1">
        <div class="content">
          <div class="header" style="font-size:12px;">
            <div >{{$t('nav5_1.title')}}</div>
            <div class="rightbtn">
              <div class="block">
                <span class="demonstration">{{$t('nav5_1.header.btn_1')}}</span>
                <el-date-picker
                  v-model="header.value1"
                  type="daterange"
                  align="right"
                  unlink-panels
                  :range-separator="$t('nav5_1.header.range')"
                  :start-placeholder="$t('nav5_1.header.start')"
                  :end-placeholder="$t('nav5_1.header.end')"
                  :picker-options="header.pickerOptions2" size="small">
                </el-date-picker>
              </div>
              <div class="block">
                <span class="demonstration">{{$t('nav5_1.header.btn_2')}}</span>
                <el-select v-model="header.value2" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in header.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <el-button icon="el-icon-printer" plain size="small" @click="pdfdown">{{$t('nav1_6.buttonGroup.exportBtn')}}Pdf{{$t('nav5_1.header.btn_2')}}</el-button>
              <el-button icon="el-icon-printer" plain size="small" @click="handleDownload" :loading="downloadLoading">{{$t('nav1_6.buttonGroup.exportBtn')}}Excel</el-button>
            </div>
          </div>
          <el-row class="view-item" style="padding-top: 5px;">
            <el-row style="margin-bottom: 5px;">
              <div class="right">
                <div class="block">
                  <span class="demonstration">{{$t('nav5_1.main.btn_1')}}</span>
                  <el-select v-model="main.value1" :placeholder="$t('nav3_2.select1.placeholder')" size="small" style="width:120px;margin-right:5px;" >
                    <el-option  v-for="(item, index) in main.options1" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="block">
                  <span class="demonstration">{{$t('nav5_1.main.btn_2')}}</span>
                  <el-select v-model="main.value2" :placeholder="$t('nav3_2.select2.placeholder')" size="small" style="width:120px;margin-right:5px;display: inline-block;"  >
                    <el-option  v-for="(item, index) in main.options2" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="block">
                  <span class="demonstration">{{$t('nav5_1.main.btn_3')}}</span>
                  <el-select v-model="main.value3" :placeholder="$t('nav3_2.select3.placeholder')" size="small" style="width:150px;"  >
                    <el-option  v-for="(item, index) in main.options3" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span class="demonstration">{{$t('nav5_1.main.btn_4')}}</span>
                  <el-select v-model="main.value4" :placeholder="$t('nav3_2.select3.placeholder')" size="small" style="width:120px;"  >
                    <el-option  v-for="(item, index) in main.options4" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <el-button icon="el-icon-search" size="small" plain style="margin-left: 10px;"></el-button>
              </div>
            </el-row>
            <div class="itemtable" style="display: flex;flex-direction: row;">
              <div id="left">
                <div class="leftDiv" id="myChart1"></div>
              </div>
              <div class="rightDiv">
                <el-row style="margin-left: 20px;line-height: 36px;white-space: nowrap;overflow: hidden;">{{$t('nav5_1.main.rightDiv.title')}}</el-row>
                <el-row  class="rightTable">
                  <el-table :data="main.rightDiv.tableData" style="margin-left: 20px;border:1px solid #d8dce5;" :default-sort = "{prop: 'date', order: 'descending'}" width="100%" height="calc()" id="rightTable">
                    <el-table-column prop="date"  :label="$t('nav5_1.main.rightDiv.time')" sortable>
                    </el-table-column>
                    <el-table-column prop="progress" :label="$t('nav5_1.main.rightDiv.CPU')" sortable>
                      <template slot-scope="scope">
                        <el-progress :percentage="scope.row.progress"
                                     :class="scope.row.progress < 50 ? 'green':''|| (scope.row.progress >= 50 && scope.row.progress < 100) ?'origin':''||scope.row.progress == 100 ? 'red':''"></el-progress>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
              </div>
            </div>
          </el-row>
        </div>

        <loadfooter style="width: 100%"></loadfooter>
      </div>
    </el-container>
</template>
<script>
  import Vue from 'vue'
  import  router from '../router/index'
  var echarts = require('echarts');
  var colors = ['#5793f3', '#3e3e3e', '#675bba'];
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      return {
        title:'RVCP 工业仿真平台',
        exportbtn:false,
        radio:1,
        formLabelWidth: '100px',
        downloadLoading:false,
        form:{},
        header:{
          pickerOptions2: {
            shortcuts: [{
              text: this.$t('nav5_1.header.pickerOptions2.text1'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: this.$t('nav5_1.header.pickerOptions2.text2'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: this.$t('nav5_1.header.pickerOptions2.text3'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: this.$t('nav5_1.header.pickerOptions2.text4'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: this.$t('nav5_1.header.pickerOptions2.text5'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          value1:  '',
          options: [{
            value: this.$t('nav5_1.header.options.cell_1'),
            label: this.$t('nav5_1.header.options.cell_1')
          }, {
            value: this.$t('nav5_1.header.options.cell_2'),
            label: this.$t('nav5_1.header.options.cell_2')
          }, {
            value: this.$t('nav5_1.header.options.cell_3'),
            label: this.$t('nav5_1.header.options.cell_3')
          }, ],
          value2: this.$t('nav5_1.header.options.cell_1'),
        },
        main:{
          value1:this.$t('nav5_1.main.options1.cell_1'),
          options1: [
            {
            value: this.$t('nav5_1.main.options1.cell_1'),
            label: this.$t('nav5_1.main.options1.cell_1')
          }, {
            value:  this.$t('nav5_1.main.options1.cell_2'),
            label:  this.$t('nav5_1.main.options1.cell_2')
          }, {
            value:  this.$t('nav5_1.main.options1.cell_3'),
            label:  this.$t('nav5_1.main.options1.cell_3')
          }, {
            value: this.$t('nav5_1.main.options1.cell_4'),
            label: this.$t('nav5_1.main.options1.cell_4')
          }, {
            value: this.$t('nav5_1.main.options1.cell_5'),
            label: this.$t('nav5_1.main.options1.cell_5')
          }, ],
          value2:this.$t('nav5_1.main.options2.cell_1'),
          options2: [
            {
            value: this.$t('nav5_1.main.options2.cell_1'),
            label: this.$t('nav5_1.main.options2.cell_1')
          }, {
            value: 'EP01',
            label: 'EP01'
          }, {
            value: 'EP02',
            label: 'EP02'
          }],
          value3:this.$t('nav5_1.main.options3.cell_1'),
          options3: [
            {
            value: this.$t('nav5_1.main.options3.cell_1'),
            label: this.$t('nav5_1.main.options3.cell_1')
          }, {
            value: this.$t('nav5_1.main.options3.cell_2'),
            label: this.$t('nav5_1.main.options3.cell_2')
          }, {
            value: this.$t('nav5_1.main.options3.cell_3'),
            label: this.$t('nav5_1.main.options3.cell_3')
          }],
          value4:'Average',
          options4: [
            {
            value: 'Average',
            label: 'Average'
          }, {
            value: 'Total',
            label: 'Total'
          }, {
            value: 'Pencentage',
            label: 'Pencentage'
          },{
            value: 'Quantity',
            label: 'Quantity'
          }],
          rightDiv:{
            tableData: [{
              date: '2017-01-02',
              progress: 20,
            }, {
              date: '2017-02-04',
              progress: 40,
            }, {
              date: '2017-03-04',
              progress: 100,
            }, {
              date: '2017-04-04',
              progress: 80,
            }, {
              date: '2017-05-04',
              progress: 30,
            }, {
              date: '2017-06-04',
              progress: 50,
            },{
              date: '2017-07-02',
              progress: 20,
            }, {
              date: '2017-08-04',
              progress: 40,
            }, {
              date: '2017-09-04',
              progress: 100,
            }, {
              date: '2017-10-04',
              progress: 80,
            }, {
              date: '2017-11-04',
              progress: 30,
            }, {
              date: '2017-12-04',
              progress: 50,
            }]
          },
          leftDiv:{
            title:{
              show:"true",
              text: this.$t('nav5_1.main.options3.cell_1') + ' by ' + this.$t('nav5_1.main.options1.cell_1') + '（2017-12-02~2018-01-01）: '+ this.$t('nav5_1.main.options2.cell_1'),
              left:"center",
              textStyle:{//标题内容的样式
                color:'#3e3e3e',
                fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
                fontFamily:"san-serif",//主题文字字体，默认微软雅黑
                fontSize:14//主题文字字体大小，默认为18px
              },
              top:'4%',
            },
            color:colors,
            tooltip: {
              trigger: 'none',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              top: 70,
              bottom: 50
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                axisLine: {
                  onZero: false,
                  lineStyle: {
                    color: colors[1]
                  }
                },
                axisPointer: {
                  label: {
                    formatter: function (params) {
                      return params.value
                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                  }
                },
                data: ["2017-1", "2017-2", "2017-3", "2017-4", "2017-5", "2017-6", "2017-7", "2017-8", "2017-9", "2017-10", "2017-11", "2017-12"]
              },
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name:this.$t('nav5_1.options3.cell_1'),
                type:'line',
                smooth: true,
                data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
              }
            ]
          },
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
      $(" #rightTable .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 95px - 55px - 75px - 105px)', //可滚动区域高度
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
      });//菜单滚动条
      var myChart = echarts.init(document.getElementById('myChart1'));
      myChart.setOption(this.main.leftDiv);
      window.onresize = myChart.resize;
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
        this.header.pickerOptions2.shortcuts[0].text = this.$t('nav5_1.header.pickerOptions2.text1');
        this.header.pickerOptions2.shortcuts[1].text = this.$t('nav5_1.header.pickerOptions2.text2');
        this.header.pickerOptions2.shortcuts[2].text = this.$t('nav5_1.header.pickerOptions2.text3');
        this.header.pickerOptions2.shortcuts[3].text = this.$t('nav5_1.header.pickerOptions2.text4');
        this.header.pickerOptions2.shortcuts[4].text = this.$t('nav5_1.header.pickerOptions2.text5');
        this.header.options[0].value = this.$t('nav5_1.header.options.cell_1');
        this.header.options[1].value = this.$t('nav5_1.header.options.cell_2');
        this.header.options[2].value = this.$t('nav5_1.header.options.cell_3');
        this.main.options1[0].value = this.$t('nav5_1.main.options1.cell_1');
        this.main.options1[1].value = this.$t('nav5_1.main.options1.cell_2');
        this.main.options1[2].value = this.$t('nav5_1.main.options1.cell_3');
        this.main.options1[3].value = this.$t('nav5_1.main.options1.cell_4');
        this.main.options1[4].value = this.$t('nav5_1.main.options1.cell_5');
        this.main.options2[0].value = this.$t('nav5_1.main.options2.cell_1');
        this.main.options3[0].value = this.$t('nav5_1.main.options3.cell_1');
        this.main.options3[1].value = this.$t('nav5_1.main.options3.cell_2');
        this.main.options3[2].value = this.$t('nav5_1.main.options3.cell_3');
        this.header.options[0].label = this.$t('nav5_1.header.options.cell_1');
        this.header.options[1].label = this.$t('nav5_1.header.options.cell_2');
        this.header.options[2].label = this.$t('nav5_1.header.options.cell_3');
        this.main.options1[0].label = this.$t('nav5_1.main.options1.cell_1');
        this.main.options1[1].label = this.$t('nav5_1.main.options1.cell_2');
        this.main.options1[2].label = this.$t('nav5_1.main.options1.cell_3');
        this.main.options1[3].label = this.$t('nav5_1.main.options1.cell_4');
        this.main.options1[4].label = this.$t('nav5_1.main.options1.cell_5');
        this.main.options2[0].label = this.$t('nav5_1.main.options2.cell_1');
        this.main.options3[0].label = this.$t('nav5_1.main.options3.cell_1');
        this.main.options3[1].label = this.$t('nav5_1.main.options3.cell_2');
        this.main.options3[2].label = this.$t('nav5_1.main.options3.cell_3');
        this.header.value2 = this.$t('nav5_1.header.options.cell_1');
        this.main.value1 = this.$t('nav5_1.main.options1.cell_1');
        this.main.value2 = this.$t('nav5_1.main.options2.cell_1');
        this.main.value3 = this.$t('nav5_1.main.options3.cell_1');
        var mychart1 = this.echarts.init(document.getElementById('myChart1'));
        this.main.leftDiv.title.text = this.$t('nav5_1.main.options3.cell_1') + 'by' + this.$t('nav5_1.main.options1.cell_1') + '（2017-12-02~2018-01-01）: '+ this.$t('nav5_1.main.options2.cell_1');
        mychart1.setOption(this.main.leftDiv);
      },//国际化
      handleDownload:function(){
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = [this.$t('nav5_1.main.rightDiv.time'), this.$t('nav5_1.main.rightDiv.CPU')]
          const filterVal = ['date', 'progress']
          const list = this.main.rightDiv.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')
          this.downloadLoading = false
        })
      },//导出excel
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },//导出excel
      pdfdown:function(){
        if($("#pdfwrap")){$("#pdfwrap").remove();}
        var pdf = new jsPDF('', 'pt', 'a4');
        $('body').append('<div id="pdfwrap">'+$("#rightTable .el-table__body-wrapper").html()+'</div>');


        var target = document.getElementById("left");
        var target1 = document.getElementById("pdfwrap");

        target.style.background = "#FFFFFF";
        target1.style.background = "#FFFFFF";
        var chartWidth;
        var chartHeight;
        var pageChart;

        html2canvas(target, {
          height:$('#left').height(),
          onrendered:function(canvas) {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;
            chartWidth = 595.28;
            chartHeight = 592.28/contentWidth * contentHeight;
            pageChart = canvas.toDataURL('image/jpeg', 1.0);
          }
        });
        html2canvas(target1, {
          height:$('#pdfwrap').height(),
          onrendered:function(canvas) {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;

            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            var leftHeight = contentHeight + chartHeight;

            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28;
            var imgHeight = 592.28/contentWidth * contentHeight;

            var pageData = canvas.toDataURL('image/jpeg', 1.0);
            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            //页面偏移
            var position = chartHeight + 20;
            pdf.addImage(pageChart, 'JPEG', 0,20, chartWidth, chartHeight );
            if (leftHeight < pageHeight) {
              pdf.setFontSize(20);
              pdf.addImage(pageData, 'JPEG', 0,position, imgWidth, imgHeight );
            } else {
              while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                  pdf.addPage();
                }
              }
            }
            pdf.save("newRVCP.pdf");
            $("#pdfwrap").remove();
          }
        });
      },//导出pdf报表
      reloadChart:function () {
      },//刷新Chart图表界面
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
  .rightbtn{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .block{
    margin-right: 20px;
  }
  .demonstration{
    margin-right: 10px;
    font-size:14px;
    font-weight: normal;
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
    left: 0px;
    z-index: 50;
    border-radius: 8px;
  }
  .right{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  #myChart1{
    text-align: right;
    width: 960px;
    min-width: 960px;
    border:1px solid #d8dce5;
    border-radius: 4px;
    height:calc(100vh - 65px - 55px - 75px - 40px);
    margin-right:20px;
  }
  .rightDiv{
    border-left: 1px solid #d8dce5;
    width:calc(100% - 1000px);
    text-align: left;
  }
</style>

<style>
  .green .el-progress-bar__inner{
    background-color:#2cc362;
  }
  .origin .el-progress-bar__inner{
    background-color:#ffc731;
  }
  .red .el-progress-bar__inner{
    background-color:#f96a6a;
  }
  .blue .el-progress-bar__inner{
    background-color:#3f9dff;
  }
  .glay .el-progress-bar__inner{
    background-color: #5a5e66;
  }
  .nav5_1 .el-range-separator{
    color:#3e3e3e;
    font-size: 14px;
    font-weight: normal;
  }
  .nav5_1 .cell{
    color:#3e3e3e;
  }
</style>
<!–[if IE]>
<style type=”text/css”>
  .itemtable{
    display: -ms-flexbox;
    flex-direction: row;
  }
</style>
<![endif]–>
