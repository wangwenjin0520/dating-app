/* receive: a user object */

<template>
  <el-card :body-style="{ padding: '0px' }" class="user-card">
    <div @click="checkProfile" class="avatar-name">
      <img
        class="avatar"
        v-bind:src="
          userObject.avatar ||
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        "
      />
      <span>{{ fullName }}</span>
    </div>
    <div style="padding: 14px;">
      <div class="bottom clearfix">
        <div class="age-gender">
          {{ userObject.age }}, {{ userObject.gender == 1 ? "Male" : "Female" }}
        </div>
        <div class="location">
          {{ userObject.city }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    userObject: {
      default: {}
    }
  },
  methods: {
    checkProfile() {
      console.log("check profile");
      this.$router.push("/my-profile/" + this.userObject.userId);
    }
  },
  computed: {
    fullName() {
      return this.userObject.first_name + " " + this.userObject.last_name;
    }
  }
};
</script>

<style scoped>
.user-card {
  width: 180px;
  margin-right: 30px;
  margin-bottom: 30px;
  text-align: center;
}
.avatar {
  border-radius: 50%;
  width: 160px;
  padding: 20px 0;
}

.user-card:hover {
  background-color: rgb(225, 216, 252);
  border-color: rgb(225, 216, 252);
}

.avatar-name {
  cursor: pointer;
}
</style>
