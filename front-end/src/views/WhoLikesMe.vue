<template>
  <div>
    <container-title title="Who Likes Me" />
    <users-wall :userList="whoLikedMeUserList"></users-wall>
  </div>
</template>

<script>
import ContainerTitle from "../components/ContainerTitle.vue";
import UsersWall from "../components/UsersWall.vue";
import { getWhoLikesMeUserList } from "@/api/userList";

export default {
  components: {
    ContainerTitle,
    UsersWall
  },
  data() {
    return {
      whoLikedMeUserList: []
    };
  },
  mounted: async function() {
    const { data: result } = await getWhoLikesMeUserList();
    console.log(result);
    if (result != null) {
      if (result.code == 200) {
        this.whoLikedMeUserList = result.data;
      } else {
        this.$message.error(result.message);
      }
    }
  }
};
</script>

<style scoped></style>
