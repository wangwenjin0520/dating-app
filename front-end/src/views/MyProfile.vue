<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="my-profile">
    <div class="sub-profile">
      <div class="title-btn">
        <div class="form-title">Basic Information</div>
        <div class="edit-btn">
          <el-button
            v-if="!basicInformationEditing"
            @click="edit_profile()"
            :class="{ active: isLoginUser }"
            type="primary"
            >Edit</el-button
          >
          <el-button
            v-if="basicInformationEditing"
            @click="edit_profile_cancel()"
            :class="{ active: isLoginUser }"
            type="default"
            >Cancel</el-button
          >
          <el-button
            v-if="basicInformationEditing"
            @click="edit_profile_confirm()"
            :class="{ active: isLoginUser }"
            type="primary"
            >Confirm</el-button
          >
        </div>
      </div>
      <el-form
        :model="basic_information"
        class="form"
        label-width="0px"
        ref="form"
      >
        <div class="form_left">
          <el-form-item class="input_form" prop="first_name">
            <div class="input_title">First name</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.first_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="gender">
            <div class="input_title">gender</div>
            <el-select
              :disabled="profile_readonly"
              class="input_item"
              v-model="basic_information.gender"
              placeholder="male"
            >
              <el-option key="female" label="female" value="0"
                >female</el-option
              >
              <el-option key="male" label="male" value="1">male</el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input_form" prop="age">
            <div class="input_title">age</div>

            <el-input-number
              :disabled="profile_readonly"
              v-model="basic_information.age"
              controls-position="right"
              :min="18"
              :max="150"
              class="input_item"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="input_form" prop="preferred language">
            <div class="input_title">preferred language</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.preferred_language"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="form_right">
          <el-form-item class="input_form" prop="last_name">
            <div class="input_title">Last name</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.last_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="nationality">
            <div class="input_title">nationality</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.nationality"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="birthday">
            <div class="input_title">birthday</div>
            <el-date-picker
              :readonly="profile_readonly"
              v-model="basic_information.birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="1900-01-01"
            >
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <div id="mapBox" :style="{ height: Height }"></div>
      <div class="map_input_form" :class="{ active: mapisActive }">
        <div class="input_title">city</div>
        <vue-google-autocomplete
          id="map"
          :placeholder="this.basic_information.city"
          types="(cities)"
          @placechanged="getAddressData"
        >
        </vue-google-autocomplete>
      </div>
    </div>

    <div class="sub-profile">
      <div class="title-btn">
        <div class="form-title">&nbsp;&nbsp;Looks</div>
        <div class="edit-btn">
          <el-button
            v-if="!looksEditing"
            @click="edit_looks()"
            :class="{ active: isLoginUser }"
            type="primary"
            >Edit</el-button
          >
          <el-button
            v-if="looksEditing"
            @click="edit_looks_cancel()"
            :class="{ active: isLoginUser }"
            type="default"
            >Cancel</el-button
          >
          <el-button
            v-if="looksEditing"
            @click="edit_looks_confirm()"
            :class="{ active: isLoginUser }"
            type="primary"
            >Confirm</el-button
          >
        </div>
      </div>

      <el-form :model="looks" class="form" label-width="0px" ref="form">
        <div class="form_left">
          <el-form-item class="input_form" prop="ethnicity">
            <div class="input_title">Ethnicity</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.ethnicity"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="height">
            <div class="input_title">Height</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.height"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="hair_color">
            <div class="input_title">Hair color</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.hair_color"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="form_right">
          <el-form-item class="input_form" prop="body_type">
            <div class="input_title">Body type</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.body_type"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="weight">
            <div class="input_title">Weight</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.weight"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="eye_color">
            <div class="input_title">Eye Color</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.eye_color"
            >
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="sub-profile">
      <div class="title-btn">
        <div class="form-title">&nbsp;&nbsp;Hobby</div>
        <div class="edit-btn">
          <el-button
            v-if="!hobbiesEditing"
            @click="edit_hobbies()"
            :class="{ active: isLoginUser }"
            type="primary"
            >Edit</el-button
          >
          <el-button
            v-if="hobbiesEditing"
            @click="edit_hobbies_cancel()"
            :class="{ active: isLoginUser }"
            type="default"
            >Cancel</el-button
          >
          <el-button
            v-if="hobbiesEditing"
            @click="edit_hobbies_confirm()"
            :class="{ active: isLoginUser }"
            type="primary"
            >Confirm</el-button
          >
        </div>
      </div>
      <el-form :model="hobbies" class="check-form" label-width="0px" ref="form">
        <el-form-item
          class="input_form"
          v-for="(hobby, key) in hobbies"
          :v-bind="key"
        >
          <el-checkbox :disabled="!hobbiesEditing" v-model="hobbies[key]">{{
            key
          }}</el-checkbox>
        </el-form-item>
      </el-form>
    </div>

    <div class="sub-profile">
      <div class="title-btn">
        <div class="form-title">&nbsp;&nbsp;Covid information</div>
        <div class="edit-btn">
          <el-button
            v-if="!covidEditing"
            @click="edit_covid()"
            :class="{ active: isLoginUser }"
            type="primary"
            >Edit</el-button
          >
          <el-button
            v-if="covidEditing"
            @click="edit_covid_cancel()"
            :class="{ active: isLoginUser }"
            type="default"
            >Cancel</el-button
          >
          <el-button
            v-if="covidEditing"
            @click="edit_covid_confirm()"
            :class="{ active: isLoginUser }"
            type="primary"
            >Confirm</el-button
          >
        </div>
      </div>
      <el-form :model="covid" class="check-form" label-width="0px" ref="form">
        <el-form-item class="input_form" prop="covid_status">
          <div class="input_title">Covid Status</div>
          <el-select
            :disabled="!covidEditing"
            class="input_item"
            v-model="covid.covid_status"
            placeholder="covid status"
          >
            <el-option key="safe" label="safe" :value="0">safe</el-option>
            <el-option key="closeContact" label="closeContact" :value="1"
              >close contact</el-option
            >
            <el-option key="infected" label="infected" :value="2"
              >infected</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item class="input_form" :v-bind="covid.vaccinated">
          <el-checkbox :disabled="!covidEditing" v-model="covid.vaccinated"
            >Vaccinated</el-checkbox
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  get_basic_information,
  update_basic_information,
  update_looks,
  update_hobbies,
  update_covid,
  get_looks,
  get_hobbies,
  get_covid
} from "@/api/profile";
import { initMap } from "@/api/map"; //引入
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  name: "MyProfile",
  components: { VueGoogleAutocomplete },
  data: function() {
    return {
      isLoginUser: false,
      mapisActive: true,
      profile_readonly: true,
      profile_disabled: true,
      looks_readonly: true,
      looks_disabled: true,
      hobbies_readonly: true,
      hobbies_disabled: true,
      basic_information: {
        first_name: "",
        last_name: "",
        age: 18,
        gender: 0,
        preferred_language: "",
        nationality: "",
        birthday: "",
        location: "",
        latitude: 0,
        longitude: 0
      },
      basic_information_backup: {},
      looks: {
        ethnicity: "",
        body_type: "",
        height: "",
        weight: "",
        hair_color: "",
        eye_color: ""
      },
      looks_backup: {},
      hobbies: {
        sport: false,
        movie: false,
        reading: false,
        dancing: false,
        music: false
      },
      hobby_backup: {},
      covid: {
        vaccinated: false,
        covid_status: "0"
      },
      covid_backup: {},
      Height: "400px",
      basicInformationEditing: false,
      looksEditing: false,
      hobbiesEditing: false,
      covidEditing: false
    };
  },

  created() {
    if (this.$route.path === "/my-profile") {
      this.$router.push("/my-profile/" + sessionStorage.getItem("userid"));
    }
    const tmp_id = this.$route.path.split("/")[2];
    this.isLoginUser = tmp_id !== sessionStorage.getItem("userid");
    get_basic_information(tmp_id).then(
      res => {
        console.log(res);
        sessionStorage.setItem("first_name", res.data["data"].first_name);
        sessionStorage.setItem("last_name", res.data["data"].last_name);
        sessionStorage.setItem("age", res.data["data"].age);
        sessionStorage.setItem("gender", res.data["data"].gender);
        sessionStorage.setItem(
          "preferred_language",
          res.data["data"].preferred_language
        );
        sessionStorage.setItem("nationality", res.data["data"].nationality);
        sessionStorage.setItem("birthday", res.data["data"].birthday);
        // sessionStorage.setItem(
        //   "relationship_status",
        //   res.data["data"].relationship_status
        // );
        // sessionStorage.setItem("profession", res.data["data"].profession);
        // sessionStorage.setItem("education", res.data["data"].education);
        this.basic_information.first_name = sessionStorage.getItem(
          "first_name"
        );
        this.basic_information.last_name = sessionStorage.getItem("last_name");
        this.basic_information.age = sessionStorage.getItem("age");
        this.basic_information.gender = sessionStorage.getItem("gender");
        this.basic_information.preferred_language = sessionStorage.getItem(
          "preferred_language"
        );
        this.basic_information.nationality = sessionStorage.getItem(
          "nationality"
        );
        this.basic_information.birthday = sessionStorage.getItem("birthday");
        // this.basic_information.relationship_status = sessionStorage.getItem(
        //   "relationship_status"
        // );
        // this.basic_information.profession = sessionStorage.getItem(
        //   "profession"
        // );
        // this.basic_information.education = sessionStorage.getItem("education");
        initMap(res.data.data.latitude, res.data.data.longitude);
        this.profile_readonly = true;
        this.profile_disabled = true;
      },
      err => {
        this.$message.error(err.response.msg);
      }
    );
    get_looks(tmp_id).then(res => {
      sessionStorage.setItem("ethnicity", res.data["data"].ethnicity);
      sessionStorage.setItem("body_type", res.data["data"].body_type);
      sessionStorage.setItem("height", res.data["data"].height);
      sessionStorage.setItem("weight", res.data["data"].weight);
      sessionStorage.setItem("hair_color", res.data["data"].hair_color);
      sessionStorage.setItem("eye_color", res.data["data"].eye_color);
      this.looks.ethnicity = sessionStorage.getItem("ethnicity");
      this.looks.body_type = sessionStorage.getItem("body_type");
      this.looks.height = sessionStorage.getItem("height");
      this.looks.weight = sessionStorage.getItem("weight");
      this.looks.hair_color = sessionStorage.getItem("hair_color");
      this.looks.eye_color = sessionStorage.getItem("eye_color");
      this.looks_readonly = true;
      this.looks_disabled = true;
    });
  },
  methods: {
    getAddressData(addressData, placeResultData) {
      console.log(addressData);
      this.basic_information.latitude = addressData["latitude"];
      this.basic_information.longitude = addressData["longitude"];
      this.basic_information.location = placeResultData["formatted_address"];
    },
    edit_profile() {
      this.basicInformationEditing = true;
      this.basic_information_backup = { ...this.basic_information };
      this.profile_readonly = false;
      this.profile_disabled = false;
      this.Height = "0px";
      this.mapisActive = false;
      // if (this.profile_readonly === true) {
      // } else {
      //   // update_basic_information(this.basic_information);
      //   // initMap(
      //   //   this.basic_information.latitude,
      //   //   this.basic_information.longitude
      //   // );
      //   // this.profile_readonly = true;
      //   // this.profile_disabled = true;
      //   // this.Height = "400px";
      //   // this.mapisActive = true;
      // }
    },
    edit_profile_cancel() {
      this.basicInformationEditing = false;
      this.basic_information = { ...this.basic_information_backup };
      this.profile_readonly = true;
      this.profile_disabled = true;
      this.Height = "400px";
      this.mapisActive = true;
    },
    async edit_profile_confirm() {
      this.basicInformationEditing = false;
      const { data } = await update_basic_information(this.basic_information);
      if (data.code === 200) {
        this.$message({
          message: "update profile succeeded",
          type: "success"
        });
      } else {
        this.$message({
          message: "update profile failed",
          type: "error"
        });
      }
      initMap(
        this.basic_information.latitude,
        this.basic_information.longitude
      );
      this.profile_readonly = true;
      this.profile_disabled = true;
      this.Height = "400px";
      this.mapisActive = true;
    },
    edit_looks() {
      this.looksEditing = true;
      this.looks_backup = { ...this.looks };
      this.looks_readonly = false;
      this.looks_disabled = false;
    },
    edit_looks_cancel() {
      this.looksEditing = false;
      this.looks = { ...this.looks_backup };
      this.looks_readonly = true;
      this.looks_disabled = true;
    },
    async edit_looks_confirm() {
      this.looksEditing = false;
      const { data } = await update_looks(this.looks);
      if (data.code == 200) {
        this.$message({
          message: "update looks succeeded",
          type: "success"
        });
      } else {
        this.$message({
          message: "update looks failed",
          type: "error"
        });
      }

      this.looks_readonly = true;
      this.looks_disabled = true;
    },
    edit_hobbies() {
      this.hobbiesEditing = true;
      this.hobbies_backup = { ...this.hobbies };
      this.hobbies_readonly = false;
      this.hobbies_disabled = false;
    },
    edit_hobbies_cancel() {
      this.hobbiesEditing = false;
      this.hobbies = { ...this.hobbies_backup };
      this.hobbies_readonly = true;
      this.hobbies_disabled = true;
    },
    async edit_hobbies_confirm() {
      this.hobbiesEditing = false;
      const { data } = await update_hobbies(this.hobbies);
      if (data.code == 200) {
        this.$message({
          message: "update hobbies succeeded",
          type: "success"
        });
      } else {
        this.$message({
          message: "update hobbies failed",
          type: "error"
        });
      }

      this.hobbies_readonly = true;
      this.hobbies_disabled = true;
    },
    edit_covid() {
      this.covidEditing = true;
      this.covid_backup = { ...this.covid };
      this.covid_readonly = false;
      this.covid_disabled = false;
    },
    edit_covid_cancel() {
      this.covidEditing = false;
      this.covid = { ...this.covid_backup };
      this.covid_readonly = true;
      this.covid_disabled = true;
    },
    async edit_covid_confirm() {
      this.covidEditing = false;
      const { data } = await update_covid(this.covid);
      if (data.code == 200) {
        this.$message({
          message: "update covid info succeeded",
          type: "success"
        });
      } else {
        this.$message({
          message: "update covid info failed",
          type: "error"
        });
      }

      this.covid_readonly = true;
      this.covid_disabled = true;
    },
    routeChange() {
      console.log(this.$route.path);
      const path = this.$route.path;
      if (path.toString() === "/my-profile") {
        this.$router.push("/my-profile/" + sessionStorage.getItem("userid"));
        return;
      } else {
        const tmp_id = this.$route.path.split("/")[2];
        this.isLoginUser = tmp_id !== sessionStorage.getItem("userid");
        console.log("tmp_id", tmp_id);
        get_basic_information(tmp_id).then(
          res => {
            sessionStorage.setItem("latitude", res.data["data"].latitude);
            sessionStorage.setItem("longitude", res.data["data"].longitude);
            sessionStorage.setItem("first_name", res.data["data"].first_name);
            sessionStorage.setItem("last_name", res.data["data"].last_name);
            sessionStorage.setItem("age", res.data["data"].age);
            sessionStorage.setItem("gender", res.data["data"].gender);
            sessionStorage.setItem(
              "preferred_language",
              res.data["data"].preferred_language
            );
            sessionStorage.setItem("nationality", res.data["data"].nationality);
            sessionStorage.setItem("birthday", res.data["data"].birthday);
            sessionStorage.setItem(
              "relationship_status",
              res.data["data"].relationship_status
            );
            sessionStorage.setItem("profession", res.data["data"].profession);
            sessionStorage.setItem("education", res.data["data"].education);

            this.basic_information.longitude = sessionStorage.getItem(
              "longitude"
            );
            this.basic_information.latitude = sessionStorage.getItem(
              "latitude"
            );
            this.basic_information.first_name = sessionStorage.getItem(
              "first_name"
            );
            this.basic_information.last_name = sessionStorage.getItem(
              "last_name"
            );
            this.basic_information.age = sessionStorage.getItem("age");
            this.basic_information.gender = sessionStorage.getItem("gender");
            this.basic_information.preferred_language = sessionStorage.getItem(
              "preferred_language"
            );
            this.basic_information.nationality = sessionStorage.getItem(
              "nationality"
            );
            this.basic_information.birthday = sessionStorage.getItem(
              "birthday"
            );
            this.basic_information.relationship_status = sessionStorage.getItem(
              "relationship_status"
            );
            this.basic_information.profession = sessionStorage.getItem(
              "profession"
            );
            this.basic_information.education = sessionStorage.getItem(
              "education"
            );
            this.basic_information.location = "Adelaide SA, Australia";
            this.profile_readonly = true;
            this.profile_disabled = true;
            initMap(res.data.data.latitude, res.data.data.longitude);
          },
          err => {
            this.$message.error(err.response.msg);
          }
        );
        get_looks(tmp_id).then(res => {
          sessionStorage.setItem("ethnicity", res.data["data"].ethnicity);
          sessionStorage.setItem("body_type", res.data["data"].body_type);
          sessionStorage.setItem("height", res.data["data"].height);
          sessionStorage.setItem("weight", res.data["data"].weight);
          sessionStorage.setItem("hair_color", res.data["data"].hair_color);
          sessionStorage.setItem("eye_color", res.data["data"].eye_color);
          this.looks.ethnicity = sessionStorage.getItem("ethnicity");
          this.looks.body_type = sessionStorage.getItem("body_type");
          this.looks.height = sessionStorage.getItem("height");
          this.looks.weight = sessionStorage.getItem("weight");
          this.looks.hair_color = sessionStorage.getItem("hair_color");
          this.looks.eye_color = sessionStorage.getItem("eye_color");
          this.looks_readonly = true;
          this.looks_disabled = true;
        });
        get_hobbies(tmp_id).then(res => {
          this.hobbies = res.data.data;
        });
        get_covid(tmp_id).then(res => {
          this.covid = res.data.data;
        });
      }
    }
  },
  watch: {
    $route(to) {
      console.log("change route");
      this.routeChange();
    }
  },
  mounted() {
    this.routeChange();
  }
};
</script>

<style scoped>
.active {
  display: none;
}

.my-profile {
  background: rgb(0, 0, 0);
  border-radius: 10px;
  margin-left: -60px;
  margin-right: 30px;
  padding: 20px;
  margin-top: 30px;
}

.sub-profile {
  margin-bottom: 30px;
}

.title-btn {
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px white solid;
  padding-bottom: 10px;
}

.form-title {
  font-size: 30px;
}

.form {
  display: flex;
}

.form > * {
  margin-right: 100px;
  flex-basis: 800px;
}

.check-form {
  display: flex;
}

.check-form > * {
  margin-right: 30px;
}

/* .active {
  display: none;
}
/* .profile_form {
  position: relative;
  width: 100%;
  background-color: black;
  border-radius: 15px 15px 15px 15px;
  height: 1050px;
}
.looks_form {
  position: relative;
  width: 100%;
  background-color: black;
  border-radius: 15px 15px 15px 15px;
  height: 400px;
}
.covid_form {
  position: relative;
  width: 100%;
  background-color: black;
  border-radius: 15px 15px 15px 15px;
  height: 300px;
} */

/* .form-title {
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 95%;
  line-height: 60px;
  font-size: 30px;
  color: #ffffff;
  border-bottom: 1px solid gray;
  padding-left: 30px;
}
.form_left {
  position: absolute;
  width: 40%;
  left: 5%;
  top: 80px;
}
.form_right {
  position: absolute;
  width: 40%;
  left: 55%;
  top: 80px;
}

.edit-btn {
  position: absolute;
  top: 10px;
  right: 30px;
}

::v-deep .el-input__inner,
::v-deep .el-input__inner[disabled] {
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  background-color: transparent;
}

.profile_form_content {
  position: relative;
  height: 600px;
}
#mapBox {
  position: relative;
  height: 400px;
}
.map_input_form {
  position: relative;
  height: 100px;
}
#map {
  height: 50px;
  background-color: transparent;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  width: 300px;
  color: white;
}  */
</style>
