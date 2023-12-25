<template>
  <div class="login-wrap">
    <div class="login-form">
      <div class="form-title">dating app</div>
      <div class="form-subtitle">Login to your account</div>
      <el-form
        :model="login_form"
        :rules="login_rules"
        class="login-form-content"
        label-width="0px"
        ref="login_form"
      >
        <el-form-item prop="username" label="username">
          <el-input
            class="input_form"
            placeholder="username"
            v-model="login_form.username"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="password" label="password">
          <el-input
            placeholder="password"
            type="password"
            v-model="login_form.password"
            class="input_form"
          >
          </el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button v-preventClick @click="submit_login()" type="primary"
            >Confirm</el-button
          >
          <el-button
            v-preventClick
            @click="signup_visible_state = true"
            type="primary"
            >Signup</el-button
          >
        </div>
      </el-form>
    </div>

    <el-dialog
      title="verification"
      :visible.sync="verification_visible_state"
      width="400px"
      center
    >
      <el-form :model="verify_form" ref="loginForm" label-width="80px">
        <el-form-item prop="email" label="email">
          <el-input
            class="input_form"
            :readonly="true"
            placeholder="email"
            v-model="verify_form.email"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          prop="code"
          label="code"
          label-width="80px"
          style="width:250px"
        >
          <el-input
            placeholder="code"
            type="password"
            v-model="verify_form.code"
            class="input_form"
          >
          </el-input>
        </el-form-item>
        <el-button class="update_code" size="mini" @click="update_code()"
          >update</el-button
        >
      </el-form>
      <!-- 取消，确定按钮点击事件 -->
      <span slot="footer">
        <el-button size="mini" @click="verification_visible_state = false"
          >cancel</el-button
        >
        <el-button size="mini" @click="submit_verification()">login</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Signup"
      :visible.sync="signup_visible_state"
      width="600px"
      center
    >
      <el-form
        :model="signup_form"
        :rules="signup_rules"
        label-width="120px"
        ref="signup_form"
      >
        <el-form-item prop="username" label="Username">
          <el-input
            placeholder="username"
            v-model="signup_form.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" label="Password">
          <el-input
            placeholder="password"
            v-model="signup_form.password"
          ></el-input>
        </el-form-item>

        <el-form-item prop="email" label="email">
          <el-input placeholder="email" v-model="signup_form.email"></el-input>
        </el-form-item>

        <el-form-item prop="code" label="code" style="width:300px">
          <el-input placeholder="code" v-model="signup_form.code"></el-input>
        </el-form-item>
        <el-button
          class="signup_update_code"
          size="mini"
          @click="signup_update_code()"
          >apply</el-button
        >

        <el-form-item prop="first_name" label="First Name">
          <el-input placeholder="first name" v-model="signup_form.first_name">
          </el-input>
        </el-form-item>
        <el-form-item prop="last_name" label="Last Name">
          <el-input placeholder="last name" v-model="signup_form.last_name">
          </el-input>
        </el-form-item>
        <el-form-item prop="gender" class="register-gender" label="Gender">
          <el-radio v-model="signup_form.gender" :label="0">Male</el-radio>
          <el-radio v-model="signup_form.gender" :label="1">Female</el-radio>
        </el-form-item>
        <el-form-item prop="age" label="Age">
          <el-input-number
            v-model="signup_form.age"
            controls-position="right"
            :min="18"
            :max="150"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <!-- 取消，确定按钮点击事件 -->
      <span slot="footer">
        <el-button size="mini" @click="signup_visible_state = false"
          >cancel</el-button
        >
        <el-button size="mini" @click="submit_signup()">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  login,
  verify,
  signup,
  signup_apply_code,
  apply_code
} from "@/api/user";
import Config from "@/common/config";
import crypto from "crypto";
import { genTestUserSig } from "@/common/GenerateTestUserSig";
import TIM from "tim-js-sdk";
import { check_key } from "@/common/ajax";
import { validateEMail, validatePsdReg, validateUsername } from "@/api/valid";

export default {
  data: function() {
    return {
      verification_visible_state: false,
      signup_visible_state: false,
      login_form: {
        username: "",
        password: ""
      },
      verify_form: {
        email: "",
        code: ""
      },
      signup_form: {
        username: "",
        password: "",
        email: "",
        code: "",
        first_name: "",
        last_name: "",
        gender: 1,
        age: 0
      },
      login_rules: {
        username: [
          { required: true, message: "please input username", trigger: "blur" },
          { validator: validateUsername, trigger: "blur" }
        ],
        password: [
          { required: true, message: "please input password", trigger: "blur" },
          { validator: validatePsdReg, trigger: "blur" }
        ]
      },
      signup_rules: {
        username: [
          { required: true, message: "please input username", trigger: "blur" },
          { validator: validateUsername, trigger: "blur" }
        ],
        password: [
          { required: true, message: "please input password", trigger: "blur" },
          { validator: validatePsdReg, trigger: "blur" }
        ],
        email: [
          { required: true, message: "please input email", trigger: "blur" }
        ],
        code: [
          {
            required: true,
            message: "please verify your email",
            trigger: "blur"
          }
        ],
        first_name: [
          {
            required: true,
            message: "please input first name",
            trigger: "blur"
          }
        ],
        last_name: [
          { required: true, message: "please input last name", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "please choose gender", trigger: "blur" }
        ]
      }
    };
  },
  async created() {
    await check_key();
  },
  methods: {
    submit_login() {
      this.$refs.login_form.validate(valid => {
        if (valid) {
          const hash = crypto.createHash("md5");
          hash.update(this.login_form.password);
          const data = {
            username: this.login_form.username,
            password: hash.digest("base64")
          };
          login(this.login_form).then(res => {
            if (Config.verify === true) {
              if (res.data.code === 200) {
                this.verification_visible_state = true;
                this.$message.success(res.data.message);
                this.verify_form.email = res.data.data.email;
              } else {
                this.$message.error(res.data.message);
              }
            } else {
              this.$router.push({ name: "container" });
            }
          });
        }
      });
    },
    submit_verification() {
      verify(this.verify_form.code).then(res => {
        if (res.data.code === 200) {
          sessionStorage.setItem("userid", res.data.data._uid);
          sessionStorage.setItem("username", res.data.data.username);
          this.$message.success(res.data.message);
          this.$router.push({ name: "container" });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    update_nikename(nikename) {
      this.tim
        .updateMyProfile({
          nick: nikename //this.signup_form.first_name + ' '+this.signup_form.last_name,
        })
        .then(function(imResponse) {
          console.log(imResponse.data); // 更新资料成功
        })
        .catch(function(imError) {
          console.warn("updateMyProfile error:", imError); // 更新资料失败的相关信息
        });
    },
    submit_signup() {
      this.$refs.signup_form.validate(valid => {
        if (valid) {
          signup(this.signup_form).then(
            async res => {
              if (res) {
                if (res.data.code === 200) {
                  this.signup_visible_state = false;
                  this.$message.success(this.signup_form.last_name);
                  const userID = res.data.data._uid.toString();
                  const userSig = genTestUserSig(userID);

                  this.tim
                    .login({
                      userID: userID,
                      userSig: userSig
                    })
                    .then(function(imResponse) {
                      if (imResponse.data.repeatLogin === true) {
                        console.log(imResponse.data.errorInfo);
                      }
                    })
                    .catch(function(imError) {
                      console.warn("login error:", imError); // 登录失败的相关信息
                    });
                  const self = this;
                  this.tim.on(TIM.EVENT.SDK_READY, function(event) {
                    // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
                    console.log("SDK_READY ===================", event);
                    self.update_nikename(
                      self.signup_form.first_name +
                        " " +
                        self.signup_form.last_name
                    );
                  });
                } else {
                  this.$message.error(res.data.message);
                }
              }
            },
            err => {
              this.$message.error(err.message);
            }
          );
        }
      });
    },
    update_code() {
      apply_code().then(res => {
        if (res) {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        }
      });
    },
    signup_update_code() {
      // const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)+@[a-zA-Z0-9]+\.[a-z]+$/;
      if (
        this.signup_form.email === "" ||
        this.signup_form.email === undefined ||
        this.signup_form.email == null
      ) {
        this.$message.error("please input email");
      } else {
        signup_apply_code({ email: this.signup_form.email }).then(res => {
          if (res) {
            if (res.data.code === 200) {
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/login-background.jpg");
  background-size: 100% 100%;
}

.form-title {
  position: relative;
  top: 60px;
  left: 10%;
  height: 90px;
  width: 80%;
  line-height: 80px;
  text-align: center;
  font-size: 40px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.form-subtitle {
  position: relative;
  top: 50px;
  left: 10%;
  height: 60px;
  width: 80%;
  line-height: 100px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.login-form {
  position: absolute;
  left: 45%;
  top: 240px;
  height: 580px;
  width: 500px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.login-form-content {
  position: relative;
  margin-top: 5px;
  padding: 45px 45px;
}

::v-deep .input_form .el-input__inner {
  position: relative;
  top: 0;
  margin-top: 0;
  height: 40px;
  border-radius: 30px;
}

.login-btn {
  position: relative;
  top: 20px;
  text-align: center;
}

.login-btn > * {
  border-radius: 60px;
  background: deeppink;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  margin-left: 0;
}

.el-form-item > * {
  width: 50%;
}

.register-gender {
  margin-top: 10px;
}

.el-radio {
  color: black;
}
.update_code {
  position: absolute;
  top: 142px;
  right: 42px;
}
.signup_update_code {
  position: absolute;
  top: 267px;
  right: 210px;
}
</style>
