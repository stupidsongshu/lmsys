<template>
  <div class="main-wrapper">
    <el-button type="primary" @click="back" size="mini">返回产品列表</el-button>

    <el-steps :active="1" simple>
      <el-step title="创建应用" icon="el-icon-edit"></el-step>
      <el-step title="完善信息" icon="el-icon-edit"></el-step>
    </el-steps>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
