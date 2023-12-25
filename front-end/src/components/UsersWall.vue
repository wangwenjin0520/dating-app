/* receive: a user list */

<template>
  <div class="users-wall">
    <user-card
      v-for="userObject in userList"
      :key="userObject.username"
      :userObject="userObject"
    ></user-card>
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";
// import { watch } from "vue";

export default {
  components: {
    UserCard
  },
  props: {
    userList: {
      default: []
    }
  },
  mounted: function() {
    console.log("Users wall mounted");
  }
};
</script>

<style scoped>
.users-wall {
  display: flex;
  flex-wrap: wrap;
}
</style>
