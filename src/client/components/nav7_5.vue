<template>
  <el-container class="main nav7_5">
    <div class="content">
      <div class="header">
        <div>{{$t('nav7_5.title')}}</div>
        <div class="rightbtn">
          <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px;">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <div class="list-header">
          <div class="rightbtn">
            <div style="margin-right:5px;">
              <span style="margin-right:8px;">{{$t('nav7_3.addDialog.cell_2')}}</span>
              <el-date-picker style="height:32px;" v-model="timeRange" type="daterange" align="right" unlink-panels :range-separator="$t('nav5_1.header.range')" :start-placeholder="$t('nav5_1.header.start')" :end-placeholder="$t('nav5_1.header.end')" :picker-options="pickerOptions2"></el-date-picker>
            </div>
            <div class="searchTable">
              <el-input :placeholder="$t('nav7_1.detailInfo.addUserDialog.placeholder')"  size="small" v-model="searchData" class="input-with-select" style="width:190px;" >
                <el-button slot="append"  size="small" style="background-color: #3abb53;color:#fff;"  icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </div>
        <el-table v-loading="tableloading" ref="userListTable" :row-style="rowClass" :border=true :data="userListTable"  height="calc()" style="text-align: left"  >
          <el-table-column prop="user" :label="$t('nav7_5.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="time" :label="$t('nav7_5.table.cell_2')"  :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ip" label="IP" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" :label="$t('nav7_5.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remark" :label="$t('nav7_5.table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
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
        currentPage4:10,/*前往第几页*/
        userListTable:[
          {
            user:'demo1',
            time:'2017-11-12 16:45:22',
            ip: '192.168.100.121',
            type:this.$t('nav7_5.table.type.cell_1'),
            remark:'',
          },
          {
            user:'demo2',
            time:'2017-11-12 16:45:22',
            ip: '192.168.100.121',
            type:this.$t('nav7_5.table.type.cell_2'),
            remark:'',
          },
          {
            user:'demo3',
            time:'2017-11-12 16:45:22',
            ip: '192.168.100.121',
            type:this.$t('nav7_5.table.type.cell_3'),
            remark:'',
          }
        ],/*节点资源库列表*/
        multipleSelection:[],/*列表模式选中值*/
        timeRange:'',
        searchData:'',/*搜索*/
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
            text:this.$t('nav5_1.header.pickerOptions2.text2'),
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
          }]
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
      $(".list-item .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 70px - 100px - 40px)', //可滚动区域高度
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      i18nChart : function () {
        this.userListTable[0].type = this.$t('nav7_5.table.type.cell_1');
        this.userListTable[1].type = this.$t('nav7_5.table.type.cell_2');
        this.userListTable[2].type = this.$t('nav7_5.table.type.cell_3');
        this.pickerOptions2.shortcuts[0].text = this.$t('nav5_1.header.pickerOptions2.text1');
        this.pickerOptions2.shortcuts[1].text = this.$t('nav5_1.header.pickerOptions2.text2');
        this.pickerOptions2.shortcuts[2].text = this.$t('nav5_1.header.pickerOptions2.text3');
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
  .pages{
    position: relative;
    height:40px;
  }
</style>
<style>
  .nav7_5 .el-pagination{
    position: absolute;
    bottom:3px;
  }
  .nav7_5 .el-date-editor .el-range-input{
    position: relative;
    top: -1px;
  }
  .nav7_5 .el-range-editor.el-input__inner {
     padding: 0px 10px;
  }
</style>

