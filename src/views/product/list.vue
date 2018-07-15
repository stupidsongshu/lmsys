<template>
  <div class="main-wrapper">
		<el-button-group>
			<el-button type="primary" @click="toProductMaterial()">{{$t('product.addProduct')}}</el-button>
		</el-button-group>

    <el-table :data="productList" border stripe highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column :label="$t('product.productName')">
				<template slot-scope="scope">
					<img :src="scope.row.productIconLink" class="icon-name" /> {{scope.row.productName}}
				</template>
			</el-table-column>
      <el-table-column prop="productStatus" :label="$t('product.onlineStatus')" :filters="[{ text: $t('product.offline'), value: 0 }, { text: $t('product.online'), value: 1 }]" :filter-method="productStatusFilter">
				<template slot-scope="scope">
					<span @click="toggleProductStatus(scope)">
						<span class="offline" v-if="scope.row.productStatus === 0">
							<img :src="iconOffline" alt=""> {{$t('product.offline')}}
						</span>
						<span class="online" v-else-if="scope.row.productStatus === 1">
							<img :src="iconOnline" alt=""> {{$t('product.online')}}
						</span>
					</span>
				</template>
			</el-table-column>
      <el-table-column prop="platformShow" :label="$t('product.showOrNot')">
				<template slot-scope="scope">
					<span @click="toggleProductPlatformShow($event, scope.row)">
						<span class="khw" v-show="scope.row.platformShow.khwShow === undefined || scope.row.platformShow.khwShow === 0"><img class="icon-platformShow" :src="iconEyeClose"> 卡还王</span>
						<span class="khw" v-show="scope.row.platformShow.khwShow === 1"><img class="icon-platformShow" :src="iconEyeOpen"> 卡还王</span>

						<span class="ldk" v-show="scope.row.platformShow.ldkShow === undefined || scope.row.platformShow.ldkShow === 0"><img class="icon-platformShow" :src="iconEyeClose"> 乐贷款</span>
						<span class="ldk" v-show="scope.row.platformShow.ldkShow === 1"><img class="icon-platformShow" :src="iconEyeOpen"> 乐贷款</span>

						<span class="yyd" v-show="scope.row.platformShow.yydShow === undefined || scope.row.platformShow.yydShow === 0"><img class="icon-platformShow" :src="iconEyeClose"> 又一贷</span>
						<span class="yyd" v-show="scope.row.platformShow.yydShow === 1"><img class="icon-platformShow" :src="iconEyeOpen"> 又一贷</span>
					</span>
        </template>
			</el-table-column>
      <el-table-column :label="$t('product.operate')">
        <template slot-scope="scope">
          <el-button @click.native.prevent="toProductMaterial(scope.row.productId)" size="small">{{$t('product.modify')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
		return {
			productList: [],
			iconOffline:  require('../../assets/images/offline.png'),
			iconOnline:   require('../../assets/images/online.png'),
			iconEyeClose: require('../../assets/images/eye-close.png'),
			iconEyeOpen:  require('../../assets/images/eye-open.png')
		}
	},
	created() {
		this.getProductList()
	},
	methods: {
		// 获取产品列表
		getProductList() {
			this.productList = []

			this.$store.dispatch('ProductList').then(res => {
				if (res.returnCode = '000000') {
					res.response.forEach(item => {
						let platformShow = {
							khwShow: 0, // khwShow为undefined或0时表示在卡还王上不展示，为1时表示在卡还王上展示
							ldkShow: 0,
							yydShow: 0,
						}
						if (item.list !== undefined) {
							item.list.forEach(function(listItem) {
								if (listItem[0] === 'khw_show') {
									platformShow.khwShow = parseInt(listItem[1])
								} else if (listItem[0] === 'ldk_show') {
									platformShow.ldkShow = parseInt(listItem[1])
								}  else if (listItem[0] === 'yyd_show') {
									platformShow.yydShow = parseInt(listItem[1])
								}
							})
						}
						item.product.platformShow = platformShow

						this.productList.push(item.product)
					})
				}
			})
		},
		// 切换产品上下线状态
		toggleProductStatus(scope) {
			let param = {
				productId: scope.row.productId,
				productStatus: parseInt(scope.row.productStatus) === 0 ? 1 : 0
			}
			this.$store.dispatch('ProductUpdateStatus', param).then(res => {
				this.$message({
					showClose: true,
					message: res.returnMsg
				})
				if (res.returnCode === '000000') {
					this.getProductList()
				}
			})
		},
		// 切换产品特定展示状态
		toggleProductPlatformShow(e, product) {
			let platformName = e.target.getAttribute('class')

			// khwShow为undefined或0时表示在卡还王上不展示，为1时表示在卡还王上展示
			let khwShow = product.platformShow.khwShow === undefined ? 0 : product.platformShow.khwShow
			let ldkShow = product.platformShow.ldkShow === undefined ? 0 : product.platformShow.ldkShow
			let yydShow = product.platformShow.yydShow === undefined ? 0 : product.platformShow.yydShow

			let param = {
				productId: product.productId
			}

			switch(platformName) {
				case 'khw':
					khwShow = parseInt(khwShow === 0 ? 1 : khwShow === 1 ? 0 : khwShow)
					if (khwShow !== 0 && khwShow !== 1) {
						this.$message('服务器返回的参数khwShow不正确：' + khwShow)
						return
					}
					param.khwShow = khwShow
					break;
				case 'ldk':
					ldkShow = parseInt(ldkShow === 0 ? 1 : ldkShow === 1 ? 0 : ldkShow)
					if (ldkShow !== 0 && ldkShow !== 1) {
						this.$message('服务器返回的参数ldkShow不正确：' + ldkShow)
						return
					}
					param.ldkShow = ldkShow
					break;
				case 'yyd':
					yydShow = parseInt(yydShow === 0 ? 1 : yydShow === 1 ? 0 : yydShow)
					if (yydShow !== 0 && yydShow !== 1) {
						this.$message('服务器返回的参数yydShow不正确：' + yydShow)
						return
					}
					param.yydShow = yydShow
					break;
			}

			this.$store.dispatch('ProductUpdateShow', param).then(res => {
				this.$message({
					showClose: true,
					message: res.returnMsg
				})
				if (res.returnCode === '000000') {
					this.getProductList()
				}
			})
		},
		// 过滤产品上线状态
		productStatusFilter(value, row) {
			return row.productStatus === value
		},
		// 产品新增或修改
		toProductMaterial(productId) {
			if (productId) {
				this.$store.dispatch('SetProductId', productId)
			} else {
				this.$store.dispatch('SetProductId', '')
			}

			this.$router.push({name: 'productMaterial'})
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.icon-name {
		width: 32px;
		height: 32px;
	}
	.icon-platformShow {
		width: 26px;
	}
	.online {
    color: #409EFF;
    cursor: pointer;
	}
	.offline {
    color: grey;
    cursor: pointer;
	}
</style>
