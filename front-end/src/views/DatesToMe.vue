<template>
  <div>
    <container-title title="Dates To Me" />
    <dates-to-me-list :dateList="dateList"></dates-to-me-list>
  </div>
</template>

<script>
import ContainerTitle from "../components/ContainerTitle.vue";
import DatesToMeList from "../components/DatesToMeList.vue";
import { getDateToMe } from "@/api/date.js";

export default {
  components: {
    ContainerTitle,
    DatesToMeList
  },
  data() {
    return {
      dateList: []
    };
  },
  methods: {
    stateToString: function(state) {
      switch (state) {
        case 0:
          return "pending";
        case 1:
          return "accepted";
        case 2:
          return "rejected";
        case 3:
          return "canceled";
        default:
          break;
      }
    },
    covidStatusToString: function(covid_status) {
      switch (covid_status) {
        case 0:
          return "safe";
        case 1:
          return "close contact";
        case 2:
          return "infected";
        default:
          break;
      }
    },
    getDateList: async function() {
      const { data } = await getDateToMe();
      if (data.code == 200) {
        this.dateList = data.data.map(date => ({
          date: date.date,
          name: date.to_username,
          state: this.stateToString(date.state),
          city: date.city,
          address: date.location,
          date_id: date._uid,
          covid_status: this.covidStatusToString(date.to_user_covid_status)
        }));
        console.log(this.dateList);
      } else {
        this.$message({
          message: "Getting date list failed",
          type: "error"
        });
      }
    }
  },
  mounted: function() {
    this.getDateList();
  }
};
</script>

<style scoped></style>
