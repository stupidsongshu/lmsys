<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="4">
        <template slot="title">
          <span class="collapse-item-title">{{$t('product.productFeature')}}</span>
        </template>
        <el-form ref="productMaterialFeature" :model="productMaterialFeatureForm" :label-position="labelPosition" label-width="130px">
          <el-form-item :label="$t('product.featureTag')">
            <el-button
              class="btn-multi"
              v-for="(item, index) in productMaterialFeatureForm.characterLabelList"
              :key="index"
              @click="tagSelect(item, 'characterLabel')"
              :disabled="item.disabled"
              :value="item.text">
              {{item.text}}
            </el-button>

            <tag-input
              name="characterLabel"
              :list="productMaterialFeatureForm.characterLabelList"
              v-on:tagInputEmit="propertyConfigAddEvent">
            </tag-input>

            <div>
              <el-tag
                :key="tag.text"
                v-for="tag in characterLabelTags"
                closable
                :disable-transitions="false"
                @close="tagClose(tag, 'characterLabel')">
                {{tag.text}}
              </el-tag>
            </div>
          </el-form-item>

          <el-form-item :label="$t('product.suitRole')" prop="suitRole">
            <el-button
              class="btn-multi"
              v-for="(item, index) in productMaterialFeatureForm.suitRoleList"
              :key="index"
              @click="tagSelect(item, 'suitRole')"
              :disabled="item.disabled"
              :value="item.text">
              {{item.text}}
            </el-button>

            <tag-input
              name="suitRole"
              :list="productMaterialFeatureForm.suitRoleList"
              v-on:tagInputEmit="propertyConfigAddEvent">
            </tag-input>

            <div>
              <el-tag
                :key="tag.text"
                v-for="tag in suitRoleTags"
                closable
                :disable-transitions="false"
                @close="tagClose(tag, 'suitRole')">
                {{tag.text}}
              </el-tag>
            </div>
          </el-form-item>

          <el-form-item :label="$t('product.recommondStar')" prop="recommendStar">
            <el-rate
              v-model="productMaterialFeatureForm.recomStar"
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </el-form-item>

          <el-form-item :label="$t('product.featureState')" prop="featureState">
            <el-radio-group v-model="productMaterialFeatureForm.featureState">
              <el-radio-button label="hot">HOT</el-radio-button>
              <el-radio-button label="fast">FAST</el-radio-button>
              <el-radio-button label="low">LOW</el-radio-button>
              <el-radio-button label="none">NONE</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="productMaterialFeatureUpdate">{{$t('product.save')}}</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item name="5">
        <template slot="title">
          <span class="collapse-item-title">{{$t('product.applyInfo')}}</span>
        </template>
        <el-form ref="productApply" :model="productApplyInfoForm" :label-position="labelPosition" label-width="120px">
          <!-- <el-form-item label="产品申请流程">
            <el-button
              class="btn-multi"
              v-for="(item, index) in productApplyInfoForm.applyProcessList"
              :key="index" @click="tagSelect(item, 'characterLabel')"
              :disabled="item.disabled"
              :value="item.text">
              {{item.text}}
            </el-button>

            <div>
              <el-tag
                :key="tag.text"
                v-for="tag in applyProcessTags"
                closable
                :disable-transitions="false"
                @close="tagClose(tag, 'applyProcess')">
                {{tag.text}}
              </el-tag>
            </div>
          </el-form-item> -->
          <el-form-item :label="$t('product.applyProcess')">
            <span
              class="process-img-container"
              :class="{'selected': item.disabled}"
              v-for="(item, index) in productApplyInfoForm.applyProcessList"
              :key="index"
              @click="tagSelect(item, 'applyProcess')"
              :disabled="item.disabled">
              <img class="process-img" :src="'../../../../static/process/' + item.text + '.png'" alt="">
            </span>

            <div>
              <el-tag
                class="process-tag"
                v-for="tag in applyProcessTags"
                :key="tag.text"
                closable
                :disable-transitions="false"
                @close="tagClose(tag, 'applyProcess')">
                <img class="process-img" :src="'../../../../static/process/' + tag.text + '.png'" alt="">
              </el-tag>
            </div>
          </el-form-item>

          <el-form-item :label="$t('product.applyCondition')">
            <el-button class="btn-multi"
              v-for="(item, index) in productApplyInfoForm.applyConditionList"
              :key="index"
              @click="tagSelect(item, 'applyCondition')"
              :disabled="item.disabled"
              :value="item.text">
              {{item.text}}
            </el-button>

            <tag-input
              name="applyCondition"
              :list="productApplyInfoForm.applyConditionList"
              v-on:tagInputEmit="propertyConfigAddEvent">
            </tag-input>

            <div>
              <el-tag
                :key="tag.text"
                v-for="tag in applyConditionTags"
                closable
                :disable-transitions="false"
                @close="tagClose(tag, 'applyCondition')">
                {{tag.text}}
              </el-tag>
            </div>
          </el-form-item>

          <el-form-item :label="$t('product.applyMaterial')">
            <el-button
              class="btn-multi"
              v-for="(item, index) in productApplyInfoForm.applyMaterialsList"
              :key="index"
              @click="tagSelect(item, 'applyMaterials')"
              :disabled="item.disabled"
              :value="item.text">
              {{item.text}}
            </el-button>

            <tag-input
              name="applyMaterials"
              :list="productApplyInfoForm.applyMaterialsList"
              v-on:tagInputEmit="propertyConfigAddEvent">
            </tag-input>

            <div>
              <el-tag
                :key="tag.text"
                v-for="tag in applyMaterialsTags"
                closable
                :disable-transitions="false"
                @close="tagClose(tag, 'applyMaterials')">
                {{tag.text}}
              </el-tag>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="productApplyInfoUpdate">{{$t('product.save')}}</el-button>
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
      // 产品特性
      productMaterialFeatureForm: {},
      // recomStarVal: 3.5,
      characterLabelTags: [], // 已选系统参数的标签组合 -- 特性标签
      suitRoleTags: [],       // 已选系统参数的标签组合 -- 适用人群
      // 申请信息
      productApplyInfoForm: {},
      applyConditionTags: [], // 已选系统参数的标签组合 -- 产品申请条件
      applyMaterialsTags: [], // 已选系统参数的标签组合 -- 产品申请材料
      applyProcessTags: []    // 已选系统参数的标签组合 -- 产品申请流程
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
            message: this.$t('product.pleaseCreateProductFirst'),
            type: 'warning'
          })
        }
      })
    },
    // 初始化产品特性和申请信息
    initProductFeatureAndApplyInfo(data) {
      if (!this.productId) return
      let productList = this.productInfo.list

      // 所有的系统参数
      let characterLabelList = [] // 特性标签
      let suitRoleList       = [] // 适用人群
      let applyProcessList   = [] // 申请流程
      let applyConditionList = [] // 申请条件
      let applyMaterialsList = [] // 申请材料

      // 选定产品已有的系统参数
      let characterLabelTags = [] // 特性标签
      let suitRoleTags       = [] // 适用人群
      let applyProcessTags   = [] // 申请流程
      let applyConditionTags = [] // 申请条件
      let applyMaterialsTags = [] // 申请材料
      let recomStarTags      = [] // 推荐星数
      let featuresLabelTags  = [] // 特性状态

      data.forEach(item => {
        switch(item.property) {
          case "character_label":
            characterLabelList  = item.propertyValueList
            break
          case "suit_role":
            suitRoleList        = item.propertyValueList
            break
          case 'apply_process':
            applyProcessList    = item.propertyValueList
            break
          case 'apply_condition':
            applyConditionList  = item.propertyValueList
            break
          case 'apply_materials':
            applyMaterialsList  = item.propertyValueList
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
              characterLabelTags = strToArr(item[1])
              break
            case 'suit_role_list':
              suitRoleTags       = strToArr(item[1])
              break
            case 'recom_star':
              recomStarTags      = strToArr(item[1])
              break
            case 'features_label':
              featuresLabelTags  = strToArr(item[1])
              break
            case 'apply_process_list':
              applyProcessTags   = strToArr(item[1])
              break
            case 'apply_condition_list':
              applyConditionTags = strToArr(item[1])
              break
            case 'apply_materials_list':
              applyMaterialsTags = strToArr(item[1])
              break
          }
        })
      }

      this.handleListTags('characterLabel', characterLabelList, characterLabelTags)
      this.handleListTags('suitRole', suitRoleList, suitRoleTags)
      this.handleListTags('applyCondition', applyConditionList, applyConditionTags)
      this.handleListTags('applyMaterials', applyMaterialsList, applyMaterialsTags)
      this.handleListTags('applyProcess', applyProcessList, applyProcessTags)

      this.productMaterialFeatureForm = {
        characterLabelList,
        suitRoleList,
        recomStar: parseFloat(recomStarTags[0]),
        featureState: featuresLabelTags[0]
      }
      this.productApplyInfoForm = {
        applyProcessList,
        applyConditionList,
        applyMaterialsList
      }
      console.log(this.productMaterialFeatureForm)
      console.log(this.productApplyInfoForm)
    },
    /**
     * @description 第一步初始化'所有的系统参数'；第二步根据'选定产品已有的系统参数'处理标签组合、系统参数列表
     * @param {String} name 需要处理的系统参数
     * @param {Array}  list 所有的系统参数
     * @param {Array}  tags 选定产品已有的系统参数
     */
    handleListTags(name, list, tags) {
      // 第一步初始化'所有的系统参数'
      list.forEach((item, index, arr) => {
        arr[index] = {
          text: item,
          disabled: false
        }
      })
      // 第二步根据'选定产品已有的系统参数'处理标签组合、系统参数列表
      tags.forEach(tag => {
        switch (name) {
          case 'characterLabel':
            this.characterLabelTags.push({
              text: tag,
              disabled: true
            })
            break
          case 'suitRole':
            this.suitRoleTags.push({
              text: tag,
              disabled: true
            })
            break
          case 'applyCondition':
            this.applyConditionTags.push({
              text: tag,
              disabled: true
            })
            break
          case 'applyMaterials':
            this.applyMaterialsTags.push({
              text: tag,
              disabled: true
            })
            break
          case 'applyProcess':
            this.applyProcessTags.push({
              text: tag,
              disabled: true
            })
            break
        }
        list.forEach((item, index, arr) => {
          if (tag === item.text) {
            item.disabled = true
          }
        })
      })
    },

    // 标签增删 start
    tagSelect(item, tagName) {
      if (!item.disabled) {
        item.disabled = true
        switch (tagName) {
          case 'characterLabel':
            this.characterLabelTags.push(item)
            break
          case 'suitRole':
            this.suitRoleTags.push(item)
            break
          case 'applyCondition':
            this.applyConditionTags.push(item)
            break
          case 'applyMaterials':
            this.applyMaterialsTags.push(item)
            break
          case 'applyProcess':
            this.applyProcessTags.push(item)
            break
        }
      }
    },
    tagClose(tag, name) {
      let tagArr = []
      let propertyConfigArr = []

      switch (name) {
        case 'characterLabel':
          tagArr = this.characterLabelTags
          propertyConfigArr = this.productMaterialFeatureForm.characterLabelList
          break
        case 'suitRole':
          tagArr = this.suitRoleTags
          propertyConfigArr = this.productMaterialFeatureForm.suitRoleList
          break
        case 'applyCondition':
          tagArr = this.applyConditionTags
          propertyConfigArr = this.productApplyInfoForm.applyConditionList
          break
        case 'applyMaterials':
          tagArr = this.applyMaterialsTags
          propertyConfigArr = this.productApplyInfoForm.applyMaterialsList
          break
        case 'applyProcess':
          tagArr = this.applyProcessTags
          propertyConfigArr = this.productApplyInfoForm.applyProcessList
          break
      }

      tagArr.splice(tagArr.indexOf(tag), 1)
      // tag.disabled = false // bug 不会更新
      for (let i = 0, len = propertyConfigArr.length; i < len; i ++) {
        if (propertyConfigArr[i].text === tag.text) {
          propertyConfigArr[i].disabled = false
          break
        }
      }
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
    // 添加系统参数 -- 监听子组件 tagInput 的 emit 事件
    propertyConfigAddEvent(data) {
      let property = ''
      let propertyValue = data.value
      switch (data.name) {
        case 'characterLabel':
          property = 'character_label'
          break
        case 'suitRole':
          property = 'suit_role'
          break
      }
      // console.log({property, propertyValue}) // 执行多达28次?
      // this.propertyConfigAdd({property, propertyValue})
    },
    // 系统参数 end

    productMaterialFeatureUpdate() {
      let characterLabelTagsStr = ''
      let suitRoleTagsStr = ''
      this.characterLabelTags.forEach((item, index) => {
        if (index < this.characterLabelTags.length - 1) {
          characterLabelTagsStr += item.text + ';'
        } else {
          characterLabelTagsStr += item.text
        }
      })
      this.suitRoleTags.forEach((item, index) => {
        if (index < this.suitRoleTags.length - 1) {
          suitRoleTagsStr += item.text + ';'
        } else {
          suitRoleTagsStr += item.text
        }
      })

      let param = {
        productId: this.productId,
        characterLabelList: characterLabelTagsStr,
        suitRoleList: suitRoleTagsStr,
        featuresLabel: this.productMaterialFeatureForm.featureState,
        recomStar: '' + this.productMaterialFeatureForm.recomStar
      }

      this.$store.dispatch('ProductUpdateCharacter', param).then(res => {
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
    },
    productApplyInfoUpdate() {
      let applyConditionTagsStr = ''
      let applyMaterialsTagsStr = ''
      this.applyConditionTags.forEach((item, index) => {
        if (index < this.applyConditionTags.length - 1) {
          applyConditionTagsStr += item.text + ';'
        } else {
          applyConditionTagsStr += item.text
        }
      })
      this.applyMaterialsTags.forEach((item, index) => {
        if (index < this.applyMaterialsTags.length - 1) {
          applyMaterialsTagsStr += item.text + ';'
        } else {
          applyMaterialsTagsStr += item.text
        }
      })

      console.log(applyConditionTagsStr)
      console.log(applyMaterialsTagsStr)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-rate {
  line-height: 2.5;
}
.btn-multi {
  width: 100px;
  margin-left: 0 !important;
  margin-right: 10px;
  margin-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
}
.process-img-container {
  display: inline-block;
  margin-right: 10px;
  padding: 5px;
  line-height: 1;
  cursor: pointer;
}
.process-img {
  width: 60px;
}
.process-tag {
  height: auto;
  margin-right: 10px;
  padding: 5px;
  line-height: 1;
}
.selected {
  border: 2px dashed #dcdfe6;
  background-color: #e8f4ff;
  cursor: not-allowed;
}
</style>
