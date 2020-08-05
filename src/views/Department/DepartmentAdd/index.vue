<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-form ref="form" :model="form" :inline="true" label-width="120px">
          <el-form-item label="当前岗位*">
            <!-- <el-select v-model="for m.companyPosition" @change="levelLimited" placeholder> -->
            <el-select
              v-model="form.companyPosition"
              @change="changeCompany"
              placeholder="请选择岗位(必填项"
            >
              <el-option v-if="ShowManger.showCity" label="城市负责人" value="城市负责人"></el-option>
              <el-option v-if="ShowManger.showCity" label="城市负责人(储备)" value="城市负责人(储备)"></el-option>
              <el-option v-if="ShowManger.showFen" label="分公司负责人" value="分公司负责人"></el-option>
              <el-option v-if="ShowManger.showFen" label="分公司负责人(储备)" value="分公司负责人(储备)"></el-option>
              <el-option v-if="ShowManger.showQu" label="区长" value="区长"></el-option>
              <el-option v-if="ShowManger.showQu" label="区长(储备)" value="区长(储备)"></el-option>
              <el-option v-if="ShowManger.showBu" label="部长" value="部长"></el-option>
              <el-option v-if="ShowManger.showBu" label="部长(储备)" value="部长(储备)"></el-option>
              <el-option v-if="ShowManger.showGuWen" label="顾问" value="顾问"></el-option>
              <el-option v-if="ShowManger.showGuWen" label="学徒" value="学徒"></el-option>
              <!-- <el-option v-for="item in partList" :key="item.id" :label="item.name" :value="item.id"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-cascader
            show-all-levels="false"
              v-model="form.deaprtmentArray"
              :options="options"
              @focus="changdeaprtment"
              :props="{ expandTrigger: 'click' ,children: 'departmentList',
        label: 'name',value:'id',checkStrictly: true,disabled:'disabled'}"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="就职状态*">
            <el-select v-model="form.departure" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="离职时间" v-if="form.departure">
            <el-date-picker v-model="form.outTime" type="date" placeholder="请录入离职日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="禁止登陆">
            <el-select v-model="form.prohibitLogin" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分配号码/账号">
            <el-input v-model="form.phone" placeholder="请输入分配手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" placeholder="输入初始密码"></el-input>
          </el-form-item>
          <el-form-item label="是否接收新数据">
            <el-select v-model="form.isNeedData" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日接收数据上线">
            <el-input v-model="form.distributionCount" placeholder="输入初始密码"></el-input>
          </el-form-item>
          <el-form-item label="历史岗位" v-if="false">
            <div id="noteList">
              <ul>
                <li v-for="(item,index) in form.noteList" :key="index" :v-if="index<6">
                  <p
                    class="liShiGW"
                  >{{++index}},{{item.historyTime}} 至 {{item.createTime}},{{item.name}}</p>
                </li>
              </ul>
            </div>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card main">
      <el-row>
        <el-form ref="form" :model="form" :inline="true" label-width="120px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <div class="block" id="dateOfBirth">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请输入性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="form.address" placeholder="例如：河北 天津"></el-input>
          </el-form-item>
          <el-form-item label="入职时间">
            <div class="block" id="dateOfBirth">
              <el-date-picker
                v-model="form.inTheTime"
                type="date"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                placeholder="请录入入职时间"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="form.schooling" placeholder>
              <el-option label="初中及以下" value="初中及以下"></el-option>
              <el-option label="中专" value="中专"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="研究生及以上" value="研究生及以上"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业院校">
            <el-input v-model="form.schoolName"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>
          <el-form-item label="个人电话">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="前公司名称">
            <el-input v-model="form.oldCompanyName"></el-input>
          </el-form-item>
          <el-form-item label="前公司职务">
            <el-input v-model="form.oldCompanyPosition"></el-input>
          </el-form-item>
          <div class="benhangye">
            <el-form-item id="hangyejingyan" label="从业年限">
              <el-input v-model="form.workingTime" id="nianxian"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-row>
      <el-button type="primary" style="margin-left:50px" @click="submit">提交信息</el-button>
    </el-card>
  </div>
</template>

<script>
import { request } from "../../../api/service";

import { companyPositionLever, setupDeepTree } from "./myfun";

export default {
  name: "DepartmentAdd",
  data() {
    return {
      form: {
        prohibitLogin: 0,
        workingTime: null,
        oldCompanyPosition: null,
        oldCompanyName: null,
        mobile: null,
        idCard: null,
        schoolName: null,
        name: null,
        birthday: null,
        sex: null,
        address: null,
        inTheTime: null,
        schooling: null,
        phone: null,
        isNeedData: 0,
        password: null,
        companyPosition: null,
        deaprtmentArray: [],
        departure: 0,
        outTime: null,
        distributionCount: 5,
      },
      ShowManger: {
        showCity: true,
        showFen: true,
        showQu: true,
        showBu: true,
        showGuWen: true,
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
      options1: [
        {
          value: 0,
          label: "在职",
        },
        {
          value: 1,
          label: "离职",
        },
      ],
      options2: [
        {
          value: 0,
          label: "禁止登陆",
        },
        {
          value: 1,
          label: "允许登陆",
        },
      ],
      options3: [
        {
          value: 1,
          label: "接收新数据",
        },
        {
          value: 0,
          label: "拒绝新数据",
        },
      ],
      optionsModel: [],
    };
  },
  created() {
    this.getDepartmentList();
  },
  methods: {
    changdeaprtment(){
      if(!this.form.companyPosition) 
      this.$message.warning("请先选择岗位")
      return false
    },
    //修改连级选择器节点树属性
    changeCompany() {
      this.deaprtmentArray = []
      let delDeep = companyPositionLever(this.form.companyPosition);
      this.options = JSON.parse(JSON.stringify(this.optionsModel))
      // console.log(delDeep)
      setupDeepTree(this.options[0],delDeep)
    },
    getDepartmentList() {
      request({
        url: "department/getDepartmentList",
        method: "get",
      }).then((res) => {
        this.optionsModel = res.dataModel;
      });
    },
    submit() {
      let user = new FormData();
      for (let key in this.form) {
        if (this.form[key] === null) continue;
        user.append(key, this.form[key]);
      }
      request({
        url: "user/addUser",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        data: user,
      });
    },
  },
};
</script>

<style>
input.el-input__inner {
  width: 220px;
  height: 32px;
  padding-left: 10px;
}
.el-form-item__label {
  display: flex;
}
.main {
  margin-top: 30px;
}
</style>