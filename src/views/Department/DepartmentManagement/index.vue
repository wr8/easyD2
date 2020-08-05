<template>
  <d2-container>
    <!-- <template slot="header">header</template> -->
    <!-- <template slot="footer">footer</template> -->
    <el-container class="body">
      <el-aside width="300px">
        <departmentTree />
      </el-aside>
      <el-container>
        <el-main>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-form class="topSearch" :inline="true" :model="formInline">
                <el-form-item label="成员搜索">
                  <el-input v-model="formInline.user" class="aa" placeholder="姓名/id/用户名均可"></el-input>
                </el-form-item>
                <el-form-item label>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="float: right"
                    @click="$router.push({ path: '/DepartmentAdd' })"
                  >添加顾问</el-button>
                </el-form-item>
                <el-form-item>
                  <el-switch v-model="value1" active-text="显示离职" inactive-text="隐藏离职" change></el-switch>
                </el-form-item>
              </el-form>
            </div>
            <div class="text item">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="日期" width="120">
                  <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
              </el-table>
              <el-pagination
              style="margin-top:10px;"
              background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[30,50,100]"
                :page-size="50"
                layout="total, sizes, prev, pager, next, jumper"
                :total="250"
              ></el-pagination>
            </div>
          </el-card>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </d2-container>
</template>

<script>
import departmentTree from "@/components/department/department-tree";
export default {
  name: "Department",
  components: {
    departmentTree,
  },
  data() {
    return {
      data: {},
      value1: true,
      formInline: {
        user: "",
      },
      currentPage4: "4"
    };
  },
  created() {},
};
</script>

<style scoped>
.el-form-item--default {
  margin-left: 30px;
}
/deep/.el-input--mini .el-input__inner  {
  width: 100px;
}
/deep/.aa input.el-input__inner {
  width: 220px;
}
/deep/input.el-input__inner {
  width: 40px;
}
</style>
