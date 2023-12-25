<template>
  <div class="search-bar">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Gender">
        <el-select
          v-model="formInline.gender"
          placeholder="Gender"
          class="gender-select"
        >
          <el-option key="male" label="Male" :value="1"> </el-option>
          <el-option key="female" label="Female" :value="0"> </el-option>
          <el-option key="all" label="All" :value="3"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Age">
        <el-input-number
          v-model="formInline.ageMin"
          controls-position="right"
          placeholder="min"
          :min="18"
          :max="150"
          class="age-input"
        ></el-input-number>
        <el-input-number
          v-model="formInline.ageMax"
          controls-position="right"
          :min="18"
          :max="150"
          class="age-input"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="City">
        <vue-google-autocomplete
          id="map"
          :placeholder="formInline.city"
          types="(cities)"
          @placechanged="getAddressData"
        >
        </vue-google-autocomplete>
      </el-form-item>
      <el-form-item label="">
        <el-popover
          placement="bottom-end"
          width="500"
          trigger="manual"
          v-model="advancedFilterVisible"
        >
          <el-tabs
            v-model="advancedFilterDefaultActive"
            @tab-click="handleClick"
            class="advanced-filter-tab-bar"
          >
            <el-tab-pane label="COVID" name="COVID">
              <el-checkbox
                v-model="formInline.vaccinated"
                label="Vaccinated"
                border
                style="margin-right: 20px"
              ></el-checkbox>
              <el-select
                v-model="formInline.covid_status"
                placeholder="covid status"
              >
                <el-option key="safe" label="safe" :value="0">safe</el-option>
                <el-option key="closeContact" label="close contact" :value="1"
                  >close contact</el-option
                >
                <el-option key="infected" label="infected" :value="2"
                  >infected</el-option
                >
              </el-select>
            </el-tab-pane>
            <el-tab-pane label="Hobby" name="Hobby" class="hobby"
              ><el-checkbox
                v-model="formInline.sport"
                label="Sport"
                border
              ></el-checkbox>
              <el-checkbox
                v-model="formInline.movie"
                label="Movie"
                border
              ></el-checkbox>
              <el-checkbox
                v-model="formInline.reading"
                label="Reading"
                border
              ></el-checkbox>
              <el-checkbox
                v-model="formInline.dancing"
                label="Dancing"
                border
              ></el-checkbox>
              <el-checkbox
                v-model="formInline.music"
                label="Music"
                border
              ></el-checkbox>
            </el-tab-pane>
          </el-tabs>
          <el-button
            slot="reference"
            @click="advancedFilterVisible = !advancedFilterVisible"
            >Advanced Filters</el-button
          >
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: { VueGoogleAutocomplete },
  data() {
    return {
      formInline: {
        gender: 3,
        city: "",
        ageMin: 18,
        ageMax: 150,
        vaccinated: false,
        covid_status: 0,
        sport: false,
        movie: false,
        reading: false,
        dancing: false,
        music: false
      },
      advancedFilterVisible: false,
      advancedFilterDefaultActive: "COVID"
    };
  },
  methods: {
    onSubmit() {
      console.log("get user list with filter");
      this.$emit("queryWithFilter", this.formInline);
    },
    getAddressData(addressData, placeResultData) {
      this.formInline.city = placeResultData["formatted_address"];
    }
  }
};
</script>

<style scoped>
.search-bar {
  background-color: rgb(230, 230, 230);
  padding: 20px 30px 0;
  margin: 0 20px 20px 0;
  border-radius: 5px;
}

.gender-select {
  width: 100px;
  margin-right: 10px;
}

.age-input {
  width: 100px;
  margin-right: 5px;
}

.city-select {
  width: 100px;
  margin-right: 10px;
}

.advanced-filter-tab-bar {
  margin: 0px 10px;
}

.hobby > * {
  margin-bottom: 10px;
}

.hobby:first-child {
  margin-left: 20px;
}
</style>
