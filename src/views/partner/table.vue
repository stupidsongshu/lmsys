<template>
  <div>
    <el-form ref="partnerForm" :model="form" :rules="rules" :label-position="labelPosition" label-width="120px">
      <el-form-item label="合作方名称" prop="partnerCompany">
        <el-input v-model="form.partnerCompany"></el-input>
      </el-form-item>
      <el-form-item label="公司主页" prop="partnerWebsite">
        <el-input v-model="form.partnerWebsite"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.partnerContactName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.partnerContactPhone"></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱">
        <el-input v-model="form.partnerContactEmail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{hint}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      dialogVisible: false,
      hint: '',
      form: {
        partnerCompany: '',
        partnerWebsite: '',
        partnerContactName: '',
        partnerContactPhone: '',
        partnerContactEmail: ''
      },
      rules: {
        partnerCompany: [
          { required: true, message: '请输入合作方名称', trigger: 'blur' }
        ],
        partnerWebsite: [
          { required: true, message: '请输入公司主页', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      // if (this.form.partnerCompany.trim() === '') {
      //   this.$message('合作方名称不能为空')
      //   return
      // }
      // if (this.form.partnerWebsite.trim() === '') {
      //   this.$message('公司主页不能为空')
      //   return
      // }

      let param = {
        partnerCompany        : this.form.partnerCompany,
        partnerWebsite        : this.form.partnerWebsite,
        partnerContactName    : this.form.partnerContactName,
        partnerContactPhone   : this.form.partnerContactPhone,
        partnerContactEmail   : this.form.partnerContactEmail
      }

      this.$refs.partnerForm.validate(validate => {
        if (!validate) {
          return false
        } else {
          // 新建合作方
          this.$store.dispatch('PartnerAdd', param).then(res => {
            console.log(res)
            this.dialogVisible = true
            this.hint = res.returnMsg
            // if (res.returnCode === '000000') {
            // } else {

            // }
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
