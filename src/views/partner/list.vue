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
  </div>
</template>

<script>
import { getPartnerList } from '@/api/partner'
export default {
  name: 'partner',
  data() {
    return {
      partnerList: []
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
      console.log(partnerId)
    }
  }
}
</script>
