<template>
  <el-container>
    <div  class="main nav5_4">
      <div class="content">
        <div class="header" style="font-size:12px;">
          <div >{{$t('nav5_4.title')}}</div>
          <div class="rightbtn">
            <div class="block">
              <el-select v-model="header.value2" :placeholder="$t('nav3_2.select1.placeholder')" size="small" style="width:140px;margin-right:5px;" >
                <el-option  v-for="(item, index) in header.options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="header.value3" :placeholder="$t('nav3_2.select1.placeholder')" size="small" style="width:140px;margin-right:5px;" >
                <el-option  v-for="(item, index) in header.options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="demonstration">{{$t('nav5_1.header.btn_1')}}</span>
              <el-date-picker  v-model="header.value1"  type="daterange" align="right"  unlink-panels  :range-separator="$t('nav5_1.header.range')"  :start-placeholder="$t('nav5_1.header.start')"  :end-placeholder="$t('nav5_1.header.end')"  :picker-options="header.pickerOptions2" size="small"></el-date-picker>
            </div>
            <el-button icon="el-icon-search" size="small" plain style="margin-left: 10px;"></el-button>
            <el-button icon="el-icon-printer" plain size="small" @click="pdfdown">{{$t('nav1_6.buttonGroup.exportBtn')}}Pdf{{$t('nav5_1.header.btn_2')}}</el-button>
          </div>
        </div>
        <el-row class="view-item pageitem" style="padding-top: 5px;">
          <el-collapse v-model="activeNames" @change="handleChange" style="border-top: 0px;border-bottom: 0px;">
            <el-collapse-item :title="$t('nav5_4.main.title1')" name="1">
              <div class="border">
                <el-form ref="form1"  :model="form1" label-width="200px" class="form">
                  <el-form-item :label="$t('nav5_4.main.page1.item_1')" :rules="form1.rules" prop="name1" >
                    <el-input v-model.number="form1.name1" class="inputLength"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page1.item_2')">
                    <el-table style="width: 90%;border-radius: 4px;border: 1px solid #d8dce5;" border :data="main.table1" @row-style="rowStyle">
                      <el-table-column  prop="name" :label="$t('nav5_4.main.page1.item2_1')">
                        <template scope="props">
                            <el-input  :placeholder="$t('nav5_4.main.page1.item_7')"  suffix-icon="el-icon-edit"> </el-input>
                        </template >
                      </el-table-column>
                      <el-table-column  prop="user" :label="$t('nav5_4.main.page1.item2_2')">
                        <template scope="scope">
                          <el-input :placeholder="$t('nav5_4.main.page1.item_7')"  suffix-icon="el-icon-edit">
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  prop="phone" :label="$t('nav5_4.main.page1.item2_3')">
                        <template scope="scope">
                          <el-input  :placeholder="$t('nav5_4.main.page1.item_7')"  suffix-icon="el-icon-edit" >
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  prop="email" :label="$t('nav5_4.main.page1.item2_4')">
                        <template scope="scope">
                          <el-input  :placeholder="$t('nav5_4.main.page1.item_7')"   suffix-icon="el-icon-edit">
                          </el-input>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page1.item_3')">
                    2017-09-12
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page1.item_4')">
                    2017-09-12
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page1.item_5')">
                    <el-date-picker type="datetime"  v-model="form1.value1" :placeholder="$t('nav5_4.main.page1.item_8')" class="inputLength" >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page1.item_6')"  :rules="form1.rules2" prop="name2">
                    <el-input v-model.number="form1.name2" class="inputLength"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="$t('nav5_4.main.title2')" name="2">
              <div class="border">
                <el-row class="title">{{$t('nav5_4.main.page2.item_1')}}</el-row>
                <el-form ref="form2" :model="form2" label-width="200px">
                  <el-form-item :label="$t('nav5_4.main.page2.item1_1')">
                    {{$t('nav5_4.main.page2.item1_2')}}
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page2.item1_3')">
                    <el-table style="width: 90%;border-radius: 4px;border: 1px solid #d8dce5;" border :data="main.table2">
                      <el-table-column  prop="price" :label="$t('nav5_4.main.page2.item1_4')">
                        <template scope="scope">
                          <el-input
                            :placeholder="$t('nav5_4.main.page1.item_7')"
                            suffix-icon="el-icon-edit"
                            >
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  prop="money" :label="$t('nav5_4.main.page2.item1_5')">
                      </el-table-column>
                      <el-table-column  prop="num" :label="$t('nav5_4.main.page2.item1_6')">
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page2.item1_7')">
                    <el-input type="textarea" :rows="2" placeholder="" style="width: 90%;border-radius: 4px;"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="border">
                <el-row class="title">{{$t('nav5_4.main.page2.item_2')}}</el-row>
                <el-form ref="form3" :model="form3" label-width="200px">
                  <el-form-item :label="$t('nav5_4.main.page2.item1_1')">
                    {{$t('nav5_4.main.page2.item1_2')}}
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page2.item1_3')">
                    <el-table style="width: 90%;border-radius: 4px;border: 1px solid #d8dce5;" border :data="main.table3">
                      <el-table-column  prop="price" :label="$t('nav5_4.main.page2.item1_4')">
                        <template scope="scope">
                          <el-input
                            :placeholder="$t('nav5_4.main.page1.item_7')"
                            suffix-icon="el-icon-edit"
                           >
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  prop="money" :label="$t('nav5_4.main.page2.item1_5')">
                      </el-table-column>
                      <el-table-column  prop="num" :label="$t('nav5_4.main.page2.item1_6')">
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page2.item1_7')">
                    <el-input type="textarea" :rows="2" placeholder="" style="width: 90%;border-radius: 4px;"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="border">
                <el-row class="title">{{$t('nav5_4.main.page2.item_3')}}</el-row>
                <el-form ref="form3" :model="form3" label-width="200px">
                  <el-form-item :label="$t('nav5_4.main.page2.item1_1')">
                    {{$t('nav5_4.main.page2.item1_2')}}
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page2.item1_3')">
                    <el-table style="width: 90%;border-radius: 4px;border: 1px solid #d8dce5;" border :data="main.table4">
                      <el-table-column  prop="price" :label="$t('nav5_4.main.page2.item1_4')">
                        <template scope="scope">
                          <el-input
                            :placeholder="$t('nav5_4.main.page1.item_7')"
                            suffix-icon="el-icon-edit"
                            >
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  prop="money" :label="$t('nav5_4.main.page2.item1_5')">
                      </el-table-column>
                      <el-table-column  prop="num" :label="$t('nav5_4.main.page2.item1_6')">
                        <template scope="scope">
                          <el-input
                            :placeholder="$t('nav5_4.main.page1.item_7')"
                            suffix-icon="el-icon-edit"
                            >
                          </el-input>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page2.item1_7')">
                    <el-input type="textarea" :rows="2" placeholder="" style="width: 90%;border-radius: 4px;"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <el-row><span class="title">{{$t('nav5_4.main.page2.item_4')}}</span>: <span>0.00</span></el-row>
            </el-collapse-item>
            <el-collapse-item :title="$t('nav5_4.main.title3')" name="3">
              <div class="border">
                <el-form ref="form4" :model="form4" label-width="200px" class="form">
                  <el-form-item :label="$t('nav5_4.main.page3.item_1')"  :rules="form4.rules" prop="name1">
                    <el-input v-model.number="form4.name1" style="width:270px;"></el-input>
                    <el-button style="margin-left: 10px;">{{$t('nav5_4.main.page3.item_6')}}</el-button>
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page3.item_2')">
                    0.00
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page3.item_3')">
                    0.00
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page3.item_4')"  :rules="form4.rules2" prop="name2">
                    <el-input v-model.number="form4.name2" class="inputLength"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('nav5_4.main.page3.item_5')">
                    0.00
                  </el-form-item>
                </el-form>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-row>
      </div>

      <loadfooter style="width: 100%"></loadfooter>
    </div>
  </el-container>
</template>
<script>
  import Vue from 'vue'
  import  router from '../router/index'
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      return {
        title:'RVCP 工业仿真平台',
        exportbtn:false,
        radio:1,
        formLabelWidth: '100px',
        downloadLoading:false,
        form1:{
          name1:'',
          name2:'',
          value1:'',
          rules:[
            { type: 'number', message: this.$t('nav5_4.main.page1.rules1.cell_1')}
          ],
          rules2:[
            { type: 'number', message: this.$t('nav5_4.main.page1.rules1.cell_2')}
          ],
        },
        form2:{

        },
        form3:{

        },

        form4:{
          name1:'',
          name2:'',
          rules:[
            { type: 'number', message: this.$t('nav5_4.main.page3.rules2.cell_1')}
          ],
          rules2:[
            { type: 'number', message: this.$t('nav5_4.main.page3.rules2.cell_2')}
          ],

        },
        activeNames: ['1','2','3'],//默认打开详细信息、作业目录的折叠面板的name值
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
          value2:this.$t('nav5_4.header.options1.cell_1'),
          options1:[
            {
            value: this.$t('nav5_4.header.options1.cell_1'),
            label: this.$t('nav5_4.header.options1.cell_1')
          },{
            value:'CAE',
            label:'CAE'
          },{
            value:'EDA',
            label:'EDA'
          },{
            value:'日产',
            label:'日产'
          },{
              value:'7898',
              label:'7898'
            }],
          value3:this.$t('nav5_4.header.options2.cell_1'),
          options2:[
            {
            value: this.$t('nav5_4.header.options2.cell_1'),
            label: this.$t('nav5_4.header.options2.cell_1')
          },{
            value:'demo1',
            label:'demo1'
          },{
            value:'demo2',
            label:'demo2'
          },{
            value:'demo3',
            label:'demo3'
          }],
        },
        main:{
          table1:[
            {name:'',user:'',phone:'',email:''}
          ],
          table2:[
            {price:'',money:'0',num:'0'}
          ],
          table3:[
            {price:'',money:'0',num:'0'}
          ],
          table4:[
            {price:'',money:'0',num:''}
          ],
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
      $(" .pageitem").slimScroll({
        width: 'calc(100% - 10px )', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 70px)', //可滚动区域高度
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
      handleChange(val) {
        console.log(val);
      },
      rowStyle:function(){
        return {"background-color":"#fff"};
      },
      i18nChart : function () {
        this.form1.rules[0].message = this.$t('nav5_4.main.page1.rules1.cell_1');
        this.form1.rules2[0].message = this.$t('nav5_4.main.page1.rules1.cell_2');
        this.form4.rules[0].message =  this.$t('nav5_4.main.page3.rules2.cell_1');
        this.form4.rules2[0].message = this.$t('nav5_4.main.page3.rules2.cell_2');
        this.header.pickerOptions2.shortcuts[0].text = this.$t('nav5_1.header.pickerOptions2.text1');
        this.header.pickerOptions2.shortcuts[1].text = this.$t('nav5_1.header.pickerOptions2.text2');
        this.header.pickerOptions2.shortcuts[2].text = this.$t('nav5_1.header.pickerOptions2.text3');
        this.header.pickerOptions2.shortcuts[3].text = this.$t('nav5_1.header.pickerOptions2.text4');
        this.header.pickerOptions2.shortcuts[4].text = this.$t('nav5_1.header.pickerOptions2.text5');
        this.header.options1[0].value = this.$t('nav5_4.header.options1.cell_1');
        this.header.options1[0].label = this.$t('nav5_4.header.options1.cell_1');
        this.header.options2[0].value = this.$t('nav5_4.header.options2.cell_1');
        this.header.options2[0].label = this.$t('nav5_4.header.options2.cell_1');
        this.header.value2 = this.$t('nav5_4.header.options1.cell_1');
        this.header.value3 = this.$t('nav5_4.header.options2.cell_1');

      },//国际化
      pdfdown:function(){
        if($("#pageitem")){$("#pageitem").remove();}
        var pdf = new jsPDF('', 'pt', 'a4');
        $('body').append('<div id="pageitem" style="width:100%;">'+$(".pageitem").html()+'</div>');

        var target1 = document.getElementById("pageitem");

        target1.style.background = "#FFFFFF";

        html2canvas(target1, {
          height:$('#pageitem').height(),
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

            var chartWidth = 595.28;
            var chartHeight = 592.28/contentWidth * contentHeight;
            var  pageChart = canvas.toDataURL('image/jpeg', 1.0);
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
            $("#pageitem").remove();
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
    width: calc(100% - 40px );
    background-color: #ffffff;
    margin-left:15px;
    margin-right:15px;
    padding: 15px;
    padding-right: 25px;
    border: #ffffff 1px solid;
    border-radius: 8px;
    border-radius: 8px;
  }
  .border{
    border:1px solid #d8dce5;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .title{
    margin-left: 30px;
    line-height: 40px;
  }
  .form{
    margin-top: 15px;
  }
  .inputLength{
    width:350px;
  }
</style>
<style>
  .el-collapse-item__arrow {
    float: left;
  }
  .nav5_4 .el-range-separator{
    color:#3e3e3e;
    font-size: 14px;
    font-weight: normal;
  }
  .nav5_4 .cell{
    color:#3e3e3e;
  }
  .nav5_4 .el-autocomplete{
    width:100%;
  }
  .nav5_4 .el-table .cell{
    text-align: center;
    font-weight: normal;
    padding-right: 0px;
    padding-left: 0px;
  }
  .nav5_4 .el-table--border td:first-child .cell{
    padding-right: 0px;
    padding-left: 0px;
  }
  .nav5_4 .el-table .el-input__inner{
    border: 1px solid #fff;
    height:48px;
  }
  .nav5_4 .el-form-item {
    margin-bottom: 20px;
  }
  .nav5_4 .el-table td{
    padding: 0px;
  }
  .nav5_4 .el-form-item__content .el-table{
   line-height: 1px;
  }
</style>
