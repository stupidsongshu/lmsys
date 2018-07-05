<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="collapse-item-title">基本信息</span>
        </template>
        <el-form ref="productMaterialBaseInfo" :model="productMaterialBaseInfoForm" :rules="productMaterialBaseInfoRules" :label-position="labelPosition" label-width="120px">
          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="productMaterialBaseInfoForm.productName"></el-input>
          </el-form-item>

          <el-form-item label="产品包名" prop="packageName">
            <el-input v-model="productMaterialBaseInfoForm.packageName"></el-input>
          </el-form-item>

          <el-form-item label="产品二级标题" prop="productSubTitle">
            <el-input v-model="productMaterialBaseInfoForm.productSubTitle"></el-input>
          </el-form-item>

          <el-form-item label="产品提供方" prop="partnerId">
            <el-select v-model="productMaterialBaseInfoForm.partnerId" placeholder="请选择产品提供方" style="width: 100%;">
              <el-option v-for="(val, index) in partnerList" :label="val.partnerCompany" :value="val.partnerId" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="产品类型" prop="productTypeId">
            <el-select v-model="productMaterialBaseInfoForm.productTypeId" placeholder="请选择产品类型" style="width: 100%;">
              <el-option label="现金贷"   :value="1"></el-option>
              <el-option label="还信用卡" :value="2"></el-option>
              <el-option label="企业贷"   :value="3"></el-option>
              <el-option label="车贷"     :value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="H5注册链接" prop="h5ApplyUrl">
            <el-input v-model="productMaterialBaseInfoForm.h5ApplyUrl"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="productMaterialBaseInfoUpdate">{{baseInfoBtnTxt}}</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span class="collapse-item-title">图标</span>
        </template>
        <el-upload
          class="upload-demo"
          ref="fileUpload"
          drag
          :auto-upload="false"
          :multiple="false"
          :on-preview="handlePreview"
          accept="image/*"
          :action="fileUploadUrl"
          :http-request="fileUploadFn">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div><img :src="fileUploadImg" width="100" alt=""></div>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <span class="collapse-item-title">利率分期额度</span>
        </template>
        <el-form ref="productMaterialFee" :model="productMaterialFeeForm" :rules="productMaterialFeeRules" :label-position="labelPosition" label-width="120px">
          <el-form-item label="产品最小额度" prop="minCreLine">
            <el-input type="number" v-model.number="productMaterialFeeForm.minCreLine" placeholder="单位：元"></el-input>
          </el-form-item>

          <el-form-item label="产品最大额度" prop="maxCreLine">
            <el-input type="number" v-model.number="productMaterialFeeForm.maxCreLine" placeholder="单位：元"></el-input>
          </el-form-item>

          <el-form-item label="产品利率类型" prop="interestRateType">
            <el-radio-group v-model="productMaterialFeeForm.interestRateType">
              <el-radio-button label="0">日</el-radio-button>
              <el-radio-button label="1">月</el-radio-button>
              <el-radio-button label="2">年</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="产品利率" prop="interestRate">
            <el-input type="number" v-model="productMaterialFeeForm.interestRate" placeholder="请输入产品利率，如0.36"></el-input>
          </el-form-item>

          <el-form-item label="产品分期类型" prop="instalType">
            <el-radio-group v-model="productMaterialFeeForm.instalType">
              <el-radio-button label="0">日</el-radio-button>
              <el-radio-button label="1">月</el-radio-button>
              <el-radio-button label="2">年</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="产品分期期数" prop="instalPeriodList">
            <el-input v-model="productMaterialFeeForm.instalPeriodList" placeholder="分期期数列表数组以逗号分隔，如 3;6;12"></el-input>
          </el-form-item>

          <el-form-item label="分期归还类型" prop="instalReturnType">
            <el-radio-group v-model="productMaterialFeeForm.instalReturnType">
              <el-radio :label="0">一次性归还</el-radio>
              <el-radio :label="1">按分期类型归还</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="productMaterialFeeUpdate">保存</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { isEmptyStr } from '@/utils/validate'
import { mapGetters } from 'vuex'
import api from '../../../api/api.js'
import config from '../../../config.js'
import md5 from 'blueimp-md5'

export default {
  props: {
    productInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    const validateIsEmptyStr = (rule, value, cb) => {
      if (isEmptyStr(value)) {
        cb(new Error('该项为必填项'))
      } else {
        cb()
      }
    }
    const validateInstalPeriodList = (rule, value, cb) => {
      if (value === undefined) value = ''
      value = value.toString().trim().replace(/；/g, ';')
      if (!/^\d+(;\d+)*(\d+)?$/.test(value)) {
        cb(new Error('只能以数字开头和结尾,中间只能是单个分号和数字的组合'))
      } else {
        cb()
      }
    }

    return {
      activeNames: ['1'],
      labelPosition: 'right',
      productMaterialBaseInfoForm: {},
      productMaterialBaseInfoRules: {
        productName:     [{required: true, validator: validateIsEmptyStr, trigger: 'blur'}],
        packageName:     [{required: true, validator: validateIsEmptyStr, trigger: 'blur'}],
        productSubTitle: [{required: true, validator: validateIsEmptyStr, trigger: 'blur'}],
        partnerId:       [{required: true, validator: validateIsEmptyStr, trigger: 'change'}],
        productTypeId:   [{required: true, validator: validateIsEmptyStr, trigger: 'change'}],
        h5ApplyUrl:      [{required: true, validator: validateIsEmptyStr, trigger: 'blur'}]
      },
      // 产品提供方
      partnerList: [],
      productMaterialFeeForm: {},
      productMaterialFeeRules: {
        minCreLine:       [{required: true, validator: validateIsEmptyStr, trigger: 'blur',}],
        maxCreLine:       [{required: true, validator: validateIsEmptyStr, trigger: 'blur',}],
        interestRateType: [{required: true, validator: validateIsEmptyStr, trigger: 'change'}],
        interestRate:     [{required: true, validator: validateIsEmptyStr, trigger: 'blur'}],
        instalType:       [{required: true, validator: validateIsEmptyStr, trigger: 'change'}],
        instalPeriodList: [{required: true, validator: validateInstalPeriodList, trigger: ['change', 'blur']}],
        instalReturnType: [{required: true, validator: validateIsEmptyStr, trigger: 'change'}]
      },
      fileUploadUrl: api.fileUpload,
      fileUploadImg: ''
    }
  },
  computed: {
    ...mapGetters([
      'productId',
      'userInfo'
    ]),
    baseInfoBtnTxt() {
      if (!this.productId) {
        return '创建合作应用'
      } else {
        return '更新合作应用'
      }
    }
  },
  created() {
    // 获取产品提供方
    this.$store.dispatch('PartnerList').then(res => {
      if (res.returnCode === '000000') {
        this.partnerList = res.response
      }
    })

    if (this.productId) {
      let product = this.productInfo.product
      this.productMaterialBaseInfoForm = {
        productName: product.productName,
        packageName: product.productId,
        productSubTitle: product.productSubTitle,
        partnerId: product.partnerId,
        productTypeId: product.productTypeId,
        h5ApplyUrl: product.h5ApplyUrl
      }
      this.productMaterialFeeForm = {
        minCreLine: product.minCreline,
        maxCreLine: product.maxCreline,
        interestRateType: product.interestrateType,
        interestRate: product.interestrate,
        instalType: product.instalType,
        instalPeriodList: product.instalPeriodList,
        instalReturnType: product.instalReturnType
      }
      this.fileUploadImg = product.productIconLink
    }
  },
  methods: {
    handleChange(val) {
      val.forEach((item, index) => {
        if (item !== '1' && !this.productId) {
          val.splice(index, 1)
          this.$message({
            showClose: true,
            message: '请先创建合作产品',
            type: 'warning'
          })
        }
      })
    },
    productMaterialBaseInfoUpdate() {
      this.$refs.productMaterialBaseInfo.validate(validate => {
        if (!validate) {
          return false
        } else {
          let param = {
            // 产品包名
            packageName:     this.productMaterialBaseInfoForm.packageName,
            // 合作方Id (string)
            partnerId:       this.productMaterialBaseInfoForm.partnerId,
            // 产品名称
            productName:     this.productMaterialBaseInfoForm.productName,
            // 产品2级标题
            productSubTitle: this.productMaterialBaseInfoForm.productSubTitle,
            // 产品H5申请链接
            h5ApplyUrl:      this.productMaterialBaseInfoForm.h5ApplyUrl,
            // 产品类型Id (int)
            productTypeId:   this.productMaterialBaseInfoForm.productTypeId
          }

          this.$store.dispatch('ProductCreate', param).then(res => {
            console.log(res)
            if (res.returnCode === '000000') {
              this.$message({
                showClose: true,
                message: res.returnMsg,
                type: 'success'
              })
              this.$store.dispatch('SetProductId', res.response)
            } else {
              this.$message({
                showClose: true,
                message: res.returnMsg,
                type: 'warning'
              })
            }
          })
        }
      })
    },
    productMaterialFeeUpdate() {
      this.$refs.productMaterialFee.validate(validate => {
        if (!validate) {
          return false
        } else {
          let instalPeriodList = this.productMaterialFeeForm.instalPeriodList.trim().replace(/；/g, ';')
          let param = {
            productId:        this.productId,
            minCreLine:       parseInt(this.productMaterialFeeForm.minCreLine),//产品最小额度
            maxCreLine:       parseInt(this.productMaterialFeeForm.maxCreLine),//产品最大额度
            interestRateType: parseInt(this.productMaterialFeeForm.interestRateType),//产品利率类型
            interestRate:     parseFloat(this.productMaterialFeeForm.interestRate),//产品利率
            instalType:       parseInt(this.productMaterialFeeForm.instalType),//产品分期类型
            instalPeriodList,//产品分期期数(只能以数字开头和结尾,中间只能是英文分号和数字的组合)
            instalReturnType: parseInt(this.productMaterialFeeForm.instalReturnType)//产品分期归还类型
          }

          this.$store.dispatch('ProductUpdateFee', param).then(res => {
            if (res.returnCode === '000000') {
              this.$message({
                showClose: true,
                message: res.returnMsg,
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: res.returnMsg,
                type: 'warning'
              })
            }
          })
        }
      })
    },

    fileUploadFn() {
      let fileList = this.$refs.fileUpload.uploadFiles
      if (fileList.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择文件',
          type: 'warning'
        })
        return
      }
      let file = fileList[0]
      if (file.size / 1024 > 500) {
        this.$message({
          showClose: true,
          message: '文件大小不能超过500kb',
          type: 'warning'
        })
        return
      }

      let fd = new FormData()
      let userInfo = JSON.parse(this.userInfo)
      let productId = this.productId
      let ua = config.ua
      let signKey = config.signKey
      let call = 'File.uploadIcon'
      let timestamp = new Date().getTime()
      let sign = md5(ua + "&" + call + "&" + timestamp + "&" + signKey)

      fd.append("ua", ua)
			fd.append("call", call)
			fd.append("args", JSON.stringify({
				account: userInfo.account,
				token: userInfo.token,
				productId: productId,
				fileType: 'icon'
			}))
			fd.append("sign", sign)
			fd.append("timestamp", timestamp)
      fd.append("icon", file.raw)

      let xhr = new XMLHttpRequest()
      xhr.open("POST", this.fileUploadUrl, true)
      let _this = this
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var data = JSON.parse(xhr.responseText);
          _this.$message({
            message: data.returnMsg
          })
          if (data.returnCode === '000000') {
            _this.fileUploadImg = data.response
          }
        }
      }
      xhr.send(fd)
    },
    submitUpload() {
      this.fileUploadFn()
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>
