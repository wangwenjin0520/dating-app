<template>
  <div>
    <container-title title="My Likes" />
    <users-wall :userList="myLikedUserList"></users-wall>
  </div>
</template>

<script>
import ContainerTitle from "../components/ContainerTitle.vue";
import UsersWall from "../components/UsersWall.vue";
import { getMyLikesUserList } from "@/api/userList";

export default {
  components: {
    ContainerTitle,
    UsersWall
  },
  data() {
    return {
      myLikedUserList: []
    };
  },
  mounted: async function() {
    console.log("My likes mounted");

    const { data: result } = await getMyLikesUserList();
    console.log(result);
    if (result != null) {
      if (result.code === 200) {
        this.myLikedUserList = result.data;
      } else {
        this.$message.error(result.message);
      }
    }
  }
};
</script>

<style scoped></style>