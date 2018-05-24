<template>
    <el-container id="main" class="main nav2">
      <el-row id="aside" class="aside">
        <router-link v-for="(item,index) in asideArray" :to="{ name:item.name}" class="asideItem"  @click.native="againClick(index)" :class="item.name" @mouseover.native="mouseovers(item.name,index)" @mouseout.native="mouseouts(item.name,index)">
          <i :class="item.className"></i>
          <span>{{$t(item.textCon)}}</span>
        </router-link>
      </el-row>
      <el-row class="content">
        <router-view></router-view>
      </el-row>
      <div  class="navtip" :class="tip2_2class" @mouseover="nav2_2tipovers()" @mouseout="nav2_2tipouts()">
        <router-link v-for="(item,index) in nav2_2Array" :to="{ name:item.name}" class="navItem">
          <span>{{$t(item.textCon)}}</span>
        </router-link>
      </div>
      <div  class="navtip" :class="tip2_3class" @mouseover="nav2_3tipovers()" @mouseout="nav2_3tipouts()">
        <router-link v-for="(item,index) in nav2_3Array" :to="{ name:item.name}" class="navItem">
          <span>{{$t(item.textCon)}}</span>
        </router-link>
      </div>
      <div  class="navtip" :class="tip2_7class" @mouseover="nav2_7tipovers()" @mouseout="nav2_7tipouts()">
        <router-link v-for="(item,index) in nav2_7Array" :to="{ name:item.name}" class="navItem">
          <span>{{$t(item.textCon)}}</span>
        </router-link>
      </div>
    </el-container>
</template>
<script>
  import  router from '../router/index'
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      return {
        title:'RVCP-工业仿真平台',
        nav2_2tip:false,
        tip2_2class:'',
        tip2_3class:'',
        tip2_7class:'',
        asideArray:[
          {name:'nav2_1',className:'asideItem01',textCon:'rvcpaside.nav2_1'},
          {name:'nav2_2',className:'asideItem02',textCon:'rvcpaside.nav2_2'},
          {name:'nav2_3',className:'asideItem03',textCon:'rvcpaside.nav2_3'},
          {name:'nav2_4',className:'asideItem04',textCon:'rvcpaside.nav2_4'},
          {name:'nav2_5',className:'asideItem05',textCon:'rvcpaside.nav2_5'},
          {name:'nav2_6',className:'asideItem06',textCon:'rvcpaside.nav2_6'},
          {name:'nav2_7',className:'asideItem07',textCon:'rvcpaside.nav2_7'},
          {name:'nav2_8',className:'asideItem08',textCon:'rvcpaside.nav2_8'},
          {name:'nav2_9',className:'asideItem09',textCon:'rvcpaside.nav2_9'},
          ],
        nav2_2Array:[
          {name:'nav2_2_1',className:'',textCon:'rvcpaside.nav2_2_1'},
          {name:'nav2_2_2',className:'',textCon:'rvcpaside.nav2_2_2'},
          {name:'nav2_2_3',className:'',textCon:'rvcpaside.nav2_2_3'},
        ],
        nav2_3Array:[
          {name:'nav2_3_1',className:'',textCon:'rvcpaside.nav2_3_1'},
          {name:'nav2_3_2',className:'',textCon:'rvcpaside.nav2_3_2'},
        ],
        nav2_7Array:[
          {name:'nav2_7_1',className:'',textCon:'rvcpaside.nav2_7_1'},
          {name:'nav2_7_2',className:'',textCon:'rvcpaside.nav2_7_2'},
        ],
        }
    },
    created: function () {
      document.title = this.title;
      router.push({name:'nav2_1'});

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
      againClick:function(index){
        switch(index){
          case 1 : router.push({name:'nav2_2_1'}) ;break;
          case 2 : router.push({name:'nav2_3_1'}) ;break;
          case 6 : router.push({name:'nav2_7_1'}) ;break;
        }},
      nav2_2tipovers(){
        this.tip2_2class = 'show';
      },
      nav2_2tipouts(){
        this.tip2_2class = 'hide';
      },
      nav2_3tipovers(){
        this.tip2_3class = 'show';
      },
      nav2_3tipouts(){
        this.tip2_3class = 'hide';
      },
      nav2_7tipovers(){
        this.tip2_7class = 'show';
      },
      nav2_7tipouts(){
        this.tip2_7class = 'hide';
      },
      mouseovers(name,index){
        var overNav =  $('.'+name);
        switch (index){
          case 1 : {
            var mTop = overNav[0].offsetTop;
            var sTop = $("#aside").scrollTop();
            var result = mTop - sTop + 60;
            $('.navtip').eq(0).css('top',result);
            this.tip2_2class = 'show';
          }break;
          case 2 : {
            var mTop = overNav[0].offsetTop;
            var sTop = $("#aside").scrollTop();
            var result = mTop - sTop + 60;
            $('.navtip').eq(1).css('top',result);
            this.tip2_3class = 'show';
          }break;
          case 6 : {
            var mTop = overNav[0].offsetTop;
            var sTop = $("#aside").scrollTop();
            var result = mTop - sTop + 60;
            $('.navtip').eq(2).css('top',result);
            this.tip2_7class = 'show';
          }break;
          default:break;
        }
      },
      mouseouts(name,index){
        var that= this;
        switch (index){
          case 1 : {
            this.tip2_2class = 'hide';
          }break;
          case 2 : {
            this.tip2_3class = 'hide';
          }break;
          case 6 : {
            this.tip2_7class = 'hide';
          }break;
          default:break;
        }
      },
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      },
      getPagedata:function () {
        var thisVue = this;
        thisVue.ajax({
          method: 'post',
           /*url:thisVue.localhost,*/
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
    background: url("../../../static/img/ico/icon-2.1.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem02{
    background: url("../../../static/img/ico/icon-2.2.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem03{
    background: url("../../../static/img/ico/icon-2.3.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem04{
    background: url("../../../static/img/ico/icon-2.4.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem05{
    background: url("../../../static/img/ico/icon-2.5.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem06{
    background: url("../../../static/img/ico/icon-2.6.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem07{
    background: url("../../../static/img/ico/icon-2.7.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem08{
    background: url("../../../static/img/ico/icon-2.8.png") no-repeat;
    width:25px;
    height:30px;
  }
  .asideItem09{
    background: url("../../../static/img/ico/icon-2.9.png") no-repeat;
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
  .navtip{
    position: absolute;left:110px;width: 150px;z-index: 999999;
    min-height: 100px;
    max-height: 600px;
    padding: 10px 15px;
    background-color: #ffffff;
    border: solid #d7d7d7 1px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    display: none;
  }
  .navtip  .router-link-active{
    background-color: #ffffff!important;
    border: 0;
    color:#2cc362!important;
  }

  .navItem{
    position: relative;
    width:100%;
    height:20px;
    min-height:20px;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: #ffffff;
    color: #606061;
    text-align: left;
    margin-bottom:5px;
  }
  .navItem:hover{
  }
  @-webkit-keyframes slideIn{
    0% {opacity: 0;}/*初始状态 透明度为0*/
    40% {opacity: 0;}/*过渡状态 透明度为0*/
    100% {opacity: 1;}/*结束状态 透明度为1*/
  }

  @-webkit-keyframes slideOut{
    0% {opacity: 1;}/*初始状态 透明度为0*/
    40% {opacity: 1;}/*过渡状态 透明度为0*/
    100% {opacity: 0; visibility: hidden;}/*结束状态 透明度为1*/
  }
.show{
  visibility: visible;
  display: flex;
  animation: slideIn .5s;
  -moz-animation: slideIn .5s;	/* Firefox */
  -webkit-animation: slideIn .5s;	/* Safari 和 Chrome */
  -o-animation: slideIn .5s;	/* Opera */
  -webkit-animation-name: slideIn;
}
.hide{
  display: flex;
  visibility: visible;
  animation: slideOut 1s;
  -moz-animation: slideOut 1s;	/* Firefox */
  -webkit-animation: slideOut 1s;	/* Safari 和 Chrome */
  -o-animation: slideOut 1s;	/* Opera */
  -webkit-animation-name: slideOut;
  animation-fill-mode:both;
}
</style>
