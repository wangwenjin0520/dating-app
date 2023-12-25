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
import { getUserList, getUserListWithFilter } from "@/api/userList";

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
    async queryWithFilter(filter) {
      // console.log(filter);
      // // get user list with filter
      // const { data } = await getUserListWithFilter(filter);
      // if (data != null) {
      //   if (data.code == 200) {
      //     this.userList = data.data;
      //   } else {
      //     this.$message.error(data.message);
      //   }
      // }

      // get user list
      const { data } = await getUserList();
      if (data != null) {
        if (data.code == 200) {
          this.userList = data.data;
          this.userList = this.userList.filter(user => {
            console.log(user);
            if (filter.city !== "" && user.city != filter.city) {
              // userList.splice(i, 1);
              return false;
            }
            if (filter.gender != 3 && user.gender != filter.gender) {
              // userList.splice(i, 1);
              return false;
            }
            if (user.age < filter.ageMin || user.age > filter.ageMax) {
              // userList.splice(i, 1);
              return false;
            }
            if (
              user.covid_status != filter.covid_status ||
              user.vaccinated != filter.vaccinated
            ) {
              // userList.splice(i, 1);
              return false;
            }
            if (filter.sport && !user.sport) {
              // userList.splice(i, 1);
              return false;
            }
            if (filter.movie && !user.movie) {
              // userList.splice(i, 1);
              return false;
            }
            if (filter.reading && !user.reading) {
              // userList.splice(i, 1);
              return false;
            }
            if (filter.dancing && !user.dancing) {
              // userList.splice(i, 1);
              return false;
            }
            if (filter.music && !user.music) {
              // userList.splice(i, 1);
              return false;
            }
            return true;
          });
        } else {
          this.$message.error(data.message);
        }
      }
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
  }
};
</script>

<style scoped></style>
