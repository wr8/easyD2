<template>
  <el-card class="box-card">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>您目前的操作会删除该部门，包括其子公司以下架构，您确认该操作吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-tree
    default-expand-all
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
          <el-button type="text" size="mini" @click="() => append(data, node)">Append</el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
        </span>
      </span>
    </el-tree>
  </el-card>
</template>

<script>
import { request } from "../../api/service";
export default {
  data() {
    return {
      dialogVisible: false,
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
    //新增部门
    append(data, node, id = 100) {
      console.log(node);
      const addList = {};

      //递归添加parentname参数
      function deepSearch(node) {
        if (node.parent == null) return;
        addList[`parentName${node["level"] - 1}`] = node.label;
        return deepSearch(node.parent);
      }
      deepSearch(node);

      this.$prompt("请输入新增部门名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value, id = 100 }) => {
          //调用新增接口
          request({
            url: "department/addDepartment",
            method: "get",
            params: {
              ...addList,
              level: node.data.level + 1,
              name: value,
              parentId: node.data.id,
            },
          }).then(() => {
            this.getDepartmentList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //删除部门
    remove(node, data) {
      this.$confirm("确认关闭？")
        .then((_) => {
          request({
            url: "/department/delDepartment",
            method: "get",
            params: {
              // name: data.name,
              name: node.label,
            },
          }).then(() => {
            const parent = node.parent;
            const departmentList = parent.data.departmentList || parent.data;
            const index = departmentList.findIndex((d) => d.id === data.id);
            departmentList.splice(index, 1);
          });
        })
        .catch((_) => {});
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