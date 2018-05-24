<template>
  <el-container class="main nav7_7">
    <div class="content">
      <div class="header">
        <div>
          <span>{{$t('nav7_7.title')}}</span>
          <span style="margin-left:15px;">(&nbsp;<span>{{$t('nav7_7.basic.cell_0')}}</span>:&nbsp;&nbsp;<span>RVCP 2018</span>&nbsp;)</span>
        </div>
        <div>
          <el-button icon="el-icon-refresh"  plain size="small">{{$t('nav7_7.btn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <div class="basic">
          <div class="info_title">
            <span class="radius"></span><span>{{$t('nav7_7.basic.cell_1')}}</span>
          </div>
          <div class="infos">
            <div class="lists">
              <div class="list2">
                <div class="leftLabel">{{$t('nav7_7.basic.cell_1')}}</div>
                <div class="basicTable">
                  <el-table v-loading="tableloading" :row-style="rowClass"  :border=true :data="basic.basic_table" style="text-align: left;width: 100%"  >
                    <el-table-column prop="name" style="text-align:center" :label="$t('nav7_7.basic.cell_2')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="id" :label="$t('nav7_7.basic.cell_3')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="serial" style="text-align:center" :label="$t('nav7_7.basic.cell_4')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="remainingTime" :label="$t('nav7_7.basic.cell_5')" show-overflow-tooltip></el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="list1">
                <div class="leftLabel">{{$t('nav7_7.basic.cell_6')}}</div>
                <div class="rightInfo">{{basic.startTime}}</div>
              </div>
              <div class="list1">
                <div class="leftLabel">{{$t('nav7_7.basic.cell_7')}}</div>
                <div class="rightInfo">{{basic.endTime}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="rvcpInfo">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="info_title">
                <span class="radius"></span>
                <span>{{$t('nav7_7.info.title1')}}</span>
              </div>
              <div class="area">
                <div class="areaSim">
                  <div class="list3">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_1')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1">{{rvcpInfo.JSS.type}}</div>
                  </div>
                  <div class="list3">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_2')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1">{{rvcpInfo.JSS.core}}</div>
                  </div>
                  <div class="list3">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_3')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1">{{rvcpInfo.JSS.shuo}}</div>
                  </div>
                  <div class="list3">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_4')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1">{{$t('nav7_7.info.value1')}}</div>
                  </div>
                  <div class="list3">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_5')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1">{{$t('nav7_7.info.value1')}}</div>
                  </div>
                  <div class="list3">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_6')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1">{{$t('nav7_7.info.value1')}}</div>
                  </div>
                  <div class="list3">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_7')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1">{{$t('nav7_7.info.value1')}}</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="info_title">
                <span class="radius"></span>
                <span>{{$t('nav7_7.info.title2')}}</span>
              </div>
              <div class="area">
                <div class="areaSim">
                  <div class="list3">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_1')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1">{{rvcpInfo.Portal.type}}</div>
                  </div>
                  <div class="list3">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_8')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1">{{rvcpInfo.Portal.session}}</div>
                  </div>
                  <div class="list4">
                    <div class="leftLabel_1">{{$t('nav7_7.info.cell_3')}}&nbsp;:&nbsp;</div>
                    <div class="rightInfo_1"></div>
                  </div>
                  <div>
                    <br>
                    <div style="height:30px;line-height:30px;">{{$t('nav7_7.info.value2')}}</div>
                    <div style="height:30px;line-height:30px;">{{$t('nav7_7.info.value3')}}</div>
                    <div style="height:30px;line-height:30px;">{{$t('nav7_7.info.value4')}}</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="info_title">
                <span class="radius"></span>
                <span>{{$t('nav7_7.info.title3')}}</span>
              </div>
              <div class="area">
                <div class="areaSim">
                  <div style="margin-bottom:20px;" v-for="(item, index) in rvcpInfo.ADV">
                    <div class="list3">
                      <div class="leftLabel_1">{{$t('nav7_7.info.cell_9')}}&nbsp;:&nbsp;</div>
                      <div class="rightInfo_1">{{item.name}}</div>
                    </div>
                    <div class="list3">
                      <div class="leftLabel_1">{{$t('nav7_7.info.cell_10')}}&nbsp;:&nbsp;</div>
                      <div class="rightInfo_1">{{item.support}}</div>
                    </div>
                    <div style="height:40px;line-height:40px;">{{item.shuo}}</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="InfoFoot">
            <div class="list3">
              <div class="leftLabel_1">{{$t('nav7_7.info.cell_3')}}&nbsp;:&nbsp;</div>
              <div class="rightInfo_1">{{$t('nav7_7.info.foot')}}</div>
            </div>
          </div>
        </div>
      </el-row>
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
        basic:{
          basic_table:[{
            name:'DAICY',
            id:'a8c0eb64',
            serial:'20170819-1124-1079',
            remainingTime:'102天'
          }],
          startTime:'2017-11-22 11:22:33',
          endTime:'2018-11-22 11:22:33',
        },
        rvcpInfo:{
          JSS:{
            type:'RVCP|JSS',
            core:'64',
            shuo:'',
          },
          Portal:{
            type:'RVCP|HPC',
            session:'20',
          },
          ADV:[
            {
            name:'Lic Express',
            support:true,
            shuo:this.$t('nav7_7.info.value5')
            },
            {
              name:'Payment',
              support:true,
              shuo:this.$t('nav7_7.info.value5')
            },
            {
              name:'RVC',
              support:true,
              shuo:this.$t('nav7_7.info.value6')
            }
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
      $(".areaSim").slimScroll({
        width: '100%', //可滚动区域宽度
        height:'calc(100vh - 60px - 40px - 40px - 210px - 40px - 100px - 50px)', //可滚动区域高度
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
        var urlStrArr = urlStr.split('/');
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

      },//数据
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },
      i18nChart : function () {
        this.rvcpInfo.ADV[0].shuo=this.$t('nav7_7.info.value5');
        this.rvcpInfo.ADV[1].shuo=this.$t('nav7_7.info.value5');
        this.rvcpInfo.ADV[2].shuo=this.$t('nav7_7.info.value6');
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
  .list-item{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
    position: absolute;
    top: 55px;
    left: 0;
    z-index: 50;
  }
  .info_title{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-weight: 600;
    height:40px;
  }
  .basic{
    width:calc(100% - 30px);
    margin:0 15px 15px;
  }
  .infos{
    height:195px;
    border: #d7d7d7 1px solid;
    border-radius: 4px;
  }
  .lists{padding:15px 15px 15px 0;}
  .list1{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height:40px;
    line-height:40px;
  }
  .list2{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .leftLabel{
    width: 120px;
    text-align:right;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-right:20px;
  }
  .basicTable{
    width: calc(100% - 140px);
  }
  .rightInfo{
    width: calc(100% - 140px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .rvcpInfo{
    margin:0 15px 15px;
    width: calc(100% - 30px );
  }
  .area{
    height:calc(100vh - 60px - 40px - 40px - 210px - 40px - 100px - 50px);
    border: #d7d7d7 1px solid;
    border-radius: 4px;
  }
  .area .areaSim{
    padding:0 15px;
  }
  .list3{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height:40px;
    line-height:40px;
  }
  .list4{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .list3 .leftLabel_1{
    text-align:left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .list3 .rightInfo_1{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .radius{
    display:inline-block;
    width:8px;height:8px;
    background:#2cc362;
    border-radius:4px;
    margin-right:8px;
  }
  .InfoFoot{
    /*width:100%;*/
    height:38px;
    border: #d7d7d7 1px solid;
    border-radius: 4px;
    padding:0 15px;
    margin-top:15px;
  }
</style>
<style>
  .basicTable td,.basicTable th.is-leaf {
    text-align: center;
  }
</style>
