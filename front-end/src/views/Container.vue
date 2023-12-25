<template>
  <div class="home">
    <head-bar />
    <side-bar />
    <chat />
    <div class="content-box">
      <router-view />
      <!-- <el-backtop target=".content"></el-backtop> -->
    </div>

    <el-dialog
      title="dating"
      :visible.sync="dating_visible_state"
      width="600px"
      center
    >
      <el-form
        :model="dating_form"
        ref="dating_form"
        label-width="40px"
        class="date-form"
        :rules="date_rules"
      >
        <el-form-item prop="date">
          <el-date-picker
            v-model="dating_form.dateTime"
            type="datetime"
            value-format="yyyy/MMM/dd/HH"
            placeholder="Select date and time"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item prop="city">
          <el-input
            class="input_form"
            placeholder="city"
            v-model="dating_form.city"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="location">
          <el-input
            class="input_form"
            placeholder="location"
            v-model="dating_form.location"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="maskRequirement">
          <el-checkbox v-model="dating_form.maskRequired" class="input_form"
            >Mask Required</el-checkbox
          >
        </el-form-item>
      </el-form>
      <div class="covid-info">
        <div>
          His/Her covid status:
          <span v-if="target_covid_status == 0">
            <el-tag>safe</el-tag>
          </span>
          <span v-else-if="target_covid_status == 1">
            <el-tag type="warning">close contact</el-tag>
          </span>
          <span v-else-if="target_covid_status == 2">
            <el-tag type="danger">infected</el-tag>
          </span>
        </div>
      </div>
      <!-- 取消，确定按钮点击事件 -->
      <span slot="footer">
        <el-button size="mini" @click="dating_visible_state = false"
          >cancel</el-button
        >
        <el-button size="mini" @click="submitDate()">confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import chat from "@/components/chat";
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";
import {check_key, check_status} from "@/common/ajax";
import { sendDate } from "@/api/date";

export default {
  name: "Container",
  components: {
    chat,
    HeadBar,
    SideBar
  },
  data: function() {
    return {
      dating_visible_state: false,
      dating_form: {
        toId: "",
        city: "",
        dateTime: "",
        location: "",
        maskRequired: false
      },
      date_rules: {
        city: { required: true, message: "please input city", trigger: "blur" },
        dateTime:{ required: true, message: "please input date time", trigger: "blur" },
        location: { required: true, message: "please input location", trigger: "blur" },
      },
      target_covid_status: "safe"
    };
  },
  async mounted() {
    await check_key();
    await check_status();
    window.parentMounted = this._isMounted;
  },
  methods: {
    submitDate() {
      this.$refs.dating_form.validate(valid => {
        if(valid) {
          if(this.dating_form.dateTime===""||this.dating_form.dateTime===undefined||this.dating_form.dateTime===null){
            this.$message.warning("please pick a dating time")
          }
          else{
            sendDate({...this.dating_form}).then(({data}) => {
              if (data.code === 200) {
                this.$message({
                  message: "Date sent",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "Date sending failed",
                  type: "error"
                });
              }
              this.dating_visible_state = false;
            });
          }
        }
      })
    }
  },
};
</script>
<style scoped>
.content-box {
  position: absolute;
  left: 30%;
  right: 10%;
  width: 60%;
  top: 85px;
  bottom: 0;
  background: transparent;
  color: white;
}

.date-form {
  padding-right: 30px;
}

.covid-info {
  margin-left: 40px;
}

.covid-info > * {
  margin-bottom: 20px;
}
</style>
