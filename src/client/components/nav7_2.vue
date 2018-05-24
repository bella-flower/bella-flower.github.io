<template>
    <el-container class="main nav7_2">
        <div class="content">
          <div class="header">
            <div>{{$t('nav7_2.title')}}</div>
            <div class="rightbtn">
              <el-button  size="small" icon="el-icon-refresh" style="margin-right: 5px;">{{$t('nav1_3.buttonGroup.refreshBtn')}}</el-button>
              <el-button  size="small" icon="el-icon-circle-plus-outline" @click="dialogFormVisible=true" style="margin-right: 5px;">{{$t('nav2_1.buttonGroup.addBtn')}}</el-button>
              <el-button icon="el-icon-delete" plain size="small" @click="del()" style="margin-right: 5px;">{{$t('nav2_1.buttonGroup.deleteBtn')}}</el-button>
              <el-button  size="small" icon="el-icon-setting" @click="arreVisible=true" style="margin-right: 5px;">{{$t('nav7_2.buttonGroup.btn_1')}}</el-button>
              <el-button  size="small" icon="el-icon-edit" @click="setPassword()" style="margin-right: 5px;">{{$t('nav7_2.buttonGroup.btn_2')}}</el-button>
              <el-button icon="el-icon-printer" plain size="small" @click="exceldown()" style="margin-right: 5px;">{{$t('nav7_2.buttonGroup.btn_3')}}</el-button>
              <el-button  size="small"><i class="fa fa-power-off" @click="logout()" style="margin-right: 5px;"></i>{{$t('nav7_2.buttonGroup.btn_4')}}</el-button>
            </div>
          </div>
          <el-row class="list-item">
            <div class="list-header">
              <div><span>{{$t('nav7_2.buttonGroup.btn_6')}}</span>&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{total}}</span></div>
              <div class="rightbtn">
                <span style="margin-right:8px;">{{$t('nav7_2.buttonGroup.btn_5')}}</span>
                <el-select v-model="onlineValue"  size="small" style="width:130px;margin-right:5px;" >
                  <el-option  v-for="(item, index) in onlineState" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div class="searchTable">
                  <el-input :placeholder="$t('nav7_1.detailInfo.addUserDialog.placeholder')"  size="small" v-model="searchData" class="input-with-select" style="width:190px;" >
                    <el-button slot="append"  size="small" style="background-color: #3abb53;color:#fff;"  icon="el-icon-search"></el-button>
                  </el-input>
                </div>
              </div>
            </div>
            <el-table v-loading="tableloading" ref="userListTable"  @selection-change="changeFun" :row-style="rowClass" @row-dblclick="rowClick"  :border=true :data="userListTable"  height="calc()" style="text-align: left"  >
              <el-table-column type="selection" width="50" prop="select" @selection-change="changeFun"></el-table-column>
              <el-table-column prop="user" :label="$t('nav7_2.table.cell_1')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="name" :label="$t('nav7_2.table.cell_2')"  :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="department" :label="$t('nav7_2.table.cell_3')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="project" :label="$t('nav7_2.table.cell_4')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="role" :label="$t('nav7_2.table.cell_5')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" :label="$t('nav7_2.table.cell_6')" :sortable="true" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span :class="scope.row.status === 'state1' ? 'green' : ''||scope.row.status === 'state2' ? 'red' : ''">
                       <i class="el-icon-star-on"></i>{{scope.row.status === 'state1'? $t('nav7_2.table.state1') : ''||scope.row.status === 'state2'? $t('nav7_2.table.state2') : ''}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('nav7_2.table.cell_7')" :sortable="true" show-overflow-tooltip></el-table-column>
              <el-table-column prop="updateTime" :label="$t('nav7_2.table.cell_8')" :sortable="true" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-row>
          <!--添加框-->
          <el-dialog :title="$t('nav7_2.addUserDialog.title')" :open="showmodel1()" :visible.sync="dialogFormVisible" width="680px"  ref="dialog" :before-close="closedialog">
            <el-form :model="addUserDialog.form" ref="form" :rules="addUserDialog.rules">
              <el-form-item :label="$t('nav7_2.addUserDialog.cell_1')" prop="user" :label-width="addUserDialog.formLabelWidth">
                <el-input v-model="addUserDialog.form.user"  auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('nav7_2.addUserDialog.cell_2')" prop="userName" :label-width="addUserDialog.formLabelWidth">
                <el-input v-model="addUserDialog.form.userName"  auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="'Shell Type'" :label-width="addUserDialog.formLabelWidth">
                <el-select v-model="addUserDialog.form.typeValue" :placeholder="$t('nav2_1.select.placeholder')" size="small">
                  <el-option  v-for="(item, index) in addUserDialog.form.type" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('nav7_2.addUserDialog.cell_3')" prop="password1" :label-width="addUserDialog.formLabelWidth">
                <el-input v-model="addUserDialog.form.password1" type="password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('nav7_2.addUserDialog.cell_4')"  prop="rePassword" :label-width="addUserDialog.formLabelWidth">
                <el-input v-model="addUserDialog.form.rePassword" type="password"  auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('nav7_2.addUserDialog.cell_5')"  style="height:220px;" :label-width="addUserDialog.formLabelWidth">
                <div class="area">
                  <div class="treearea">
                    <el-tree :data="addUserDialog.departmentInfo" :props="addUserDialog.defaultProps" show-checkbox node-key="id" ref="tree" :expand-on-click-node="true"></el-tree>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="Address" prop="address" :label-width="addUserDialog.formLabelWidth">
                <el-input v-model="addUserDialog.form.address"  auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Tel" prop="tel" :label-width="addUserDialog.formLabelWidth">
                <el-input v-model="addUserDialog.form.tel"  auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Mail" prop="mail" :label-width="addUserDialog.formLabelWidth">
                <el-input v-model="addUserDialog.form.mail"  auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cleanform">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
              <el-button type="primary"  @click="addUserSubmit('form')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
            </div>
          </el-dialog>
          <!--重置密码框-->
          <el-dialog :title="$t('nav7_2.passwordDialog.title')" :visible.sync="PasswordVisible" ref="passwordDialog" width="480px" :before-close="closePass">
            <el-form :model="passDialog.form" ref="passForm" :rules="passDialog.rules">
              <el-form-item :label="$t('nav7_2.addUserDialog.cell_3')" prop="password1" :label-width="addUserDialog.formLabelWidth">
                <el-input v-model="passDialog.form.password1" type="password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('nav7_2.addUserDialog.cell_4')"  prop="rePassword" :label-width="addUserDialog.formLabelWidth">
                <el-input v-model="passDialog.form.rePassword" type="password"  auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cleanPass">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
              <el-button type="primary"  @click="passwordSubmit('passForm')">{{$t('nav2_1.buttonGroup.sureBtn')}}</el-button>
            </div>
          </el-dialog>
          <!--配置属性框-->
          <el-dialog :title="$t('nav7_2.attrDialog.title')" :visible.sync="arreVisible" ref="attrDialog" width="800px" :before-close="closeAttr">
            <el-form  :model="attrDialog" ref="attrForm">
              <el-row :span="24"  v-for="(list, index) in attrDialog.list">
                <el-col :span="11">
                  <el-form-item :label="$t('nav7_2.attrDialog.cell_1')" :label-width="addUserDialog.formLabelWidth">
                    <el-input v-model="list.attrId" style="width:220px;" auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item :label="$t('nav7_2.attrDialog.cell_2')"  :label-width="addUserDialog.formLabelWidth">
                    <el-input v-model="list.attrNames" style="width:220px;"  auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align:center;">
                  <span class="el-icon-remove-outline" @click="removeList(list)" style="font-size:22px;line-height:40px;"></span>
                </el-col>
              </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addList()">{{$t('nav7_2.attrDialog.btn_2')}}</el-button>
              <el-button @click="cleanAttr">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
              <el-button type="primary"  @click="attrSubmit('attrForm')">{{$t('nav7_2.attrDialog.btn_1')}}</el-button>
            </div>
          </el-dialog>
        </div>
      <div v-show="RowContent" class="content rowcontent">
        <div class="header">
          <div><span style="color: #2cc362;cursor: pointer;font-weight: 600"  @click="RowContent=false">{{$t('nav7_2.title')}}</span> >
            <span>{{$t('nav7_2.detailInfo.title')}}</span></div>
          <div class="rightbtn">
            <el-button icon="el-icon-edit" plain size="small" style="margin-right: 5px" @click="editShow()">{{$t('nav7_2.detailInfo.btn')}}</el-button>
          </div>
        </div>
        <div class="infoContent"  v-bind:class="{ activeContent:activeContent==1}">
          <div class="session-list" style="margin-top:0;margin-left: 20px;height:28px; line-height:28px;">{{detailInfo.name}}</div>
          <div class="infos">
            <div class="infoSim">
              <div class="lists">
                <div class="list1">
                  <div class="leftLabel">{{$t('nav7_2.detailInfo.info.label_1')}}</div>
                  <div class="rightInfo">{{detailInfo.name}}</div>
                </div>
                <div class="list1">
                  <div class="leftLabel">{{$t('nav7_2.table.cell_2')}}</div>
                  <div class="rightInfo">{{detailInfo.username}}</div>
                </div>
                <div class="list2">
                  <div class="leftLabel">{{$t('nav7_2.detailInfo.info.label_2')}}</div>
                  <div class="attrTable">
                    <el-table v-loading="tableloading" :row-style="rowClass"  :border=true :data="detailInfo.basic_table" style="text-align: left;width: 100%"  >
                      <el-table-column prop="department" style="text-align:center" :label="$t('nav7_2.table.cell_3')" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="project" :label="$t('nav7_2.table.cell_4')" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="shell" label="Shell" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="list1">
                  <div class="leftLabel">{{$t('nav7_2.table.cell_5')}}</div>
                  <div class="rightInfo">{{detailInfo.role}}</div>
                </div>
                <div class="list1">
                  <div class="leftLabel">{{$t('nav7_2.table.cell_7')}}</div>
                  <div class="rightInfo">{{detailInfo.createTime}}</div>
                </div>
                <div class="list1">
                  <div class="leftLabel">{{$t('nav7_2.table.cell_8')}}</div>
                  <div class="rightInfo">{{detailInfo.updatedTime}}</div>
                </div>
                <div class="list1">
                  <div class="leftLabel">Address</div>
                  <div class="rightInfo">{{detailInfo.address}}</div>
                </div>
                <div class="list1">
                  <div class="leftLabel">Tel</div>
                  <div class="rightInfo"></div>
                </div>
                <div class="list1">
                  <div class="leftLabel">Mail</div>
                  <div class="rightInfo"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="editContent" v-bind:class="{ activeContent:activeContent==2}">
          <div class="session-list" style="margin-top:0;margin-left: 20px;height:28px; line-height:28px;">{{detailInfo.name}}</div>
          <div class="infos">
            <div class="infoSim">
             <div class="lists">
              <div class="list1">
                <div class="leftLabel">{{$t('nav7_2.detailInfo.info.label_1')}}</div>
                <div class="rightInfo">{{detailInfo.name}}</div>
              </div>
              <div class="list1">
                <div class="leftLabel">{{$t('nav7_2.table.cell_2')}}</div>
                <div class="rightInfo"><el-input style="width:280px;" v-model="detailInfo.username"  auto-complete="off"></el-input></div>
              </div>
              <div class="list2">
                <div class="leftLabel">{{$t('nav7_2.detailInfo.info.label_2')}}</div>
                <div class="attrTable">
                  <el-table v-loading="tableloading" :row-style="rowClass"  :border=true :data="detailInfo.basic_table" style="text-align: left;width: 100%"  >
                    <el-table-column prop="department" style="text-align:center" :label="$t('nav7_2.table.cell_3')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="project" :label="$t('nav7_2.table.cell_4')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="shell" label="Shell" show-overflow-tooltip></el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="list2">
                <div class="leftLabel">{{$t('nav7_2.table.cell_5')}}</div>
                <div class="roleChange">
                  <template>
                    <el-transfer v-model="detailInfo.roleValue" :titles="detailInfo.roleTitle"	 :data="detailInfo.roleData"></el-transfer>
                  </template>
                </div>
              </div>
              <div class="list1">
                <div class="leftLabel">{{$t('nav7_2.table.cell_7')}}</div>
                <div class="rightInfo">{{detailInfo.createTime}}</div>
              </div>
              <div class="list1">
                <div class="leftLabel">{{$t('nav7_2.table.cell_8')}}</div>
                <div class="rightInfo">{{detailInfo.updatedTime}}</div>
              </div>
              <div class="list1">
                <div class="leftLabel">Address</div>
                <div class="rightInfo"><el-input style="width:280px;" v-model="detailInfo.address"  auto-complete="off"></el-input></div>
              </div>
              <div class="list1">
                <div class="leftLabel">Tel</div>
                <div class="rightInfo"><el-input style="width:280px;" v-model="detailInfo.tel"  auto-complete="off"></el-input></div>
              </div>
              <div class="list1">
                <div class="leftLabel">Mail</div>
                <div class="rightInfo"><el-input style="width:280px;" v-model="detailInfo.mail"  auto-complete="off"></el-input></div>
              </div>
               <div class="list1" style="margin-top:50px;">
                 <div class="leftLabel"></div>
                 <el-button type="primary" @click="keepEdit()">{{$t('nav7_2.attrDialog.btn_1')}}</el-button>
                 <el-button @click="cancalEdit()">{{$t('nav2_1.buttonGroup.cancelBtn')}}</el-button>
               </div>
            </div>
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('rules.password')));
        } else {
          if (this.addUserDialog.form.rePassword !== '') {
            this.$refs.form.validateField('rePassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('rules.repassword')));
        } else if (value !== this.addUserDialog.form.password1) {
          callback(new Error(this.$t('rules.repasswordError')));
        } else {
          callback();
        }
      };
      var Pass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('rules.password')));
        } else {
          if (this.passDialog.form.rePassword !== '') {
            this.$refs.passForm.validateField('rePassword');
          }
          callback();
        }
      };
      var Pass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('rules.repassword')));
        } else if (value !== this.passDialog.form.password1) {
          callback(new Error(this.$t('rules.repasswordError')));
        } else {
          callback();
        }
      };
      return {
        title:'RVCP-工业仿真平台',
        tableloading:false, //表格加载动画,
        RowContent:false,
        activeContent:1,
        total:'',
        userListTable:[
          {
            user:'demo1',
            name: '李四',
            department:'测试部门',
            project:'EP01',
            role:'general',
            status: 'state1',
            createTime:'2017-11-12 16:45:22',
            updateTime:'2017-11-12 16:45:22',
          },
          {
            user:'demo',
            name:'张三',
            department:'技术部门',
            project:'EP01',
            role:'general',
            status: 'state2',
            createTime:'2017-11-12 16:45:22',
            updateTime:'2017-11-12 16:45:22',
          },
        ],/*节点资源库列表*/
        multipleSelection:[],/*列表模式选中值*/
        searchData:'',/*搜索*/
        onlineState: [
          {
            value:'All',
            label:this.$t('nav7_2.stateSel.sel_1')
          },
          {
            value: 'Online',
            label: this.$t('nav7_2.stateSel.sel_2')
          },
          {
            value: 'Offline',
            label: this.$t('nav7_2.stateSel.sel_3')
          }
        ],/*应用选择*/
        onlineValue:'All' ,/*默认选中*/
        dialogFormVisible:false,
        PasswordVisible:false,
        arreVisible:false,
        addUserDialog:{
          form:{
            user:'',
            userName:'',
            type:[{
              value:'Bash',
              label:'Bash'
            },{
              value:'Csh',
              label:'Csh'
            }],
            typeValue:'Bash',
            password1:'',
            rePassword:'',
            address:'',
            tel:'',
            mail:'',
          },
          rules: {
            user: [
              {required: true,message: this.$t('rules.userEmpty'),trigger: 'blur'},
            ],
            password1: [
              {required: true, validator: validatePass,trigger: 'blur'},
            ],
            rePassword: [
              {required: true,validator: validatePass2,trigger: 'blur'}
            ]
          },
          departmentInfo: [
            {
              id: 1,
              label: 'CAE',
              children: [{
                id: 4,
                label: '7897'
              }]
            }, {
              id: 2,
              label: 'EDA',
              children: [{
                id: 5,
                label: '7879'
              }, {
                id: 6,
                label: '7896'
              }]
            },{
              id:3,
              label:'日产'
            }],/*部门tree信息*/
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          formLabelWidth:'120px',
        },
        passDialog:{
          form:{
            password1:'',
            rePassword:''
          },
          rules: {
            password1: [
              {required: true, validator: Pass,trigger: 'blur'},
            ],
            rePassword: [
              {required: true,validator: Pass2,trigger: 'blur'}
            ]
          },
        },
        attrDialog:{
          list:[
            {
            attrId:'',
            attrNames:'',
           },
            {
              attrId:'',
              attrNames:'',
            },
            {
              attrId:'',
              attrNames:'',
            }
          ],

        },
        detailInfo:{
          name:'',
          username:'张三',
          role:'general',
          createTime:'2017-11-22 15:30:55',
          updatedTime:'2018-01-22 15:30:55',
          address:'北京市一环',
          tel:'',
          mail:'',
          basic_table:[
            {
              department:'管理部门',
              project:'EP01',
              shell:'Bash',
            },

          ],
          roleData:[
            {
              label:'general',
              key:1
            },
            {
              label:'cad',
              key:2
            },
            {
              label:'123',
              key:3

            },
          ],
          roleValue:[1],
          roleTitle:[this.$t('nav7_2.detailInfo.edit.role1'),this.$t('nav7_2.detailInfo.edit.role2')],
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
      this.total=this.userListTable.length;
      $(".list-item .el-table__body-wrapper").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 70px - 100px - 20px)', //可滚动区域高度
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
      $(".infoSim").slimScroll({
        width: '100%', //可滚动区域宽度
        height: 'calc(100vh - 60px - 50px - 70px - 50px)', //可滚动区域高度
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
      showmodel1(){
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
          $(".treearea").slimScroll({
            width: '100%', //可滚动区域宽度
            height: '220px', //可滚动区域高度
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
      rowClick(row){
        this.openRowContent(row.user);
        this.detailInfo.name=row.user;
        this.activeContent=1;
      },/*列表模式双击*/
      openRowContent(name){
        this.RowContent = true;
        //+ajax请求
      },/*表格数据加载*/
      refreshTable(){

      },/*刷新*/
      editShow:function(){
        this.activeContent=2;
      },/*编辑*/
      keepEdit:function(){
        this.activeContent=1;
      },/*保存编辑修改*/
      cancalEdit:function(){
        this.activeContent=1;
      },/*取消编辑*/
      del:function(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*删除*/
      setPassword:function(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          this.PasswordVisible=true;
        }
      },/*重置密码*/
      addUserSubmit:function(form){
        var _this=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log('success');
            _this.dialogFormVisible=false;
          } else {
            console.log('error');
            return false;
          }
        })
      },/*添加用户*/
      passwordSubmit:function(form){
        var _this=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log('success');
            _this.passwordDialog=false;
          } else {
            console.log('error');
            return false;
          }
        })
      },/*重置密码*/
      attrSubmit:function(form){
        var _this=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log('success');
            _this.arreVisible=false;
          } else {
            console.log('error');
            return false;
          }
        })
      },/*配置属性*/
      addList() {
        this.attrDialog.list.push({
          attrId:'',
          attrNames:'',
        });
      },/*添加配置属性*/
      removeList:function(item){
        var index = this.attrDialog.list.indexOf(item);
        if (index !== -1) {
          this.attrDialog.list.splice(index, 1)
        }
      },/*删除配置属性*/
      logout:function(){
        if(this.multipleSelection.length<=0){
          this.$message.error(this.$t('rvcpinfo.nosellect'));
        }else{
          console.log(this.multipleSelection);
        }
      },/*登出*/
      exceldown() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel');
          const tHeader = ['用户名','真实姓名','部门','项目','角色','状态','创建时间','修改时间'];
          const list = this.userListTable;
          const filterVal = ['user','name','department','project','role','status','createTime','updateTime'];
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, 'UserList')
        })
      },//导出excel
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },//导出excel
      cleanform(){
        this.$refs['form'].resetFields();
        this.dialogFormVisible = false
      },//清除表单数据
      closedialog(done){
        this.cleanform();
        done();
      },//关闭对话框回调
      cleanPass(){
        this.$refs['passForm'].resetFields();
        this.PasswordVisible = false
      },//清除密码表单数据
      closePass(done){
        this.cleanPass();
        done();
      },//关闭密码对话框回调
      cleanAttr(){
        this.$refs['attrForm'].resetFields();
        for(var i=0;i<this.attrDialog.list.length;i++){
          this.attrDialog.list[i].attrId='';
          this.attrDialog.list[i].attrNames='';
        }
        this.arreVisible = false;
      },//清除密码表单数据
      closeAttr(done){
        this.cleanAttr();
        done();
      },//关闭密码对话框回调
      i18nChart : function () {
          this.onlineState[0].label=this.$t('nav7_2.stateSel.sel_1');
          this.onlineState[1].label=this.$t('nav7_2.stateSel.sel_2');
          this.onlineState[2].label=this.$t('nav7_2.stateSel.sel_3');
          this.addUserDialog.rules.user[0].message=this.$t('rules.userEmpty');
          this.detailInfo.roleTitle=[this.$t('nav7_2.detailInfo.edit.role1'),this.$t('nav7_2.detailInfo.edit.role2')]
      },//国际化chart

    }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog .el-input,.el-dialog .el-select {width:86%;}
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
  .rowcontent{
    position: absolute;
    z-index: 55!important;
    top: 0px;
    left: 0px;
  }
  .infoContent{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
    position: absolute;
    top: 55px;
    left: 0;
    z-index: 40;
  }
  .infos{
    height:calc(100vh - 60px - 50px - 70px - 50px);
    width:calc(100% - 30px);
    margin:0 15px 15px;
    border: #d7d7d7 1px solid;
  }
  .editContent{
    height:calc(100vh - 60px - 50px - 70px);
    width: calc(100% - 30px );
    background-color: #ffffff;
    margin:15px 15px 0 15px;
    border: #ffffff 1px solid;
    border-radius: 8px;
    position: absolute;
    top: 55px;
    left: 0;
    z-index: 40;
  }
  .activeContent{
    z-index:41!important;
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
  .area{
    width:86%;height:220px;
    overflow:auto;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
  }
  .list1{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height:40px;
    line-height:40px;
    margin-bottom:10px;
  }
  .list2{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom:10px;
  }
  .lists{padding:15px 15px 15px 0;}
  .leftLabel{
    width: 120px;
    text-align:right;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-right:20px;
  }
  .attrTable{
    width: calc(100% - 140px);
  }
  .rightInfo{
    width: calc(100% - 140px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

</style>
<style>
  .attrTable td,.attrTable th.is-leaf {
    text-align: center;
  }
</style>
