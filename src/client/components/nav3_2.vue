<template>
    <el-container>
      <div  class="main nav3_2">
        <div class="content">
          <div class="header" style="font-size:12px;">
            <div >{{$t('nav3_2.title')}}</div>
            <div class="rightbtn">
            <el-button  size="small" icon="el-icon-refresh" @click="refreshTable">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
              <el-button  size="small" @click="stop"><i class="fa fa-pause-circle-o"></i> {{$t('nav3_2.buttonGroup.btn_1')}}</el-button>
            <el-button size="small" @click="recovery"><i class="fa fa-reply" > {{$t('nav3_2.buttonGroup.btn_2')}}</i></el-button>
            <el-button size="small" @click="end"><i class="el-icon-circle-close-outline"> {{$t('nav3_2.buttonGroup.btn_3')}}</i></el-button>
            <el-button size="small" @click="Resche"><i class="fa fa-history"> {{$t('nav3_2.buttonGroup.btn_4')}}</i></el-button>
            <el-button size="small" @click="top" icon="el-icon-upload2">{{$t('nav3_2.buttonGroup.btn_5')}}</el-button>
            <el-button size="small" @click="seeOutput" icon="el-icon-document">{{$t('nav3_2.buttonGroup.btn_6')}}</el-button>
            <el-button size="small" @click="view" icon="el-icon-view" >{{$t('nav3_2.buttonGroup.btn_7')}}</el-button>
            <el-button size="small" @click="change" icon="el-icon-sort">{{$t('nav3_2.buttonGroup.btn_8')}}</el-button>
            <el-button size="small" icon="el-icon-edit-outline"  @click="configure = true">{{$t('nav3_2.buttonGroup.btn_9')}}</el-button>
            <el-button size="small" icon="el-icon-edit-outline" @click="postprocessing = true">{{$t('nav3_2.buttonGroup.btn_10')}}</el-button>
            </div>
          </div>
          <el-row class="view-item" style="padding-top: 5px;">
            <el-row>
                <ul style="float:left;height:34px;line-height: 34px;" id="menu_ul">
                  <li>{{$t('nav1_1.rightdiv.state1')}}：<span>{{table.statenum.state1}}</span></li>
                  <li>{{$t('nav1_1.rightdiv.state2')}}：<span>{{table.statenum.state2}}</span></li>
                  <li>{{$t('nav1_1.rightdiv.state3')}}：<span>{{table.statenum.state3}}</span></li>
                  <li>{{$t('nav1_1.rightdiv.state4')}}：<span>{{table.statenum.state4}}</span></li>
                  <li>{{$t('nav1_1.rightdiv.state5')}}：<span>{{table.statenum.state5}}</span></li>
                </ul>
              <div class="right">
                <el-select v-model="table.value1" :placeholder="$t('nav3_2.select1.placeholder')" size="small" style="width:130px;margin-right:5px;" >
                  <el-option id="option1" :key="this.$t('nav3_2.select1.allDepartments')" :label=" this.$t('nav3_2.select1.allDepartments')" :value="this.$t('nav3_2.select1.allDepartments')">
                  </el-option>
                  <el-option  v-for="(item, index) in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                  <el-select v-model="table.value2" :placeholder="$t('nav3_2.select2.placeholder')" size="small" style="width:100px;margin-right:5px;display: inline-block;"  >
                    <el-option  v-for="(item, index) in table.state" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="search">
                    <el-input :placeholder="$t('nav3_2.search')" class="input-with-select" size="small" width="100px">
                    <el-select slot="prepend" v-model="table.value3" :placeholder="$t('nav3_2.select3.placeholder')" size="small" style="width:120px;"  >
                      <el-option  v-for="(item, index) in table.searchOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                    <el-button slot="append" style="background-color: #3abb53" size="small"><i class="el-icon-search" style="color:#fff;"></i></el-button>
                  </el-input>
                  </div>
              </div>
            </el-row>
            <div class="itemtable">
              <el-table ref="windowTable" v-loading="table.tableloading"  :border=true :data="table.tableMyjob"  @row-dblclick="rowClick" height="calc()" style="text-align: left;cursor: pointer;"  @selection-change="changeFun">
                <el-table-column type="selection" prop="select"  width="50"></el-table-column>
                <el-table-column prop="jobid" :label="$t('nav1_1.rightdiv.myjob.cell_1')"  :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="jobname" :label="$t('nav1_1.rightdiv.myjob.cell_2')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="state" :label="$t('nav1_1.rightdiv.myjob.cell_5')"  :sortable="true" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span :class="scope.row.state === 'state1' ? 'green' : ''||scope.row.state === 'state2' ? 'red' : ''||scope.row.state === 'state3' ? 'blue' : ''||scope.row.state === 'state4'? 'origin' : ''||scope.row.state === 'state5' ? 'glay' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.state === 'state1'? $t('nav1_1.rightdiv.state1') : ''||scope.row.state === 'state2'? $t('nav1_1.rightdiv.state2') : ''||scope.row.state === 'state3'? $t('nav1_1.rightdiv.state3') : ''||scope.row.state === 'state4'? $t('nav1_1.rightdiv.state4') : ''||scope.row.state === 'state5'? $t('nav1_1.rightdiv.state5') : ''}}
                  </span>
                </template>
              </el-table-column>
                <el-table-column prop="application" :label="$t('nav1_1.rightdiv.myjob.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="user" :label="$t('nav1_1.rightdiv.myjob.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>

                <el-table-column prop="queue" :label="$t('nav3_2.table.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="work" :label="$t('nav3_2.table.cell_6')" :sortable="true" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span :class="scope.row.work === 'yes' ? 'green' : 'red'">
                      {{scope.row.work === 'yes'? $t('nav3_2.table.yes') : $t('nav3_2.table.no')}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="run" :label="$t('nav3_2.table.cell_7')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="object" :label="$t('nav3_2.table.cell_8')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="start" :label="$t('nav3_2.table.cell_9')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="version" :label="$t('nav3_2.table.cell_10')" :sortable="true" show-overflow-tooltip></el-table-column>
                <el-table-column prop="terminal" :label="$t('nav3_2.table.cell_11')" :sortable="true" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
          </el-row>
          <!--对话框-->
          <el-dialog :title="$t('nav3_2.dialog.editc')" :visible.sync="configure" width="400px">
            <el-form :model="form" style=" margin-left: 30px;color:#5a5e66;" ref="form">
              <el-form-item >
                <el-checkbox-group
                  v-model="form.workCities1"
                  :min="5"
                  :max="13">
                  <el-checkbox v-for="work in form.works" :label="work" :key="work" style="display: block;margin-left: 0px;">{{work}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="configure = false">{{$t('nav3_2.dialog.cancel')}}</el-button>
              <el-button type="primary" @click="configure = false">{{$t('nav3_2.dialog.Determine')}}</el-button>
            </div>
          </el-dialog>
          <!--可视化-->
          <el-dialog :title="$t('nav3_2.dialog.visible')" :visible.sync="postprocessing" width="650px">
            <el-form :model="form0" :label-position="labelPosition" label-width="120px">
              <el-form-item :label="$t('nav3_2.dialog.resolve')" >
                <el-select  v-model="form0.value5" :placeholder="$t('nav3_2.dialog.resolve')" size="small" >
                  <el-option  v-for="(item, index) in form0.postOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('nav3_2.dialog.use')">
                <el-select placeholder="" size="small" v-model="nav.value6">
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="postprocessing = false">{{$t('nav3_2.dialog.cancel')}}</el-button>
              <el-button type="primary" @click="postprocessing = false">{{$t('nav3_2.dialog.Determine')}}</el-button>
            </div>
          </el-dialog>
          <!--添加-->
          <el-dialog :title="$t('nav3_2.dialog.create')" :visible.sync="establish" width="650px" :before-close="closedialog" ref="dialog">
            <el-form :model="form1"  :label-position="labelPosition" label-width="120px" ref="form1">
              <el-form-item :label="$t('nav3_2.dialog.name')" prop="name1">
                <el-input v-model="form1.name1" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cleanform()">{{$t('nav3_2.dialog.cancel')}}</el-button>
              <el-button type="primary" @click="cleanform()">{{$t('nav3_2.dialog.Determine')}}</el-button>
            </div>
          </el-dialog>
          <!--压缩-->
          <el-dialog :title="$t('nav3_2.dialog.compress')" :visible.sync="compress" width="650px" :before-close="closedialog2">
            <el-form :model="form2"  :label-position="labelPosition" label-width="120px" ref="form2">
              <el-form-item :label="$t('nav3_2.dialog.cname')" prop="compressname">
                <el-input v-model="form2.compressname" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('nav3_2.dialog.ckind')" prop="kindOptions">
                <el-select  v-model="form2.value4" :placeholder="$t('nav3_2.dialog.ckind')" size="small" >
                  <el-option  v-for="(item, index) in form2.kindOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cleanform2()">{{$t('nav3_2.dialog.cancel')}}</el-button>
              <el-button type="primary" @click="cleanform2()">{{$t('nav3_2.dialog.Determine')}}</el-button>
            </div>
          </el-dialog>
          <!--查看-->
          <el-dialog :title="$t('nav3_2.dialog.file')" :visible.sync="see" width="" :fullscreen=isfull>
            <el-tabs v-model="editableTabsValue" type="card" closable @edit="handleTabsEdit"   :class="{fullscreen:isfull}">
              <el-tab-pane
                :key="item.name"
                v-for="(item, index) in detailPage.catalog.editableTabs"
                :label="item.title"
                :name="item.name"
                style="height:555px;">
                <div style="padding:20px;">
                  {{item.content}}
                </div>

              </el-tab-pane>
            </el-tabs>
            <button class="el-dialog__headerbtn" style="right: 40px;" @click="isfullscreen()"> <i class="el-icon-news el-dialog__close"></i> </button>
            <div slot="footer" class="dialog-footer" :class="{fullscreenfooter:isfull}">
              <el-button @click="see = false">{{$t('nav3_2.dialog.cancel')}}</el-button>
              <el-button type="primary" @click="see = false">{{$t('nav3_2.dialog.Determine')}}</el-button>
            </div>
          </el-dialog>
          <!--移动-->
          <el-dialog :title="$t('nav3_2.move.file')" :visible.sync="move" :before-close="closedialog3" width="880px">
            <el-container>
              <el-aside class="asider" style="height:500px;width:106px;border:1px solid #e6ebf5;border-radius: 5px;margin-right: 8px;text-align: center;">
                <ul class="foldersee">
                  <li v-for="(list,index) in detailPage.catalog.aside" :class="{'active':detailPage.catalog.ind === index}"
                      @click="changeBgc(index)" style="cursor: pointer;">
                    <div><img :src="list.src" alt="" ></div>
                    <div class="listname">{{list.list}}</div>
                  </li>
                </ul>
              </el-aside>
              <el-container>
                <el-header style="border:1px solid #e6ebf5;border-radius: 5px;height:40px;text-align: right;padding-right: 5px;">
                  <el-button size="small" icon="el-icon-circle-plus-outline" style="margin-top: 3px;" @click="establish = true">{{$t('nav3_2.buttonGroup.pagebtn_10')}}</el-button>
                  <el-button size="small" icon="el-icon-delete" style="margin-top: 3px;margin-left: 0px" @click="del">{{$t('nav3_2.buttonGroup.pagebtn_2')}}</el-button>
                </el-header>
                <loaddialog></loaddialog>
                <el-footer style="border:1px solid #e6ebf5;border-radius: 5px;height:81px;padding:0px;">
                  <ul style="float:left;">
                    <li style="float:left;width:560px;">
                      <el-form :model="form3" :label-position="labelPosition" label-width="120px" ref="form3">
                        <el-form-item :label="$t('nav3_2.move.m_13')" size="small" style="margin-bottom: 5px;margin-top: 5px;" prop="route">
                          <el-input v-model="form3.route" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('nav3_2.move.m_14')" size="small" prop="region">
                          <el-select v-model="form3.region" :placeholder="$t('nav3_2.move.m_15')">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </li>
                    <li style="float:left;width:100px;text-align: center;margin-left: 10px;">
                      <el-button type="primary" @click="cleanform3()" size="small" style="margin-bottom: 5px;margin-top: 5px;width:80px;">{{$t('nav3_2.dialog.Determine')}}</el-button>
                      <el-button  @click="cleanform3()" size="small" style="margin: 0px;width:80px;">{{$t('nav3_2.dialog.cancel')}}</el-button>
                    </li>
                  </ul>
                </el-footer>
              </el-container>
            </el-container>
          </el-dialog>
          <!--重新调度-->
          <el-dialog :title="$t('nav3_2.dialog.res')" :visible.sync="Reschedule" width="30%" id="el-dialog1">
            <div style="text-align: center;">
              <div>
                <img src="../../../static/img/promot.png" alt="">
              </div>
              <div>
                <span>{{$t('nav3_2.dialog.content')}}</span>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="Reschedule = false">{{$t('nav3_2.dialog.cancel')}}</el-button>
              <el-button type="primary" @click="Reschedule = false">{{$t('nav3_2.dialog.Determine')}}</el-button>
            </span>
          </el-dialog>
        </div>
        <div v-show="RowContent" class="content rowcontent">
          <div class="content">
            <div class="header">
              <div>
                <span  @click="RowContent=false" style="color: rgb(44, 195, 98);cursor:pointer;font-weight: 600;">{{$t('nav3_2.title')}}</span> > <span style="font-weight: 600;">{{$t('nav3_2.pagetitle')}}</span>
              </div>
                <div class="rightbtn">
                  <el-button  size="small" icon="el-icon-refresh"  @click="refreshTable">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
                  <el-button size="small" icon="el-icon-edit-outline" @click="postprocessing = true">{{$t('nav3_2.buttonGroup.btn_10')}}</el-button>

                </div>
            </div>
            <el-row class="view-item pageitem" style="top:-15px;padding-top: 0px;padding-right: 45px;">
              <el-collapse v-model="activeNames" style="border-top: 0px;border-bottom: 0px;">
                <el-collapse-item :title="$t('nav3_2.news')" name="1">
                  <div style="border:1px solid #d7d7d7;border-radius: 4px;color: #5a5e66;font-size: 14px;">
                    <el-row style="margin-top:20px;margin-bottom: 20px;width:100%;">
                        <el-row style="display: flex;flex-direction: row;">
                          <el-col class="pagerow"  style="height: 50px;line-height: 50px">{{$t('nav3_2.base')}}</el-col>
                          <el-col class="pagerow2">
                            <el-table  class="table1 tab" :data="detailPage.base.list0.pagetableData1" border style="width: 100%;cursor:pointer;margin-bottom: 30px;color: #5a5e66;text-align: center">
                            <el-table-column
                              prop="jobid"
                              :label="$t('nav1_1.rightdiv.myjob.cell_1')">
                            </el-table-column>
                            <el-table-column
                              prop="jobname"
                              :label="$t('nav1_1.rightdiv.myjob.cell_2')"
                            >
                            </el-table-column>
                            <el-table-column
                              prop="state"
                              :label="$t('nav1_1.rightdiv.myjob.cell_3')"
                            >
                            </el-table-column>
                            <el-table-column
                              prop="application"
                              :label="$t('nav1_1.rightdiv.myjob.cell_4')"
                            >
                            </el-table-column>
                            <el-table-column
                              prop="user"
                              :label="$t('nav1_1.rightdiv.myjob.cell_5')"
                            >
                            </el-table-column>
                          </el-table>
                            <el-table class="table1 tab" :data="detailPage.base.list0.pagetableData2" border  style="width: 100%;cursor:pointer;color: #5a5e66;text-align: center">
                              <el-table-column
                                prop="queue"
                                :label="$t('nav3_2.table.cell_5')"
                              >
                              </el-table-column>
                              <el-table-column
                                prop="work"
                                :label="$t('nav3_2.table.cell_6')"
                              >
                              </el-table-column>
                              <el-table-column
                                prop="run"
                                :label="$t('nav3_2.table.cell_7')"
                              >
                              </el-table-column>
                              <el-table-column
                                prop="threadnumber"
                                :label="$t('nav3_2.table.cell_8')"
                              >
                              </el-table-column>
                              <el-table-column
                                prop="object"
                                :label="$t('nav3_2.table.cell_9')"
                              >
                              </el-table-column>
                            </el-table>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col class="pagerow">{{$t('nav3_2.table.cell_18')}}</el-col>
                          <el-col class="pagerow2">{{detailPage.base.list1}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col class="pagerow">{{$t('nav3_2.table.cell_7')}}</el-col>
                          <el-col class="pagerow2">{{detailPage.base.list2}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col class="pagerow">{{$t('nav3_2.table.cell_16')}}</el-col>
                          <el-col class="pagerow2">{{detailPage.base.list3}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col class="pagerow">{{$t('nav3_2.table.cell_9')}}</el-col>
                          <el-col class="pagerow2">{{detailPage.base.list4}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col class="pagerow">{{$t('nav3_2.table.cell_15')}}</el-col>
                          <el-col class="pagerow2">{{detailPage.base.list5}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col class="pagerow">{{$t('nav3_2.table.cell_12')}}</el-col>
                          <el-col class="pagerow2">{{detailPage.base.list6}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col class="pagerow">{{$t('nav3_2.table.cell_19')}}</el-col>
                          <el-col class="pagerow2">{{detailPage.base.list7}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col class="pagerow">{{$t('nav3_2.move.m_3')}}</el-col>
                          <el-col class="pagerow2">{{detailPage.base.list8}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col class="pagerow">{{$t('nav3_2.table.cell_20')}}</el-col>
                          <el-col class="pagerow2">{{detailPage.base.list9}}</el-col>
                        </el-row>
                    </el-row>
                  </div>
                </el-collapse-item>
                <el-collapse-item :title="$t('nav3_2.job')" name="2">
                  <el-row style="border-bottom: 1px solid rgb(215, 215, 215);border-top:1px solid rgb(215, 215, 215);height:41px">
                    <div class="rightbtn" style="margin: 3px 0;">
                      <el-button  size="small" @click="establish = true"><i class="el-icon-circle-plus-outline"></i> {{$t('nav3_2.buttonGroup.pagebtn_1')}}</el-button>
                      <el-button size="small" @click="del2"><i class="el-icon-delete" > </i> {{$t('nav3_2.buttonGroup.pagebtn_2')}}</el-button>
                      <el-button size="small" @click="download"><i class="el-icon-download"> </i> {{$t('nav3_2.buttonGroup.pagebtn_3')}}</el-button>
                      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :show-file-list="false" style="margin:0px 10px;" >
                        <el-button size="small"><i class="el-icon-upload2"  > </i> {{$t('nav3_2.buttonGroup.pagebtn_4')}}</el-button>
                      </el-upload>

                      <el-button size="small" @click="compress = true"><i class="fa fa-file-zip-o"></i> {{$t('nav3_2.buttonGroup.pagebtn_5')}}</el-button>
                      <el-button size="small" icon="el-icon-rank" @click="move1">{{$t('nav3_2.buttonGroup.pagebtn_6')}}</el-button>
                      <el-button size="small"  icon="el-icon-tickets"  @click="copy1">{{$t('nav3_2.buttonGroup.pagebtn_7')}}</el-button>
                      <el-button size="small" icon="el-icon-view" @click="see1">{{$t('nav3_2.buttonGroup.pagebtn_8')}}</el-button>
                    </div>
                  </el-row>
                  <el-row style="margin-bottom:3px;margin-top: 3px; ">
                    <el-button size="small" icon="el-icon-back" class="table1">{{$t('nav3_2.buttonGroup.pagebtn_9')}}</el-button>
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;margin-left: 20px;height: 14px;line-height: 23px;">
                      <el-breadcrumb-item :to="{ path: '/' }">{{$t('nav3_2.home')}}</el-breadcrumb-item>
                      <el-breadcrumb-item>seefgwetfre</el-breadcrumb-item>
                      <el-breadcrumb-item>etgfertre</el-breadcrumb-item>
                    </el-breadcrumb>
                  </el-row>
                  <el-row class="pagetable">
                    <el-table class="table1" ref="windowTable" :data="detailPage.catalog.pagetableData3" :open="showmodel2()" @selection-change="changeFun2" tooltip-effect="dark" style="width: 100%;cursor:pointer;" border :default-sort = "{prop: 'filename', order: 'descending'}">
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        prop="filename"
                        :label="$t('nav3_2.move.m_8')"
                        sortable
                        >
                        <template slot-scope="scope">
                          <img src="../../../static/img/folder.png" alt="">
                          <span>{{scope.row.filename}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column
                        prop="lord"
                        :label="$t('nav3_2.move.m_9')"
                        sortable
                        >
                      </el-table-column>
                      <el-table-column
                        prop="size"
                        :label="$t('nav3_2.move.m_10')"
                        sortable
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="kind"
                        :label="$t('nav3_2.move.m_11')"
                        sortable
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="changetime"
                        :label="$t('nav3_2.move.m_12')"
                        sortable
                        show-overflow-tooltip>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-row>
          </div>
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
        labelPosition:'right',//对话框默认右对齐
        show:false,
        activeNames: ['1','2'],//默认打开详细信息、作业目录的折叠面板的name值
        options: [
          {
            value: 'CAE',
            label: 'CAE'
          },
          {
            value: 'EDA',
            label: 'EDA'
          },
          {
            value: '日产',
            label: '日产'
          }
        ],//下拉框数据
//        导航条数据：
        nav:{
          value6:'',/*后处理应用对应选中值*/

        },
//      首页表格数据：
        multipleSelection:[],/*列表模式选中值*/
        table:{
          tableloading:false, //表格加载动画,
          state: [
            {
              value: this.$t('nav3_2.stateOptions.value1'),
              label: this.$t('nav3_2.stateOptions.value1')
            },
            {
              value: this.$t('nav3_2.stateOptions.value2'),
              label: this.$t('nav3_2.stateOptions.value2')
            },
            {
              value: this.$t('nav3_2.stateOptions.value3'),
              label:this.$t('nav3_2.stateOptions.value3')
            },
            {
              value: this.$t('nav3_2.stateOptions.value4'),
              label: this.$t('nav3_2.stateOptions.value4')
            },
            {
              value: this.$t('nav3_2.stateOptions.value5'),
              label: this.$t('nav3_2.stateOptions.value5')
            },
            {
              value: this.$t('nav3_2.stateOptions.value6'),
              label: this.$t('nav3_2.stateOptions.value6')
            },
          ],//5种作业状态
          statenum:{state1:1, state2:2, state3:3, state4:4, state5:5,},//5种状态对应的统计数
          tableMyjob: [
            {
              jobid: '1101',
              jobname: 'job1',
              application: 'FLEX',
              user:'admin',
              state:'state1',
              queue:'ana-dyna',
              work:'yes',
              run:'4*hhcpp',
              object:'def-proj',
              start:'2017-01-01 12:11:13',
              version:'1212',
              terminal:'abaaaa',
            },
            {
              jobid: '1102',
              jobname: 'job2',
              application: 'CFX',
              user:'admin',
              state:'state2',
              queue:'ana-dyna',
              work:'no',
              run:'4*hhcpp',
              object:'def-proj',
              start:'2017-01-01 12:11:13',
              version:'1212',
              terminal:'abaaaa',
            },
            {
              jobid: '1103',
              jobname: 'job3',
              application: 'FLEX',
              user:'admin',
              state:'state3',
              queue:'ana-dyna',
              work:'no',
              run:'4*hhcpp',
              object:'def-proj',
              start:'2017-01-01 12:11:13',
              version:'1212',
              terminal:'abaaaa',
            },
            {
              jobid: '1104',
              jobname: 'job3',
              application: 'CFX',
              user:'admin',
              state:'state4',
              queue:'ana-dyna',
              work:'no',
              run:'4*hhcpp',
              object:'def-proj',
              start:'2017-01-01 12:11:13',
              version:'1212',
              terminal:'abaaaa',
            },
            {
              jobid: '1105',
              jobname: 'job4',
              application: 'FLUENT',
              user:'admin',
              state:'state5',
              queue:'ana-dyna',
              work:'no',
              run:'4*hhcpp',
              object:'def-proj',
              start:'2017-01-01 12:11:13',
              version:'1212',
              terminal:'abaaaa',
            },
            {
              jobid: '1106',
              jobname: 'job5',
              application: 'FLUENT',
              user:'admin',
              state:'state1',
              queue:'ana-dyna',
              work:'yes',
              run:'4*hhcpp',
              object:'def-proj',
              start:'2017-01-01 12:11:13',
              version:'1212',
              terminal:'abaaaa',
            },
            {
              jobid: '1107',
              jobname: 'job6',
              application: 'FLEX',
              user:'admin',
              state:'state2',
              queue:'ana-dyna',
              work:'no',
              run:'4*hhcpp',
              object:'def-proj',
              start:'2017-01-01 12:11:13',
              version:'1212',
              terminal:'abaaaa',
            },
            {
              jobid: '1108',
              jobname: 'job7',
              application: 'FLEX',
              user:'admin',
              state:'state2',
              queue:'ana-dyna',
              work:'no',
              run:'4*hhcpp',
              object:'def-proj',
              start:'2017-01-01 12:11:13',
              version:'1212',
              terminal:'abaaaa',
            },
            {
              jobid: '1109',
              jobname: 'job8',
              application: 'FLEX',
              user:'admin',
              state:'state3',
              queue:'ana-dyna',
              work:'no',
              run:'4*hhcpp',
              object:'def-proj',
              start:'2017-01-01 12:11:13',
              version:'1212',
              terminal:'abaaaa',
            },

          ],//作业列表

          value1: this.$t('nav3_2.select1.allDepartments'),/*默认应用选中状态*/
          value2: this.$t('nav3_2.select2.allDepartments'),/*默认状态选中状态*/
          value3: this.$t('nav3_2.select3.allDepartments'),/*默认用户名选中状态*/
          searchOptions:[
            {value:this.$t('nav3_2.select3.allDepartments'),label:this.$t('nav3_2.select3.allDepartments'),},
            {value:this.$t('nav3_2.id'),label:this.$t('nav3_2.id'),},
            {value:this.$t('nav3_2.name'),label:this.$t('nav3_2.name'),},
          ],
        },
//        详情页详细信息
        detailPage:{
          base:{
            list0:{
              pagetableData1:[{
                jobid:'0',
                jobname:'1',
                state:'STARCC',
                application:'12',
                user:'909',
              }],
              pagetableData2:[{
                queue:'0',
                work:'1',
                run:this.$t('nav3_2.stateOptions.value5'),
                threadnumber:'12',
                object:'909',
              }],//基本信息的表格数据
            },
            list1:'8',list2:'4*hpccn03:4*hpccn01',list3:'2017-01-01 12:03:45',list4:'2017-01-01 12:03:45',
            list5:'2017-01-01 12:03:45',list6:'00:02:03:04',list7:'/hpcapp/software/SCloudFamily2017',
            list8:'/hpcapp/software/SCloudFamily2017/SCloudFamily/webapps',list9:'',//详情页基本信息
          },
          catalog:{
            ind: 0,//移动、复制侧边栏的默认状态
            aside:[
              {list:this.$t('nav3_2.move.m_1'), src:"../../../static/img/history.png",},
              {list:this.$t('nav3_2.move.m_2'),src:"../../../static/img/mine.png"},
              {list:this.$t('nav3_2.move.m_3'),src:"../../../static/img/home.png"},
              {list:this.$t('nav3_2.move.m_4'),src:"../../../static/img/share.png"},
            ],//移动、复制模态框的侧边栏
            editableTabs: [
              {
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content'
              }, {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content'
              }],//文件浏览的表单数据
            pagetableData3:[
              {
                filename:'nioj9o.com',
                lord:'rvcpadm  ',
                size:'12MB',
                kind:'文件',
                changetime:'2017-12-03 12:03:55',
              },{
                filename:'jss.out',
                lord:'rvcpadm  ',
                size:'12KB',
                kind:'文件',
                changetime:'2017-09-03 17:03:55',
              },{
                filename:'nioj9o.stt',
                lord:'rvcpadm  ',
                size:'100KB',
                kind:'文件',
                changetime:'2017-07-03 09:03:55',
              },{
                filename:'newe.inp',
                lord:'rvcpadm  ',
                size:'2KB',
                kind:'文件',
                changetime:'2017-03-03 07:03:55',
              },],//基本目录的表格数据

          },
        },

        multipleSelection1:[],/*列表模式选中值*/
        multipleSelection2:[],/*移动复制对话框列表模式选中值*/
        isfull:false, //查看对话框全屏参数
        editableTabsValue: '2',
        tabIndex: 2,

//      对话框的默认隐藏
        configure: false,
        postprocessing:false,
        establish:false,
        compress:false,
        see:false,
        move:false,
        Reschedule:false,
        RowContent:false,
        form: {
          name2:'',
          works: [this.$t('nav1_1.rightdiv.myjob.cell_1'), this.$t('nav1_1.rightdiv.myjob.cell_2'),this.$t('nav1_1.rightdiv.myjob.cell_3'), this.$t('nav1_1.rightdiv.myjob.cell_4'),this.$t('nav1_1.rightdiv.myjob.cell_5'),this.$t('nav3_2.table.cell_5'),this.$t('nav3_2.table.cell_6'),this.$t('nav3_2.table.cell_7'),this.$t('nav3_2.table.cell_8'),this.$t('nav3_2.table.cell_9'),this.$t('nav3_2.table.cell_10'),this.$t('nav3_2.table.cell_11'),this.$t('nav3_2.table.cell_12'),this.$t('nav3_2.table.cell_13'),this.$t('nav3_2.table.cell_14'),this.$t('nav3_2.table.cell_15'),this.$t('nav3_2.table.cell_16')],
          workCities1: [this.$t('nav1_1.rightdiv.myjob.cell_1'), this.$t('nav1_1.rightdiv.myjob.cell_2'),this.$t('nav1_1.rightdiv.myjob.cell_3'), this.$t('nav1_1.rightdiv.myjob.cell_4'),this.$t('nav1_1.rightdiv.myjob.cell_5'),this.$t('nav3_2.table.cell_5')
            ,this.$t('nav3_2.table.cell_6'),this.$t('nav3_2.table.cell_7'),this.$t('nav3_2.table.cell_8'),this.$t('nav3_2.table.cell_9'),],//配置项列表的默认选中的数据
        },//对话框中表单的初始值
        form0:{
          value5: this.$t('nav3_2.select5.allDepartments'),/*默认分辨率选中状态*/
          postOptions:[
            {value:'1920*1080',label:'1920*1080'},
            {value:'800*600',label:'800*600'},
            {value:'1024*768',label:'1024*768'},
            {value:'1280*720',label:'1280*720'},
            {value:'1360*768',label:'1360*768'},
            {value:'1366*768',label:'1366*768'},
          ],//分辨率下拉框数据
        },
        form1:{
          name1:'',
        },
        form2:{
          compressname:'',
          value4: this.$t('nav3_2.select4.allDepartments'),/*默认压缩类型选中状态*/
          kindOptions:[
            {value:'zip',label:'zip'},
            {value:'tar.gz',label:'tar,gz'}
          ],//作业状态压缩下拉框数据
        },
        form3:{
          route:'',
          region:'',
        }
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
      $(" .itemtable .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 75px - 55px - 75px - 105px)', //可滚动区域高度
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
      $(" .pageitem").slimScroll({
        width: ' calc(100% - 10px )', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 75px)', //可滚动区域高度
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
      isfullscreen(){
        this.isfull = !this.isfull;
      }, //全屏切换
      showmodel:function(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".itemtable1  .el-table__body-wrapper").slimScroll({
            width: '100%', //可滚动区域宽度
            height: '270px', //可滚动区域高度
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
      showmodel2:function(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".pagetable  .el-table__body-wrapper").slimScroll({
            width: '100%', //可滚动区域宽度
            height: '540px', //可滚动区域高度
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
      delGroup() {
        var jobid = this.multipleSelection.map(item => item.jobid).join()//获取所有选中行的id组成的字符串，以逗号分隔
        if(jobid == ""){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else {
          console.log(jobid);
        }
      }, //批量删除
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

      },//根据条件获取图表数据/*表格选中行*/
      rowClick(){
        this.openRowContent();
      },
      openRowContent(){
        this.RowContent = true;
        //+ajax请求
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
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

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },//查看对话框的插件
      /*删除机器*/
      i18nChart : function () {
        this.detailPage.catalog.aside[0].list = this.$t('nav3_2.move.m_1');
        this.detailPage.catalog.aside[1].list = this.$t('nav3_2.move.m_2');
        this.detailPage.catalog.aside[2].list = this.$t('nav3_2.move.m_3');
        this.detailPage.catalog.aside[3].list = this.$t('nav3_2.move.m_4');
        this.table.value1 =this.$t('nav3_2.select1.allDepartments');
        this.table.value2 =this.$t('nav3_2.select2.allDepartments');
        this.table.value3 =this.$t('nav3_2.select3.allDepartments');
        this.form2.value4 =this.$t('nav3_2.select4.allDepartments');
        this.table.state[0].value=this.$t('nav3_2.stateOptions.value1');
        this.table.state[0].label= this.$t('nav3_2.stateOptions.value1');
        this.table.state[1].value=this.$t('nav3_2.stateOptions.value2');
        this.table.state[1].label= this.$t('nav3_2.stateOptions.value2');
        this.table.state[2].value=this.$t('nav3_2.stateOptions.value3');
        this.table.state[2].label= this.$t('nav3_2.stateOptions.value3');
        this.table.state[3].value=this.$t('nav3_2.stateOptions.value4');
        this.table.state[3].label= this.$t('nav3_2.stateOptions.value4');
        this.table.state[4].value=this.$t('nav3_2.stateOptions.value5');
        this.table.state[4].label= this.$t('nav3_2.stateOptions.value5');
        this.table.state[5].value=this.$t('nav3_2.stateOptions.value6');
        this.table.state[5].label= this.$t('nav3_2.stateOptions.value6');
        this.form.works[0]=this.$t('nav1_1.rightdiv.myjob.cell_1');
        this.form.works[1]=this.$t('nav1_1.rightdiv.myjob.cell_2');
        this.form.works[2]=this.$t('nav1_1.rightdiv.myjob.cell_3');
        this.form.works[3]=this.$t('nav1_1.rightdiv.myjob.cell_4');
        this.form.works[4]=this.$t('nav1_1.rightdiv.myjob.cell_5');
        this.form.works[5]=this.$t('nav3_2.table.cell_5');
        this.form.works[6]=this.$t('nav3_2.table.cell_6');
        this.form.works[7]=this.$t('nav3_2.table.cell_7');
        this.form.works[8]=this.$t('nav3_2.table.cell_8');
        this.form.works[9]=this.$t('nav3_2.table.cell_9');
        this.form.works[10]=this.$t('nav3_2.table.cell_10');
        this.form.works[11]=this.$t('nav3_2.table.cell_11');
        this.form.works[12]=this.$t('nav3_2.table.cell_12');
        this.form.works[13]=this.$t('nav3_2.table.cell_13');
        this.form.works[14]=this.$t('nav3_2.table.cell_14');
        this.form.works[15]=this.$t('nav3_2.table.cell_15');
        this.form.works[16]=this.$t('nav3_2.table.cell_16');
        this.form.workCities1[0]=this.$t('nav1_1.rightdiv.myjob.cell_1');
        this.form.workCities1[1]=this.$t('nav1_1.rightdiv.myjob.cell_2');
        this.form.workCities1[2]=this.$t('nav1_1.rightdiv.myjob.cell_3');
        this.form.workCities1[3]=this.$t('nav1_1.rightdiv.myjob.cell_4');
        this.form.workCities1[4]=this.$t('nav1_1.rightdiv.myjob.cell_5');
        this.form.workCities1[5]=this.$t('nav3_2.table.cell_5');
        this.form.workCities1[6]=this.$t('nav3_2.table.cell_6');
        this.form.workCities1[7]=this.$t('nav3_2.table.cell_7');
        this.form.workCities1[8]=this.$t('nav3_2.table.cell_8');
        this.form.workCities1[9]=this.$t('nav3_2.table.cell_9');
        this.table.searchOptions[0].value=this.$t('nav3_2.select3.allDepartments');
        this.table.searchOptions[1].value=this.$t('nav3_2.id');
        this.table.searchOptions[2].value=this.$t('nav3_2.name');
        this.table.searchOptions[0].label=this.$t('nav3_2.select3.allDepartments');
        this.table.searchOptions[1].label=this.$t('nav3_2.id');
        this.table.searchOptions[2].label=this.$t('nav3_2.name');
        this.detailPage.base.list0.pagetableData2[0].run = this.$t('nav3_2.stateOptions.value5');
      },//国际化chart
      changeBgc: function (index) {
        this.detailPage.catalog.ind = index
      },
      stop(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*暂停*/
      recovery(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*恢复*/
      end(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*终止*/
      Resche(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          this.Reschedule = true;
        }
      },/*重新调度*/
      top(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*置顶*/
      seeOutput(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*查看输出*/
      view(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*可视化*/
      change(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*切换队列*/

      del:function(){
        if(this.multipleSelection1.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection1);
        }
      },/*删除*/
      move1(){
        if(this.multipleSelection2.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          this.move = true;
        }
      },/*移动*/
      copy1(){
        if(this.multipleSelection2.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          this.move = true;
        }
      },/*复制*/
      see1(){
        if(this.multipleSelection2.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          this.see = true;
        }
      },/*查看*/
      del2:function(){
        if(this.multipleSelection2.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection2);
        }
      },/*删除*/
      download:function(){
        if(this.multipleSelection2.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection2);
        }
      },/*下载*/
      refreshTable(){

      },/*刷新*/
      cleanform(){
        this.$refs['form1'].resetFields();
        this.establish = false
      },//清除表单数据
      closedialog(done){
        this.cleanform();
        done();
      },//关闭对话框回调
      cleanform2(){
        this.$refs['form2'].resetFields();
        this.compress = false
      },//清除表单数据
      closedialog2(done){
        this.cleanform2();
        done();
      },//关闭对话框回调
      cleanform3(){
        this.$refs['form3'].resetFields();
        this.move = false
      },//清除表单数据
      closedialog3(done){
        this.cleanform3();
        done();
      },//关闭对话框回调
      changeFun(val) {
        this.multipleSelection = val;
      },/*复选框状态改变*/
      changeFun1(val) {
        this.multipleSelection1 = val;
      },/*复选框状态改变*/
      changeFun2(val) {
        this.multipleSelection2 = val;
      },/*复选框状态改变*/
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #menu_ul li{
    font-size: 14px;
    float:left;
    margin-right:25px;
  }
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
    top: 0px;
    left: 0px;
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
  .pagerow{
    margin-left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    text-align: right;
    width:200px;
    min-width: 180px;
    font-weight: 700;
  }
  .pagerow2{
    /*margin-left: 50px;*/
    text-align: left;
    width: calc(100% - 400px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .right{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .table1{
    border-radius:4px;
    border: 1px solid rgb(215, 215, 215);
  }
  .listname{
    height:30px;
    line-height:30px;
    padding-bottom:10px;
    white-space:nowrap;
  }
  .fullscreen{
    max-height: calc(100vh - 50px - 60px - 40px - 65px - 50px);
  }
  .fullscreenfooter{text-align: center}

</style>
<style>
  .el-collapse-item__arrow {
    float: left;
  }
  .el-table thead {
    color: #5a5e66;
  }

  .table1 td ,.table1 th {
    border-right: 1px solid rgb(215, 215, 215);
  }
  .table1 th {
    border-bottom: 1px solid rgb(215, 215, 215);
  }
  .table1 td,.table1 th.is-leaf {
    border-bottom: 1px solid rgb(215, 215, 215);
    text-align: left;
  }
  .tab td ,.tab th {
    border-right: 1px solid rgb(215, 215, 215);
  }
  .tab th {
    border-bottom: 1px solid rgb(215, 215, 215);
  }
  .tab td,.tab th.is-leaf {
    border-bottom: 1px solid rgb(215, 215, 215);
    text-align: center;
  }
  .nav3_2 .el-breadcrumb__item:last-child .el-breadcrumb__inner{
    font-weight:700;
  }
  .nav3_2 .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    font-weight: 700;
  }
  .nav3_2 .el-tabs__header{
    margin:0px;
  }

  .nav3_2 .el-tabs__content{
    border: 1px solid #dfe4ed;
    border-radius: 3px;
  }
  .nav3_2 .search .el-input-group__prepend {
    background-color: #fff;
  }
.nav3_2 .el-select {
  width: 100%;
}
</style>
