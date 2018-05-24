<template>
  <el-container class="main nav4_1">
    <div class="content">
      <div class="header">
        <div>{{$t('nav4_3.title')}}</div>
        <div class="rightbtn">
          <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-circle-plus-outline" style="margin-right: 5px" @click="dialogNewVisible=true">{{$t('nav4_1.detailInfo.buttonGroup.newBtn')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small" style="margin-right: 5px" @click="detailListDel()">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-download" style="margin-right: 5px" @click="download()">{{$t('nav4_1.detailInfo.buttonGroup.dowBtn')}}</el-button>
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" style="margin:0 15px 0 10px">
            <el-button icon="el-icon-upload2" plain size="small" >{{$t('nav4_1.detailInfo.buttonGroup.uploadBtn')}}</el-button>
          </el-upload>
          <el-button  size="small" style="margin-right: 5px" @click="compress()"><i class="fa fa-file-zip-o"></i><span style="margin-left:5px;">{{$t('nav4_1.detailInfo.buttonGroup.compressBtn')}}</span></el-button>
          <el-button icon="el-icon-rank" plain size="small" @click="move()" style="margin-right: 5px">{{$t('nav4_1.detailInfo.buttonGroup.moveBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-tickets" @click="move()" style="margin-right: 5px">{{$t('nav4_1.detailInfo.buttonGroup.copyBtn')}}</el-button>
          <el-button size="small" icon="el-icon-view" @click="view()" style="margin-right: 5px">{{$t('nav4_1.detailInfo.buttonGroup.viewBtn')}}</el-button>
          <el-button  size="small" icon="el-icon-document" :open="showmodel1()"  @click="detailInfo.backupVisible=true" style="margin-right: 5px">{{$t('nav4_2.buttonGroup.backupBtn')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <div class="table_header">
          <el-button  size="small" icon="el-icon-back">{{$t('nav4_1.detailInfo.buttonGroup.parentBtn')}}</el-button>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;margin-left: 20px;height: 14px; line-height: 23px;">
            <el-breadcrumb-item>{{$t('nav4_1.detailInfo.buttonGroup.home')}}</el-breadcrumb-item>
            <el-breadcrumb-item>hcdata</el-breadcrumb-item>
            <el-breadcrumb-item>users</el-breadcrumb-item>
            <el-breadcrumb-item>rvcpadm</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table v-loading="tableloading" ref="detailTable" @selection-change="selectFun" :row-style="rowClass"  :border=true :data="jobDataTable" height="calc()">
          <el-table-column type="selection" width="50" prop="select" @selection-change="selectFun"></el-table-column>
          <el-table-column prop="name" :label="$t('nav4_1.detailInfo.infoTable.cell_1')"  :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
              <img src="../../../static/img/folder.png" alt="">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="owner" :label="$t('nav4_1.detailInfo.infoTable.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="size" :label="$t('nav4_1.detailInfo.infoTable.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" :label="$t('nav4_1.detailInfo.infoTable.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="updated" :label="$t('nav4_1.detailInfo.infoTable.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-row>
      <!--新建框-->
      <el-dialog :title="$t('nav4_1.detailInfo.newdialog.title')" :visible.sync="dialogNewVisible" ref="newdialog"  width="480px" :before-close="closenewdialog">
        <el-form  :model="newdialog" ref="newform">
          <el-form-item :label="$t('nav4_1.detailInfo.newdialog.label')" prop="new" :label-width="newdialog.formLabelWidth">
            <el-input v-model="newdialog.new"  auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleannewform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="newSubmit('newform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--压缩框-->
      <el-dialog :title="$t('nav4_1.detailInfo.yasuodialog.title')" :visible.sync="detailInfo.dialogCompressVisible" ref="yasuodialog"  width="480px" :before-close="closeyasuodialog">
        <el-form  :model="detailInfo.compressDialog" ref="yasuoform">
          <el-form-item :label="$t('nav4_1.detailInfo.yasuodialog.labelName')" prop="new" :label-width="newdialog.formLabelWidth">
            <el-input v-model="detailInfo.compressDialog.name"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav4_1.detailInfo.yasuodialog.labelType')" prop="new" :label-width="newdialog.formLabelWidth">
            <el-select v-model="detailInfo.compressDialog.value" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in detailInfo.compressDialog.type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanyasuoform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="newSubmit('yasuoform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--查看框-->
      <el-dialog :title="$t('nav4_1.detailInfo.viewdialog.title')" :visible.sync="detailInfo.dialogViewVisible" width="680px" ref="viewdialog" :fullscreen=detailInfo.isfull :before-close="closeviewdialog">
        <el-tabs v-model="detailInfo.viewDialog.viewTabsValue" type="card" closable @edit="handleTabsEdit"  :class="{fullscreen:detailInfo.isfull}">
          <el-tab-pane :key="item.name" v-for="(item, index) in detailInfo.viewDialog.viewTabs" :label="item.title" :name="item.name" style="height:555px;">
            <div style="padding:20px;">
              {{item.content}}
            </div>
          </el-tab-pane>
        </el-tabs>
        <button class="el-dialog__headerbtn" style="right: 40px;" @click="isfullscreen()"> <i class="el-icon-news el-dialog__close"></i> </button>
      </el-dialog>
      <!--复制和移动-->
      <el-dialog :title="$t('nav4_1.detailInfo.movedialog.title')" :visible.sync="detailInfo.dialogMoveVisible" width="880px">
        <el-container>
          <el-aside class="asider" style="width:106px;">
            <ul class="foldersee">
              <li v-for="(list,index) in detailInfo.moveDialog.aside" :class="{'active':detailInfo.moveDialog.defaultIndex === index}"
                  @click="changeBgc(index)">
                <div><img :src="list.src" alt="" ></div>
                <div class="listname">{{list.list}}</div>
              </li>
            </ul>
          </el-aside>
          <el-container>
            <el-header class="movehead" style="height:40px;">
              <div>
                <el-button size="small" icon="el-icon-circle-plus-outline" style="margin-top: 3px;" @click="detailInfo.dialogMoveNewVisible=true">{{$t('nav4_1.detailInfo.movedialog.buttonGroup.newBtn')}}</el-button>
                <el-button size="small" icon="el-icon-delete" style="margin-top: 3px;margin-left:0" @click="moveDel()" >{{$t('nav3_2.buttonGroup.pagebtn_2')}}</el-button>
              </div>
            </el-header>
            <loaddialog></loaddialog>
            <el-footer class="movefoot" style="height:81px;">
              <div style="width:570px">
                <el-form :model="detailInfo.moveDialog.moveFoot"  label-width="120px">
                  <el-form-item :label="$t('nav3_2.move.m_13')" size="small" style="margin-bottom:5px;margin-top:15px;">
                    <el-input v-model="detailInfo.moveDialog.moveFoot.path" auto-complete="off" style="width:100%;"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('nav3_2.move.m_14')" size="small" prop="region">
                    <el-select v-model="detailInfo.moveDialog.moveFoot.value" :placeholder="$t('nav3_2.move.m_15')" style="width:100%;">
                      <el-option  v-for="(item, index) in detailInfo.moveDialog.moveFoot.type" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <div style="width:100px;">
                <el-button type="primary"  size="small" style="margin-bottom: 5px;width:80px;">{{$t('nav3_2.dialog.Determine')}}</el-button>
                <el-button size="small" style="margin:0;width:80px;">{{$t('nav3_2.dialog.cancel')}}</el-button>
              </div>
            </el-footer>
          </el-container>
        </el-container>
      </el-dialog>
      <!--新建框-->
      <el-dialog :title="$t('nav4_1.detailInfo.newdialog.title')" :visible.sync="detailInfo.dialogMoveNewVisible" ref="newdialog"  width="480px" :before-close="closeMoveNew">
        <el-form  :model="detailInfo.newdialog" ref="movenewform">
          <el-form-item :label="$t('nav4_1.detailInfo.newdialog.label')" prop="new" :label-width="detailInfo.newdialog.formLabelWidth">
            <el-input v-model="detailInfo.newdialog.new"  auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanMoveNew">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="moveNewSubmit('movenewform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--备份-->
      <el-dialog :title="$t('nav4_2.backupDialog.title')" :visible.sync="detailInfo.backupVisible" ref="backupdialog"  width="680px" :before-close="closeBackup">
        <el-form  :model="detailInfo.backupDialog" ref="backupform">
          <el-form-item :label="$t('nav4_2.backupDialog.label_1')" :label-width="detailInfo.newdialog.formLabelWidth">
            <el-input v-model="detailInfo.newdialog.label"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav4_2.backupDialog.label_2')" :label-width="newdialog.formLabelWidth">
            <el-select v-model=" detailInfo.backupDialog.projectValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in detailInfo.backupDialog.project" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav4_2.backupDialog.label_3')" :label-width="newdialog.formLabelWidth">
            <el-select v-model="detailInfo.backupDialog.applicationValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
              <el-option  v-for="(item, index) in detailInfo.backupDialog.application" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('nav4_2.backupDialog.label_4')" :label-width="detailInfo.newdialog.formLabelWidth">
            <el-input v-model="detailInfo.newdialog.user"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('nav4_2.backupDialog.label_5')"  style="height:220px;" :label-width="newdialog.formLabelWidth">
            <div class="area">
              <el-input :placeholder="$t('nav2_1.select.placeholder')"  v-model="filterText" auto-complete="off" style="width:100%;padding:10px;box-sizing:border-box;" ></el-input>
              <div class="treearea">
                <el-tree :data="detailInfo.backupDialog.directInfo" :props="detailInfo.backupDialog.defaultProps" show-checkbox node-key="id" ref="tree" :expand-on-click-node="true" :filter-node-method="filterNode" ></el-tree>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="detailInfo.backupNewVisible=true">{{$t('nav4_2.backupDialog.newBtn')}}</el-button>
          <el-button @click="cleanBackup">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="backupSubmit('backupform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
      <!--新建目录框-->
      <el-dialog :title="$t('nav4_1.detailInfo.newdialog.title')" :visible.sync="detailInfo.backupNewVisible" ref="newdialog"  width="480px" :before-close="closebackupNew">
        <el-form  :model="detailInfo.backupNewDialog" ref="backupnewform">
          <el-form-item :label="$t('nav4_1.detailInfo.newdialog.label')" prop="new" :label-width="detailInfo.newdialog.formLabelWidth">
            <el-input v-model="detailInfo.backupNewDialog.new"  auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanbackupNew">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="backupNewSubmit('backupnewform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
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
        title: 'RVCP-工业仿真平台',
        tableloading:false, //表格加载动画,
        dialogFormVisible:false,
        dialogNewVisible:false,/*新建*/
        newdialog:{
          new:'',
          formLabelWidth:'120px'
        },/*新建框*/
        jobDataTable:[
          {
            name:'Desktop',
            owner:'rvcpadm',
            size:'20KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'Public',
            owner:'rvcpadm',
            size:'20KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'Videos',
            owner:'rvcpadm',
            size:'20KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'Templates',
            owner:'rvcpadm',
            size:'20KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'ABAQUS5',
            owner:'rvcpadm',
            size:'20KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'ABAQUS6',
            owner:'rvcpadm',
            size:'20KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
          {
            name:'sql',
            owner:'rvcpadm',
            size:'20KB',
            type:'文件',
            updated:'2017-10-19 10:20:30'
          },
        ],/*作业数据详情表*/
        jobDataActive:[],/*作业数据选中值*/
        currentPage4:10,/*前往第几页*/
        detailInfo:{
          dialogCompressVisible:false,/*压缩*/
          dialogViewVisible:false,/*查看*/
          dialogMoveVisible:false,/*移动*/
          dialogMoveNewVisible:false,/*移动中新建*/
          backupVisible:false,/*备份*/
          backupNewVisible:false,/*备份新建目录*/
          isfull:false, //查看对话框全屏参数
          newdialog:{
            new:'',
            formLabelWidth:'120px'
          },/*新建框*/
          compressDialog:{
            name:'',
            type:[
              {
                value:'zip',
                label:'zip'
              },
              {
                value:'tar.gz',
                label:'tar.gz'
              }
            ],
            value:'zip'
          },/*压缩框*/
          viewDialog:{
            viewTabs:[],
            viewTabsValue:'',
            tabIndex: 1
          },/*查看*/
          moveDialog:{
            defaultIndex:0,/*默认选中第一个*/
            aside:[
              {
                list:this.$t('nav4_1.detailInfo.movedialog.aside.cell_1'),
                src:"../../../static/img/history.png",
              },
              { list:this.$t('nav4_1.detailInfo.movedialog.aside.cell_2'),
                src:"../../../static/img/mine.png"
              },
              {
                list:this.$t('nav4_1.detailInfo.movedialog.aside.cell_3'),
                src:"../../../static/img/home.png"
              },
              {
                list:this.$t('nav4_1.detailInfo.movedialog.aside.cell_4'),
                src:"../../../static/img/share.png"
              },
            ],//移动、复制模态框的侧边栏
            moveFoot:{
              path:'',
              type:[
                {
                  value:'All Files',
                  label:'All Files*',
                },{
                  value:'.jpg',
                  label:'.jpg'
                },{
                  value:'.sh',
                  label:'.sh'
                }
              ],
              value:'All Files'
            },
            moveTable:[
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
              {
                filename:'nioj9o',
                lord:'jij',
                size:'12',
                kind:'212',
                changetime:'12:12:12 13:13:13',
              },
            ],
            moveSelected:[],
          },/*移动和复制*/
          backupDialog:{
            label:'',
            project:[{
              value:'EP01',
              label:'EP01'
            }],
            projectValue:'',
            application:[
              {
                value:'ABAQUS',
                label:'ABAQUS'
              },
              {
                value:'CFX',
                label:'CFX'
              },
              {
                value:'ANSYS',
                label:'ANSYS'
              },
              {
                value:'ANS-DYNA',
                label:'ANS-DYNA'
              }
            ],
            applicationValue:'',
            user:'',
            directInfo: [
              {
                id: 1,
                label: 'CAE',
                children: [{
                  id: 4,
                  label: '二级 1-1'
                }]
              }, {
                id: 2,
                label: 'EDA',
                children: [{
                  id: 5,
                  label: '二级 2-1'
                }, {
                  id: 6,
                  label: '二级 2-2'
                }]
              },{
                id:3,
                label:'日产'
              }],/*部门tree信息*/
            defaultProps: {
              children: 'children',
              label: 'label'
            },

          },
          backupNewDialog:{
            new:'',
          },
        },/*详细信息*/
        filterText: '',/*搜索目录*/
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
        height: 'calc(100vh - 60px - 50px - 70px - 100px - 25px)', //可滚动区域高度
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
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      showmodel1(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".treearea").slimScroll({
            width: '100%', //可滚动区域宽度
            height: '160px', //可滚动区域高度
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
      changeBgc: function (index) {
        this.detailInfo.moveDialog.defaultIndex= index
      },
      changeFun1(val) {
        this.detailInfo.moveDialog.moveSelected = val;
      },/*复选框状态改变*/
      isfullscreen(){
        this.detailInfo.isfull = !this.detailInfo.isfull;
      }, //全屏切换
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/');
        return urlStrArr[urlStrArr.length - 1]
      },
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },/*列表每行添加小手*/
      changeFun(val) {
        this.multipleSelection = val;
      },/*复选框状态改变*/
      selectFun(val) {
        this.jobDataActive = val;
      },/*复选框状态改变*/
      refreshTable(){

      },/*刷新*/
      moveDel:function(){
        if(this.detailInfo.moveDialog.moveSelected.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.moveDialog.moveSelected);
        }
      },/*删除移动*/
      detailListDel:function(){
        if(this.jobDataActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.jobDataActive);
        }
      },
      newSubmit:function(form){

      },/*新建目录*/
      moveNewSubmit:function(form){

      },/*移动和复制新建*/
      backupSubmit:function(form){},/*备份提交*/
      backupNewSubmit:function(form){},/*备份新建目录提交*/
      compress:function(){
        if(this.jobDataActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.jobDataActive);
          this.detailInfo.dialogCompressVisible=true;

        }
      },/*压缩*/
      handleTabsEdit(targetName, action) {
        if (action === 'remove') {
          let tabs = this.detailInfo.viewDialog.viewTabs;
          let activeName = this.detailInfo.viewDialog.viewTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.detailInfo.viewDialog.viewTabsValue = activeName;
          this.detailInfo.viewDialog.viewTabs= tabs.filter(tab => tab.name !== targetName);
        }
      },/*查看tabs切换*/
      view:function(){
        if(this.jobDataActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          this.detailInfo.dialogViewVisible=true;
          for(var i=0;i<this.jobDataActive.length;i++){
            this.detailInfo.viewDialog.viewTabs.push({
              title: this.jobDataActive[i].name,
              name: this.jobDataActive[i].name + i,
              content: 'New Tab content'
            });
          }
          this.detailInfo.viewDialog.viewTabsValue= this.jobDataActive[0].name+'0';
          console.log(this.jobDataActive);
        }

      },/*查看*/
      move:function(){
        if(this.jobDataActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else {
          console.log(this.jobDataActive);
          this.detailInfo.dialogMoveVisible = true;
        }
      },/*移动和复制*/
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },/*tree搜索*/
      rowClick(row){
        this.openRowContent(row.hostName);

        this.$refs.detailTable.clearSelection();/*清空选中*/
      },/*列表模式双击*/
      openRowContent(hostName){
        this.RowContent = true;
        //+ajax请求
      },/*表格数据加载*/
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      cleanform(){
        this.$refs['form'].resetFields();
        this.dialogFormVisible = false
      },//清除表单数据
      closedialog(done){
        this.cleanform();
        done();
      },//关闭对话框回调
      cleannewform(){
        this.$refs['newform'].resetFields();
        this.dialogNewVisible = false
      },//清除新建表单数据
      closenewdialog(done){
        this.cleannewform();
        done();
      },//关闭新建对话框回调
      cleanyasuoform(){
        this.$refs['yasuoform'].resetFields();
        this.detailInfo.dialogCompressVisible = false
      },//清除压缩表单数据
      closeyasuodialog:function(done){
        this.cleanyasuoform();
        done();
      },/*关闭压缩对话框回调*/
      closeviewdialog:function(done){
        this.detailInfo.viewDialog.viewTabs=[];
        done();
      },/*关闭查看对话框回调*/
      cleanMoveNew:function(){
        this.$refs['movenewform'].resetFields();
        this.detailInfo.dialogMoveNewVisible = false
      },/*清除新建表单数据*/
      closeMoveNew:function(done){
        this.cleanMoveNew();
        done();
      },/*关闭新建表单数据*/
      cleanBackup:function(){
        this.$refs['backupform'].resetFields();
        this.detailInfo.backupVisible= false
      },/*清除备份表单数据*/
      closeBackup:function(done){
        this.cleanBackup();
        done();
      },/*关闭备份表单数据*/
      cleanbackupNew:function(){
        this.$refs['backupnewform'].resetFields();
        this.detailInfo.backupNewVisible= false
      },/*清除备份新建表单数据*/
      closebackupNew:function(done){
        this.cleanbackupNew();
        done();
      },/*关闭备份新建表单数据*/
      download:function(){
        if(this.jobDataActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.jobDataActive);
        }
      },/*下载*/
      i18nChart : function () {
        this.detailInfo.moveDialog.aside[0].list=this.$t('nav4_1.detailInfo.movedialog.aside.cell_1');
        this.detailInfo.moveDialog.aside[1].list=this.$t('nav4_1.detailInfo.movedialog.aside.cell_2');
        this.detailInfo.moveDialog.aside[2].list=this.$t('nav4_1.detailInfo.movedialog.aside.cell_3');
        this.detailInfo.moveDialog.aside[3].list=this.$t('nav4_1.detailInfo.movedialog.aside.cell_4');
      },//国际化chart
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog .el-input,.el-dialog .el-select {width:86%;}
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
    justify-content: space-between;
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
  .li-item{
    display: inline-block;
    border: solid 1px #d7d7d7;
    border-radius: 8px;
    width:calc( 20% - 24px );
    height:auto;
    margin:10px 5px;
    padding: 5px;
    cursor: pointer;
    overflow: hidden;
  }
  .pages{
    position: relative;
    height:40px;
  }
  .table_header{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    margin-bottom:5px;
    height:40px;
  }
  .table_header span{
    font-weight:500;
  }
  .fullscreen{
    max-height: calc(100vh - 50px - 60px - 40px - 65px - 50px);
  }
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
  .movefoot{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border:1px solid #e6ebf5;
    padding:0;
  }
  .area{
    width:86%;height:220px;
    overflow:auto;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
  }
</style>
<style>
  .nav4_1 .el-pagination{
    position: absolute;
    bottom:3px;
  }
  .nav4_1 .searchTable .el-input-group__prepend{
    background-color: #fff;
  }
  .nav4_1 .setdialog .el-dialog{
    min-width:423px;
  }
  .nav4_1 .el-tabs__header{
    margin:0;
  }
  .nav4_1 .el-tabs__content{
    border: 1px solid #dfe4ed;
    border-radius: 3px;
  }
</style>
