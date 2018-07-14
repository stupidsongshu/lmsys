<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">{{$t('login.title')}}</h3>
      <lang-select class="language"></lang-select>
      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="account" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.account" autoComplete="on" :placeholder="$t('login.account')" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          :placeholder="$t('login.password')"></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon v-show="pwdType == 'text'" icon-class="eye-open" />
            <svg-icon v-show="pwdType == 'password'" icon-class="eye-close" />
          </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isEmptyStr } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'

export default {
  name: 'login',
  components: {
    LangSelect
  },
  data() {
    const validateIsEmptyStr = (rule, value, cb) => {
      if (isEmptyStr(value)) {
        cb(new Error())
      } else {
        cb()
      }
    }

    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account:  [
          { required: true, trigger: 'blur', message: this.$t('login.validate.accEmpty'), validator: validateIsEmptyStr },
          { required: true, trigger: 'change', message: this.$t('login.validate.accEmpty'), validator: validateIsEmptyStr },
        ],
        password: [
          { required: true, trigger: 'blur', message: this.$t('login.validate.pswEmpty'), validator: validateIsEmptyStr },
          { required: true, trigger: 'change', message: this.$t('login.validate.pswEmpty'), validator: validateIsEmptyStr }
        ]
      },
      loading: false,
      pwdType: 'password',
      redirect: ''
    }
  },
  mounted() {
    this.redirect = this.$route.query.redirect
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(res => {
            this.loading = false
            if (res.returnCode === '000000') {
              this.$message({
                showClose: true,
                message: this.$t('login.logSuccess'),
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: res.returnMsg,
                type: 'warning'
              })
            }

            if (!!this.redirect) {
              this.$router.push({path: this.redirect})
            } else {
              this.$router.push({ name: 'dashboard' })
            }
          }).catch((err) => {
            this.loading = false
            console.log(err)
            this.$message({
              showClose: true,
              message: err.returnMsg,
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .language {
      position: absolute;
      top: 42px;
      right: 40px;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
