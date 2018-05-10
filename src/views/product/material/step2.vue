<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="4">
        <template slot="title">
          <span class="collapse-item-title">产品特性</span>
        </template>
        <el-form ref="productMaterialFeature" :model="productMaterialFeatureForm" :label-position="labelPosition" label-width="120px">
          <el-form-item label="特性标签">
            <el-button v-for="(item, index) in productMaterialFeatureForm.characterLabel" :key="index" @click="selectFeature(item)" :disabled="item.disabled" :value="item.text">{{item.text}}</el-button>
          </el-form-item>

          <el-form-item label="适用人群" prop="suitRole">
            <el-radio-group v-model="productMaterialFeatureForm.suitRole">
              <el-radio-button label="0">日</el-radio-button>
              <el-radio-button label="1">月</el-radio-button>
              <el-radio-button label="2">年</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="推荐星数" prop="recommendStar">
            <el-rate
              v-model="value5"
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </el-form-item>

          <el-form-item label="特性状态" prop="featureState">
            <el-radio-group v-model="productMaterialFeatureForm.featureState">
              <el-radio-button label="hot">HOT</el-radio-button>
              <el-radio-button label="fast">FAST</el-radio-button>
              <el-radio-button label="low">LOW</el-radio-button>
              <el-radio-button label="none">NONE</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>        
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    return {
      activeNames: ['1'],
      labelPosition: 'right',
      productMaterialFeatureForm: {},
      value5: 3.5
    }
  },
  computed: {
    ...mapGetters([
      'productId'
    ])
  },
  created() {
    this.$store.dispatch('PropertyConfig').then(res => {
      if (res.returnCode === '000000') {
        this.initProductFeatureAndApplyInfo(res.response)
      }
    })
    if (this.productId) {
      let productList = this.productInfo.list
      console.log(productList)
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
    // 初始化产品特性和申请信息
    initProductFeatureAndApplyInfo(data) {
      let characterLabel = []  // 特性标签
      let suitRole       = []  // 适用人群
      let apply_process   = []  // 申请流程
      let apply_condition = []  // 申请条件
      let apply_materials = []  // 申请材料

      data.forEach(item => {
        switch(item.property) {
          case "character_label":
            characterLabel = item.propertyValueList
            break
          case "suit_role":
            suitRole = item.propertyValueList
            break
          case 'apply_process':
            apply_process = item.propertyValueList
            break
          case 'apply_condition':
            apply_condition = item.propertyValueList
            break
          case 'apply_materials':
            apply_materials = item.propertyValueList
            break
        }
      })

      characterLabel.forEach((item, index, arr) => {
        arr[index] = {
          text: item,
          disabled: false
        }
      })

      this.productMaterialFeatureForm = {
        characterLabel,
        suitRole
      }
      console.log(this.productMaterialFeatureForm)
    },
    selectFeature(item) {
      if (!item.disabled) {
        item.disabled = !item.disabled
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-selected {

}
</style>

