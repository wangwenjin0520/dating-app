<template>
  <el-table :data="dateList" style="width: 95%" class="date-list">
    <el-table-column fixed prop="date" label="Date" width="150">
    </el-table-column>
    <el-table-column prop="name" label="Name" width="120"> </el-table-column>
    <el-table-column prop="city" label="City" width="120"> </el-table-column>
    <el-table-column prop="address" label="Address" width="200">
    </el-table-column>
    <el-table-column prop="covid_status" label="Covid Status" width="130">
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
        <el-tag :type="tagTypeState(scope.row.state)" disable-transitions>{{
          scope.row.state
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="180">
      <template slot-scope="scope" class="operations">
        <el-popconfirm
          title="Are you sure to accept this date?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          @confirm="confirmAcceptDate(scope.row.date_id)"
          :ref="`popover-${scope.$index}`"
        >
          <el-button
            class="operation-button"
            slot="reference"
            type="primary"
            size="small"
            @click="handleClick"
            >Accept</el-button
          >
        </el-popconfirm>
        <el-popconfirm
          title="Are you sure to reject this date?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          @confirm="confirmRejectDate(scope.row.date_id)"
          :ref="`popover-${scope.$index}`"
        >
          <el-button
            class="operation-button"
            slot="reference"
            type="danger"
            size="small"
            link
            @click="handleClick"
            >Reject</el-button
          >
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { rejectDate, acceptDate } from "@/api/date";

export default {
  methods: {
    handleClick() {
      console.log("click");
    },
    tagTypeState(tagName) {
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
    },
    async confirmAcceptDate(date_id) {
      const { data } = await acceptDate({ date_id });
      console.log(data);
      if (data.code == 200) {
        this.$parent.getDateList();
        this.$message({
          message: "accept date succeeded",
          type: "success"
        });
      } else {
        this.$message({
          message: "accept date failed",
          type: "error"
        });
      }
    },
    async confirmRejectDate(date_id) {
      const { data } = await rejectDate({ date_id });
      if (data.code == 200) {
        this.$parent.getDateList();
        this.$message({
          message: "reject date succeeded",
          type: "success"
        });
      } else {
        this.$message({
          message: "reject date failed",
          type: "error"
        });
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

.operation-button {
  margin-right: 10px;
}
</style>
