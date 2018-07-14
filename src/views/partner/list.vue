<template>
  <div class="main-wrapper">
    <el-table :data="partnerList" border stripe highlight-current-row style="width: 100%">
      <el-table-column prop="partnerId" label="id"></el-table-column>
      <el-table-column prop="partnerCompany" :label="$t('partner.partnerCompanyName')"></el-table-column>
      <el-table-column :label="$t('partner.operate')">
        <template slot-scope="scope">
          <el-button @click.native.prevent="partnerFind(scope.row.partnerId)" size="small">{{$t('partner.modify')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('partner.modifyPartner')" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="partnerEditForm" :rules="rules" :label-position="labelPosition" label-width="150px">
        <el-form-item style="display:none;">
          <el-input v-model="form.partnerId"></el-input>
        </el-form-item>
        <el-form-item :label="$t('partner.partnerCompanyName')" prop="partnerCompany">
          <el-input v-model="form.partnerCompany"></el-input>
        </el-form-item>
        <el-form-item :label="$t('partner.contactPerson')">
          <el-input v-model="form.partnerContactName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('partner.contactPhone')">
          <el-input v-model="form.partnerContactPhone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('partner.contactEmail')">
          <el-input v-model="form.partnerContactEmail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('partner.cancel')}}</el-button>
        <el-button type="primary" @click="partnerUpdate">{{$t('partner.ensure')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'partner',
  data() {
    return {
      partnerList: [],
      dialogFormVisible: false,
      form: {},
      rules: {
        partnerCompany: [
          { required: true, message: '请输入合作方名称', trigger: 'blur' }
        ]
      },
      labelPosition: 'right'
    }
  },
  created() {
    this.$store.dispatch('PartnerList').then(res => {
      if (res.returnCode = '000000') {
        this.partnerList = res.response
      }
    })
  },
  methods: {
    // 合作方信息获取
    partnerFind(partnerId) {
      let param = {
        partnerId
      }

      this.$store.dispatch('PartnerFind', param).then(res => {
        console.log(res)
        if (res.returnCode === '000000') {
          this.dialogFormVisible = true
          this.form = res.response
        }
      })
    },
    partnerUpdate() {
      this.$refs.partnerEditForm.validate(validate => {
        if (!validate) {
          return false
        } else {
          // 修改合作方
          let param = {
            partnerId             : this.form.partnerId,
            partnerCompany        : this.form.partnerCompany,
            partnerWebsite        : this.form.partnerWebsite,
            partnerContactName    : this.form.partnerContactName,
            partnerContactPhone   : this.form.partnerContactPhone,
            partnerContactEmail   : this.form.partnerContactEmail
          }
          this.$store.dispatch('PartnerUpdate', param).then(res => {
            this.dialogFormVisible = false

            this.$message({
              showClose: true,
              message: res.returnMsg,
              type: 'success'
            });
          })
        }
      })
    }
  }
}
</script>
