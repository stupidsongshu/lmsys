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
            @click.native.prevent="editPartner(scope.row.partnerId)"
            size="small">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="partnerData">
        <!-- <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column> -->
      </el-table>
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
      dialogTableVisible: false,
      partnerData: {}
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
    editPartner(partnerId) {
      let param = {
        partnerId,
        partnerCompany        : this.form.partnerCompany,
        partnerWebsite        : this.form.partnerWebsite,
        partnerContactName    : this.form.partnerContactName,
        partnerContactPhone   : this.form.partnerContactPhone,
        partnerContactEmail   : this.form.partnerContactEmail
      }

      console.log(param)

      this.$store.dispatch('PartnerUpdate', param).then(res => {

      })
    }
  }
}
</script>
