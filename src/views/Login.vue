<template>
  <div class="body-bg">

    <div class="login-bg">
        <div class="login-right">
            <p class="login-title">中央厨房管理系统</p>
            <el-form :model="loginForm"  ref="loginForm" @submit.native.prevent >
              <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名" :maxlength="25" style="width: 350px;height: 45px;">

                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" :maxlength="25" style="width: 350px;height: 45px;">

                </el-input>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="success" style="width: 350px;height: 45px;" @click.native.prevent="handleSubmit" native-type="submit" :loading="landing" >登录</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>

    <!--<p class="title">中央厨房管理系统</p>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" @submit.native.prevent label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入账号" :maxlength="25">
          <i slot="prefix"><img src="../../static/img/user.png" class="icon-img"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" :maxlength="25">
          <i slot="prefix"><img src="../../static/img/password.png" class="icon-img"></i>
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="success" style="width:100%;" @click.native.prevent="handleSubmit" native-type="submit" :loading="landing">登录</el-button>
      </el-form-item>
    </el-form>-->

  </div>
</template>
<!--suppress BadExpressionStatementJS -->
<script type="text/ecmascript-6">
  import { requestLogin } from '../api/api';
  export default {
    data() {
      return {
        landing: false,
        loginForm: {
          username: '',
          password: ''
        },
        /*校验规则*/
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit(ev) {
        var _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.landing = true;
            var loginParams = {
              corpId: "taoding",
              username: this.loginForm.username,
              password: this.loginForm.password
            };
            requestLogin(loginParams).then(res => {
//              this.landing = false;
              let data = res.data;
              if(res.status == 200){
                if (data.sessionId) {
                  this.landing = true;//首页加载慢问题
                  sessionStorage.setItem('user', JSON.stringify(data.user));
                  sessionStorage.setItem('sessionId', data.sessionId);
                  sessionStorage.setItem('customerId', data.user.customerId);//门店信息
                  sessionStorage.setItem('customerName', data.storeName);//门店信息
                  sessionStorage.setItem('flag', data.user.flag);//门店信息

                  this.$router.push({ path: '/' });
                } else {
                  this.landing = false;
                  this.$message({
                    message: '请输入正确的用户名或密码',
                    type: 'error'
                  });
                }
              }else{
                this.landing = false;
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
            });
          } else {
            this.$message({
              message: '请检查用户名或密码',
              type: 'error'
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @function rw($px){
  @return $px*100/1920 *1vw;
  }
  @function rh($px){
  @return $px*100/1080 *1vh;
  }
  .login-bg{
    width:rw(1110);
    height: rw(590);
    background: url("../../static/img/bj.jpg") center no-repeat;
    margin: 0 auto;
    border-radius: 10px;
  }
  .login-right{
    width: 580px;
    height: 590px;
    float: right;
    text-align: center;
  }
  .login-title{
    text-align: center;
    font-size: 28px;
    color: #4a5c94;
    margin-top: 145px;
  }
  .body-bg{
    background: #ffffff;
    width: rw(1920);
    height: rh(1080);
    background: url("../../static/img/bg.jpg") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    display: flex;
     align-items: center;
     justify-items: center;
  }
  .login-container {
    position: absolute;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    right: 0;
    width: rw(385);
    height: rh(193);
    padding: 30px 30px;
    background: #fff;
    top:rh(417);
    left: 0;
    margin: auto;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .el-button--success{
    background-color: #4a5c94;
    border-color: #4a5c94;
  }
  .icon-img{
    margin-top: 10px;
  }
  .title {
    text-align: center;
    margin-top: rh(329);
    font-size: rw(40);
    font-weight:bold;
    line-height:rh(56);
  }
</style>
