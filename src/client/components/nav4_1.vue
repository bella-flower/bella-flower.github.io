<template>
    <el-container class="main nav4_1">
      <div class="content">
        <div class="header">
          <div>{{$t('nav4_1.title')}}</div>
          <div class="rightbtn">
            <el-button icon="el-icon-refresh" plain size="small"  @click="refreshTable" style="margin-right: 5px;" >{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
            <el-button icon="el-icon-setting" plain size="small" @click='dialogFormVisible=true' style="margin-right: 5px">{{$t('nav4_1.buttonGroup.setBtn')}}</el-button>
            <el-button icon="el-icon-delete" plain size="small" @click='delHistory()' style="margin-right: 5px">{{$t('nav4_1.buttonGroup.delectHistoryBtn')}}</el-button>
            <el-button icon="el-icon-delete" plain size="small" @click='delData()' style="margin-right: 5px">{{$t('nav4_1.buttonGroup.delectdataBtn')}}</el-button>
            <el-button icon="el-icon-printer" plain size="small" @click="exceldown">{{$t('nav4_1.buttonGroup.exportBtn')}}</el-button>
          </div>
        </div>
        <el-row class="list-item">
          <div class="list-header">
            <div></div>
            <div class="rightbtn">
              <el-select v-model="appValue" :placeholder="$t('nav2_1.select.placeholder')" size="small" style="width:100px;margin-right:5px;" >
                <el-option :key="this.$t('nav4_1.select.option1')" :label="this.$t('nav4_1.select.option1')" :value="this.$t('nav4_1.select.option1')">
                </el-option>
                <el-option  v-for="(item, index) in appOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="proValue" :placeholder="$t('nav2_1.select.placeholder')" size="small" style="width:100px;margin-right:5px;">
                <el-option :key="this.$t('nav4_1.select.option1')" :label="this.$t('nav4_1.select.option1')" :value="this.$t('nav4_1.select.option1')">
                </el-option>
                <el-option  v-for="(item, index) in proOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="timeValue" :placeholder="$t('nav2_1.select.placeholder')" size="small" style="width:100px;margin-right:5px;" >
                <el-option :key="this.$t('nav4_1.select.option2')" :label="this.$t('nav4_1.select.option2')" :value="this.$t('nav4_1.select.option2')">
                </el-option>
                <el-option  v-for="(item, index) in timeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <div class="searchTable">
                <el-input :placeholder="$t('nav4_1.listview.placeholder')"  size="small" v-model="searchData" class="input-with-select" style="width:367px;" >
                  <el-select v-model="jobValue" slot="prepend" :placeholder="$t('nav4_1.listview.placeholder2')" size="small" style="width:120px;">
                    <el-option  v-for="(item, index) in jobOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <el-button slot="append"  size="small" style="background-color: #3abb53;color:#fff;"  icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>
          </div>
          <el-table v-loading="tableloading" ref="resourceTable"  @selection-change="changeFun" :row-style="rowClass"  @row-dblclick="rowClick" :border=true :data="resourceTable"  height="calc()" style="text-align: left"  >
            <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
            <el-table-column prop="id" :label="$t('nav4_1.listview.resourceTable.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" :label="$t('nav4_1.listview.resourceTable.cell_2')"  :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="directory" :label="$t('nav4_1.listview.resourceTable.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="state" :label="$t('nav4_1.listview.resourceTable.cell_4')" :sortable="true" show-overflow-tooltip>
              <template slot-scope="scope">
              <span :class="scope.row.state === 'state1' ? 'green' : ''||scope.row.state === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.state === 'state1'? $t('nav4_1.table.state1') : ''||scope.row.state === 'state2'? $t('nav4_1.table.state2') : ''}}
                  </span>
              </template>
            </el-table-column>
            <el-table-column prop="submitTime" :label="$t('nav4_1.listview.resourceTable.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="computTime" :label="$t('nav4_1.listview.resourceTable.cell_6')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="finishTime" :label="$t('nav4_1.listview.resourceTable.cell_7')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cpuNumber" :label="$t('nav4_1.listview.resourceTable.cell_8')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="user" :label="$t('nav4_1.listview.resourceTable.cell_9')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="application" :label="$t('nav4_1.listview.resourceTable.cell_10')" :sortable="true" show-overflow-tooltip></el-table-column>
            <el-table-column prop="project" :label="$t('nav4_1.listview.resourceTable.cell_11')" :sortable="true" show-overflow-tooltip></el-table-column>
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
        <!--设置框-->
        <el-dialog :title="$t('nav4_1.configure.title')" :visible.sync="dialogFormVisible" ref="dialog"  class="setdialog" :before-close="closedialog" width="22%">
          <el-form  :model="configure" ref="form">
            <el-form-item :label="$t('nav4_1.configure.label')" :label-width="configure.formLabelWidth">
              <template>
                <el-input-number v-model="configure.num" size="small" :min="0" :max="100000000000"></el-input-number>
                <span style="margin-left:10px;">{{$t('nav4_1.configure.day')}}</span>
              </template>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
            <el-button type="primary"  @click="configSubmit('form')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
          </div>
        </el-dialog>
        <!--新建框-->
        <el-dialog :title="$t('nav4_1.detailInfo.newdialog.title')" :visible.sync="detailInfo.dialogNewVisible" ref="newdialog"  width="480px" :before-close="closenewdialog">
          <el-form  :model="detailInfo.newdialog" ref="newform">
            <el-form-item :label="$t('nav4_1.detailInfo.newdialog.label')" prop="new" :label-width="detailInfo.newdialog.formLabelWidth">
              <el-input v-model="detailInfo.newdialog.new"  auto-complete="off"></el-input>
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
            <el-form-item :label="$t('nav4_1.detailInfo.yasuodialog.labelName')" prop="new" :label-width="detailInfo.newdialog.formLabelWidth">
              <el-input v-model="detailInfo.compressDialog.name"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('nav4_1.detailInfo.yasuodialog.labelType')" prop="new" :label-width="detailInfo.newdialog.formLabelWidth">
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
        <el-dialog :title="$t('nav4_1.detailInfo.viewdialog.title')" :visible.sync="detailInfo.dialogViewVisible" ref="viewdialog"  width="680px" :fullscreen=detailInfo.isfull :before-close="closeviewdialog">
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
              <el-main style="padding:3px;">
                <el-row>
                  <el-button size="small" icon="el-icon-back" style="margin-bottom: 3px;">{{$t('nav4_1.detailInfo.buttonGroup.parentBtn')}}</el-button>
                  <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;margin-left: 20px;height: 14px; line-height: 23px;">
                    <el-breadcrumb-item>{{$t('nav4_1.detailInfo.buttonGroup.home')}}</el-breadcrumb-item>
                    <el-breadcrumb-item>seefgwetfre</el-breadcrumb-item>
                    <el-breadcrumb-item>etgfertre</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-row>
                <el-row class="itemtable1">
                  <el-table ref="windowTable" :data="detailInfo.moveDialog.moveTable" :open="showmodel()" @selection-change="changeFun1" style="width: 100%;cursor:pointer;" border size="small">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="filename" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_1')" sortable>
                      <template slot-scope="scope"><img src="../../../static/img/folder.png" alt="">
                        <span>{{scope.row.filename}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lord" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_2')" sortabl></el-table-column>
                    <el-table-column prop="size" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_3')" sortable show-overflow-tooltip></el-table-column>
                    <el-table-column prop="kind" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_4')" sortable show-overflow-tooltip></el-table-column>
                    <el-table-column prop="changetime" :label="$t('nav4_1.detailInfo.movedialog.fileTable.cell_5')" sortable show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-row>
              </el-main>
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
      </div>
      <div v-show="RowContent" class="content rowcontent">
        <div class="header">
          <div><span style="color: #2cc362;cursor: pointer;font-weight: 600"  @click="RowContent=false">{{$t('nav4_1.title')}}</span> >
            <span>{{$t('nav4_1.detailInfo.buttonGroup.jobD')}}</span></div>
          <div class="rightbtn">
            <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
            <el-button  size="small" icon="el-icon-circle-plus-outline" style="margin-right: 5px" @click="detailInfo.dialogNewVisible=true">{{$t('nav4_1.detailInfo.buttonGroup.newBtn')}}</el-button>
            <el-button icon="el-icon-delete" plain size="small" style="margin-right: 5px" @click="detailListDel()">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
            <el-button  size="small" icon="el-icon-download" style="margin-right: 5px" @click="download()">{{$t('nav4_1.detailInfo.buttonGroup.dowBtn')}}</el-button>
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :show-file-list="false" style="margin:0 15px 0 10px">
              <el-button icon="el-icon-upload2" plain size="small" >{{$t('nav4_1.detailInfo.buttonGroup.uploadBtn')}}</el-button>
            </el-upload>
            <el-button  size="small" style="margin-right: 5px" @click="compress()"><i class="fa fa-file-zip-o"></i><span style="margin-left:5px;">{{$t('nav4_1.detailInfo.buttonGroup.compressBtn')}}</span></el-button>
            <el-button icon="el-icon-rank" plain size="small" @click="move()" style="margin-right: 5px">{{$t('nav4_1.detailInfo.buttonGroup.moveBtn')}}</el-button>
            <el-button  size="small" icon="el-icon-tickets" @click="move()" style="margin-right: 5px">{{$t('nav4_1.detailInfo.buttonGroup.copyBtn')}}</el-button>
            <el-button size="small" icon="el-icon-view" @click="view()">{{$t('nav4_1.detailInfo.buttonGroup.viewBtn')}}</el-button>
          </div>
        </div>
        <div class="infoContent">
          <div class="session-list" style="margin-top:0;">
            <div class="table_title">
              <div class="table_header">
                <el-button  size="small" icon="el-icon-back">{{$t('nav4_1.detailInfo.buttonGroup.parentBtn')}}</el-button>
                  <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;margin-left: 20px;height: 14px; line-height: 23px;">
                    <el-breadcrumb-item>{{$t('nav4_1.detailInfo.buttonGroup.home')}}</el-breadcrumb-item>
                    <el-breadcrumb-item>hcdata</el-breadcrumb-item>
                    <el-breadcrumb-item>hcdata</el-breadcrumb-item>
                    <el-breadcrumb-item>hcdata</el-breadcrumb-item>
                    <el-breadcrumb-item>hcdata</el-breadcrumb-item>
                    <el-breadcrumb-item>hcdata</el-breadcrumb-item>
                  </el-breadcrumb>
              </div>
            </div>
            <div class="bottom-table">
              <el-table v-loading="tableloading" ref="detailTable" @selection-change="selectFun" :row-style="rowClass"  :border=true :data="detailInfo.detailTable" height="calc()" style="text-align: left"  >
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
            </div>
          </div>
        </div>
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
        RowContent:false,/*详细信息初始不显示，双击时改为true，为显示状态*/
        resourceTable:[
          {
            id:'101',
            name: 'test1',
            directory:'/hpcdata/users/rvcpa',
            state:'state2',
            submitTime:'2017-11-12 16:45:22',
            computTime: '00:00:55',
            finishTime:'2017-11-12 16:45:22',
            cpuNumber:'12',
            user:'rvcpadm',
            application:'ABAQUS',
            project:'def_proj'
          },
          {
            id:'102',
            name: 'test2',
            directory:'/hpcdata/users/rvcpa',
            state:'state1',
            submitTime:'2017-11-12 16:45:22',
            computTime: '00:00:55',
            finishTime:'2017-11-12 16:45:22',
            cpuNumber:'12',
            user:'rvcpadm',
            application:'ABAQUS',
            project:'def_proj'
          },
          {
            id:'103',
            name: 'test3',
            directory:'/hpcdata/users/rvcpa',
            state:'state2',
            submitTime:'2017-11-12 16:45:22',
            computTime: '00:00:55',
            finishTime:'2017-11-12 16:45:22',
            cpuNumber:'12',
            user:'rvcpadm',
            application:'ABAQUS',
            project:'def_proj'
          },
        ],/*节点资源库列表*/
        multipleSelection:[],/*列表模式选中值*/
        currentPage4:10,/*前往第几页*/
        appOptions: [
          {
            value: 'ABAQUS',
            label: 'ABAQUS'
          },
          {
            value: 'ACTRAN',
            label: 'ACTRAN'
          },
          {
            value: 'ANS-DYNA',
            label: 'ANS-DYNA'
          }
        ],/*应用选择*/
        appValue: this.$t('nav4_1.select.option1'),/*默认选中*/
        proOptions: [
          {
            value: 'EP01',
            label: 'EP01'
          },
          {
            value: '555',
            label: '555'
          },
        ],/*项目选择*/
        proValue: this.$t('nav4_1.select.option1'),/*默认选中*/
        timeOptions: [
          {
            value: this.$t('nav4_1.select.option3'),/*未到期*/
            label: this.$t('nav4_1.select.option3'),/*未到期*/
          },
          {
            value: this.$t('nav4_1.select.option4'),/*已过期*/
            label: this.$t('nav4_1.select.option4'),/*已过期*/
          },
        ],/*是否选择*/
        timeValue: this.$t('nav4_1.select.option2'),/*默认选中*/
        jobOption: [
          {
            value: this.$t('nav4_1.select.option5'),/*作业ID*/
            label: this.$t('nav4_1.select.option5'),/*作业ID*/
          },
          {
            value: this.$t('nav4_1.select.option6'),/*作业名*/
            label: this.$t('nav4_1.select.option6'),/*作业名*/
          },
          {
            value: this.$t('nav4_1.select.option7'),/*用户名*/
            label: this.$t('nav4_1.select.option7'),/*用户名*/
          },
        ],
        jobValue: this.$t('nav4_1.select.option5'),
        searchData:'',/*搜索*/
        configure:{
          num:0,
          formLabelWidth: '150px',/*表单label宽度*/
        },/*设置框*/
        detailInfo:{
          dialogNewVisible:false,/*新建*/
          dialogCompressVisible:false,/*压缩*/
          dialogViewVisible:false,/*查看*/
          dialogMoveVisible:false,/*移动*/
          dialogMoveNewVisible:false,/*移动中新建*/
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
                lord:'Rvcpadm',
                size:'12KB',
                kind:'文件',
                changetime:'2017-10-19 10:20:30',
              },
              {
                filename:'nioj9o',
                lord:'Rvcpadm',
                size:'12MB',
                kind:'文件',
                changetime:'2017-10-19 10:20:30',
              },
              {
                filename:'nioj9o',
                lord:'Rvcpadm',
                size:'12KB',
                kind:'文件',
                changetime:'2017-10-19 10:20:30',
              },
              {
                filename:'nioj9o',
                lord:'Rvcpadm',
                size:'12KB',
                kind:'文件',
                changetime:'2017-10-19 10:20:30',
              },
              {
                filename:'nioj9o',
                lord:'Rvcpadm',
                size:'12KB',
                kind:'文件',
                changetime:'2017-10-19 10:20:30',
              },
              {
                filename:'nioj9o',
                lord:'Rvcpadm',
                size:'12MB',
                kind:'文件',
                changetime:'2017-10-19 10:20:30',
              },
              {
                filename:'nioj9o',
                lord:'Rvcpadm',
                size:'12KB',
                kind:'文件',
                changetime:'2017-10-19 10:20:30',
              },
            ],
            moveSelected:[],

          },/*移动和复制*/
          detailTable:[
            {
              name:'ABAQUS3',
              owner:'rvcpadm',
              size:'231KB',
              type:'文件',
              updated:'2017-10-19 10:20:30'
            },
            {
              name:'ABAQUS4',
              owner:'rvcpadm',
              size:'23KB',
              type:'文件',
              updated:'2017-10-19 10:20:30'
            },
            {
              name:'ABAQUS5',
              owner:'rvcpadm',
              size:'231MB',
              type:'文件',
              updated:'2017-10-19 10:20:30'
            },
            {
              name:'ABAQUS6',
              owner:'rvcpadm',
              size:'2KB',
              type:'文件',
              updated:'2017-10-19 10:20:30'
            },
            {
              name:'ABAQUS7',
              owner:'rvcpadm',
              size:'231KB',
              type:'文件',
              updated:'2017-10-19 10:20:30'
            },
            {
              name:'ABAQUS8',
              owner:'rvcpadm',
              size:'2KB',
              type:'文件',
              updated:'2017-10-19 10:20:30'
            },
            {
              name:'ABAQUS9',
              owner:'rvcpadm',
              size:'231KB',
              type:'文件',
              updated:'2017-10-19 10:20:30'
            },
            {
              name:'ABAQUS10',
              owner:'rvcpadm',
              size:'231KB',
              type:'文件',
              updated:'2017-10-19 10:20:30'
            },
            {
              name:'ABAQUS11',
              owner:'rvcpadm',
              size:'231KB',
              type:'文件',
              updated:'2017-10-19 10:20:30'
            },

          ],/*主机详情表*/
          detailActive:[],/*主机详情选中值*/
        },/*详细信息*/
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
      $(".bottom-table .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 100px - 85px - 40px)', //可滚动区域高度
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
        this.detailInfo.detailActive = val;
      },/*复选框状态改变*/
      refreshTable(){

      },/*刷新*/
      delHistory:function(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*删除记录*/
      delData:function(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*删除数据*/
      moveDel:function(){
        if(this.detailInfo.moveDialog.moveSelected.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.moveDialog.moveSelected);
        }
      },/*删除移动*/
      detailListDel:function(){
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.detailActive);
        }
      },
      configSubmit:function(form){

      },/*设置过期数提交*/
      newSubmit:function(form){

      },/*新建目录*/
      moveNewSubmit:function(form){

      },/*移动和复制新建*/
      compress:function(){
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.detailActive);
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
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          this.detailInfo.dialogViewVisible=true;
          for(var i=0;i<this.detailInfo.detailActive.length;i++){
            this.detailInfo.viewDialog.viewTabs.push({
              title: this.detailInfo.detailActive[i].name,
              name: this.detailInfo.detailActive[i].name + i,
              content: 'New Tab content'
            });
          }
          this.detailInfo.viewDialog.viewTabsValue= this.detailInfo.detailActive[0].name+'0';
          console.log(this.detailInfo.detailActive);
        }

      },/*查看*/
      move:function(){
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else {
          console.log(this.detailInfo.detailActive);
          this.detailInfo.dialogMoveVisible = true;
        }
      },/*移动和复制*/
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
        this.detailInfo.dialogNewVisible = false
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
      download:function(){
        if(this.detailInfo.detailActive.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.detailActive);
        }
      },/*下载*/
      exceldown() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel');
          const tHeader = ['作业ID','作业名','作业目录','作业状态','提交时间','计算时间','结束时间','CPU数量','用户名','应用程序','项目名称'];
          const list = this.resourceTable;
          const filterVal = ['id','name','directory','state','submitTime','computTime','finishTime','cpuNumber','user','application','project'];
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, 'ReportBuild')
        })
      },//导出excel
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },//导出excel
      i18nChart : function () {
        this.detailInfo.moveDialog.aside[0].list=this.$t('nav4_1.detailInfo.movedialog.aside.cell_1');
        this.detailInfo.moveDialog.aside[1].list=this.$t('nav4_1.detailInfo.movedialog.aside.cell_2');
        this.detailInfo.moveDialog.aside[2].list=this.$t('nav4_1.detailInfo.movedialog.aside.cell_3');
        this.detailInfo.moveDialog.aside[3].list=this.$t('nav4_1.detailInfo.movedialog.aside.cell_4');
        this.appValue =this.$t('nav4_1.select.option1');
        this.proValue =this.$t('nav4_1.select.option1');
        this.timeValue =this.$t('nav4_1.select.option2');
        this.jobValue =this.$t('nav4_1.select.option5');
        this.timeOptions[0].value=this.$t('nav4_1.select.option3');
        this.timeOptions[0].label =this.$t('nav4_1.select.option3');
        this.timeOptions[1].value=this.$t('nav4_1.select.option4');
        this.timeOptions[1].label =this.$t('nav4_1.select.option4');
        this.jobOption[0].value=this.$t('nav4_1.select.option5');
        this.jobOption[0].label =this.$t('nav4_1.select.option5');
        this.jobOption[1].value=this.$t('nav4_1.select.option6');
        this.jobOption[1].label =this.$t('nav4_1.select.option6');
        this.jobOption[2].value=this.$t('nav4_1.select.option7');
        this.jobOption[2].label =this.$t('nav4_1.select.option7');
      },//国际化chart
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .green{
    color:#2cc362;
  }
  .red{
    color:#f96a6a;
  }
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
  .rowcontent{
    position: absolute;
    z-index: 55!important;
    top: 0;
    left: 0;
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
  .infoContent{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
  }
  .session-list{
    width:calc(100% - 30px);
    height:calc(100vh  - 60px - 50px - 70px - 415px);
    /*border: 1px solid #d7d7d7;*/
    border-radius: 8px;
    margin: 10px;
  }
  .table_title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
