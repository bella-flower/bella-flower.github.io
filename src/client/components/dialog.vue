<template>
  <el-container>
    <el-aside class="asider" style="width:106px;">
      <ul class="foldersee">
        <li v-for="(list,index) in YCDialog.aside" :class="{'active':YCDialog.defaultIndex === index}"
            @click="changeBgc(index)">
          <div><img :src="list.src" alt="" ></div>
          <div class="listname">{{list.list}}</div>
        </li>
      </ul>
    </el-aside>
  <el-container>
    <el-header class="movehead" style="height:40px;">
      <div>
        <el-button size="small" icon="el-icon-circle-plus-outline" style="margin-top: 3px;" @click="newVisible">{{$t('nav4_1.detailInfo.movedialog.buttonGroup.newBtn')}}</el-button>
        <el-button size="small" icon="el-icon-delete" style="margin-top: 3px;margin-left:0" @click="moveDel()" >{{$t('nav3_2.buttonGroup.pagebtn_2')}}</el-button>
      </div>
    </el-header>
    <el-main style="padding:3px;" class="main">
      <el-row>
        <el-button size="small" icon="el-icon-back" style="margin-bottom: 3px;">{{$t('nav4_1.detailInfo.buttonGroup.parentBtn')}}</el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;margin-left: 20px;height: 14px; line-height: 23px;">
          <el-breadcrumb-item>{{$t('nav4_1.detailInfo.buttonGroup.home')}}</el-breadcrumb-item>
          <el-breadcrumb-item>seefgwetfre</el-breadcrumb-item>
          <el-breadcrumb-item>etgfertre</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row class="itemtable1">
        <el-table ref="windowTable" :data="YCDialog.ycTable" :open="showmodel()" @selection-change="changeFun1" style="width: 100%;cursor:pointer;" border size="small">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_1')" sortable>
            <template slot-scope="scope">
              <img :src="scope.row.src" >
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="owner" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_2')" sortabl></el-table-column>
          <el-table-column prop="size" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_3')" sortable show-overflow-tooltip></el-table-column>
          <el-table-column prop="directory" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_4')" sortable show-overflow-tooltip></el-table-column>
          <el-table-column prop="lastUpdated" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_5')" sortable show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </el-container>
  </el-container>

</template>
<script>
  import  axios from 'axios'
  import Vue from 'vue'
  import  router from '../router/index'
  export default{
    data() {
      return {
        title: 'RVCP-工业仿真平台',
        YCDialog: {
          defaultIndex: 0, /*默认选中第一个*/
          aside: [
            {
              list: this.$t('nav4_1.detailInfo.movedialog.aside.cell_1'),
              src: "../../../static/img/history.png",
            },
            {
              list: this.$t('nav4_1.detailInfo.movedialog.aside.cell_2'),
              src: "../../../static/img/mine.png"
            },
            {
              list: this.$t('nav4_1.detailInfo.movedialog.aside.cell_3'),
              src: "../../../static/img/home.png"
            },
            {
              list: this.$t('nav4_1.detailInfo.movedialog.aside.cell_4'),
              src: "../../../static/img/share.png"
            },
          ],//移动、复制模态框的侧边栏
          ycTable: [
            /* {
               filename: 'nioj9o.com',
               lord: 'rvcpadm  ',
               size: '12MB',
               kind: '文件',
               changetime: '2017-12-03 12:03:55',
             },*/
          ],
          ycSelected: [],
        }, /*移动和复制*/
        /*   newdialog:{
            new:'',
            formLabelWidth:'120px'
          },/!*新建框*!/*/
      }
    },
   // props:["type"],/*父組件向子組件傳type類型*/
    created:function(){
      document.title = this.title;
    },
    computed:{

    },
    mounted(){
      this.getPagedata('historyDir.json');
    },
    watch:{
      '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.getStatus(this.$route.path)
      }
    },
    methods:{
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      },
      getPagedata:function (url) {
        var _this=this;
        axios.get(path + '/'+url).then(function (response) {
          var result=response.data;
          if(result.status==0){
            _this.$message.error(_this.$t('rvcpinfo.getListError'));
            /* thisVue.$message.error("获取列表失败");*/
          }else if(result.status==1) {
            var data = result.data;
            var appData=[];
            for(var i=0;i<data.length;i++){
              var obj={};
              obj.name=decodeURI(data[i].name);
              obj.owner=data[i].owner;
              if(data[i].directory==true){
                obj.src="../../../static/img/folder.png";
                obj.size='-';
                obj.directory='目錄';
                obj.nofile=true;
              }else{
                obj.src="../../../static/img/file.png";
                obj.size=countFileSizeFromB(data[i].size);
                obj.directory='文件';
                obj.nofile=false;
              }
              obj.group=data[i].group;
              obj.mimeType=data[i].mimeType;
              obj.charset=data[i].charset;
              obj.path=data[i].path;
              obj.lastUpdated=format(data[i].lastUpdated);

             appData[i]=obj;
            }
           _this.YCDialog.ycTable=appData;
          }
        }).catch(function (error) {
          console.log(error);
        });


      },//根据条件获取图表数据
      showmodel:function(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".itemtable1  .el-table__body-wrapper").slimScroll({
            width: '100%', //可滚动区域宽度
            height: '280px', //可滚动区域高度
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
          });//滚动
        }, 1);
      },/*添加dialog中滚动条*/
      changeFun1(val) {
        this.YCDialog.ycSelected = val;
        this.$emit('ycFile',this.YCDialog.ycSelected);
      },/*复选框状态改变*/
      changeBgc: function (index) {
        this.YCDialog.defaultIndex= index;
        var url='';
        switch (index){
          case 0 :url='historyDir.json';break;
          case 1 :url='myDir.json';break;
          case 2 :url='workDir.json';break;
          case 3 :url='shareDir.json';break;
        }
        this.getPagedata(url);
      },/*点击选中*/
      newVisible:function(){
        this.$emit('newVisible', true);//向父组件传参
      },
    },
  }
</script>
<style scoped>
  .asider{
    height:500px;
    border:1px solid #e6ebf5;
    /*border-radius: 5px;*/
    margin-right: 8px;
    text-align: center;
  }
  .foldersee{
    margin-top: 20px;
  }
  .foldersee li{
    cursor: pointer;
    width:104px;
    /*height:97px;*/
  }
  .foldersee li:hover{
    background-color: #d6d6d6;
  }
  .foldersee li.active:hover{
    background-color: #eaeaea;
  }
  .active{
    background-color: #eaeaea;
  }
  .foldersee li div img{
    margin:15px auto 5px;
  }
  .listname{
    height:30px;
    line-height:30px;
    padding-bottom:10px;
    white-space:nowrap;
  }
  .movehead{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    border:1px solid #e6ebf5;
    padding:0 5px;
  }
  .area{
    width:86%;height:220px;
    overflow:auto;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
  }
</style>
<!–[if IE]>
<style type=”text/css”>
  input, textarea, select, button, meter, progress {
    -ms-writing-mode: horizontal-tb;
  }
</style>
<![endif]–>
