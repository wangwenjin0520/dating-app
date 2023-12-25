<template>
  <el-table :data="dateList" style="width: 95%" class="date-list">
    <el-table-column fixed prop="date" label="Date" width="150">
    </el-table-column>
    <el-table-column prop="name" label="Name" width="120"> </el-table-column>
    <el-table-column prop="city" label="City" width="120"> </el-table-column>
    <el-table-column prop="address" label="Address" width="200">
    </el-table-column>
    <el-table-column prop="covid_status" label="Covid Status" width="120">
      <template slot-scope="scope">
        <el-tag
          :type="tagTypeCovidStatus(scope.row.covid_status)"
          disable-transitions
          >{{ scope.row.covid_status }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="state" label="State" width="80">
      <template slot-scope="scope">
        <el-tag :type="tagType(scope.row.state)" disable-transitions>{{
          scope.row.state
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="120">
      <template slot-scope="scope">
        <el-popconfirm
          title="Are you sure to cancel this?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          @confirm="confirmCancelDate(scope.row.date_id)"
          :ref="`popover-${scope.$index}`"
        >
          <el-button
            slot="reference"
            type="text"
            size="small"
            :disabled="scope.row.state == 'canceled'"
            >Cancel</el-button
          >
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { cancelDate } from "@/api/date";

export default {
  methods: {
    async confirmCancelDate(date_id) {
      console.log(date_id);
      const { data } = await cancelDate({ date_id });
      if (data.code == 200) {
        this.$parent.getDateList();
        this.$message({
          message: "Canceling date succeeded",
          type: "success"
        });
      } else {
        this.$message({
          message: "Canceling date failed",
          type: "error"
        });
      }
    },
    tagType(tagName) {
      switch (tagName) {
        case "pending":
          return "primary";
        case "rejected":
          return "danger";
        case "accepted":
          return "success";
        case "canceled":
          return "info";
        default:
          break;
      }
    },
    tagTypeCovidStatus(tagName) {
      switch (tagName) {
        case "safe":
          return "primary";
        case "close contact":
          return "warning";
        case "infected":
          return "danger";
        default:
          break;
      }
    }
  },
  props: {
    dateList: []
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.date-list {
  border-radius: 5px;
}
</style>
