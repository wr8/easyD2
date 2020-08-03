<template>
  <el-tree
    v-loading="loading"
    :data="departmentList"
    node-key="id"
    highlight-current
    :props="defaultProps"
    :expand-on-click-node="false"
  >
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span>
        <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
        <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
      </span>
    </span>
  </el-tree>
</template>

<script>
import { request } from "../../api/service";
export default {
  data() {
    return {
      loading: true,
      defaultProps: {
        children: "departmentList",
        label: "name",
      },
      departmentList: [],
    };
  },
  created() {
    this.getDepartmentList();
  },
  methods: {
    //获取部门列表
    getDepartmentList() {
      this.loading = true;
      request({
        url: "department/getDepartmentList",
        method: "get",
      }).then((res) => {
        this.loading = false;
        this.departmentList = res.dataModel;
        // console.log(this.departmentList);
      });
    },
    append(data, id = 100) {
      this.$prompt("请输入新增部门名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          const newChild = { id: id++, name: value, departmentList: [] };
          if (!data.departmentList) {
            this.$set(data, "departmentList", []);
          }
          data.departmentList.push(newChild);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    remove(node, data) {
      console.log(node.label, data.name)
      request({
        url: "/department/delDepartment",
        method: "get",
        params: {
          // name: data.name,
          name: node.label,
          }    
      }).then(()=> {
      const parent = node.parent;
      const departmentList = parent.data.departmentList || parent.data;
      const index = departmentList.findIndex((d) => d.id === data.id);
      departmentList.splice(index, 1);
      })
    },
      
  },
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>