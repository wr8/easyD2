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
              <el-form class="topSearch" :inline="true">
                <el-form-item label="成员搜索">
                  <el-input v-model="pageConfig.searchValue" class="aa" placeholder="姓名/id/用户名均可"></el-input>
                </el-form-item>
                <el-form-item label>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="float: right"
                    @click="$router.push({ path: '/DepartmentAdd' })"
                  >添加成员</el-button>
                </el-form-item>
                <el-form-item>
                  <el-switch
                    v-model="pageConfig.value1"
                    active-text="显示离职"
                    inactive-text="隐藏离职"
                    change
                  ></el-switch>
                </el-form-item>
                <br />
                <el-form-item label="批量设置">
                  <el-button type="primary" @click="batchFun('login',1)">允许登陆</el-button>
                  <el-button type="primary" @click="batchFun('login',0)">禁止登陆</el-button>
                  <el-button type="primary" @click="batchFun('isNeedData',1)">打开数据</el-button>
                  <el-button type="primary" @click="batchFun('isNeedData',0)">关闭数据</el-button>
                  <el-input
                    v-model="batch.distributionCount"
                    class="aa"
                    placeholder="设置接收上线"
                    style="display: inline-block;width:250px;margin-left:20px"
                  ></el-input>
                  <el-button type="primary" @click="batchFun('distributionCount')">接收上限</el-button>
                </el-form-item>
              </el-form>
            </div>

            <div class="text item">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                stripe
                border
                :header-cell-style="cellstyle"
                :cell-style="cellstyle"
                max-height="600"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="姓名" width="100" fixed>
                  <template slot-scope="scope">
                    <el-link
                      type="primary"
                      @click="$router.push({ path: `/DepartmentEdit/${scope.row.id}` })"
                    >{{scope.row.name}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column label="部门" width="150">
                  <template slot-scope="scope">{{ scope.row | departmentNames }}</template>
                </el-table-column>
                <el-table-column prop="companyPosition" label="岗位" width="150"></el-table-column>
                <el-table-column prop="distributionCount" label="当日上限" width="80"></el-table-column>
                <el-table-column prop="updateDisCount" label="日已分配" width="80"></el-table-column>
                <el-table-column prop="updateDisCount" label="月已分配" width="80"></el-table-column>
                <el-table-column prop="updateDisCount" label="当前总量" width="80"></el-table-column>
                <el-table-column prop="updateDisCount" label="当前总量" width="80"></el-table-column>
                <el-table-column prop="updateDisCount" label="当前总量" width="80"></el-table-column>
                <el-table-column label="数据开关" width="100">
                  <template slot-scope="scope">
                    <el-button type="success" disabled v-if="scope.row.isNeedData">允许</el-button>
                    <el-button type="warning" disabled v-else>禁止</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="登陆开关" width="100">
                  <template slot-scope="scope">
                    <el-button type="success" disabled v-if="scope.row.prohibitLogin">允许</el-button>
                    <el-button type="warning" disabled v-else>禁止</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="margin-top:10px;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageConfig.pageNo"
                :page-sizes="[1,30,50,100]"
                :page-size="pageConfig.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageConfig.total"
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
import { request } from "../../../api/service";
import log from "@/libs/util.log";

export default {
  name: "Department",
  components: {
    departmentTree,
  },
  data() {
    return {
      cellstyle: {
        textAlign: "center",
      },
      batch: {
        distributionCount: "",
        userIdArray: [],
      },
      pageConfig: {
        value1: true,
        pageNo: 1, //当前页
        pageSize: 30, //当前单页数据条数
        searchValue: "",
        total: 0, //请求到的数据总条数
      },
      tableData: [],
    };
  },
  created() {
    //初始获取用户列表
    this.getUserList();
  },
  methods: {
    onSubmit() {
      this.getUserList();
    },
    //表格多选框
    handleSelectionChange(val) {
      let arr = [];
      val.map((v) => {
        arr.push(v.id);
      });
      this.batch.userIdArray = arr;
      console.log(this.batch.userIdArray);
    },
    //分页方法
    handleSizeChange(val) {
      this.pageConfig.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pageConfig.pageNo = val;
      this.getUserList();
    },
    //获取用户列表
    getUserList(page) {
      request({
        url: "user/userList",
        params: {
          ...this.pageConfig,
        },
      }).then((res) => {
        this.tableData = res.dataModel.list;
        this.pageConfig.total = res.dataModel.total;
      });
    },
    //批量方法
    batchFun(type, onOff) {
      // request({
      //   url: "user/updateLoginAndData",
      //   methods: "post",
      //   data: {
      //     // 展开数组出错不知道什么问题
      //     ...this.bach,
      //     // distributionCount: this.batch.distributionCount,
      //     // userIdArray:  JSON.stringify(this.batch.userIdArray),
      //     onOff,
      //     type
      //   }
      // })
      request({
        url: "user/updateLoginAndData",
        params: {
          //展开数组出错不知道什么问题
          // ...this.bach
          distributionCount: this.batch.distributionCount,
          userIdArray: this.batch.userIdArray.toString(),
          onOff,
          type,
        },
      }).then((res) => {
        this.getUserList();
      });
    },
  },
  filters: {
    departmentNames(val) {
      let str = val.departmentName2 || "--";
      if (val.departmentName3) str = str + "--" + val.departmentName3;
      else if (val.departmentName4) str = str + "-- " + val.departmentName4;
      return str;
    },
  },
};
</script>

<style scoped>
.el-form-item--default {
  margin-left: 30px;
}
.el-pagination__sizes input.el-input__inner {
  width: 100%;
}
.is-in-pagination input.el-input__inner {
  width: 100%;
}
</style>
