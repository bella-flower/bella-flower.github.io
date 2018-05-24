<template>
    <el-container class="main nav1">
      <el-row id="aside" class="aside">
        <router-link v-for="(item,index) in asideArray" :to="{ name:item.name}" class="asideItem">
          <i :class="item.className"></i>
          <span>{{$t(item.textCon)}}</span>
        </router-link>
      </el-row>
      <el-row class="content">
        <router-view></router-view>
      </el-row>
    </el-container>
</template>
<script>
  import  router from '../router/index'
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      return {
        title:'RVCP-工业仿真平台',
        asideArray:[
          {name:'nav1_1',className:'asideItem01',textCon:'rvcpaside.nav1_1'},
          {name:'nav1_2',className:'asideItem02',textCon:'rvcpaside.nav1_2'},
          {name:'nav1_3',className:'asideItem03',textCon:'rvcpaside.nav1_3'},
          {name:'nav1_4',className:'asideItem04',textCon:'rvcpaside.nav1_4'},
          {name:'nav1_5',className:'asideItem05',textCon:'rvcpaside.nav1_5'},
          {name:'nav1_6',className:'asideItem06',textCon:'rvcpaside.nav1_6'},
          ],
        }
    },
    created: function () {
      document.title = this.title;
      router.push({name:'nav1_1'});

    },
    mounted(){
      $("#aside").slimScroll({
        width: 'auto', //可滚动区域宽度
        height: '100%', //可滚动区域高度
        size: '5px', //组件宽度
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
        borderRadius: '7px', //滚动条圆角
        railBorderRadius: '7px' //轨道圆角
      });//菜单滚动条
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
  .main{
    height:calc(100vh - 60px);
    width:100%;
    margin:0 auto;
    text-align: center;
    background-color: #f6f6f6;
  }
  .aside{
    background-color: #ffffff;
    width: 120px!important;
    min-width: 120px!important;
    height: calc(100vh - 60px);
    overflow: auto;
    padding: 10px  0;
    color: #888888;
    border:#d2d2d2 solid 1px;
    border-radius: 4px;
    border-right: 0;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: flex-end;
    background-color: #ffffff;
  }
  .content{
    width: calc( 100% - 120px  )!important;
  }
  .asideItem{
    width:100px;
    min-width:100px;
    height:90px;
    min-height:90px;
    margin:0 5px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: #606061;
  }
  .asideItem:hover{
    background-color: #ffffff;
    color: #606061;
  }
  .asideItem01{
    background: url("../../../static/img/ico/icon-1.1.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem02{
    background: url("../../../static/img/ico/icon-1.2.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem03{
    background: url("../../../static/img/ico/icon-1.3.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem04{
    background: url("../../../static/img/ico/icon-1.4.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem05{
    background: url("../../../static/img/ico/icon-1.5.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem06{
    background: url("../../../static/img/ico/icon-1.6.png") no-repeat;
    width:25px;
    height:30px;
  }
  .router-link-active{
    background-color: #f3f3f5!important;
    border: #d2d2d2 solid 1px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-right: 0px;
  }
</style>
