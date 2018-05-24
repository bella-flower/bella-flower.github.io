<template>
    <div class="main login">
      <div class="head">
        <div class="welcome">
          <i class="el-icon-caret-right" style="color: #3abb53;font-size:22px;"></i>
          <span>{{$t("rvcpLogin.title")}}</span>
          <span>RVCP|HPC</span>
        </div>
        <div class="rightLang">
          <span style="cursor:pointer;margin-top:-3px;" v-bind:class="{langActive:language=='zh-cn'}" @click="lang('zh-cn')">中文</span>
          <span style="font-size:18px;">/</span>
          <span style="cursor:pointer;" v-bind:class="{langActive:language=='en'}" @click="lang('en')">English</span>
        </div>
      </div>
      <div class="headShadow"></div>
      <div class="content">
        <div class="mains">
          <div class="white-bg">
            <div class="img1"></div>
            <div class="loginForm" :class="{zIndex:show=='login'}">
              <div class="formMain">
                <div class="logo_1"></div>
                <el-form class="form-con" ref="form" :model="form" label-width="80px" :rules="rules">
                  <el-form-item prop="username" label-width="0" >
                    <el-input v-model="form.username" prefix-icon="fa fa-user" :placeholder="$t('rvcpLogin.placeholder1')"></el-input>
                  </el-form-item>
                  <el-form-item prop="password" label-width="0">
                    <el-input  type="password" v-model="form.password"  prefix-icon="fa fa-unlock-alt" :placeholder="$t('rvcpLogin.placeholder2')"></el-input>
                  </el-form-item>
                  <div style="margin-bottom:10px;display:flex;align-items: center;justify-content: space-between;" class="form_pass">
                    <div>
                       <el-switch style="display: inline-block;" v-model="form.remember" active-color="#71ba2a"></el-switch>
                       <span style="color:#3abb53;position: relative;top:2px;">{{$t('rvcpLogin.remember')}}</span>
                    </div>
                    <div>
                      <span style="text-decoration:underline;color:#3abb53;cursor:pointer;" @click="rememberShow()">{{$t('rvcpLogin.forget')}}?</span>
                    </div>
                  </div>
                  <el-form-item label-width="0">
                    <el-button style="width: 100%" type="primary" @click="submitForm('form')">{{$t('rvcpLogin.loginBtn')}}</el-button>
                  </el-form-item>
                  <p style="margin-top:20px;margin-bottom:0;">
                    <span style="color: #7a7a7a;">{{$t('rvcpLogin.noUsername')}}?</span>
                    <a style="color:#3abb53;cursor:pointer;" @click="registerShow()">{{$t('rvcpLogin.registration')}}</a>
                  </p>
                </el-form>
              </div>
            </div>
            <div class="loginForm" :class="{zIndex:show=='remember'}">
              <div class="form_RMain">
                <div class="logo_1"></div>
                <el-form style="margin-top:40px;" ref="rememberForm" :model="rememberForm" label-width="80px" :rules="rules">
                  <el-form-item prop="username" :label="$t('rvcpLogin.rememberForm.label')" label-width="80px" >
                    <el-input v-model="rememberForm.username" auto-complete="off" :placeholder="$t('rvcpLogin.placeholder1')"></el-input>
                  </el-form-item>
                </el-form>
                <div style="text-align:right;">
                  <el-button @click="cancelR()" style="padding:10px 35px;">{{$t('rvcpLogin.rememberForm.cancel')}}</el-button>
                  <el-button @click="submitR('rememberForm')" type="primary" style="padding:10px 35px;">{{$t('rvcpLogin.rememberForm.submit')}}</el-button>
                </div>
              </div>
            </div>
            <div class="loginForm" :class="{zIndex:show=='register'}">
              <div class="form_ReMain">
                <div class="logo_1" style="margin-top:5px;"></div>
                <el-form style="margin-top:10px;" ref="registerForm" :model="registerForm" label-width="90px" :rules="registerForm.rules">
                  <el-form-item prop="username" :label="$t('rvcpLogin.registerForm.label_1')" label-width="90px" >
                    <el-input v-model="registerForm.username" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item  prop="user" :label="$t('rvcpLogin.registerForm.label_2')" label-width="90px" >
                    <el-input v-model="registerForm.user" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item  prop="password" :label="$t('rvcpLogin.registerForm.label_3')" label-width="90px" >
                    <el-input v-model="registerForm.password" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item  prop="mail" :label="$t('rvcpLogin.registerForm.label_4')" label-width="90px" >
                    <el-input v-model="registerForm.mail" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item prop="tel" :label="$t('rvcpLogin.registerForm.label_5')" label-width="90px" >
                    <el-input v-model="registerForm.tel" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item prop="department" :label="$t('rvcpLogin.registerForm.label_6')" label-width="90px" >
                    <el-cascader :options="registerForm.options" v-model="registerForm.department" ></el-cascader>
                  </el-form-item>
                </el-form>
                <div style="text-align:right;">
                  <el-button @click="cancelRe()" style="padding:10px 38px;">{{$t('rvcpLogin.rememberForm.cancel')}}</el-button>
                  <el-button @click="submitRe('registerForm')" type="primary" style="padding:10px 38px;">{{$t('rvcpLogin.registerForm.btn')}}</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="footMain">
          <div class="imgList">
            <a class="footImg1"></a>
            <a class="footImg2"></a>
            <a class="footImg3"></a>
            <a class="footImg4"></a>
            <a class="footImg5"></a>
            <a class="footImg6"></a>
            <a class="footImg7"></a>
            <a class="footImg8"></a>
          </div>
          <div class="footText">
            <span class="footLogo"></span>
            <div style="text-align: left;color:#7a7a7a;font-size: 12px;">
              <p style="margin-bottom:0;">Copyright © 1998 - 2016 DAICY China.</p>
              <p style="margin-top:5px;margin-bottom:0;">All trademarks and logos on this page are owned by DAICY China.or by their respective owners.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import  router from '../router/index'

  export default {
    data () {
      return {
        language: 'zh-cn',
        show:'login',
        form: {
          username: '',
          password: '',
          remember:false,
        },
        rememberForm:{
          username:'',
        },
        registerForm:{
          username:'',
          user:'',
          password:'123456',
          mail:'',
          tel:'',
          options: [
            {
              value: 'department',
              label: '部门',
              children: [
                {
                  value: 'CAD',
                  label: 'CAD',
                  children: [
                    {
                      value: '7898',
                      label: '7898',
                    }]
                },
                {
                  value: 'CAE',
                  label: 'CAE',
                },
                {
                  value: 'richan',
                  label: '日产',
                }
                ]
            },
         ],
          department:[],
          rules: {
            username: [
              {required: true, message: this.$t('rules.userEmpty')},
            ],
            user:[
              {required: true, message:this.$t('rules.nameEmpty')},
            ],
            password: [
              {required: true, message: this.$t('rules.password')},
            ],
            mail:[
              {required: true, message:this.$t('rules.mailEmpty')},
            ],
            department:[
              {required: true, message: this.$t('rules.departmentEmpty'),trigger:'change'},
            ],
          }
        },
        rules: {
          username: [
            {required: true, message:this.$t('rules.userEmpty')},
          ],
          password: [
            {required: true, message:this.$t('rules.password')},
          ],
        }
      }
    },
    created:function () {
      console.log(Vue.config.lang );
      router.push("/login");
      //this.setuser();
    },
    computed:{
      changeLanguage: function () {
        return  Vue.config.lang
      },
      /*...mapGetters([
       'username',
     ]),*/
    },
    watch: {
      changeLanguage (){
        this.i18nChart();
      },

    },
    mounted(){
      Vue.config.lang = this.language;
    },//初始函数
    methods:{
      lang:function (lang) {
        this.language=lang;
        Vue.config.lang = this.language;
      },
      rememberShow:function(){
        this.show='remember';
      },
      registerShow:function(){
        this.show='register';
      },
      cancelR:function(){
        this.$refs['rememberForm'].resetFields();
        this.show='login';
      },
      cancelRe:function(){
        this.$refs['registerForm'].resetFields();
        this.show='login';
      },
      submitForm:function(form){
        var _this=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log('success');
            router.push({name:'nav1'});
          } else {
            console.log('error');
            return false;
          }
        })
      },
      submitR:function(form){
        var _this=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log('success');
            this.$message(this.$t('rvcpinfo.successSubmit'));
            this.show='login';
            this.$refs['rememberForm'].resetFields();/*清空表单*/
          } else {
            console.log('error');
            return false;
          }
        })
       },
      submitRe:function(form){
        var _this=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log('success');
            this.$message(this.$t('rvcpinfo.successSubmit'));
            this.show='login';
            this.$refs['registerForm'].resetFields();/*清空表单*/
          } else {
            console.log('error');
            return false;
          }
        })
      },
      /*layout(){
        localStorage.removeItem('username');
        this.setuser();
        router.push('/login');
      },
      ...mapActions([
        'setuser',
        'layoutuser',
      ])*/
      login:function(){
        router.push({name:'nav1'});
      },
      i18nChart : function () {
        this.rules.username[0].message=this.$t('rules.userEmpty');
        this.rules.password[0].message=this.$t('rules.userEmpty');
        this.registerForm.rules.username[0].message=this.$t('rules.userEmpty');
        this.registerForm.rules.user[0].message=this.$t('rules.nameEmpty');
        this.registerForm.rules.password[0].message=this.$t('rules.password');
        this.registerForm.rules.mail[0].message=this.$t('rules.mailEmpty');
        this.registerForm.rules.department[0].message=this.$t('rules.departmentEmpty');
      },//国际化chart
    }

  }
</script>

<style scoped>
.main{
  min-width: 1110px;
  min-height:732px;
  overflow: hidden;
}
.head{
  width:100%;
  height:90px;
  background:#ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 36px;
  box-sizing: border-box;
}
.langActive{
  color:#3abb53 !important;
}
.headShadow{
  width:100%;height:9px;
  background:url("../../../static/img/login_xian.png") repeat-y;
}
.welcome span{
  font-size:18px;
  color:#888888;
}
.head .rightLang span{
  float: left;
  padding: 0 2px;
  font-size: 16px;
  color: #888888;
}
.content{
  width:100%;
  height:calc(100vh - 100px - 190px);
  min-height:442px;
  background:#f5f4f7;
  display: flex;
  justify-content:center;
  align-items: center;
}
.mains{
  width:1046px;height:440px;
/*  background:#eceaed;*/
  box-shadow:0 0 10px 10px #e7e6e8;
  /*padding:10px;*/
  box-sizing: border-box;
}
.white-bg{
  width:100%;height:440px;
  background:#ffffff;
  display: flex;
  justify-content:space-between;
  align-items: center;
  position: relative;
}
.img1{
  width:50%;height:440px;
  background:url("../../../static/img/login1.png");
}
.loginForm{
  width:50%;height:440px;
  background:#ffffff;
  display: flex;
  justify-content:center;
  align-items: center;
  position: absolute;
  right:0;
  top:0;
  z-index:100;
}
.zIndex{
  z-index:101!important;
}
.formMain{
  width:222px;height:330px;
}
.form_RMain{
  width:295px;height:230px;
}
.form_ReMain{
  width:320px;height:440px;
}
.logo_1{
  width:206px;height:84px;
  margin:0 auto;
  background:url("../../../static/img/login_logo.png")no-repeat;
}
.form-con{
  margin-top:20px;
}
.foot{
  width:100%;height:190px;
  background:#3f3f3f;
  display: flex;
  justify-content:center;
  align-items: center;
}
.footMain{

}
.imgList a{
  display:inline-block;
  width:130px;height:108px;
  margin-right:5px;
}
.footImg1{
  background:url("../../../static/img/foot/footimg1.png") no-repeat;
}
.footImg2{
  background:url("../../../static/img/foot/footimg2.png") no-repeat;
}
.footImg3{
  background:url("../../../static/img/foot/footimg3.png") no-repeat;
}
.footImg4{
  background:url("../../../static/img/foot/footimg4.png") no-repeat;
}
.footImg5{
  background:url("../../../static/img/foot/footimg5.png") no-repeat;
}
.footImg6{
  background:url("../../../static/img/foot/footimg6.png") no-repeat;
}
.footImg7{
  background:url("../../../static/img/foot/footimg7.png") no-repeat;
}
.footImg8{
  background:url("../../../static/img/foot/footimg8.png") no-repeat;
}
.footText{
  display: flex;
  justify-content:center;
  align-items: center;
}
.footLogo{
  display:inline-block;
  width:66px;height:36px;
  background:url("../../../static/img/logo-white.png") no-repeat;
  margin-right:5px;
}
.form_ReMain .el-cascader{
  line-height:30px;
  width:100%;
}
</style>
<style>
  .login .el-form-item{
    margin-bottom:18px;
  }
  .login .el-input__inner{
    height:30px;
  }
  .login .el-form-item__label{
    line-height:30px;
  }
  .login .el-form-item__content{
    line-height:30px;
  }
  .formMain .el-input__icon{
    line-height:30px;
  }

</style>
<!–[if IE]>
<style type=”text/css”>
  .form_pass{
    display: -ms-flexbox;
    align-items: center;
    justify-content: space-between;
  }
</style>
<![endif]–>

