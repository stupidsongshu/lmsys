<template>
  <div>
    <el-table :data="partnerList" border stripe highlight-current-row style="width: 100%">
      <el-table-column
        prop="partnerId"
        label="id">
      </el-table-column>
      <el-table-column
        prop="partnerCompany"
        label="合作方名称">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="partnerFind(scope.row.partnerId)"
            size="small">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改合作方" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="partnerEditForm" :rules="rules" :label-position="labelPosition" label-width="100px">
        <el-form-item style="display:none;">
          <el-input v-model="form.partnerId"></el-input>
        </el-form-item>
        <el-form-item label="合作方名称" prop="partnerCompany">
          <el-input v-model="form.partnerCompany"></el-input>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="partnerUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPartnerList } from '@/api/partner'
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
    getPartnerList().then(res => {
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
