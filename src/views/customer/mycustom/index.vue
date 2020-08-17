<template>
  <d2-container>
    <template slot="header">
      <el-form ref="form" :model="form" :inline="true" label-width="100px">
        <el-form-item label="客户">
          <el-input v-model="form.keywords" placeholder="姓名/id/用户名均可"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="星级">
          <el-select v-model="form.level" placeholder="请选择">
            <el-option label="所有" value></el-option>
            <el-option label="0星" value="0"></el-option>
            <el-option label="1星" value="1"></el-option>
            <el-option label="2星" value="2"></el-option>
            <el-option label="3星" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.noteContent"></el-input>
        </el-form-item>
        <el-form-item label="备注条数">
          <el-input v-model="form.searchValue"></el-input>
        </el-form-item>
        <el-form-item label="未联系天数">
          <el-input v-model="form.weiLianXiDays"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-select v-model="form.timeType" placeholder="分类">
            <el-option label="备注时间" value="distributionTime"></el-option>
            <el-option label="分配时间" value="noteTime"></el-option>
          </el-select>
          <el-date-picker
            v-model="time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="timestamp"
            :disabled="form.timeType==null"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="getUserList">查询</el-button>
          <el-button type="primary" @click="onSubmit">添加客户</el-button>
          <el-button type="primary" @click="onSubmit">加入公共池</el-button>
          <el-button type="primary" @click="onSubmit">导入数据</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table
      @selection-change="changeCus"
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      stripe
      v-cloak
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="id" label="ID" width="70" align="center"></el-table-column>
      <el-table-column label="姓名" width="70" align="center">
        <template slot-scope="scope">
          <a
            class="toEdit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >{{ scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.state == '资质不符' " style="color:#C73E3A">{{ scope.row.state}}</span>
          <span
            v-else-if=" scope.row.state == '已签约'||scope.row.state == '已上门'  || scope.row.state == '待签约'|| scope.row.state == '已放款'|| scope.row.state == '审核中'"
            style="color:#5BBD2B"
          >{{ scope.row.state}}</span>
          <span
            v-else-if="scope.row.state == '已受理' || scope.row.state == '未接通' || scope.row.state == '待跟进'"
            style="color:#3390ff"
          >{{ scope.row.state}}</span>
          <span
            v-else-if="scope.row.state == '捣乱申请' || scope.row.state == '已拒批' || scope.row.state == '外地申请'||  scope.row.state == '重复申请'"
            style="color:#D7962F"
          >{{ scope.row.state}}</span>
          <span v-else style="color:grey">{{ scope.row.state}}</span>
        </template>
      </el-table-column>
      <el-table-column label="星级" width="50" align="center">
        <template slot-scope="scope">{{ scope.row.level }}</template>
      </el-table-column>
      <el-table-column label="备注" sortable>
        <template slot-scope="scope">
          <p
            class="ell"
            v-for="(item,index) in scope.row.noteList"
            :key="index"
            :v-if="index<3"
            v-bind:style="{'color': item.otherUser == 1 ? 'red':'#606266'}"
          >
            &nbsp;
            <span
              v-bind:style="{'color': item.otherUser == 1 ? '#898989':'#898989'}"
            >{{++index}}--{{item.createDate |formatTime }}--{{item.userName}}</span>
            --{{item.content}}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="资质" width="200" align="center">
        <template slot-scope="scope">
          <apan>{{ scope.row.remarks | remarksPanKong}}</apan>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="150" align="center">
        <template slot-scope="scope">
          <p class="ell">申请：{{ scope.row.distributionTime | formatTime }}</p>
          <!-- <p class="ell">回访：{{ scope.row.returnVisitTime | formatTime }}</p> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:10px;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.pageNo"
      :page-sizes="[30,50,100]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="form.total"
    ></el-pagination>
  </d2-container>
</template>

<script>
import { request } from "@/api/service";
import en from "faker/lib/locales/en";
export default {
  name: "mycustom",
  data() {
    return {
      //搜索条件
      time: [],
      form: {
        pageNo: 1,
        pageSize: 30,
        keywords: "",
        level: "",
        state: "",
        noteContent: "",
        timeType: null,
        total: 0,
      },
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().toLocaleDateString());
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "昨日",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近七天",
            onClick(picker) {
              const end = new Date(new Date().toLocaleDateString());
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              //当月一号时间戳
              start.setDate(1);
              start.setHours(0);
              start.setSeconds(0);
              start.setMinutes(0);
              // start.setTime(start.getTime());
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上月",
            onClick(picker) {
              // 上月一号时间戳
              const myStart = new Date();
              let year = myStart.getFullYear();
              let month = myStart.getMonth();
              if (month === 0) {
                month = 12;
                year = year - 1;
              } else if (month < 10) {
                month = "0" + month;
              }
              const start = new Date(`${year}-${month}-01`); //上月一号上午8:00,后台处理过,实在不行setHours(0)
              const end = new Date();
              end.setDate(1);
              end.setHours(0);
              end.setSeconds(0);
              end.setMinutes(0)
              end.setTime(end.getTime() - 3600 * 1000 * 8+ 1);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      //进度动态生成内容
      statusList: [
        { id: "所有", name: "" },
        { id: "已受理", name: "已受理" },
        { id: "未接通", name: "未接通" },
        { id: "待跟进", name: "待跟进" },
        { id: "无意向", name: "无意向" },
        { id: "待签约", name: "待签约" },
        { id: "已上门", name: "已上门" },
        { id: "已签约", name: "已签约" },
        { id: "捣乱申请", name: "捣乱申请" },
        { id: "重复申请", name: "重复申请" },
        { id: "外地申请", name: "外地申请" },
      ],
    };
  },
  methods: {
    getUserList() {
      request({
        url: "/customer/getMyCustomerList",
        params: {
          ...this.form,
          beginTime: this.time[0],
          endTime: this.time[1],
        },
      }).then( res => {
        this.tableData = res.dataModel.list
        this.form.total = res.dataModel.total
      });
    },
    handleSizeChange(val) {
      this.pageConfig.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pageConfig.pageNo = val;
      this.getUserList();
    },
  },
  created() {
    this.getUserList();
  },
};
</script>