<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="4">
        <template slot="title">
          <span class="collapse-item-title">产品特性</span>
        </template>
        <el-form ref="productMaterialFeature" :model="productMaterialFeatureForm" :label-position="labelPosition" label-width="120px">
          <el-form-item label="特性标签">
            <el-button class="btn-multi" v-for="(item, index) in productMaterialFeatureForm.characterLabel" :key="index" @click="tagSelect(item, 'characterLabel')" :disabled="item.disabled" :value="item.text">{{item.text}}</el-button>

            <tag-input name="characterLabel" @characterLabelEmit="propertyConfigAddCharacterLabel"></tag-input>

            <div>
              <el-tag
                :key="tag.text"
                v-for="tag in characterLabelTags"
                closable
                :disable-transitions="false"
                @close="characterLabelTagClose(tag)">
                {{tag.text}}
              </el-tag>
            </div>
          </el-form-item>

          <el-form-item label="适用人群" prop="suitRole">
            <el-button class="btn-multi" v-for="(item, index) in productMaterialFeatureForm.suitRole" :key="index" @click="tagSelect(item, 'suitRole')" :disabled="item.disabled" :value="item.text">{{item.text}}</el-button>

            <tag-input name="suitRole" @suitRoleEmit="propertyConfigAddSuitRole"></tag-input>

            <div>
              <el-tag
                :key="tag.text"
                v-for="tag in suitRoleTags"
                closable
                :disable-transitions="false"
                @close="suitRoleTagClose(tag)">
                {{tag.text}}
              </el-tag>
            </div>
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
import tagInput from './component/tagInput'

export default {
  components: { tagInput },
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
      value5: 3.5,
      characterLabelTags: [],
      suitRoleTags: [],
    }
  },
  computed: {
    ...mapGetters([
      'productId'
    ])
  },
  created() {
    this.propertyConfigGet()
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
      if (!this.productId) return
      let productList = this.productInfo.list

      let characterLabel = []  // 特性标签
      let suitRole       = []  // 适用人群
      let applyProcess   = []  // 申请流程
      let applyCondition = []  // 申请条件
      let applyMaterials = []  // 申请材料

      let characterLabelList = []  // 特性标签
      let suitRoleList       = []  // 适用人群
      let applyProcessList   = []  // 申请流程
      let applyConditionList = []  // 申请条件
      let applyMaterialsList = []  // 申请材料
      var recom_star         = []  // 推荐星数
      var features_label     = []  // 特性状态

      data.forEach(item => {
        switch(item.property) {
          case "character_label":
            characterLabel = item.propertyValueList
            break
          case "suit_role":
            suitRole = item.propertyValueList
            break
          case 'apply_process':
            applyProcess = item.propertyValueList
            break
          case 'apply_condition':
            applyCondition = item.propertyValueList
            break
          case 'apply_materials':
            applyMaterials = item.propertyValueList
            break
        }
      })

      function strToArr(str) {
        var arr = []
        if (str.indexOf(';') !== -1) {
          arr = str.split(';')
        } else {
          arr[0] = str
        }
        return arr
      }

      if (productList.length > 0) {
        productList.forEach(function(item) {
          switch(item[0]) {
            case 'character_label_list':
              characterLabelList = strToArr(item[1]);
              break;
            case 'suit_role_list':
              suitRoleList = strToArr(item[1]);
              break;
            case 'recom_star':
              recom_star = strToArr(item[1]);
              break;
            case 'features_label':
              features_label = strToArr(item[1]);
              break;
            case 'apply_process_list':
              applyProcessList = strToArr(item[1]);
              break;
            case 'apply_condition_list':
              applyConditionList = strToArr(item[1]);
              break;
            case 'apply_materials_list':
              applyMaterialsList = strToArr(item[1]);
              break;
          }
        })
      }

      characterLabel.forEach((item, index, arr) => {
        arr[index] = {
          text: item,
          disabled: false
        }
      })
      characterLabelList.forEach(list => {
        this.characterLabelTags.push({
          text: list,
          disabled: true
        })
        characterLabel.forEach(item => {
          if (list === item.text) {
            item.disabled = true
          }
        })
      })
      suitRole.forEach((item, index, arr) => {
        arr[index] = {
          text: item,
          disabled: false
        }
      })

      this.productMaterialFeatureForm = {
        characterLabel,
        suitRole,
        applyProcess,
        applyCondition,
        applyMaterials
      }
      console.log(this.productMaterialFeatureForm)
    },

    // 标签增删 start
    tagSelect(item, tagName) {
      if (!item.disabled) {
        item.disabled = true
        switch(tagName) {
          case 'characterLabel':
            this.characterLabelTags.push(item)
            break
          case 'suitRole':
            this.suitRoleTags.push(item)
            break
        }
      }
    },
    tagClose(tag, tagArr) {
      tagArr.splice(tagArr.indexOf(tag), 1)
      tag.disabled = false
    },
    characterLabelTagClose(tag) {
      this.tagClose(tag, this.characterLabelTags)
    },
    suitRoleTagClose(tag) {
      this.tagClose(tag, this.suitRoleTags)
    },
    // 标签增删 end

    // 系统参数 start
    // 获取系统参数 后 初始化产品特性和申请信息
    propertyConfigGet() {
      this.$store.dispatch('PropertyConfigGet').then(res => {
        if (res.returnCode === '000000') {
          this.initProductFeatureAndApplyInfo(res.response)
        }
      })
    },
    // 添加系统参数
    propertyConfigAdd(param) {
      this.$store.dispatch('PropertyConfigAdd', param).then(res => {
        if (res.returnCode === '000000') {
          this.$message({
            showClose: true,
            message: res.returnMsg,
            type: 'success'
          })
          this.propertyConfigGet()
        } else {
          this.$message({
            showClose: true,
            message: res.returnMsg,
            type: 'warning'
          })
        }
      })
    },
    // 添加系统参数 -- 特性标签
    propertyConfigAddCharacterLabel(data) {
      let property = 'character_label'
      let propertyValue = data
      this.propertyConfigAdd({property, propertyValue})
    },
    // 添加系统参数 -- 适用人群
    propertyConfigAddSuitRole(data) {
      let property = 'suit_role'
      let propertyValue = data
      this.propertyConfigAdd({property, propertyValue})
    }
    // 系统参数 end
  }
}
</script>

<style lang="scss" scoped>
.btn-multi {
  width: 100px;
  margin-left: 0 !important;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
