<template>
  <div class="main-wrapper">
    <el-row>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="toProductList">返回产品列表</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="changeStep('prev')" :disabled="btnPrev">上一步</el-button>
          <el-button type="primary" size="small" @click="changeStep('next')" :disabled="btnNext">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-steps :active="activeStep" simple>
      <el-step title="创建应用" icon="el-icon-edit"></el-step>
      <el-step title="完善信息" icon="el-icon-edit"></el-step>
    </el-steps>

    <router-view v-if="!productId"></router-view>
    <router-view v-if="productId && productInfo.product" :productInfo="productInfo"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeStep: 1,
      btnPrev: false,
      btnNext: false,
      productInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'productId'
    ])
  },
  created() {
    this.activeStep = this.$route.meta.step

    if (this.productId) {
      let param = {
        productId: this.productId
      }
      this.$store.dispatch('ProductFind', param).then(res => {
        if (res.returnCode === '000000') {
          this.productInfo = res.response
        }
      })
    }
  },
  watch: {
    activeStep(step) {
      if (step === 1) {
        this.btnPrev = true
        this.btnNext = false
      } else if (step === 2) {
        this.btnPrev = false
        this.btnNext = true
      }

      switch(step) {
        case 1:
          this.$router.push({name: 'productMaterialStep' + step})
          break
        case 2:
          this.$router.push({name: 'productMaterialStep' + step})
          break
      }
    }
  },
  methods: {
    toProductList() {
      this.$router.push({name: 'productList'})
    },
    changeStep(action) {
      if (action === 'prev') {
        if (this.activeStep > 1) {
          this.activeStep--
        }
      }
      if (action === 'next') {
        if (this.activeStep < 2) {
          this.activeStep++
        }
      }
    }
  }
}
</script>

<style lang="scss">
.collapse-item-title {
  padding-left: 1rem;
  border-left: 3px solid #409EFF;
  color: #409EFF;
  font-size: 1rem;
  font-weight: bold;
}
</style>
