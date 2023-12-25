<template>
  <div>
    <container-title title="My Dislikes" />
    <users-wall :userList="myDislikedUserList"></users-wall>
  </div>
</template>

<script>
import ContainerTitle from "../components/ContainerTitle.vue";
import UsersWall from "../components/UsersWall.vue";
import { getMyDislikesUserList } from "@/api/userList";

export default {
  components: {
    ContainerTitle,
    UsersWall
  },
  data() {
    return {
      myDislikedUserList: []
    };
  },
  mounted: async function() {
    console.log("My dislikes mounted");

    const { data: result } = await getMyDislikesUserList();
    console.log(result);
    if (result != null) {
      if (result.code === 200) {
        this.myDislikedUserList = result.data;
      } else {
        this.$message.error(result.message);
      }
    }
  }
};
</script>

<style scoped></style>
