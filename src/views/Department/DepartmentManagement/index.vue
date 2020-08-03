<template>
  <d2-container>
    <!-- <template slot="header">header</template> -->
    <!-- <template slot="footer">footer</template> -->
    <el-container class="body">
      <el-aside width="300px">
         <departmentTree />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </d2-container>
</template>

<script>
import departmentTree from "@/components/department/department-tree"
export default {
  components: {
    departmentTree
  },
  data() {
    return {
      data: {}
    }
  },
  created () {}
};
</script>

<style scoped>
</style>
