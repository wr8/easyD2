<template>
  <div class="customerAdd-container">
    <!-- 人事信息 -->
    <el-row class="filterCondition upOne">
      <span class="cusAddTit">添加客户</span>
    </el-row>
    <!-- 档案信息 -->
    <el-row class="filterCondition downOne">
      <el-form label-width="82px" label-position="right" :inline="true" :model="formLabelAlign" :rules="rules">
        <el-form-item class="dangan" label="*姓名">
          <el-input v-model="formLabelAlign.name" placeholder></el-input>
        </el-form-item>
        <el-form-item class="dangan" label="*城市">
          <el-input v-model="formLabelAlign.city" placeholder="例如：上海" disabled></el-input>
        </el-form-item>
        <el-form-item class="dangan" label="*手机号">
          <el-input v-model="formLabelAlign.mobile" placeholder="请输入手机号码" type="number"></el-input>
        </el-form-item>
        <el-form-item class="dangan" label="性别">
          <el-select v-model="formLabelAlign.sex" placeholder>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dangan" label="年龄">
          <el-input v-model="formLabelAlign.age" placeholder>
            <i slot="suffix">/岁</i>
          </el-input>
        </el-form-item>
        <el-form-item class="dangan" label="申请额度">
          <el-input v-model="formLabelAlign.money" placeholder type="number">
            <i slot="suffix">/万</i>
          </el-input>
        </el-form-item>
        <el-form-item class="dangan" label="房产">
          <el-select v-model="formLabelAlign.house" placeholder>
            <el-option label="有" value="true"></el-option>
            <el-option label="无" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dangan" label="车产">
          <el-select v-model="formLabelAlign.car" placeholder>
            <el-option label="有" value="true"></el-option>
            <el-option label="无" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dangan" label="公积金">
          <el-select v-model="formLabelAlign.gongjijin" placeholder>
            <el-option label="有" value="true"></el-option>
            <el-option label="无" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dangan" label="代发">
          <el-select v-model="formLabelAlign.isbankpay" placeholder>
            <el-option label="有" value="true"></el-option>
            <el-option label="无" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dangan" label="社保">
          <el-select v-model="formLabelAlign.shebao" placeholder>
            <el-option label="有" value="true"></el-option>
            <el-option label="无" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dangan" label="保单">
          <el-select v-model="formLabelAlign.baodan_is" placeholder>
            <el-option label="有" value="true"></el-option>
            <el-option label="无" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item class="dangan" label="转介绍自" prop="sourceCustomer">
          <el-input v-model="formLabelAlign.sourceCustomer" placeholder="输入来源客户ID"></el-input>
        </el-form-item>
        <span style="margin-left:10px">客户姓名：</span>
        <span class="redSpan">{{this.zhuanJieShao.zhuanJieShaoName}}；</span>
        <span>贷款顾问：</span>
        <span class="redSpan">{{this.zhuanJieShao.userName}}；</span>
        <br />
        <el-form-item class="dangan" label="跟进记录">
          <div id="noteList">
            <ul>
              <li
                v-for="(item,index) in zhuanJieShao.noteList"
                :key="index"
                v-bind:style="{'color': item.otherUser == 1 ? 'red':'#606266'}"
              >
                <span
                  v-bind:style="{'color': item.otherUser == 1 ? '#898989':'#898989'}"
                >{{++index}}--{{ item.createDate | formatTime}}--{{ item.userName}}</span>
                --{{ item.content}}
              </li>
            </ul>
          </div>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item class="dangan" label="状态">
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              <span style="font-size:16px;font-weight:700">状态是客户申请所处的环节：</span>
              <br />1.
              <span style="color:red">已受理</span>-说明：新申请数据，还未联系客户；
              <br />2.
              <span style="color:red">待跟进</span>-说明：已联系，但未了解客户信息；
              <br />3.
              <span style="color:red">未接通</span>-说明：已致电，但未接通电话；
              <br />4.
              <span style="color:red">贷款资质不符</span>-说明：该客户或身边人士无可贷点；
              <br />5.
              <span style="color:red">捣乱申请</span>-说明：同行或者申请人恶意提交的不实申请；
              <br />6.
              <span style="color:red">待签约</span>-说明：联系后，并判定该客户或身边人士有可贷点；
              <br />7.
              <span style="color:red">已上门</span>-说明：已上门，但未签约；
              <br />8.
              <span style="color:red">已签约</span>-说明：已上门签约；
              <br />9.
              <span style="color:red">审核中</span>-说明：客户已经完成进件，银行审核中，请备注进件银行、申请金额、审核进度；
              <br />10.
              <span style="color:red">银行已放款</span>-说明：银行审批结束，批放款成功，请备注放款银行、到账金额；
              <br />银行已拒绝-说明：银行审批结束，贷款被拒（包含初审），请备注被拒的原因；
            </div>
            <el-select v-model="formLabelAlign.state" @change="ShowXingJi" placeholder="请选择状态">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>
        <el-form-item class="dangan" label="星级">
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              <span style="font-size:16px;font-weight:700">星级是对客户贷款资质的客观评价：</span>
              <br />
              <span style="color:red">0星：</span>系统默认的未了解过信息的客户；
              <br />
              <span style="color:red">1星：</span>本人或身边朋友无可贷点的客户；
              <br />
              <span style="color:red">2星：</span>本人或身边朋友有可贷点但暂时进不了件的客户；
              <br />
              <span style="color:red">2星+：</span>本人或身边朋友有可贷点，但只能进小贷的客户；
              <br />
              <span style="color:red">3星：</span>本人或身边朋友有可贷点，并可以进银行及主流金融机构的客户；
              <br />
              <span style="color:red">4星：</span>本人或身边有可贷点，且马上需要或条件优质的客户（放款客户默认4星）。
            </div>
            <el-select v-model="formLabelAlign.level" @change="levelCheck" placeholder>
              <el-option label="0星" value="0星" v-show="isShowStar.lingXing"></el-option>
              <el-option label="1星" value="1星" v-show="isShowStar.YiXing"></el-option>
              <el-option label="2星" value="2星" v-show="isShowStar.ErXing"></el-option>
              <el-option label="2星+" value="2星+" v-show="isShowStar.ErXingJia"></el-option>
              <el-option label="3星" value="3星" v-show="isShowStar.SanXing"></el-option>
              <el-option label="4星" value="4星" v-show="isShowStar.SiXing"></el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>
        <br />
        <!-- <el-form-item class="dangan" label="备忘">
          <div class="block" id="dateOfBirth">
            <el-date-picker v-model="beiwangdate" type="date" disabled></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="dangan" id="momecontent" label="">
          <el-input v-model="beiwang" disabled ></el-input>
        </el-form-item>
        <el-button type="warning" id="addnote" disabled>添加备注</el-button><br>-->
        <el-form-item class="dangan" id="describe" label="备注">
          <el-input
            id="nianxian"
            type="textarea"
            :rows="5"
            placeholder="请输入备注内容"
            v-model="formLabelAlign.noteContent"
          ></el-input>
        </el-form-item>
        <el-form-item class="dangan" id="describe" label="资质">
          <el-input
            id="nianxian"
            type="textarea"
            maxlength="50"
            :rows="5"
            placeholder="请输入资质详情（50字以内）"
            v-model="formLabelAlign.remarks"
          ></el-input>
        </el-form-item>

        <el-button type="primary" @click="submit" id="submit" :disabled="disTBN">提交按钮</el-button>
      </el-form>
    </el-row>
  </div>
</template>

<script>
// 导入时间戳转换方法
import moment from 'moment'
export default {
  name: "customerAdd",
  // 数据
  data() {
    //判断客户来源是否存在
      var checkSource = (rule, value, callback) => {
      if (this.formLabelAlign.sourceCustomer === '') {
        callback(new Error('如果非转介绍客户请忽略此项'));
      } else {
        //说明此项非空
        //请求验证该客户ID是否存在
          this.$axios
          .get(`/spider/customer/getCustomerById?id=${this.formLabelAlign.sourceCustomer}&phone=${window.sessionStorage.getItem("phone")}&userId=${window.sessionStorage.getItem("id")}&password=${window.sessionStorage.getItem("password")}`)
          .then(res => {
            // console.log(res);
            if (res.data.messageModel.code === 0) {
                callback(new Error('该用户真实存在'));
                this.zhuanJieShao.zhuanJieShaoName = res.data.dataModel.name
                this.zhuanJieShao.userName = res.data.dataModel.userName
                this.zhuanJieShao.sourceId = res.data.dataModel.sourceId
                this.zhuanJieShao.noteList = res.data.dataModel.noteList
                this.TransferStatus = 0 
            }else if(res.data.messageModel.code === 103) {
                callback(new Error('该用户不存在'));
                this.TransferStatus = 103
            }else {
              //清空转介绍信息
              for(let key  in this.zhuanJieShao){
                this.zhuanJieShao[key] = ""
              }
              this.TransferStatus = 250 
            }
          })
          .catch(error => {
              console.log(error);
          });
      //   callback();
      }
    };
    return {
      currentUser:{
        currentName:"",
        currentId:"",
        currentLevel:"",
        currentPhone:"",
        currentcity:""
      },
      //禁用按钮的状态值
      disTBN:false,
      //转介绍人状态码（用于提交新增客户时判断转介绍人是否存在）
      TransferStatus: 1000,
      //备注内容
      textarea: "",
      //备忘
      beiwang: "",
      //备忘时间
      beiwangdate: "",
      //当前登陆人员level
      level: "",
      //messageText为首次加载时的返回状态
      messageText: "",
      //时间选择框数据
      value1: "",
      //进度动态生成内容
      statusList: [
        { id: "所有", name: "" },
        { id: "已受理", name: "已受理" },
        { id: "未接通", name: "未接通" },
        { id: "待跟进", name: "待跟进" },
        { id: "资质不符", name: "资质不符" },
        { id: "待签约", name: "待签约" },
        { id: "已上门", name: "已上门" },
        { id: "已签约", name: "已签约" },
        { id: "审核中", name: "审核中" },
        { id: "已放款", name: "已放款" },
        { id: "已拒批", name: "已拒批" },
        { id: "捣乱申请", name: "捣乱申请" },
        { id: "重复申请", name: "重复申请" },
        { id: "外地申请", name: "外地申请" },
      ],
      isShowStar: {
        lingXing:false,
        YiXing:false,
        ErXing:false,
        ErXingJia:false,
        SanXing:false,
        SiXing:false
      },
      //客户筛选区域数据
      formLabelAlign: {
        name: "",//客户名称
        city: "", //城市
        age: "",//年龄
        sex: "",//性别
        mobile: "",//手机号码
        money: "",//金额
        house: "",//房产
        isbankpay:"",	//是否代发false无true有
        shebao:"",	//	是否有社保false无true有
        gongjijin:"",	//是否有公积金false无true有
        car:"",	//	车 false无true有
        baodan_is:"",	//保单false无true有
        sourceCustomer:"",	//来源客户id
        level: "",	//	星级
        state:"",	//	状态
        noteContent:"",	//备注内容
        remarks:""	//资质
      },
      zhuanJieShao:{
        zhuanJieShaoName:"",
        userName:"",
        noteList:{},
        sourceId:"",
      },
      rules: {
          sourceCustomer: [
            { validator: checkSource, trigger: 'blur' }
          ]
        }
    };
  },
  methods: {
    //清空所有值的方法
    clearData(){
      for(let key  in this.formLabelAlign){
        this.formLabelAlign[key] = ""
      }
      for(let key  in this.zhuanJieShao){
        this.zhuanJieShao[key] = ""
      }
    },
    //将按钮禁用两秒
    disButton(){
      this.disTBN = true
      setTimeout(() => {
        this.disTBN = false
      }, 2000);
    },
    //点击岗位限制选择的选项
    submit() {
      this.disButton()
      // console.log(typeof this.formLabelAlign.level);
      console.log(this.formLabelAlign.level);
      // if (typeof this.formLabelAlign.level === 'number' && !isNaN(this.formLabelAlign.level)) {
      if (typeof this.formLabelAlign.level === 'number' ) {
        this.formLabelAlign.level = this.formLabelAlign.level
      }
      if (this.formLabelAlign.level == "0星" || this.formLabelAlign.level == 0) {
        this.formLabelAlign.level = 0
      }
      if (this.formLabelAlign.level == "1星" || this.formLabelAlign.level == 1){
        this.formLabelAlign.level = 1
      }
      if (this.formLabelAlign.level == "2星" || this.formLabelAlign.level == 2){
        this.formLabelAlign.level = 2
      }
      if (this.formLabelAlign.level == "2星+" || this.formLabelAlign.level == 3){
        this.formLabelAlign.level = 3
      }
      if (this.formLabelAlign.level == "3星" || this.formLabelAlign.level == 4){
        this.formLabelAlign.level = 4
      }
      if (this.formLabelAlign.level == "4星" || this.formLabelAlign.level == 5){
        this.formLabelAlign.level = 5
      }
      if(this.formLabelAlign.level === "" ) {
        this.$message.error("请选择星级");
        return false
      }
      var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      if (this.formLabelAlign.name == "") {
        this.$message.error("姓名不能为空");
        return false
      }else if(!reg.test(this.formLabelAlign.name)) {
        this.$message.error("姓名只能为纯中文字符");
        return false
      }else if(this.formLabelAlign.city == "") {
        this.$message.error("城市不能为空");
        return false
      }else if(this.formLabelAlign.mobile == "") {
        this.$message.error("手机号码不能为空");
        return false
      }else if(this.formLabelAlign.state == "") {
        this.$message.error("请选择状态");
        return false
      }else if(this.formLabelAlign.name != "") {
        for(var i = 0;i < this.formLabelAlign.name.length; i++){
　　　    if(this.formLabelAlign.name.charCodeAt(i) <= 255){
            this.$message.error("姓名只能为纯中文字符");
            return false
          } 
        }
      } 
      if (this.formLabelAlign.level != 0 && this.formLabelAlign.remarks == "") {
        this.$message.error("非0星状态下，资质内容不得为空");
        return false
      }
      else if (this.formLabelAlign.level != 0 && this.formLabelAlign.remarks.length <= 10) {
        this.$message.error("非0星状态下，资质内容不得少于十个字符");
        return false
      }
      if (this.TransferStatus == 0) {
        // this.$message({  type: 'info',  message: '进来了'  }); 
        this.$axios
        .get(`/spider/customer/insertCustomer?userId=${this.currentUser.currentid}&name=${this.formLabelAlign.name}&city=${this.formLabelAlign.city}&age=${this.formLabelAlign.age}&sex=${this.formLabelAlign.sex}&mobile=${this.formLabelAlign.mobile}&money=${this.formLabelAlign.money}&isbankpay=${this.formLabelAlign.isbankpay}&shebao=${this.formLabelAlign.shebao}&gongjijin=${this.formLabelAlign.gongjijin}&car=${this.formLabelAlign.car}&baodan_is=${this.formLabelAlign.baodan_is}&sourceCustomer=${this.formLabelAlign.sourceCustomer}&level=${this.formLabelAlign.level}&state=${this.formLabelAlign.state}&noteContent=${this.formLabelAlign.noteContent}&remarks=${this.formLabelAlign.remarks}&house=${this.formLabelAlign.house}&sourceId=${this.zhuanJieShao.sourceId}`  )
        .then(res => {
          // console.log(res);
          if (res.data.messageModel.code == 0){
            this.$message({  message: '恭喜你，添加成功',type: 'success'});
            this.clearData();
            if (window.sessionStorage.getItem("departmentName1") == "null") {
              //操作者是否为管理员的判断 并默认城市为上海
              this.formLabelAlign.city = "上海";
            }else{
              this.formLabelAlign.city = window.sessionStorage.getItem("departmentName1") ;  //添加客户时限制为顾问所在城市
            }
          }else{
            this.$message.error(res.data.messageModel.messageText);
          }
        })
        .catch(error => {
            console.log(error);
        });
      } else {
        this.$confirm('该客户非转介绍客户, 是否继续?', '提示', {  confirmButtonText: '确定提交',  cancelButtonText: '继续完善资料',  type: 'warning'  
        }).then(() => {
          this.$message({  type: 'success',  message: '删除成功!'  });
          this.$axios
            .get(`/spider/customer/insertCustomer?userId=${this.currentUser.currentid}&name=${this.formLabelAlign.name}&city=${this.formLabelAlign.city}&age=${this.formLabelAlign.age}&sex=${this.formLabelAlign.sex}&mobile=${this.formLabelAlign.mobile}&money=${this.formLabelAlign.money}&isbankpay=${this.formLabelAlign.isbankpay}&shebao=${this.formLabelAlign.shebao}&gongjijin=${this.formLabelAlign.gongjijin}&car=${this.formLabelAlign.car}&baodan_is=${this.formLabelAlign.baodan_is}&sourceCustomer=${this.formLabelAlign.sourceCustomer}&level=${this.formLabelAlign.level}&state=${this.formLabelAlign.state}&noteContent=${this.formLabelAlign.noteContent}&remarks=${this.formLabelAlign.remarks}&house=${this.formLabelAlign.house}&sourceId=${this.zhuanJieShao.sourceId}`  )
            .then(res => {
              // console.log(res);
              if (res.data.messageModel.code == 0){
                this.$message({  message: '恭喜你，添加成功',type: 'success'});
                this.clearData();
                if (window.sessionStorage.getItem("departmentName1") == "null") {
                  //操作者是否为管理员的判断 并默认城市为上海
                  this.formLabelAlign.city = "上海";
                }else{
                  this.formLabelAlign.city = window.sessionStorage.getItem("departmentName1") ;  //添加客户时限制为顾问所在城市
                }
              }else{
                this.$message.error(res.data.messageModel.messageText);
              }
            })
            .catch(error => {
                console.log(error);
            });
        }).catch(() => {
          this.$message({  type: 'info',  message: '已取消添加，请继续完善客户资料'  });          
        });
      }
    },
    //获取选择框的值
    levelCheck(val){
      // console.log(val);
    },
    //获取进度 控制隐藏和现实
    ShowXingJi(vId) {
      this.formLabelAlign.level = ""
      let obj = {};
      obj = this.statusList.find(item => {
        return item.id === vId; //筛选出匹配数据
      });
      // console.log(obj.name);
      if (obj.name == "已受理" || obj.name == "未接通" || obj.name == "待跟进") {
        for(let key  in this.isShowStar){
          this.isShowStar[key] = false;
        }
        this.isShowStar.lingXing = true;
      }else if(obj.name == "资质不符" || obj.name == "捣乱申请"){
        for(let key  in this.isShowStar){
          this.isShowStar[key] = false;
        }
        this.isShowStar.YiXing = true;
      }else if(obj.name == "待签约" || obj.name == "已签约" || obj.name == "审核中" || obj.name == "已放款" || obj.name == "已拒批"){
        for(let key  in this.isShowStar){
          this.isShowStar[key] = true;
        }
        this.isShowStar.lingXing = false;
        this.isShowStar.YiXing = false;
      }else if(obj.name == "已上门" || obj.name == "重复申请" || obj.name == "外地申请"){
        for(let key  in this.isShowStar){
          this.isShowStar[key] = true;
        }
        this.isShowStar.lingXing = false;
      }
      else {
        for(let key  in this.isShowStar){
          this.isShowStar[key] = false;
        }
      }
    }
  },
  // 本地过滤器
  filters: {
    formatTime(value) {
      if (value == null) {
        return "未知时间"
      }
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    this.currentUser.currentName = window.sessionStorage.getItem("name")
    this.currentUser.currentid = window.sessionStorage.getItem("id")
    this.currentUser.currentLevel = window.sessionStorage.getItem("userLevel")
    if (window.sessionStorage.getItem("departmentName1") == "null") {
      //操作者是否为管理员的判断 并默认城市为上海
      this.formLabelAlign.city = "上海";
    }else{
      this.formLabelAlign.city = window.sessionStorage.getItem("departmentName1") ;  //添加客户时限制为顾问所在城市
    }
    for(let key  in this.zhuanJieShao){
      this.zhuanJieShao[key] = ""
    }
    //获取组织架构数据的请求
  }
};
</script>

<style  lang='scss'>
// .customerAdd-container {
//   input.el-input__inner {
//     width: 170px;
//     height: 32px;
//     padding-left: 10px;
//     //labal文字居左
//   }
//   .el-form-item__label {
//     display: inline-block;
//   }
//   .el-button--warning {
//     line-height: 6px;
//     margin-left: 20px;
//   }
//   // 时间分类框样式
//   .customerAdd-container input.el-input__inner#againkinds,
//   .customerAdd-container input.el-input__inner#againtime {
//     width: 85px;
//     padding-left: 7px;
//   }
 
//   // 日期选择器
//   daterange.el-input,
//   .el-date-editor--daterange.el-input__inner,
//   .el-date-editor--timerange.el-input,
//   .el-date-editor--timerange.el-input__inner {
//     width: 240px;
//     height: 36px;
//     vertical-align: middle;
//     .el-date-editor .el-range__icon {
//       line-height: 27px;
//     }
//     .el-date-editor .el-range-separator {
//       width: 5%;
//     }
//   }
//   .el-form-item {
//     display: inline-block;
//     margin-left: 10px;
//     margin-top: 15px;
//   }
//   .el-form-item:nth-child(n + 6) {
//     margin-top: 0;
//   }
//   .el-select.time {
//     margin-left: 20px;
//   }
//   .el-input--suffix .el-input__inner.fanwei {
//     padding-right: 30px;
//     width: 30px;
//   }
//   .filterCondition {
//     background-color: #fff;
//     margin-bottom: 20px;
//     #submit {
//       margin-left: 20px;
//     }
//     .cusAddTit {
//       display: inline-block;
//       font-size: 17px;
//       color: #c73e3a;
//       margin-left: 20px;
//       line-height: 66px;
//     }
//   }
//   .filterCondition.upOne {
//     border-bottom: 1px solid #f3f3f3;
//     margin: 0;
//   }
//   .filterCondition.downOne {
//     padding-top: 30px;
//     padding-left: 20px;
//     .redSpan {
//       color: #c73e3a;
//     }
//     //文本域
//     .el-textarea {
//         width: 430px;
//     }
//     #momecontent {
//       /deep/.el-form-item__content {
//         margin-left: 30px !important;
//         .el-input__inner {
//           width: 485px;
//         }
//       }
//     }
//     #noteList {
//       width: 700px;
//       display: inline-block;
//       vertical-align: top;
//       border-radius: 5px;
//       border: 1px solid #DCDFE6;
//       background-color: #F5F7FA;
//       margin-top: 5px;
//       ul {
//         list-style: none;
//         margin: .5em;
//         padding-left: 10px;
//         li {
//         line-height: 16px;
//         }
//       }
//     }
//   }
//   .zaifenCheck {
//     margin-left: 20px;
//   }
//   .zaifenBth.el-button {
//     padding: 10px 20px;
//   }
//   #dateOfBirth {
//     width: 170px;
//     // padding-left: 30px;
    
//     input.el-input__inner {
//       width: 170px;
//       height: 32px;
//       padding-left: 30px;
//     }
//   }
//   .redistribution-container input.el-input__inner {
//     width: 182px;
//     height: 32px;
//     padding-left: 10px;
//   }
//   #name .el-form-item__label {
//     width: 43px;
//   }
//   .benhangye {
//     display: inline-block;
//     vertical-align: top;
//     /deep/ .el-form-item__content {
//       margin-left: 10px !important;
//     }
//     #hangyejingyan {
//       display: flex;
//       margin: 0;

//       .el-form-item__label {
//         width: 115px;
//       }
//     }
//   }
//   // 从业年限
//   .nianxian {
//     margin-left: 10px;
//   }
//   .el-date-editor.el-input,
//   .el-date-editor.el-input__inner {
//     width: 182px;
//   }
//   //图片区域
//   .picArea {
//     //图片展示框的大小
//     .avatar-uploader .el-upload {
//       border: 1px dashed #d9d9d9;
//       border-radius: 6px;
//       cursor: pointer;
//       position: relative;
//       overflow: hidden;
//     }
//     .avatar-uploader .el-upload:hover {
//       border-color: #409eff;
//     }
//     .avatar-uploader-icon {
//       font-size: 28px;
//       color: #8c939d;
//       width: 178px;
//       height: 178px;
//       line-height: 178px;
//       text-align: center;
//     }
//     .avatar {
//       width: 178px;
//       height: 178px;
//       display: block;
//     }
//     .picChild {
//       float: left;
//       width: 25%;
//       display: flex;
//       margin-top: 20px;
//       span {
//         width: 20%;
//         font-size: 14px;
//         color: #606266;
//         margin-right: 20px;
//         margin-left: 20px;
//       }
//       .avatar {
//         width: 268px;
//         height: 162px;
//       }
//       i {
//         width: 268px;
//         height: 162px;
//       }
//     }
//   }
// }
</style>