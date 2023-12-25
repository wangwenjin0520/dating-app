<template>
  <div>
    <container-title title="Search Mate" />
    <search-bar @queryWithFilter="queryWithFilter" />
    <users-wall :userList="userList"></users-wall>
  </div>
</template>

<script>
import ContainerTitle from "../components/ContainerTitle.vue";
import SearchBar from "../components/SearchBar.vue";
import UsersWall from "../components/UsersWall.vue";
import { getUserList } from "@/api/userList";

export default {
  components: {
    ContainerTitle,
    UsersWall,
    SearchBar
  },
  data() {
    return {
      userList: []
    };
  },
  methods: {
    queryWithFilter(filter) {
      this.msg = "我的方法被子组件调用了";
      console.log(filter);
    }
  },
  mounted: async function() {
    console.log("My likes mounted");

    // get user list
    const { data } = await getUserList();
    if (data != null) {
      if (data.code == 200) {
        this.userList = data.data;
      } else {
        this.$message.error(data.message);
      }
    }

    console.log(this.userList);

    // this.userList = [
    //   {
    //     avatar:
    //       "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    //     username: "zhengjie-deng",
    //     userId: "123456",
    //     firstName: "Zhengjie",
    //     lastName: "Deng",
    //     age: "22",
    //     gender: "Male",
    //     location: "Adelaide"
    //   },
    //   {
    //     avatar:
    //       "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    //     username: "zhengjie-deng",
    //     userId: "123456",
    //     firstName: "Zhengjie",
    //     lastName: "Deng",
    //     age: "22",
    //     gender: "Male",
    //     location: "Adelaide"
    //   },
    //   {
    //     avatar:
    //       "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    //     username: "zhengjie-deng",
    //     userId: "123456",
    //     firstName: "Zhengjie",
    //     lastName: "Deng",
    //     age: "22",
    //     gender: "Male",
    //     location: "Adelaide"
    //   },
    //   {
    //     avatar:
    //       "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    //     username: "zhengjie-deng",
    //     userId: "123456",
    //     firstName: "Zhengjie",
    //     lastName: "Deng",
    //     age: "22",
    //     gender: "Male",
    //     location: "Adelaide"
    //   }
    // ];
  }
};
</script>

<style scoped></style>
