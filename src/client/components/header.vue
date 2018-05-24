<template>
  <el-container class="header">
      <router-link class="logoimg" :to="{ name:'nav1_1'}" ></router-link>
      <ul class="nav">
        <router-link v-for="(item, index) in navarry" :to="{ name:item.name}" class="nav_noactive"  @click.native="againClick(index)">
          <li>{{$t(item.con)}}</li>
        </router-link>
      </ul>
    <div class="userbox">
      <el-select  v-model="languagevalue" size='mini' class="setlang" :change="setLanguage()">
        <el-option
          v-for="item in language"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>{{$t('rvcpheader.hello')}}，</span>
      <el-dropdown class="usermenu"  trigger="click">
      <span :title="this.username" class="el-dropdown-link usercon">{{username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{$t('rvcpheader.btn_1')}}</el-dropdown-item>
          <el-dropdown-item>{{$t('rvcpheader.btn_2')}}</el-dropdown-item>
          <el-dropdown-item>{{$t('rvcpheader.btn_3')}}</el-dropdown-item>
          <el-dropdown-item @click.native="logOff()">{{$t('rvcpheader.btn_4')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="系统配置" :visible.sync="dialogSetting">
      <el-form >
        <el-form-item label="主机地址">
          <el-input v-model="settingform.localhost"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetting = false">取 消</el-button>
        <el-button type="primary" @click="saveSetting()">保 存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
  import Vue from 'vue'
  import  router from '../router/index'
  export default {
    data () {
      return {
        navarry:[
          {name:'nav1',con:"rvcpheader.nav1con"},
          {name:'nav2',con:'rvcpheader.nav2con'},
          {name:'nav3',con:'rvcpheader.nav3con'},
          {name:'nav4',con:'rvcpheader.nav4con'},
          {name:'nav5',con:'rvcpheader.nav5con'},
          {name:'nav6',con:'rvcpheader.nav6con'},
          {name:'nav7',con:'rvcpheader.nav7con'},
          {name:'nav8',con:'rvcpheader.nav8con'}
          ],
        username:"rvcpadmin",
        language:[{value:"zh-cn",label:"zh-cn"},{value:"en",label:"en-us"}],
        dialogSetting:false,
        languagevalue:'zh-cn',
        settingform:{
          localhost:"http://localhost:8080/"
        },
      }
    },
    created:function () {
      router.push({name:'nav1'});
    },
    computed:{
    },
    mounted(){
      this.setLanguage();
    },
    watch: {

    },
    methods:{
      setLanguage:function () {
        Vue.config.lang = this.languagevalue;
        var t;
        clearTimeout(t)
        t = setTimeout(function (){
          var example1 = new sNav('nav');
        }, 500);
      },
      againClick:function(index){
        switch(index){
          case 0 : router.push({name:'nav1_1'}) ;break;
          case 1 : router.push({name:'nav2_1'}) ;break;
          case 2 : router.push({name:'nav3_1'}) ;break;
          case 3 : router.push({name:'nav4_1'}) ;break;
          case 4 : router.push({name:'nav5_1'}) ;break;
          case 5 : router.push({name:'nav6_1'}) ;break;
          case 6 : router.push({name:'nav7_1'}) ;break;
          case 7 : router.push({name:'nav8_1'}) ;break;
        }

      }, //一级菜单重复点击,
      logOff:function(){
        router.push('/login');
      }
    }
  }
</script>

<style scoped>
  .header{
    height:60px;
    background-color: #313137;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #ffffff;
  }
  .nav{
    margin:0px 15px;
    min-width:880px;
    width:calc(100% - 280px - 260px);
    height:60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .nav_noactive{
    height:60px;
    width:100px;
    min-width: 120px;
    line-height: 60px;
    background-color: #2d2f33;
    color: #ffffff;
  }
  .nav_noactive:hover{
    background-color: #242429;
  }
  .router-link-active {
    background-color: #2cc362!important;
  }
  .nav>a{
    font-size: 14px;
    list-style: none;
    float: left;
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }
  .nav>a li{
    background:#313137;
    padding: 0px 30px;
    text-align: center;
    color: white;
    height: 60px;
    line-height:60px;
  }
  .nav>a span{
    background-color: #2cc362;
    text-align: center;
    color: white;
    display: block;
  }
  .router-link-active div li{
    background-color: #2cc362!important;
  }
  .logoimg{
    background-color: #313137!important;
    background: url("../../../static/img/logo.png") no-repeat;
    background-size: contain;
    min-width:150px;
    width: 150px;
    height:50px;
    margin:5px 15px;
  }
  .userbox{
    height:50px;
    width:auto;
    min-width:300px;
    margin:5px 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    line-height: 50px;
  }
  .usercon{
    display: inline-block;
    max-width:120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    course:hand;
    cursor: pointer;
  }
  .usermenu{
    height:30px;
    color: #ffffff;
  }
  .usermenu span{
    height:30px;
    line-height: 30px;
  }
  .setlang{
    width: 80px;margin-right: 8px;
  background-color: #313137!important;
  }
</style>
<style> /*修改element组件样式要单独写style不能加scoped*/
.setlang .el-input__inner{
    background-color: #313137!important;
    color: #ffffff;
  }
</style>
