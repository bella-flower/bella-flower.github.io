<template>
  <el-container class="main nav7_6">
    <div class="content">
      <div class="header">
        <div>{{$t('nav7_6.title')}}</div>
        <div class="rightbtn">
          <el-button icon="el-icon-refresh" plain size="small"  @click="refreshTable" style="margin-right: 5px;" >{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
          <el-button icon="el-icon-download" plain  size="small" style="margin-right: 5px">{{$t('nav7_6.buttonGroup.btn_1')}}</el-button>
          <el-button icon="el-icon-delete" plain size="small"  style="margin-right: 5px">{{$t('nav7_6.buttonGroup.btn_2')}}</el-button>
          <el-button icon="el-icon-edit" @click="editView" plain  size="small" style="margin-right: 5px">{{$t('nav7_6.buttonGroup.btn_3')}}</el-button>
          <el-button icon="el-icon-view" plain size="small" @click="LookView" style="margin-right: 5px">{{$t('nav7_6.buttonGroup.btn_4')}}</el-button>
        </div>
      </div>
      <el-row class="list-item">
        <el-table v-loading="tableloading" ref="roleTable" :row-style="rowClass"  @selection-change="changeFun"  :border=true :data="appTable"  height="calc()" style="text-align: left"  >
          <el-table-column type="selection" width="50" prop="select"></el-table-column>
          <el-table-column prop="id" :label="$t('nav7_6.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" :label="$t('nav7_6.table.cell_2')" :sortable="true" show-overflow-tooltip>
            <template slot-scope="scope">
                  <span :class="scope.row.status === 'state1' ? 'green' : ''||scope.row.status === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.status === 'state1'? $t('nav7_6.table.state1') : ''||scope.row.status === 'state2'? $t('nav7_6.table.state2') : ''}}
                  </span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--添加框-->
      <el-dialog title="选择参数类型" :visible.sync="addVisible" :open="showmodel2()" ref="dialog" width="770px" :before-close="closedialog">
          <div class="form_content form1Show">
            <ul class="leftUl" >
                <li class="typeList" v-for="(type,index) in addModuleType.dataType" @click="clickType(index)" :class="{greenFont:addModuleType.activeType==index}" v-text="type"></li>
            </ul>
            <div class="rightContent">
              <template>
                  <div v-show="addModuleType.activeType==0">
                    <h3>文本</h3>
                    <p>使用它来添加文本到所要提交的模板中</p>
                    <div class="EGbox">
                      <p style="padding-left:20px;">示例文字</p>
                    </div>
                  </div>
                  <div v-show="addModuleType.activeType==1">
                  <h3>输入框</h3>
                  <p>使用它通过鼠标或键盘输入字符</p>
                  <div class="EGbox">
                    <el-form  label-width="80px">
                      <el-form-item  label="字段标签">
                        <el-input placeholder="示例文字"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                 </div>
                  <div v-show="addModuleType.activeType==2">
                  <h3>选择日期</h3>
                  <p>使用它来添加指定日期</p>
                  <div class="EGbox">
                    <el-form  label-width="80px">
                      <el-form-item  label="字段标签">
                        <el-date-picker type="date" placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                  <div v-show="addModuleType.activeType==3">
                    <h3>下拉列表</h3>
                    <p>使用它来允许用户从预定义的列表中选择一项</p>
                    <div class="EGbox">
                      <el-form  label-width="80px">
                        <el-form-item  label="字段标签">
                          <select class="select_list">
                              <option selected>示例文字1</option>
                              <option>示例文字2</option>
                          </select>
                        </el-form-item>
                      </el-form>
                    </div>
                </div>
                  <div v-show="addModuleType.activeType==4">
                    <h3>单选按钮</h3>
                    <p>使用它来添加一组互斥选择项</p>
                    <div class="EGbox">
                      <el-form  label-width="80px">
                        <el-form-item  label="字段标签">
                          <el-radio-group v-model="addModuleType.EG.egRadio">
                            <el-radio :label="1">示例文字1</el-radio>
                            <el-radio :label="2">示例文字2</el-radio>
                            <el-radio :label="3">示例文字3</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-form>
                    </div>
                </div>
                  <div v-show="addModuleType.activeType==5">
                    <h3>穿梭框</h3>
                    <p>使用它来添加一组分配选项</p>
                    <div class="EGbox" style="height:350px;">
                      <el-form  label-width="80px">
                        <el-form-item  label="字段标签">
                          <el-transfer v-model="addModuleType.EG.role.roleValue" :titles="['未有角色', '已有角色']" :data="addModuleType.EG.role.roleData"></el-transfer>
                        </el-form-item>
                      </el-form>
                    </div>
                </div>
                  <div v-show="addModuleType.activeType==6">
                    <h3>可执行文本</h3>
                    <p>使用它来作为应用的数据文件选择域</p>
                    <div class="EGbox">
                      <el-form  label-width="80px">
                        <el-form-item  label="字段标签">
                          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                                     :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                           <!-- <span class="upload-demo-title textover">{{$t('nav3_1.leftitem_8')}}</span>-->
                            <el-button size="small" type="primary">{{$t('nav3_1.leftitem_9')}}</el-button>
                            <el-button size="small" type="primary">{{$t('nav3_1.leftitem_10')}}</el-button>
                          </el-upload>
                        </el-form-item>
                      </el-form>
                    </div>
                </div>
                  <div v-show="addModuleType.activeType==7">
                    <h3>输入密码</h3>
                    <p>使用它添加字段收集用户密码输入</p>
                    <div class="EGbox">
                      <el-form  label-width="80px">
                        <el-form-item  label="字段标签">
                          <el-input placeholder="********"></el-input>
                        </el-form-item>
                          <el-form-item  label="确认密码">
                            <el-input placeholder="********"></el-input>
                          </el-form-item>
                      </el-form>
                    </div>
                  </div>
                  <div v-show="addModuleType.activeType==8">
                    <h3>输入文件</h3>
                    <p>使用它来选择本地或者远程数据文件</p>
                    <div class="EGbox">
                      <el-form  label-width="80px">
                        <el-form-item  label="字段标签">
                          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                                     :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                            <!-- <span class="upload-demo-title textover">{{$t('nav3_1.leftitem_8')}}</span>-->
                            <el-button size="small" type="primary">{{$t('nav3_1.leftitem_9')}}</el-button>
                            <el-button size="small" type="primary">{{$t('nav3_1.leftitem_10')}}</el-button>
                          </el-upload>
                        </el-form-item>
                      </el-form>
                    </div>
                </div>
                  <div v-show="addModuleType.activeType==9">
                    <h3>远程文件</h3>
                    <p>使用它来选择服务器端数据文件</p>
                    <div class="EGbox">
                      <el-form  label-width="80px">
                        <el-form-item  label="字段标签">
                          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                                     :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                            <!-- <span class="upload-demo-title textover">{{$t('nav3_1.leftitem_8')}}</span>-->
                            <el-button size="small" type="primary">{{$t('nav3_1.leftitem_10')}}</el-button>
                          </el-upload>
                        </el-form-item>
                      </el-form>
                    </div>
                </div>
                  <div v-show="addModuleType.activeType==10">
                    <h3>远程目录</h3>
                    <p>使用它来选择远程数据文件</p>
                    <div class="EGbox">
                      <el-form  label-width="80px">
                        <el-form-item  label="字段标签">
                          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                                     :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                            <!-- <span class="upload-demo-title textover">{{$t('nav3_1.leftitem_8')}}</span>-->
                            <el-button size="small" type="primary">{{$t('nav3_1.leftitem_10')}}</el-button>
                          </el-upload>
                        </el-form-item>
                      </el-form>
                    </div>
                </div>
              </template>
            </div>
          </div>
          <div class="form_content form2Show" v-show="addModuleType.form2Show">
            <div class="addFormScroll">
              <template>
                  <div class="addFormC" v-show="addModuleType.activeType==0">
                    <el-form style="width:460px;margin:30px auto;" ref="labelForm" :model="addModuleType.typeAddData.labelForm" :rules="addModuleType.rules" label-width="150px">
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off"  v-model="addModuleType.typeAddData.labelForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="输入文本" prop="label">
                        <el-input type="textarea" :rows="7" v-model="addModuleType.typeAddData.labelForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.labelForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==1">
                    <el-form style="width:460px;margin:30px auto;" ref="textForm" :model="addModuleType.typeAddData.textForm" :rules="addModuleType.rules"  label-width="150px">
                    <el-form-item label="标签"  prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.textForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.textForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="显示字符宽度">
                        <el-input-number v-model="addModuleType.typeAddData.textForm.width" :min="1" :max="100" ></el-input-number>
                      </el-form-item>
                      <el-form-item label="默认内容">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.textForm.defaultValue"></el-input>
                      </el-form-item>
                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.textForm.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.textForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.textForm.required"></el-switch>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==2">
                    <el-form style="width:460px;margin:30px auto;"  ref="dateForm" :model="addModuleType.typeAddData.dateForm" :rules="addModuleType.rules"  label-width="150px">
                    <el-form-item label="标签" prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.dateForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.dateForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="默认日期">
                        <el-date-picker v-model="addModuleType.typeAddData.dateForm.defaultValue" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.dateForm.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.dateForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.dateForm.required"></el-switch>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==3">
                    <el-form style="width:460px;margin:30px auto;" ref="listForm" :model="addModuleType.typeAddData.listForm" :rules="addModuleType.rules" label-width="150px">
                    <el-form-item label="标签" prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.listForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.listForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="列表内容">
                        <template>
                          <el-radio-group v-model="addModuleType.typeAddData.listRadio">
                            <el-radio label="1">客户列表</el-radio>
                            <el-radio label="2">客户脚本</el-radio>
                            <el-radio label="3">系统脚本</el-radio>
                          </el-radio-group>
                        </template>
                        <template>
                          <div v-show="addModuleType.typeAddData.listRadio==1">
                            <el-input  auto-complete="off" style="width:200px;margin-right:10px;" v-model="addModuleType.typeAddData.listOption"></el-input><el-button @click="addSelect">添加</el-button>
                            <ul class="listUl" style="padding-top:10px;">
                              <li v-for="(item,index) in addModuleType.typeAddData.listForm.items">
                                <div class="addListLi" v-text="item.value" :id="item.id" :selected="item.selected"></div>
                                <el-button class="el-btn" @click="delListOption(index)">删除</el-button>
                              </li>
                            </ul>
                          </div>
                          <div v-show="addModuleType.typeAddData.listRadio==2">
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                                       :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed">
                              <!-- <span class="upload-demo-title textover">{{$t('nav3_1.leftitem_8')}}</span>-->
                              <el-button size="small">上传</el-button>
                            </el-upload>
                          </div>
                          <div v-show="addModuleType.typeAddData.listRadio==3">
                            <el-input v-model="addModuleType.typeAddData.listForm.script"></el-input>
                          </div>
                        </template>
                      </el-form-item>
                      <el-form-item label="字段后显示的文本">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.listForm.follower"></el-input>
                      </el-form-item>
                      <el-form-item label="默认内容">
                        <select class="select_list" >
                          <template v-for="items in addModuleType.typeAddData.listForm.items">
                            <option v-if = "items.selected" :label="items.id" :id="items.id" :value="items.value"  selected></option>
                            <option v-else :label="items.id" :id="items.id" :value="items.value"></option>
                          </template>
                        </select>
                      </el-form-item>
                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.listForm.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.listForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.listForm.required"></el-switch>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==4">
                    <el-form style="width:460px;margin:30px auto;" ref="radioForm" :model="addModuleType.typeAddData.radioForm" :rules="addModuleType.rules" label-width="150px">
                    <el-form-item label="标签" prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.radioForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.radioForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="选项内容">
                        <template>
                          <el-input  auto-complete="off" style="width:200px;margin-right:10px;" v-model="addModuleType.typeAddData.radioOption"></el-input><el-button @click="addRadioSelect">添加</el-button>
                          <ul class="listUl" style="padding-top:10px;">
                            <li v-for="(item,index) in addModuleType.typeAddData.radioForm.items">
                              <div class="addListLi" v-text="item.value" :id="item.id" :selected="item.selected"></div>
                              <el-button class="el-btn" @click="delRadioOption(index)">删除</el-button>
                            </li>
                          </ul>
                        </template>
                      </el-form-item>
                      <el-form-item label="默认内容">
                        <select class="select_list">
                          <template v-for="items in addModuleType.typeAddData.radioForm.items">
                            <option v-if = "items.selected" :label="items.id" :id="items.id" :value="items.value"  selected></option>
                            <option v-else :label="items.id" :id="items.id" :value="items.value"></option>
                          </template>
                        </select>
                      </el-form-item>
                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.radioForm.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.radioForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.radioForm.required"></el-switch>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==5">
                    <el-form style="width:460px;margin:30px auto;" ref="checkboxForm" :model="addModuleType.typeAddData.checkboxForm" :rules="addModuleType.rules" label-width="150px">
                    <el-form-item label="标签" prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.checkboxForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.checkboxForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="选项内容">
                        <template>
                          <p style="margin:0;">
                            <el-radio v-model="addModuleType.typeAddData.checkboxRadio" label="1">客户列表</el-radio>
                          </p>
                          <el-input  auto-complete="off" style="width:200px;margin-right:10px;" v-model="addModuleType.typeAddData.checkboxOption"></el-input><el-button @click="addCheckboxSelect">添加</el-button>
                          <ul class="listUl" style="padding-top:10px;">
                            <li v-for="(item,index) in addModuleType.typeAddData.checkboxForm.items">
                              <div class="addListLi" v-text="item.value" :id="item.id" :selected="item.selected"></div>
                              <el-button class="el-btn" @click="delCheckboxOption(index)">删除</el-button>
                            </li>
                          </ul>
                        </template>
                      </el-form-item>
                      <el-form-item label="字段后显示的文本">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.checkboxForm.follower"></el-input>
                      </el-form-item>
                      <el-form-item label="默认内容">
                        <select class="select_list">
                          <template v-for="items in addModuleType.typeAddData.checkboxForm.items">
                            <option v-if = "items.selected" :label="items.id" :id="items.id" :value="items.value"  selected></option>
                            <option v-else :label="items.id" :id="items.id" :value="items.value"></option>
                          </template>
                        </select>
                      </el-form-item>
                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.checkboxForm.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.checkboxForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.checkboxForm.required"></el-switch>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==6">
                    <el-form style="width:460px;margin:30px auto;" ref="commandFileForm" :model="addModuleType.typeAddData.commandFileForm" :rules="addModuleType.rules" label-width="150px">
                    <el-form-item label="标签" prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.commandFileForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.commandFileForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="默认文件管理类型">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.commandFileForm.filter"></el-input>
                        <p class="shuoming">(文件类型通过逗号分隔,例如:*.dat,*.jou)</p>
                      </el-form-item>
                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.commandFileForm.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.commandFileForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.commandFileForm.required"></el-switch>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==7">
                    <el-form style="width:460px;margin:30px auto;"  ref="passwordForm" :model="addModuleType.typeAddData.passwordForm" :rules="addModuleType.rules" label-width="150px">
                    <el-form-item label="标签" prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.passwordForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.passwordForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="最小字符长度">
                        <el-input-number v-model="addModuleType.typeAddData.passwordForm.minLength" :min="1" :max="100" ></el-input-number>
                      </el-form-item>
                      <el-form-item label="最大字符长度">
                        <el-input-number v-model="addModuleType.typeAddData.passwordForm.maxLength" :min="1" :max="100" ></el-input-number>
                      </el-form-item>

                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.passwordForm.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.passwordForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.passwordForm.required"></el-switch>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==8">
                    <el-form style="width:460px;margin:30px auto;" ref="remoteFileForm" :model="addModuleType.typeAddData.remoteFileForm" :rules="addModuleType.rules" label-width="150px">
                    <el-form-item label="标签" prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteFileForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteFileForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="默认文件管理类型">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteFileForm.filter"></el-input>
                        <p class="shuoming">(文件类型通过逗号分隔,例如:*.dat,*.jou)</p>
                      </el-form-item>
                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.remoteFileForm.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.remoteFileForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.remoteFileForm.required"></el-switch>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==9">
                    <el-form style="width:460px;margin:30px auto;" ref="remotelocateFileForm" :model="addModuleType.typeAddData.remotelocateFileForm" :rules="addModuleType.rules"  label-width="150px">
                    <el-form-item label="标签" prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remotelocateFileForm.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remotelocateFileForm.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="默认文件管理类型">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remotelocateFileForm.filter"></el-input>
                        <p class="shuoming">(文件类型通过逗号分隔,例如:*.dat,*.jou)</p>
                      </el-form-item>
                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.remotelocateFileForm.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.remotelocateFileForm.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.remotelocateFileForm.required"></el-switch>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="addFormC" v-show="addModuleType.activeType==10">
                    <el-form style="width:460px;margin:30px auto;" ref="remoteDir"  :model="addModuleType.typeAddData.remoteDir" :rules="addModuleType.rules"  label-width="150px">
                      <el-form-item label="标签" prop="label">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteDir.label"></el-input>
                      </el-form-item>
                      <el-form-item label="字段ID" prop="id">
                        <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteDir.id"></el-input>
                        <p class="shuoming">(在后台脚本中使用)</p>
                      </el-form-item>
                      <el-form-item label="帮助说明" style="margin:0;">
                        <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.remoteDir.helpText"></el-input>
                        <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                      </el-form-item>
                      <el-form-item label="是否隐藏在模板" style="margin:0;">
                        <el-switch v-model="addModuleType.typeAddData.remoteDir.hidden"></el-switch>
                        <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                      </el-form-item>
                      <el-form-item label="是否必填">
                        <el-switch v-model="addModuleType.typeAddData.remoteDir.required"></el-switch>
                      </el-form-item>
                    </el-form>
                </div>
              </template>
            </div>
          </div>

        <div slot="footer" class="dialog-footer">
          <div v-show="addModuleType.form2Show==false">
            <el-button @click="addVisible=false">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
            <el-button type="primary" @click="nextEditForm">下一步</el-button>
          </div>
          <div v-show="addModuleType.form2Show==true">
            <el-button @click="prevEditEg">上一步</el-button>
            <el-button @click="addVisible=false">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
            <el-button type="primary" @click="addList">确定</el-button>
          </div>
        </div>
      </el-dialog>
      <!--编辑框-->
      <el-dialog title="选择参数类型" :visible.sync="editVisible" :open="showmodel2()" ref="editDialog" width="770px" :before-close="closeEditDialog">
        <div class="form_content">
          <div class="addFormScroll">
            <template>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.label'">
                <el-form style="width:460px;margin:30px auto;" ref="labelForm2" :model="addModuleType.typeAddData.labelForm" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="字段ID" prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.labelForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item prop="label" label="输入文本">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.labelForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="是否显示在模板">
                    <el-switch v-model="addModuleType.typeAddData.labelForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.text'">
                <el-form style="width:460px;margin:30px auto;" :model="addModuleType.typeAddData.textForm" ref="textForm2" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签" prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.textForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID" prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.textForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item label="显示字符宽度">
                    <el-input-number  v-model="addModuleType.typeAddData.textForm.width" :min="1" :max="100" ></el-input-number>
                  </el-form-item>
                  <el-form-item label="默认内容">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.textForm.defaultValue"></el-input>
                  </el-form-item>
                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.textForm.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.textForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.textForm.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.date'">
                <el-form style="width:500px;margin:30px auto;" :model="addModuleType.typeAddData.dateForm" ref="dateForm2" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签" prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.dateForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID" prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.dateForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item label="默认日期">
                    <el-date-picker v-model="addModuleType.typeAddData.dateForm.defaultValue" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.dateForm.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.dateForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.dateForm.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.list'">
                <el-form style="width:500px;margin:30px auto;" :model="addModuleType.typeAddData.listForm" ref="listForm2" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签"  prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.listForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID"  prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.listForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>

                  <el-form-item label="列表内容">
                    <template>
                      <el-radio-group v-model="addModuleType.typeAddData.listRadio">
                        <el-radio label="1">客户列表</el-radio>
                        <el-radio label="2">客户脚本</el-radio>
                        <el-radio label="3">系统脚本</el-radio>
                      </el-radio-group>
                    </template>
                    <template>
                      <div v-show="addModuleType.typeAddData.listRadio==1">
                        <el-input  auto-complete="off" style="width:200px;margin-right:10px;" v-model="addModuleType.typeAddData.listOption"></el-input><el-button @click="addSelect">添加</el-button>
                        <ul class="listUl" style="padding-top:10px;">
                          <li v-for="(item,index) in addModuleType.typeAddData.listForm.items">
                            <div class="addListLi" v-text="item.value" :id="item.id" :selected="item.selected"></div>
                            <el-button class="el-btn" @click="delListOption(index)">删除</el-button>
                          </li>
                        </ul>
                      </div>
                      <div v-show="addModuleType.typeAddData.listRadio==2">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                                   :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed">
                         <span class="upload-demo-title textover">{{$t('nav3_1.leftitem_8')}}</span>
                          <el-button size="small">上传</el-button>
                        </el-upload>
                      </div>
                      <div v-show="addModuleType.typeAddData.listRadio==3">
                        <el-input v-model="addModuleType.typeAddData.listForm.script"></el-input>
                      </div>
                    </template>
                  </el-form-item>
                  <el-form-item label="字段后显示的文本">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.listForm.follower"></el-input>
                  </el-form-item>
                  <el-form-item label="默认内容">
                    <select class="select_list">
                      <template v-for="items in addModuleType.typeAddData.listForm.items">
                        <option v-if = "items.selected" :label="items.id" :id="items.id" :value="items.value"  selected></option>
                        <option v-else :label="items.id" :id="items.id" :value="items.value"></option>
                      </template>
                    </select>
                  </el-form-item>
                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.listForm.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.listForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.listForm.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.radio'">
                <el-form style="width:500px;margin:30px auto;" :model="addModuleType.typeAddData.radioForm" ref="radioForm2"  :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签"  prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.radioForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID"  prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.radioForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item label="选项内容">
                    <template>
                      <el-input  auto-complete="off" style="width:200px;margin-right:10px;" v-model="addModuleType.typeAddData.radioOption"></el-input><el-button @click="addRadioSelect">添加</el-button>
                      <ul class="listUl" style="padding-top:10px;">
                        <li v-for="(item,index) in addModuleType.typeAddData.radioForm.items">
                          <div class="addListLi" v-text="item.value" :id="item.id" :selected="item.selected"></div>
                          <el-button class="el-btn" @click="delRadioOption(index)">删除</el-button>
                        </li>
                      </ul>
                    </template>
                  </el-form-item>
                  <el-form-item label="默认内容">
                    <select class="select_list">
                      <template v-for="items in addModuleType.typeAddData.radioForm.items">
                        <option v-if = "items.selected" :label="items.id" :id="items.id" :value="items.value"  selected></option>
                        <option v-else :label="items.id" :id="items.id" :value="items.value"></option>
                      </template>
                    </select>
                  </el-form-item>
                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.radioForm.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.radioForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.radioForm.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.checkbox'">
                <el-form style="width:500px;margin:30px auto;" :model="addModuleType.typeAddData.checkboxForm" ref="checkboxForm2" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签"  prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.checkboxForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID"  prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.checkboxForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item label="选项内容">
                    <template>
                      <p style="margin:0;">
                        <el-radio v-model="addModuleType.typeAddData.checkboxRadio" label="1">客户列表</el-radio>
                      </p>
                      <el-input  auto-complete="off" style="width:200px;margin-right:10px;" v-model="addModuleType.typeAddData.checkboxOption"></el-input><el-button @click="addCheckboxSelect">添加</el-button>
                      <ul class="listUl" style="padding-top:10px;">
                        <li v-for="(item,index) in addModuleType.typeAddData.checkboxForm.items">
                          <div class="addListLi" v-text="item.value" :id="item.id" :selected="item.selected"></div>
                          <el-button class="el-btn" @click="delCheckboxOption(index)">删除</el-button>
                        </li>
                      </ul>
                    </template>
                  </el-form-item>
                  <el-form-item label="字段后显示的文本">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.checkboxForm.follower"></el-input>
                  </el-form-item>
                  <el-form-item label="默认内容">
                    <select class="select_list">
                      <template v-for="items in addModuleType.typeAddData.checkboxForm.items">
                        <option v-if = "items.selected" :label="items.id" :id="items.id" :value="items.value"  selected></option>
                        <option v-else :label="items.id" :id="items.id" :value="items.value"></option>
                      </template>
                    </select>
                  </el-form-item>
                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.checkboxForm.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.checkboxForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.checkboxForm.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.command.file'">
                <el-form style="width:500px;margin:30px auto;" :model="addModuleType.typeAddData.commandFileForm" ref="commandFileForm2" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签"  prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.commandFileForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID"  prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.commandFileForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item label="默认文件管理类型">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.commandFileForm.filter"></el-input>
                    <p class="shuoming">(文件类型通过逗号分隔,例如:*.dat,*.jou)</p>
                  </el-form-item>
                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.commandFileForm.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.commandFileForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.commandFileForm.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.password'">
                <el-form style="width:500px;margin:30px auto;" :model="addModuleType.typeAddData.passwordForm" ref="passwordForm2" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签"  prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.passwordForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID" prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.passwordForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item label="最小字符长度">
                    <el-input-number v-model="addModuleType.typeAddData.passwordForm.minLength" :min="1" :max="100" ></el-input-number>
                  </el-form-item>
                  <el-form-item label="最大字符长度">
                    <el-input-number v-model="addModuleType.typeAddData.passwordForm.maxLength" :min="1" :max="100" ></el-input-number>
                  </el-form-item>

                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.passwordForm.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.passwordForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.passwordForm.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.remote.file'">
                <el-form style="width:500px;margin:30px auto;" :model="addModuleType.typeAddData.remoteFileForm" ref="remoteFileForm2" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签"  prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteFileForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID"  prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteFileForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item label="默认文件管理类型">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteFileForm.filter"></el-input>
                    <p class="shuoming">(文件类型通过逗号分隔,例如:*.dat,*.jou)</p>
                  </el-form-item>
                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.remoteFileForm.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.remoteFileForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.remoteFileForm.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.remotelocate.file'">
                <el-form style="width:500px;margin:30px auto;" :model="addModuleType.typeAddData.remotelocateFileForm" ref="remotelocateFileForm2" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签"  prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remotelocateFileForm.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID" prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remotelocateFileForm.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item label="默认文件管理类型">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remotelocateFileForm.filter"></el-input>
                    <p class="shuoming">(文件类型通过逗号分隔,例如:*.dat,*.jou)</p>
                  </el-form-item>
                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.remotelocateFileForm.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.remotelocateFileForm.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.remotelocateFileForm.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
              <div class="editFormC" v-show="appModule.listType=='cloud.app.option.type.remote.dir'">
                <el-form style="width:500px;margin:30px auto;" :model="addModuleType.typeAddData.remoteDir" ref="remoteDir2" :rules="addModuleType.rules" label-width="150px">
                  <el-form-item label="标签"  prop="label">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteDir.label"></el-input>
                  </el-form-item>
                  <el-form-item label="字段ID" prop="id">
                    <el-input  auto-complete="off" v-model="addModuleType.typeAddData.remoteDir.id"></el-input>
                    <p class="shuoming">(在后台脚本中使用)</p>
                  </el-form-item>
                  <el-form-item label="帮助说明" style="margin:0;">
                    <el-input type="textarea"  :rows="7" v-model="addModuleType.typeAddData.remoteDir.helpText"></el-input>
                    <p class="shuoming">(当鼠标指在字段帮助图标上时显示)</p>
                  </el-form-item>
                  <el-form-item label="是否显示在模板" style="margin:0;">
                    <el-switch v-model="addModuleType.typeAddData.remoteDir.hidden"></el-switch>
                    <p class="shuoming">(字段在提交作业的脚本中仍然使用)</p>
                  </el-form-item>
                  <el-form-item label="是否必填">
                    <el-switch v-model="addModuleType.typeAddData.remoteDir.required"></el-switch>
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeEdit">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary" @click="saveChange">确定</el-button>
        </div>
      </el-dialog>
      <!--module框-->
      <el-dialog title="编辑" id="moduleDialog"  :open="showmodel1()" :visible.sync="moduleVisible" ref="moduleDialog" width="870px" :before-close="closeModuleDialog">
        <div id="editScroll">
          <div>
            <span>应用模板名:</span><span>{{appModule.softId}}</span>&nbsp;
            <span style="padding-left:10px;" :class="appModule.softState === 'state1' ? 'green' : '' || appModule.softState === 'state2' ? 'red' : ''">
                 <i class="el-icon-star-on"></i>{{appModule.softState === 'state1'? $t('nav7_6.table.state1') : ''||appModule.softState === 'state2'? $t('nav7_6.table.state2') : ''}}
            </span>
          </div>
          <el-form ref="form" v-model="softModule" label-width="200px" >
              <el-collapse  v-model="appModule.activeNames">
                <el-collapse-item v-for="(item,index) in softModule" :id="item.id" :name="index" :title="item.info" style="position:relative;">
                  <div v-show="appModule.btnShow" class="btnGroup">
                    <el-button size="mini" icon="el-icon-circle-plus-outline" @click="addSoftList(index);">添加</el-button>
                    <el-button size="mini" icon="el-icon-delete" class="unShow is-disabled" @click="deleList(index)">删除</el-button>
                    <el-button size="mini" icon="el-icon-edit-outline" class="unShow is-disabled" @click="editList">编辑</el-button>
                  </div>
                  <div class="softModule_box">
                    <template v-for="(list,index) in item.items">
                      <template  v-if="list.type=='cloud.app.option.type.label'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label" class="listLabel"  :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <p v-text="list.id" style="margin:0;"></p>
                            <span v-show="list.required==true" class="mi">*</span>
                          </el-form-item>
                        </div>
                      </template>
                      <template v-if="list.type=='cloud.app.option.type.text'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <el-input></el-input>
                            <span v-show="list.required==true" class="mi">*</span>
                            <span class="helptext" :title="list.helpText"  v-text="list.helpText"></span>
                          </el-form-item>
                       </div>
                      </template>
                      <template v-if="list.type=='cloud.app.option.type.list'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item :label="list.label"  class="listLabel"  :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                          <!--<el-select v-model="list.id">
                           <template v-for="(v,index) in list.items">
                              <el-option v-if = "v.selected" :label="v.id" :id="v.id" :value="v.value"  selected></el-option>
                             <el-option v-else :label="v.id" :id="v.id" :value="v.value"></el-option>
                            </template>
                          </el-select>-->
                          <select class="select_list">
                            <template v-for="(v,index) in list.items">
                              <option v-if = "v.selected" :label="v.id" :id="v.id" :value="v.value"  selected></option>
                              <option v-else :label="v.id" :id="v.id" :value="v.value"></option>
                            </template>
                          </select>
                          <span v-show="list.required==true" class="mi">*</span>
                          <span class="helptext" :title="list.helpText"  v-text="list.helpText"></span>
                        </el-form-item>
                        </div>
                      </template>
                      <template v-if="list.type=='cloud.app.option.type.date'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <el-input :value="list.defaultValue" readonly></el-input>
                            <span v-show="list.required==true" class="mi">*</span>
                            <span class="helptext" :title="list.helpText" v-text="list.helpText"></span>
                          </el-form-item>
                        </div>
                      </template>
                      <template  v-if="list.type=='cloud.app.option.type.radio'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <template v-for="(v,index) in list.items">
                              <template v-if="v.selected">
                                <input type="radio" :name="list.id" :id="v.id" checked>
                                <span v-text="v.value"></span>
                              </template>
                              <template v-else>
                                <input type="radio" :name="list.id"  :id="v.id">
                                <span v-text="v.value"></span>
                              </template>
                            </template>
                            <span v-show="list.required==true" class="mi">*</span>
                            <span class="helptext" :title="list.helpText" v-text="list.helpText"></span>
                          </el-form-item>
                        </div>
                      </template>
                      <template  v-if="list.type=='cloud.app.option.type.checkbox'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <div class="el-transfer" style="width:400px;">
                              <div class="el-transfer-panel" style="width:160px;">
                                <p class="el-transfer-panel__header">
                                  <label class="el-checkbox">
                                    <span aria-checked="mixed" class="el-checkbox__input">
                                      <input type="checkbox" @click="selectAll($event)" class="select_all">
                                    </span>
                                    <span class="el-checkbox__label">未有角色</span>
                                  </label>
                                </p>
                                <div class="el-transfer-panel__body" id="noRole">
                                  <div role="group" aria-label="checkbox-group" class="el-checkbox-group el-transfer-panel__list">
                                    <template v-for="(v,index) in list.items">
                                      <template v-if="!v.selected">
                                        <label class="el-checkbox el-transfer-panel__item">
                                          <span aria-checked="mixed" class="el-checkbox__input">
                                            <!--<span class="el-checkbox__inner"></span>-->
                                            <!--<input type="checkbox" class="el-checkbox__original">-->
                                            <input type="checkbox">
                                          </span>
                                          <span class="el-checkbox__label"><span v-text="v.value"></span></span>
                                        </label>
                                      </template>
                                    </template>
                                  </div>
                                </div>
                              </div>
                              <div class="el-transfer__buttons" style="padding:0 10px;">
                                <el-button type="button" style="margin-bottom: 10px;" @click="leftRoleChange($event)" class="left_Btn el-transfer__button">
                                  <span><i class="el-icon-arrow-left" @click="leftRoleChange($event)"></i></span>
                                </el-button>
                                <el-button type="button" @click="rightRoleChange($event)" class="right_Btn el-transfer__button">
                                  <span><i class="el-icon-arrow-right" @click="rightRoleChange($event)"></i></span>
                                </el-button>
                              </div>
                              <div class="el-transfer-panel" style="width:160px;">
                                <p class="el-transfer-panel__header">
                                  <label class="el-checkbox">
                                   <!-- <span aria-checked="mixed" class="el-checkbox__input">
                                      <span class="el-checkbox__inner"></span>
                                      <input type="checkbox" class="el-checkbox__original" value="">
                                    </span>-->
                                    <span aria-checked="mixed" class="el-checkbox__input">
                                      <input type="checkbox" @click="selectAll($event)" class="select_all">
                                    </span>
                                    <span class="el-checkbox__label">已有角色</span>
                                  </label>
                                </p>
                                <div class="el-transfer-panel__body">
                                  <div role="group" aria-label="checkbox-group" class="el-checkbox-group el-transfer-panel__list">
                                    <template v-for="(v,index) in list.items">
                                      <template v-if="v.selected">
                                        <label class="el-checkbox el-transfer-panel__item">
                                          <span aria-checked="mixed" class="el-checkbox__input">
                                            <!--<span class="el-checkbox__inner"></span>-->
                                            <input type="checkbox" >
                                          </span>
                                          <span class="el-checkbox__label"><span v-text="v.value"></span></span>
                                        </label>
                                      </template>
                                    </template>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span v-show="list.required==true" class="mi" style="left:390px;top:130px;">*</span>
                            <span class="helptext" :title="list.helpText" style="top:125px;left:400px;width:60px;" v-text="list.helpText"></span>
                          </el-form-item>
                        </div>
                      </template>
                      <template v-if="list.type=='cloud.app.option.type.password'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <el-input type="password"></el-input>
                            <span v-show="list.required==true" class="mi">*</span>
                            <span class="helptext" :title="list.helpText"  v-text="list.helpText"></span>
                          </el-form-item>
                          <el-form-item  label="确认密码"  class="listLabel"  :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <!--<p class="listP">[ID:{{list.id}}]</p>-->
                            <el-input type="password"></el-input>
                            <!--<span class="helptext" :title="list.helpText"  v-text="list.helpText"></span>-->
                          </el-form-item>
                        </div>
                      </template>
                      <template v-if="list.type=='cloud.app.option.type.command.file'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label"  class="listLabel" style="position: relative;" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                                       :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed">
                              <el-button size="small">{{$t('nav3_1.leftitem_9')}}</el-button>
                            </el-upload>
                            <el-button size="small" style="margin-left:20px;position:absolute;top:5px;left:130px;" @click="ycVisible=true">{{$t('nav3_1.leftitem_10')}}</el-button>
                            <span v-show="list.required==true" class="mi">*</span>
                            <span class="helptext" :title="list.helpText" v-text="list.helpText"></span>
                            <div class="ys_k">
                              <span class="ys_h" name="fileNameSpan">123</span>
                              <span class="ys_k_remove">X</span>
                            </div>
                          </el-form-item>
                        </div>
                      </template>
                      <template v-if="list.type=='cloud.app.option.type.remote.file'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <el-button size="small"  @click="ycVisible=true">{{$t('nav3_1.leftitem_10')}}</el-button>
                            <span v-show="list.required==true" class="mi">*</span>
                            <span class="helptext" :title="list.helpText" v-text="list.helpText"></span>
                          </el-form-item>
                        </div>
                      </template>
                      <template v-if="list.type=='cloud.app.option.type.remotelocate.file'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label"  class="listLabel" style="position: relative;" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"  :on-preview="handlePreview"
                                       :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed">
                              <el-button size="small">{{$t('nav3_1.leftitem_9')}}</el-button>
                            </el-upload>
                            <el-button size="small" style="margin-left:20px;position:absolute;top:5px;left:130px;"  @click="ycVisible=true">{{$t('nav3_1.leftitem_10')}}</el-button>
                            <span v-show="list.required==true" class="mi">*</span>
                            <span class="helptext" :title="list.helpText" v-text="list.helpText"></span>
                          </el-form-item>
                        </div>
                      </template>
                      <template v-if="list.type=='cloud.app.option.type.remote.dir'">
                        <div class="moduleList" @click="ListClick(index,item.id,list.type,list)" :class="{bgList:appModule.listIndex==index && appModule.itemId==item.id}">
                          <el-form-item  :label="list.label"  class="listLabel" :class="[{bgList:appModule.listIndex==index && appModule.itemId==item.id},{noClick:list.hidden==true}]">
                            <p class="listP">[ID:{{list.id}}]</p>
                            <el-button size="small"  @click="ycVisible=true">{{$t('nav3_1.leftitem_10')}}</el-button>
                            <span v-show="list.required==true" class="mi">*</span>
                            <span class="helptext" :title="list.helpText" v-text="list.helpText"></span>
                          </el-form-item>
                        </div>
                      </template>
                    </template>
                  </div>
                </el-collapse-item>
              </el-collapse>
          </el-form>
        </div>
        <div  slot="footer" class="dialog-footer" style="margin-top: 15px;text-align:right;">
          <el-button @click="moduleVisible=false;">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button>{{$t('nav3_1.leftitem_12')}}</el-button>
          <el-button  type="primary">保存</el-button>
        </div>
      </el-dialog>
      <!--远程-->
      <el-dialog  :title="$t('nav4_1.detailInfo.movedialog.title')" :visible.sync="ycVisible" width="880px" :before-close="closedialog3">
        <el-container>
          <ycdialog v-on:newVisible="new_Visible" v-on:ycFile="yc_File"></ycdialog>
          <el-footer class="movefoot" style="height:81px;width:722px;position:absolute;bottom:30px; left: 136px;">
            <div style="width:570px">
              <el-form :model="ycDialog.ycFoot"  label-width="120px" ref="form3">
                <el-form-item :label="$t('nav3_2.move.m_13')" size="small" style="margin-bottom:5px;margin-top:15px;">
                  <el-input v-model="ycDialog.ycFoot.path" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item :label="$t('nav3_2.move.m_14')" size="small" prop="region">
                  <el-select v-model="ycDialog.ycFoot.value" :placeholder="$t('nav3_2.move.m_15')" style="width:100%;">
                    <el-option  v-for="(item, index) in ycDialog.ycFoot.type" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div style="width:100px;">
              <el-button type="primary"  size="small" @click="ycSure()" id="ycSure" style="margin-bottom: 5px;width:80px;">{{$t('nav3_2.dialog.Determine')}}</el-button>
              <el-button size="small" style="margin:0;width:80px;" @click="cleanform3()">{{$t('nav3_2.dialog.cancel')}}</el-button>
            </div>
          </el-footer>
        </el-container>
      </el-dialog>
      <!--新建框-->
      <el-dialog :title="$t('nav4_1.detailInfo.newdialog.title')" :visible.sync="NewVisible" ref="newdialog"  width="480px" :before-close="closeMoveNew">
        <el-form  :model="newdialog" ref="movenewform">
          <el-form-item :label="$t('nav4_1.detailInfo.newdialog.label')" prop="new" :label-width="newdialog.formLabelWidth">
            <el-input v-model="newdialog.new"  auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cleanMoveNew">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
          <el-button type="primary"  @click="moveNewSubmit('movenewform')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <loadfooter style="width: 100%"></loadfooter>
  </el-container>
</template>
<script>
  import  axios from 'axios'
  import Vue from 'vue'
  import  router from '../router/index'
  export default {
    data () {   /*组件的data对象是data()函数不是data*/
      return {
        title: 'RVCP-工业仿真平台',
        tableloading:false, //表格加载动画,
        //dialog弹框显示
        addVisible:false,
        editVisible:false,
        moduleVisible:false,
        ycVisible:false,
        NewVisible:false,
        /*添加框内全局变量*/
        addModuleType:{
          dataType:['文本','输入框','选择日期','下拉列表','单选按钮','穿梭框','可执行文本','输入密码','输入文件','远程文件','远程目录'],
          form2Show:false, //添加框内切换显示
          activeType:0,//添加框内做列表切换index值
          parameterIndex:-1,/*添加到哪一个模块里 大概为:基本参数--应用参数--输入文件*/
          EG:{
            egRadio:1,
            role:{
              roleData:[
                {
                  label:'示例文字1',
                  key:1
                },
                {
                  label:'示例文字2',
                  key:2
                },
                {
                  label:'示例文字3',
                  key:3

                },
              ],
              roleValue:[3],
            },

          },/*示例中的数据,只作演示用*/
          typeAddData: {
            listRadio:'1',
            checkboxRadio:'1',
            listOption:'',
            radioOption:'',
            checkboxOption:'',
            /*cloud.app.option.type.label*/
            labelForm: {
              id:'',
              name:'',
              label:'',
              defaultValue:'',
              required: false,
              hidden: false,
              follower:'',
              helpText:'',
              type: "cloud.app.option.type.label"
            },
            /*cloud.app.option.type.text*/
            textForm: {
              id: '',
              name: '',
              label: '',
              helpText: '',
              hidden: false,
              defaultValue: '',
              required: false,
              follower: "",
              type: "cloud.app.option.type.text",
              regex: "",
              width:20,
            },
            /*cloud.app.option.type.date*/
            dateForm: {
              id:"",
              name:null,
              label:"",
              defaultValue:"",
              required:false,
              hidden:false,
              follower:"",
              helpText:"",
              type:"cloud.app.option.type.date"
            },
            /*cloud.app.option.type.list*/
            listForm: {
              id: "",
              name: null,
              label: "",
              defaultValue: "",
              required: false,
              hidden: false,
              follower: "",
              helpText: "",
              type: "cloud.app.option.type.list",
              items: [
                /*  {"value": "abaqus", "id": "abaqus", "selected": true},
                  {"value": "fluent", "id": "fluent", "selected": false}*/
              ],
              script:null,
            },
            /*cloud.app.option.type.radio*/
            radioForm:{
              id:"",
              name:null,
              label:"",
              defaultValue:"",
              required:false,
              hidden:false,
              follower:"",
              helpText:"",
              type:"cloud.app.option.type.radio",
              items:[
                /* {"value":"444","id":"444","selected":false},
                 {"value":"7777","id":"7777","selected":true}*/
              ]
            },
            /*cloud.app.option.type.checkbox*/
            checkboxForm:{
              id:"",
              name:null,
              label:"",
              defaultValue:"",
              required:false,
              hidden:false,
              follower:"",
              helpText:"",
              type:"cloud.app.option.type.checkbox",
              leftLabel:null,
              rightLabel:null,
              items:[
                /* {"value":"ee","id":"ee","selected":true},
                 {"value":"rr","id":"rr","selected":false},
                 {"value":"tt","id":"tt","selected":false}*/
              ]
            },
            /*cloud.app.option.type.password*/
            passwordForm:{
              id:"",
              name:null,
              label:"",
              defaultValue:"",
              required:false,
              hidden:false,
              follower:"",
              helpText:"",
              type:"cloud.app.option.type.password",
              info:null,
              minLength:6,
              maxLength:12,
            },
            /*cloud.app.option.type.command.file*/
            commandFileForm: {
              id:"",
              name:null,
              label:"",
              defaultValue:"",
              required:false,
              hidden:false,
              follower:"",
              helpText:"",
              type:"cloud.app.option.type.command.file",
              filter:null,
              width:null,
              height:null
            },
            /*cloud.app.option.type. remote.file*/
            remoteFileForm:{
              id:"",
              name:null,
              label:"",
              defaultValue:"",
              required:false,
              hidden:false,
              follower:"",
              helpText:"",
              type:"cloud.app.option.type.remote.file",
              filter:null,
              width:null,
              height:null
            },
            /*cloud.app.option.type.remotelocate.file*/
            remotelocateFileForm:{
              id:"",
              name:null,
              label:"",
              defaultValue:"",
              required:false,
              hidden:false,
              follower:"",
              helpText:"",
              type:"cloud.app.option.type.remotelocate.file",
              filter:null,
              width:null,
              height:null
            },
            /*cloud.app.option.type.remote.dir*/
            remoteDir:{
              id:"",
              name:null,
              label:"",
              defaultValue:"",
              required:false,
              hidden:false,
              follower:"",
              helpText:"",
              type:"cloud.app.option.type.remote.dir",
              filter:null,
            }
          },/*数据临时存储*/
          rules: {
            id: [
              { required: true,message:"该项为必填项",trigger: 'blur'},
            ],
            label:[
              {type:"string",required: true, message:"该项为必填项",trigger:'blur'},
            ],
          },/*添加框内表单字段验证*/
        },
        appModule:{
          /*添加左列11中类型*/

          /*
             * moduleType添加type类型
             * 共11中类型
             * 文本:cloud.app.option.type.text
             * 下拉:cloud.app.option.type.list
         */
          moduleType:'',
          activeNames:[],/*用于折叠面板展开*/
          btnShow:false,   //编辑框内按钮组显示,查看不显示判断
          softId:'',  /*编辑的模板名称和状态*/
          softState:'',
          itemId:'',  /*模板中分类id名 基本参数--应用参数--输入文件*/
          listIndex:-1,/*模板中点击条数的index值*/
          listType:'',/*模板中点击条数的type类型*/
          listData:{},/*单条数据临时储存*/
        },
        appTable:[
          /*{
            id:'ABAQUS',
            status:'state1',
          },
          {
            id:'ANSYS',
            status:'state2',
          },
          {
            id:'CFX',
            status:'state1',
          },*/
        ],/*应用模板列表*/
        multipleSelection:[],/*应用模板列表选中值*/
        fileList:[],/*[
          /*{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }],*/
        softModule:[],/*每个模板数据*/
        rules:[

        ],/*密码和确认密码验证*/
        ycDialog:{
          ycFoot:{
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
          yc_select:[],
        },/*移动和复制*/
        newdialog:{
          new:'',
          formLabelWidth:'120px'
        },/*新建框*/
      }
    },
    created: function () {
      document.title = this.title;
    },
    computed:{
      changeLanguage: function () {
        return  Vue.config.lang
      },
    },
    mounted(){
      $(".list-item .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 70px - 100px)', //可滚动区域高度
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
      this.getPagedata();
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
      /*-----------------------------------弹框滚动条--------------------------------------*/
      showmodel1:function(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $("#moduleDialog .el-dialog__body").slimScroll({
            width: 'calc(100%)', //可滚动区域宽度
            height:'calc(100vh - 15vh - 50px - 50px - 65px - 30px)', //可滚动区域高度
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
          });
        }, 1);
      },/*编辑模板的滚动条*/
      showmodel2:function(){

        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".addFormScroll").slimScroll({
            width: 'calc(100%)', //可滚动区域宽度
            height:'calc(100vh - 15vh - 50px - 50px - 65px - 80px)', //可滚动区域高度
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
          });
        }, 1);
      },
      /*-------------------------------上传函数---------------------------------------------*/
      handleRemove(file) {
        console.log(file);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files) {
        // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/');
        return urlStrArr[urlStrArr.length - 1]
      },
      refreshTable(){
        this.getPagedata();
      },
      rowClass: function (row, index) {
        return { "cursor": "pointer" }
      },/*列表每行添加小手*/
      changeFun(val) {
        this.multipleSelection = val;
      },/*复选框状态改变*/
      /*--------------------------------模板初始表格数据-------------------------------------*/
      getPagedata:function () {
        var _this=this;
        axios.get(path + '/app.json').then(function (response) {
          var result=response.data;
          if(result.status==0){
            _this.$message.error(_this.$t('rvcpinfo.getListError'));
            /* thisVue.$message.error("获取列表失败");*/
          }else if(result.status==1) {
            var data = result.data;
            var appData=[];
            for(var i=0;i<data.length;i++){
              var obj={};
              obj.id=data[i].id;
              if(data[i].status=='PUBLISHED'){
                obj.status='state1'
              }else{
                obj.status='state2'
              }
              appData[i]=obj;
            }
            _this.appTable=appData;
          }
        }).catch(function (error) {
          console.log(error);
        });

      },//根据条件获取图表数据
      /*-------------------------------模板详细列表项数据-------------------------------------*/
      LookView:function(){
        this.appModule.btnShow=false;
        /*console.log(this.multipleSelection);*/
        this.softwareData();
      },/*查看软件*/
      editView:function(){
        this.appModule.btnShow=true;
        this.softwareData();
      },/*编辑软件*/
      softwareData:function(){
        if(this.multipleSelection.length==1){
          var _this=this;
          var softId=this.multipleSelection[0].id;
          // console.log(softId);
          this.appModule.softId=this.multipleSelection[0].id;
          this.appModule.softState=this.multipleSelection[0].status;
          axios.get(path + '/'+softId+'.json').then(function (response) {
            var result=response.data;
            if(result.status==0){
              _this.$message.error(_this.$t('rvcpinfo.getListError'));
              /* thisVue.$message.error("获取列表失败");*/
            }else if(result.status==1) {
              var data = result.data.de.options;
              /*console.log(data);*/
              _this.softModule=data;

              _this.appModule.activeNames=[];/*用于折叠面板展开*/
              for(var i=0;i<data.length;i++){
                _this.appModule.activeNames[i]=i;
              }
              _this.moduleVisible=true;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }else{
          return;
        }
      },/*软件数据*/
      /*-----------------------------添加和编辑数据逻辑---------------------------------------*/
      clickType:function(index){
        this.addModuleType.activeType=index;
      },/*添加框点击左侧目录切换*/
      addSoftList:function(parameterIndex){
        this.addVisible=true;
        this.addModuleType.activeType=0;
        this.addModuleType.form2Show=false;
        this.addModuleType.parameterIndex=parameterIndex;
        // console.log('index:'+parameterIndex);
        /*清空数据*/
        this.cleanAddForm();
      },/*点击添加调取添加框*/
      prevEditEg:function(){
        this.addModuleType.form2Show=false;
        switch(this.appModule.moduleType){
          case 'cloud.app.option.type.label': this.$refs['labelForm'].clearValidate(); break;
          case 'cloud.app.option.type.text' : this.$refs['textForm'].clearValidate(); break;
          case 'cloud.app.option.type.date' : this.$refs['dateForm'].clearValidate(); break;
          case 'cloud.app.option.type.list' : this.$refs['listForm'].clearValidate(); break;
          case 'cloud.app.option.type.radio' : this.$refs['radioForm'].clearValidate(); break;
          case 'cloud.app.option.type.checkbox' : this.$refs['checkboxForm'].clearValidate(); break;
          case 'cloud.app.option.type.command.file' : this.$refs['commandFileForm'].clearValidate(); break;
          case 'cloud.app.option.type.password' : this.$refs['passwordForm'].clearValidate(); break;
          case 'cloud.app.option.type.remote.file' :this.$refs['remoteFileForm'].clearValidate(); break;
          case 'cloud.app.option.type.remotelocate.file' :this.$refs['remotelocateFileForm'].clearValidate(); break;
          case 'cloud.app.option.type.remote.dir' : this.$refs['remoteDir'].clearValidate(); break;

        }

      },/*点击上一步*/
      nextEditForm:function(){
        var _this=this;
        this.addModuleType.form2Show=true;
        /*this.appModule.moduleType保存当前表单类型*/
        switch(_this.addModuleType.activeType){
          case 0 : _this.appModule.moduleType='cloud.app.option.type.label';break;
          case 1 : _this.appModule.moduleType='cloud.app.option.type.text';break;
          case 2 : _this.appModule.moduleType='cloud.app.option.type.date';break;
          case 3 : _this.appModule.moduleType='cloud.app.option.type.list';break;
          case 4 : _this.appModule.moduleType='cloud.app.option.type.radio';break;
          case 5 : _this.appModule.moduleType='cloud.app.option.type.checkbox';break;
          case 6 : _this.appModule.moduleType='cloud.app.option.type.command.file';break;
          case 7 : _this.appModule.moduleType='cloud.app.option.type.password';break;
          case 8 : _this.appModule.moduleType='cloud.app.option.type.remote.file';break;
          case 9 : _this.appModule.moduleType='cloud.app.option.type.remotelocate.file';break;
          case 10 : _this.appModule.moduleType='cloud.app.option.type.remote.dir';break;

        }
      },/*点击下一步*/
      sureSelected:function(cls,i,type){
        var dataItems=[];
        var sel='';
        if(type=='cloud.app.option.type.list'){
          sel=$("."+cls).eq(i).find('select').val();
          dataItems=this.addModuleType.typeAddData.listForm.items;
        }else if(type=='cloud.app.option.type.checkbox'){
          sel=$("."+cls).eq(i).find('select').val();
          dataItems=this.addModuleType.typeAddData.checkboxForm.items;
        }else if(type=='cloud.app.option.type.radio'){
          sel=$("."+cls).eq(i).find('select').val();
          dataItems=this.addModuleType.typeAddData.radioForm.items;
        }
        for(var i=0;i<dataItems.length;i++){
          if(sel==dataItems[i].value){
            dataItems[i].selected=true;
          }else{
            dataItems[i].selected=false;
          }
        }
        return;
      },/*添加中获取select选中并处理*/
      addList:function(){
        var _this=this;
        this.$nextTick(function (){
          /*this.addModuleType.parameterIndex>添加到哪一个模块里 大概为:基本参数--应用参数--输入文件*/
            if(_this.addModuleType.parameterIndex>-1){
              /* console.log(_this.appModule.moduleType);*/
              _this.sureSelected('addFormC',_this.addModuleType.activeType,this.appModule.moduleType);/*获取select选中*/
              /*数据添加到softModule中 */
              switch(_this.appModule.moduleType){
                case 'cloud.app.option.type.label':this._validate('labelForm');break;
                case 'cloud.app.option.type.text':this._validate('textForm');break;
                case 'cloud.app.option.type.date':this._validate('dateForm');break;
                case 'cloud.app.option.type.list':this._validate('listForm');break;
                case 'cloud.app.option.type.radio':this._validate('radioForm');break;
                case 'cloud.app.option.type.checkbox':this._validate('checkboxForm');break;
                case 'cloud.app.option.type.password':this._validate('passwordForm');break;
                case 'cloud.app.option.type.command.file':this._validate('commandFileForm');break;
                case 'cloud.app.option.type.remote.file':this._validate('remoteFileForm');break;
                case 'cloud.app.option.type.romotelocate.file':this._validate('remotelocateFileForm');break;
                case 'cloud.app.option.type.remote.dir':this._validate('remoteDir');break;
              }
            }
          });
      },/*点击保存添加一条数据*/
      _validate:function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _form=this.addModuleType.typeAddData[formName];
            this.softModule[this.addModuleType.parameterIndex].items.push(_form);
            this.addVisible=false;
            /*清空数据*/
            this.cleanAddForm();
          }
        });
      },
      _validateEdit:function(formName){
        var _this=this;
        var listIndex=_this.appModule.listIndex;
        var i_s="";
        for(var i=0;i<_this.softModule.length;i++){
          if(_this.softModule[i].id==_this.appModule.itemId){
            i_s=i;
          }
        }
        var activeIndex='';
        for(var i=0;i<$(".editFormC").length;i++){
          if($(".editFormC").eq(i).css("display")=='block'){
            activeIndex=i
          }
        }
        _this.sureSelected('editFormC',activeIndex,this.appModule.listType);/*获取select选中*/
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _formName=formName.substr(0,formName.length-1);
            var _form=_this.addModuleType.typeAddData[_formName];
            _this.softModule[i_s].items[listIndex]=_form;
            _this.editVisible=false;
          }
        });
      },
      editList:function(){
        var _this=this;
        this.editVisible=true;
      },/*点击编辑调取修改框*/
      ListClick:function(index,id,type,data_s){
        var _this=this;
        this.appModule.listIndex=index;/*每条数据的index值*/
        this.appModule.itemId=id;/*模块id 基本参数--应用参数--输入文件等*/
        this.appModule.listType=type;/*每条的type值*/
       // 深度拷贝数据  取消双向绑定---解决取消也会修改数据问题
        var obj=JSON.parse(JSON.stringify(data_s));
        this.appModule.listData=obj;
        var _data= this.appModule.listData;
        switch(this.appModule.listType){
          case 'cloud.app.option.type.label': _this.addModuleType.typeAddData.labelForm=_data; break;
          case 'cloud.app.option.type.text': _this.addModuleType.typeAddData.textForm=_data; break;
          case 'cloud.app.option.type.date': _this.addModuleType.typeAddData.dateForm=_data; break;
          case 'cloud.app.option.type.list':_this.addModuleType.typeAddData.listForm=_data; break;
          case 'cloud.app.option.type.radio': _this.addModuleType.typeAddData.radioForm=_data; break;
          case 'cloud.app.option.type.checkbox': _this.addModuleType.typeAddData.checkboxForm=_data; break;
          case 'cloud.app.option.type.password': _this.addModuleType.typeAddData.passwordForm=_data; break;
          case 'cloud.app.option.type.command.file':_this.addModuleType.typeAddData.commandFileForm=_data; break;
          case 'cloud.app.option.type.remote.file': _this.addModuleType.typeAddData.remoteFileForm=_data; break;
          case 'cloud.app.option.type.remotelocate.file': _this.addModuleType.typeAddData.remotelocateFileForm=_data; break;
          case 'cloud.app.option.type.remote.dir':_this.addModuleType.typeAddData.remoteDir=_data; break;
        }
        this.$nextTick(function (){
          $(".btnGroup").find('.unShow').addClass("is-disabled");
          if($(".bgList").length>1){
            $('.bgList').parents('#'+id).find('button').removeClass('is-disabled');
          }
        });


      },/*点击编辑模板每一条显示删除和编辑按钮*/
      saveChange:function(){
            var _this=this;
            var listIndex=this.appModule.listIndex;
            var i_s="";
            for(var i=0;i<_this.softModule.length;i++){
              if(_this.softModule[i].id==this.appModule.itemId){
                i_s=i;
              }
            }
            var activeIndex='';
            for(var i=0;i<$(".editFormC").length;i++){
              if($(".editFormC").eq(i).css("display")=='block'){
                activeIndex=i
              }
            }
            _this.sureSelected('editFormC',activeIndex,this.appModule.listType);/*获取select选中*/

            switch(this.appModule.listType){
              case 'cloud.app.option.type.label':this._validateEdit('labelForm2'); break;
               /* _this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.labelForm;*/
              case 'cloud.app.option.type.text': this._validateEdit('textForm2'); break;
              // _this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.textForm;
              case 'cloud.app.option.type.date': this._validateEdit('dateForm2'); break;
              // _this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.dateForm;
              case 'cloud.app.option.type.list': this._validateEdit('listForm2'); break;
                // _this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.listForm ;break;
              case 'cloud.app.option.type.radio': this._validateEdit('radioForm2'); break;
                //_this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.radioForm ;break;
              case 'cloud.app.option.type.checkbox': this._validateEdit('checkboxForm2'); break;
                //_this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.checkboxForm ;break;
              case 'cloud.app.option.type.password': this._validateEdit('passwordForm2'); break;
                //_this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.passwordForm ;break;
              case 'cloud.app.option.type.command.file': this._validateEdit('commandFileForm2'); break;
                //_this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.commandFileForm ;break;
              case 'cloud.app.option.type.remote.file': this._validateEdit('remoteFileForm2'); break;
                //_this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.remoteFileForm ;break;
              case 'cloud.app.option.type.romotelocate.file':this._validateEdit('remotelocateFileForm2'); break;
                //_this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.remotelocateFileForm ;break;
              case 'cloud.app.option.type.remote.dir': this._validateEdit('remoteDir2'); break;
                //_this.softModule[i_s].items[listIndex]=_this.addModuleType.typeAddData.remoteDir ;break;
            }
            //this.editVisible=false;      /*关闭弹框*/
      },/*保存修改*/
      deleList:function(index){
        var listIndex=this.appModule.listIndex;
        if(listIndex>=0){
          this.softModule[index].items.splice(listIndex,1);
        }
        this.appModule.listIndex=-1;
        $(".btnGroup").find('.unShow').addClass("is-disabled");

      },/*删除数据*/
      leftRoleChange:function(event){
        var _this=this;
        var el_inputs='';
        if(event.target.className=='el-icon-arrow-left'){
          el_inputs=$(event.target).parents('.el-transfer__buttons').next().find('.el-transfer-panel__body').find("input[type='checkbox']:checked");
        }else{
          el_inputs=$(event.target).parent().next().find('.el-transfer-panel__body').find("input[type='checkbox']:checked");
        }
        // var yesRole= $("#yesRole input[type='checkbox']:checked");
        var yesRole=el_inputs;
        var listIndex=this.appModule.listIndex;
        var itemId=this.appModule.itemId;
        var checkItems=[];
        var i_s='';
        for(var i=0;i<_this.softModule.length;i++){
          if(_this.softModule[i].id==itemId){
            checkItems=_this.softModule[i].items[listIndex].items;
            i_s=i;
          }
        }
        if(yesRole.length>0){
          var items=[];
            for(var k=0;k<checkItems.length;k++){
              var obj={};
              for(var i=0;i<yesRole.length;i++){
                var optionValue=yesRole.eq(i).parent().next().children().text();
              if(optionValue==checkItems[k].value){
                obj.value=yesRole.eq(i).parent().next().children().text();
                obj.id=yesRole.eq(i).parent().next().children().text();
                obj.selected=false;
                break;
              }else{
                  obj.value=checkItems[k].value;
                  obj.id=checkItems[k].value;
                  obj.selected=checkItems[k].selected;
                }
            }
            items[k]=obj;
          }
          _this.softModule[i_s].items[listIndex].items=items;
          $(".select_all").prop("checked",false);
        }
      },/*角色转换*/
      rightRoleChange:function(event){
        var _this=this;
        var el_inputs='';
        if(event.target.className=='el-icon-arrow-right'){
          el_inputs=$(event.target).parents('.el-transfer__buttons').prev().find('.el-transfer-panel__body').find("input[type='checkbox']:checked");
        }else{
          el_inputs=$(event.target).parent().prev().find('.el-transfer-panel__body').find("input[type='checkbox']:checked");
        }
        // console.log(el_inputs.length);
        var noRole=el_inputs;

        // var noRole= $("#noRole input[type='checkbox']:checked");
        var listIndex=this.appModule.listIndex;
        var itemId=this.appModule.itemId;
        var checkItems=[];
        var i_s='';
        for(var i=0;i<_this.softModule.length;i++){
          if(_this.softModule[i].id==itemId){
            checkItems=_this.softModule[i].items[listIndex].items;
            i_s=i;
          }
        }
        if(noRole.length>0){
          var items=[];
          for(var k=0;k<checkItems.length;k++){
            var obj={};
            for(var i=0;i<noRole.length;i++){
              var optionValue=noRole.eq(i).parent().next().children().text();
              if(optionValue==checkItems[k].value){
                obj.value=noRole.eq(i).parent().next().children().text();
                obj.id=noRole.eq(i).parent().next().children().text();
                obj.selected=true;
                break;
              }else{
                obj.value=checkItems[k].value;
                obj.id=checkItems[k].value;
                obj.selected=checkItems[k].selected;
              }
            }
            items[k]=obj;
          }
          _this.softModule[i_s].items[listIndex].items=items;
         $(".select_all").prop("checked",false);
        }
      },/*角色转换*/
      selectAll:function(event){
        if(event.target.checked==true){
          $(event.target).parents('.el-transfer-panel__header').next().find("input[type='checkbox']").prop("checked",true);
        }else{
          $(event.target).parents('.el-transfer-panel__header').next().find("input[type='checkbox']").prop("checked",false);
        }
      },/*角色全选*/
    /*-----------------------------------添加删除下拉-----------------------------------------*/
      addSelect:function(){
        if(this.addModuleType.typeAddData.listOption!='') {
          var obj = {};
          obj.id = this.addModuleType.typeAddData.listOption;
          obj.value = this.addModuleType.typeAddData.listOption;
          obj.selected=false;
          var listForm=this.addModuleType.typeAddData.listForm.items;
          for(var i=0;i<listForm.length;i++){
            if(obj.value==listForm[i].value){
              return;
            }
          }
          this.addModuleType.typeAddData.listForm.items.push(obj);
          this.addModuleType.typeAddData.listOption='';
        }

      },/*添加中下拉选项*/
      delListOption:function(list){
        // this.$nextTick(function (){
          this.addModuleType.typeAddData.listForm.items.splice(list,1);
        // });
      },/*删除下拉选项*/
      addRadioSelect:function(){
        if(this.addModuleType.typeAddData.radioOption!='') {
          var obj = {};
          obj.id = this.addModuleType.typeAddData.radioOption;
          obj.value = this.addModuleType.typeAddData.radioOption;
          obj.selected=false;
          var radioForm=this.addModuleType.typeAddData.radioForm.items;
          for(var i=0;i<radioForm.length;i++){
            if(obj.value==radioForm[i].value){
              return;
            }
          }
          this.addModuleType.typeAddData.radioForm.items.push(obj);
          this.addModuleType.typeAddData.radioOption='';
        }

      },/*添加中单选下拉选项*/
      delRadioOption:function(list){
        // this.$nextTick(function (){
        this.addModuleType.typeAddData.radioForm.items.splice(list,1);
        // });
      },/*删除单选下拉选项*/
      addCheckboxSelect:function(){
        if(this.addModuleType.typeAddData.checkboxOption!='') {
          var obj = {};
          obj.id = this.addModuleType.typeAddData.checkboxOption;
          obj.value = this.addModuleType.typeAddData.checkboxOption;
          obj.selected=false;
          var checkboxForm=this.addModuleType.typeAddData.checkboxForm.items;
          for(var i=0;i<checkboxForm.length;i++){
            if(obj.value==checkboxForm[i].value){
              return;
            }
          }
          this.addModuleType.typeAddData.checkboxForm.items.push(obj);
          this.addModuleType.typeAddData.checkboxOption='';
        }

      },/*添加中复选下拉选项*/
      delCheckboxOption:function(list){
        // this.$nextTick(function (){
        this.addModuleType.typeAddData.checkboxForm.items.splice(list,1);
        // });
      },/*删除复选下拉选项*/
      /*-------------------------------------------远程---------------------------------------*/
      new_Visible:function(){
        this.NewVisible=true;
      },/*调用新建*/
      moveNewSubmit:function(form){
        this.NewVisible=false;
      },/*移动和复制新建*/
      yc_File:function(data){
        /*
         * 判断this.appModule.listType=='cloud.app.option.type.remote.dir'  远程目录
         * 只可选择目录文件,不可选择文件且不能选择多项
         * 判断this.appModule.listType=='cloud.app.option.type.remote.file'输出文件
         * 判断this.appModule.listType==cloud.app.option.type.remotelocate.file 输入文件
         * 只可选择文件,不能选择文件夹 且不能多选
         *  wll
	       * */
        this.ycDialog.yc_select=data;
        var yc_select=data;
        if(this.appModule.listType=='cloud.app.option.type.remote.dir'){
          if(yc_select.length>1){
            $("#ycSure").addClass("btnDisabled");
          }else if(yc_select.length==1){
            if(yc_select[0].nofile==true){
              $("#ycSure").removeClass("btnDisabled");
            }else{
              $("#ycSure").addClass("btnDisabled");
            }
          }else{
            $("#ycSure").removeClass("btnDisabled");
          }
        }else{
          if(yc_select.length>1){
            $("#ycSure").addClass("btnDisabled");
          }else if(yc_select.length==1){
            if(yc_select[0].nofile==false){
              this.ycDialog.ycFoot.path='';
              $("#ycSure").removeClass("btnDisabled");
              this.ycDialog.ycFoot.path=yc_select[0].path;
            }else{
              $("#ycSure").addClass("btnDisabled");
            }
          }else{
            $("#ycSure").removeClass("btnDisabled");
            this.ycDialog.ycFoot.path='';
          }
        }
      },
      ycSure:function(){
        console.log(this.ycDialog.yc_select);
        this.ycProgress();
      },
      ycProgress:function(){
        var list=this.ycDialog.yc_select;
        var html='';
        for (var i = 0; i < list.length; i++) {
          html= '<div class="ys_k" title="'+ list[i].path+'">' + '<span class="ys_h" name="fileNameSpan">' + decodeURI(list[i].path) + '</span>'
            + '<span class="ys_k_remove"' +
            'onclick="ysRemove(this);">X</span></div>';
        }
        console.log(this.appModule.listIndex);
        console.log($(".moduleList").eq(this.appModule.listIndex).find('.el-form-item__content').html());
        $(html).appendTo($(".moduleList").eq(this.appModule.listIndex).find('.el-form-item__content'));
        this.ycVisible=false;
      },
      /*------------------------------------------清空----------------------------------------*/
      cleanform(){
        this.$refs['form'].resetFields();
        this.addVisible = false;
        this.appModule.listIndex=-1;
      },//清除表单数据
      closedialog(done){
        this.cleanform();
        done();
      },//关闭对话框回调
      closeEdit(){
        this.editVisible = false;
        this.appModule.listIndex=-1;/*取消选中的条*/
        $(".btnGroup").find('.unShow').addClass("is-disabled");/*编辑和删除按钮不可点*/
      },/*关闭编辑框,并清空*/
      closeEditDialog(done){
        this.closeEdit();
        done();
      },//关闭对话框回调
      closeModuleDialog(done){
        this.moduleVisible = false;
        done();
      },//关闭对话框回调
      cleanform3(){
        this.$refs['form3'].resetFields();
        this.ycVisible = false;
      },//清除表单数据
      closedialog3(done){
        this.cleanform3();
        done();
      },//关闭对话框回调
      cleanAddForm(){
        this.addModuleType.typeAddData.labelForm={
          id:'',
          name:'',
          label:'',
          defaultValue:'',
          required:'',
          hidden:'',
          follower:'',
          helpText:'',
          type: "cloud.app.option.type.label"
        };
        this.addModuleType.typeAddData.textForm={
          id: '',
          name: '',
          label: '',
          helpText: '',
          hidden: false,
          defaultValue: '',
          required: false,
          follower: "",
          type: "cloud.app.option.type.text",
          regex: "",
          width: 20,
        };
        this.addModuleType.typeAddData.dateForm={
          id:"",
          name:'',
          label:"",
          defaultValue:"",
          required:false,
          hidden:false,
          follower:"",
          helpText:"",
          type:"cloud.app.option.type.date"
        };
        this.addModuleType.typeAddData.listForm={
          id: "",
          name: '',
          label: "",
          defaultValue: "",
          required: false,
          hidden: false,
          follower: "",
          helpText: "",
          type: "cloud.app.option.type.list",
          items: [
            /*  {"value": "abaqus", "id": "abaqus", "selected": true},
              {"value": "fluent", "id": "fluent", "selected": false}*/
          ],
          script:''
        };
        this.addModuleType.typeAddData.radioForm={
          id:"",
          name:'',
          label:"",
          defaultValue:"",
          required:false,
          hidden:false,
          follower:"",
          helpText:"",
          type:"cloud.app.option.type.radio",
          items:[
            /* {"value":"444","id":"444","selected":false},
             {"value":"7777","id":"7777","selected":true}*/
          ]
        };
        this.addModuleType.typeAddData.checkboxForm={
          id:"",
          name:'',
          label:"",
          defaultValue:"",
          required:false,
          hidden:false,
          follower:"",
          helpText:"",
          type:"cloud.app.option.type.checkbox",
          leftLabel:'',
          rightLabel:'',
          items:[
            /* {"value":"ee","id":"ee","selected":true},
             {"value":"rr","id":"rr","selected":false},
             {"value":"tt","id":"tt","selected":false}*/
          ]
        };
        this.addModuleType.typeAddData.passwordForm={
          id:"",
          name:'',
          label:"",
          defaultValue:"",
          required:false,
          hidden:false,
          follower:"",
          helpText:"",
          type:"cloud.app.option.type.password",
          info:'',
          minLength:0,
          maxLength:0,
        };
        this.addModuleType.typeAddData.commandFileForm={
          id:"",
          name:'',
          label:"",
          defaultValue:"",
          required:false,
          hidden:false,
          follower:"",
          helpText:"",
          type:"cloud.app.option.type.command.file",
          filter:'',
          width:'',
          height:''
        };
        this.addModuleType.typeAddData.remoteFileForm={
          id:"",
          name:'',
          label:"",
          defaultValue:"",
          required:false,
          hidden:false,
          follower:"",
          helpText:"",
          type:"cloud.app.option.type.remote.file",
          filter:'',
          width:'',
          height:''
        };
        this.addModuleType.typeAddData.remotelocateFileForm={
          id:"",
          name:'',
          label:"",
          defaultValue:"",
          required:false,
          hidden:false,
          follower:"",
          helpText:"",
          type:"cloud.app.option.type.remotelocate.file",
          filter:'',
          width:'',
          height:''
        };
        this.addModuleType.typeAddData.remoteDir={
          id:"",
          name:'',
          label:"",
          defaultValue:"",
          required:false,
          hidden:false,
          follower:"",
          helpText:"",
          type:"cloud.app.option.type.remote.dir",
          filter:'',
        };
      },/*清空所有添加的表单*/
      moveDel:function(){
        if(this.detailInfo.moveDialog.moveSelected.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.detailInfo.moveDialog.moveSelected);
        }
      },/*删除移动*/
      cleanMoveNew:function(){
        this.$refs['movenewform'].resetFields();
        this.NewVisible = false
      },/*清除新建表单数据*/
      closeMoveNew:function(done){
        this.cleanMoveNew();
        done();
      },/*关闭新建表单数据*/
      i18nChart : function () {

      },//国际化chart
    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog .el-input,.el-dialog .el-select {width:280px;}

  .green{
    color:#2cc362;
  }
  .red{
    color:#f96a6a;
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
  .list-item{
    height:calc(100vh - 60px - 50px - 70px);
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
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
  .table_header span{
    font-weight:500;
  }
  .form_content{
    width:100%;
    background:#ffffff;
  }
  .form1Show{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .form2Show{
    width:calc(100% - 40px);
    /*height:508px;*/
    height:calc(100vh - 15vh - 50px - 50px - 65px - 80px);
    border: #d7d7d7 1px solid;
    z-index: 55!important;
    position:absolute;
    top:49px;left:0;
    background: #ffffff;
    margin:30px 20px;
  }
  .greenFont{
    color:#3abb53;
  }
  /*添加框中样式*/
  ul.leftUl{
    width:138px;
    height:calc(100vh - 15vh - 50px - 50px - 65px - 80px);
    /*height:508px;*/
    border: #d7d7d7 1px solid;
    border-right:0;
  }
  ul.leftUl .typeList{
    line-height:40px;
    cursor:pointer;
    padding:0 10px;
  }
  .rightContent{
    width:calc(100% - 140px);
    /*height:508px;*/
    height:calc(100vh - 15vh - 50px - 50px - 65px - 80px);
    border: #d7d7d7 1px solid;
    padding:0 20px;
  }
  .EGbox{
    width:100%;height:160px;
    border: #d7d7d7 1px solid;
    border-radius:4px;
    background:#ffffff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .select_list{
    width: 280px;
    height: 40px;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    background-color: #fff;
    /* box-sizing: border-box; */
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
  }/*下拉列表样式*/
.shuoming{
  margin:0;
  line-height:22px
}
.listUl li{
  position:relative;
}
.addListLi{
  border: 1px solid #d8d8d8;
  width: 200px;
  /*border-radius: 4px;*/
  padding: 0 10px;
  box-sizing: border-box;

  /*margin-bottom:10px;*/
}
.el-btn{
  position: absolute;
  top: 0;left: 210px;
}
  .form_content textarea{

  }
  /*模板框*/
  .softModule_box{
    border:1px solid #d8d8d8;
    padding-top:22px;
  }
  .btnGroup{
    position:absolute;
    top:10px;
    right:0;
  }
  .bgList{
    background:#d8d8d8;
  }
  .listLabel{
    width:500px;
    margin:0 auto 22px;
    position: relative;
  }
  .listP{
    position: absolute;
    top:20px;left:-200px;
    margin:0;
    line-height:22px;
  }
  button.is-disabled{
    pointer-events:none;
  }
  .helptext{
    position:absolute;
    left:295px;top:0;
    width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listLabel .upload-demo{display:inline-block;}
  .listLabel .el-button--small, .el-button--small.is-round{
    padding:9px 30px;
  }
  .noClick{
    pointer-events: none;
    opacity:.5;
  }
  .mi{
    color: #ff0000;
    font-size: 20px;
    position: absolute;
    top: 4px;left: 285px;
    display: block;
  }
  /*ycdialog*/

  .movefoot{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border:1px solid #e6ebf5;
    padding:0;
  }
  .btnDisabled{
    pointer-events: none;
    opacity: .5;
  }
  /*ycProgress*/
  .ys_k{
    display: block;
    overflow:hidden;
    position:relative;
    margin:5px 0;
    padding:0 5px;
    height:16px;width:250px;
    line-height:16px;
    color: #555;
    font-size:12px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  }
  .ys_k:hover{
    border:1px solid #e04908;
  }
  .ys_k:hover .ys_k_remove{
    display:block;
  }
  .ys_k .ys_k_remove{
    display:none;
    font-size: 12px !important;
    width: 10px;
    position: absolute;
    right: 3px;
    top: 0px;
    color: #ff0000;
    cursor:pointer;
  }
</style>
<style>
  .rightContent .el-transfer-panel{width:168px;}
  .form_content .el-textarea__inner{
    width:280px;
    resize:none;
  }
  #moduleDialog .el-form-item__label{
    text-align:left;
    line-height:22px;
  }
  #moduleDialog .el-collapse-item__arrow{
    float:left;
  }
  #moduleDialog .el-dialog__body{
    box-sizing: border-box;
  }
  #moduleDialog .el-transfer__button{
    display: block;
    margin: 0 auto;
    padding: 10px;
    border-radius: 50%;
    background-color: #f5f7fa;
    color:#5a5e66;
    font-size: 0;
  }
  #moduleDialog .el-transfer__button_l.is-disabled{
    border: 1px solid #d8dce5;
    background-color: #f5f7fa;
    color: #b4bccc;
  }

</style>
