<template>
  <div class="sidebar">
    <el-image
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      class="nav-image"
    ></el-image>
    <div :class="{ hidden: isHidden }" class="like-date">
      <div class="like">
        <el-button
          id="button1"
          @click="like()"
          :type="likeBtnType"
          circle
          icon="el-icon-star-on"
          class="like-icon"
        >
          <!-- <i class="el-icon-fa fa-heart"></i> -->
        </el-button>
        <el-button
          id="button1"
          @click="dislike()"
          :type="dislikeBtnType"
          circle
          icon="el-icon-circle-close"
          class="like-icon"
        >
          <!-- <i class="el-icon-fa fa-thumbs-down"></i> -->
        </el-button>
      </div>
      <br />
      <el-button id="button1" @click="dating()" type="primary">date</el-button>
      <el-button id="button1" @click="message()" type="primary"
        >message</el-button
      >
    </div>
    <el-menu
      :default-active="this.$router.path"
      active-text-color="#20a0ff"
      background-color="transparent"
      class="sidebar-el-menu"
      router
      text-color="#ffffff"
    >
      <el-menu-item class="item" :index="profileIndex" key="/myProfile">
        <i class="el-icon-fa fa-user"></i>
        <span slot="title">My Profile</span>
      </el-menu-item>
      <el-submenu class="item" index="/my-date" key="/my-date">
        <template slot="title">
          <i class="el-icon-fa fa-calendar"></i>
          <span slot="title">My Dates</span>
        </template>
        <el-menu-item class="item" index="/date-from-me" key="/date-from-me">
          <i class="el-icon-fa fa-calendar"></i>
          <span slot="title">Dates From Me</span>
        </el-menu-item>
        <el-menu-item class="item" index="/date-to-me" key="/date-to-me">
          <i class="el-icon-fa fa-calendar"></i>
          <span slot="title">Dates To Me</span>
        </el-menu-item>
      </el-submenu>

      <hr />
      <el-menu-item class="item" index="/search-mate" key="/search-mate">
        <i class="el-icon-fa fa-users"></i>
        <span slot="title">Search Mate</span>
      </el-menu-item>

      <el-menu-item class="item" index="/who-liked-me" key="/who-liked-me">
        <i class="el-icon-fa fa-heart"></i>
        <span slot="title">Who Likes Me</span>
      </el-menu-item>

      <!-- <el-menu-item class="item" index="/mutual-liked" key="/mutual-liked">
        <i class="el-icon-fa fa-bar-chart"></i>
        <span slot="title">Mutual Likes</span>
      </el-menu-item> -->

      <el-menu-item class="item" index="/my-liked" key="/my-liked">
        <i class="el-icon-fa fa-heart"></i>
        <span slot="title">My Likes</span>
      </el-menu-item>

      <el-menu-item class="item" index="/my-disliked" key="/my-disliked">
        <i class="el-icon-fa fa-thumbs-down"></i>
        <span slot="title">My Dislike</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { likeUser, dislikeUser, normalUser, getLikeStatus } from "@/api/like";
import { get_covid } from "@/api/profile";
import { check_status, check_key } from "@/common/ajax";

export default {
  name: "SideBar",
  data: function() {
    return {
      isHidden: true,
      profileIndex: "/my-profile/" + sessionStorage.getItem("userid"),
      likeStatus: 0,
      currentUserId: null,
      likeBtnType: "default",
      dislikeBtnType: "default"
    };
  },
  mounted() {
    let pMountedTimer = window.setInterval(() => {
      if (window.parentMounted) {
        window.clearInterval(pMountedTimer);
        // 下面就可以写子组件想在mounted时执行代码（此时父组件的mounted已经执行完毕）
        this.profileIndex = "/my-profile/" + sessionStorage.getItem("userid");
      }
    }, 500);
  },
  methods: {
    async dating() {
      this.$parent.dating_visible_state = true;
      this.$parent.dating_form.toId = this.currentUserId;
      get_covid(this.currentUserId).then(({ data }) => {
        this.$parent.target_covid_status = data.data.covid_status;

        // switch (target_covid_status) {
        //   case 0:
        //     this.$parent.target_covid_status = "safe";
        //     break;
        //   case 1:
        //     this.$parent.target_covid_status = "close contact";
        //     break;
        //   case 2:
        //     this.$parent.target_covid_status = "infected";
        //     break;
        //   default:
        //     break;
        // }
      });
    },
    like() {
      if (this.likeStatus == 1) {
        this.normal(1);
      } else {
        likeUser(this.currentUserId).then(res => {
          if (res) {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: "Liked",
                type: "success"
              });
              this.likeStatus = res.data.data.likeStatus;
            }
          }
        });
      }
    },
    dislike() {
      if (this.likeStatus == 2) {
        this.normal(2);
      } else {
        dislikeUser(this.currentUserId).then(res => {
          if (res) {
            if (res.data.code == 200) {
              this.$message({
                message: "Disliked",
                type: "success"
              });
              this.likeStatus = res.data.data.likeStatus;
            }
          }
        });
      }
    },
    normal(oldStatus) {
      normalUser(this.currentUserId).then(res => {
        if (res) {
          if (res.data.code == 200) {
            if (oldStatus == 1) {
              this.$message({
                message: "Like canceled",
                type: "success"
              });
            } else if (oldStatus == 2) {
              this.$message({
                message: "Dislike canceled",
                type: "success"
              });
            }
            this.likeStatus = res.data.data.likeStatus;
          }
        }
      });
    },
    async message() {
      console.log("111111111111111111111111111",this.$parent.$children)
      this.$parent.$children[2].rListOff = false;
      this.$parent.$children[2].chat_visible = true;
      this.$parent.$children[2].session_box_width = '0px'
      this.$parent.$children[2].chat_box_width = '50%'
      await this.$parent.$children[2].hlData()
      this.$parent.$children[2].toUserId = this.currentUserId
      let judge = 0
      for (const item of this.$parent.$children[2].rList){
        if(item.userProfile.userID===this.currentUserId){
          this.$parent.$children[2].setZi(
              item.conversationID,
              item.userProfile.userID,
              item.userProfile.avatar,
              item.userProfile.nick
          )
          judge = 1
          break
        }
      }
      if(judge===0){
        this.$parent.$children[2].chatName = sessionStorage.getItem("first_name") + " " + sessionStorage.getItem("last_name")
        this.$parent.$children[2].hList = {messageList:[], isCompleted:true}
      }
    }
  },
  watch: {
    $route(to) {
      const string = to.path.split("/");
      if (string.length === 3) {
        if (string[1] === "my-profile") {
          const id = string[2];
          this.currentUserId = id;
          // if is current user id, set isHidden to true
          this.isHidden = id === sessionStorage.getItem("userid");
        }
      } else {
        // if is in other nav, set isHidden to true
        console.log(string.length);
        this.isHidden = true;
      }
    },
    isHidden(isHidden) {
      console.log(isHidden);
      if (!isHidden) {
        getLikeStatus(this.currentUserId).then(({ data }) => {
          console.log(data);
          if (data != null) {
            if (data.code == 200) {
              this.likeStatus = data.data.likeStatus;
            } else {
              this.$message.error(data.message);
            }
          }
        });
      }
    },
    likeStatus(likeStatus) {
      if (likeStatus == 1) {
        this.likeBtnType = "danger";
        this.dislikeBtnType = "default";
      } else if (likeStatus == 0) {
        this.likeBtnType = "default";
        this.dislikeBtnType = "default";
      } else if (likeStatus == 2) {
        this.likeBtnType = "default";
        this.dislikeBtnType = "info";
      }
    }
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
.sidebar {
  display: block;
  position: absolute;
  left: 10%;
  top: 85px;
  bottom: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}

.sidebar-el-menu {
  border: 0 !important;
  margin-top: 20px;
}

.nav-image {
  margin: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.like-date {
  margin-left: 30px;
  /* display: flex; */
}

.like {
  display: flex;
  justify-content: center;
  margin-left: -40px;
}

.like-icon {
  font-size: 40px;
  margin: 0 10px;
  /* width: 60px;
  height: 60px;
  display: flex;
  align-content: center;
  justify-content: center; */
}

/* .like-btn-icon {
  width: 40px;
} */

.date-btn {
  /* margin: 0 5px; */
  margin-top: 20px;
  width: 180px;
}
</style>
