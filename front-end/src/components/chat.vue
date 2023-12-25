<template>
  <div class="chat">
    <el-dialog
      :visible.sync="chat_visible"
      :width="chat_box_width"
      :before-close="handleClose"
      title="chat"
    >
      <el-row :span="24">
        <div class="chat_box" v-if="chat_visible">
          <div class="session_box" :style="'width:'+session_box_width">
            <div class="t_left_bot" v-if="rListOff" >
              <div
                v-for="(item, index) in rList"
                :key="index"
                @click="
                  setZi(
                    item.conversationID,
                    item.userProfile.userID,
                    item.userProfile.avatar,
                    item.userProfile.nick
                  )
                "
                :class="{ active: item.conversationID === isActive }"
              >
                <img
                  :src="item.userProfile.avatar || defaultAvatar"
                  style="background: #c1c1c1;"
                  alt=""
                />
                <div>{{ item.userProfile.nick }}</div>
                <div v-show="item.lastMessage">
                  {{ item.lastMessage.messageForShow }}
                </div>
                <div>{{ item.lastMessage.lastTime | offTime }}</div>
                <div v-if="item.unreadCount !== 0">
                  {{ item.unreadCount > 99 ? "99+" : item.unreadCount }}
                </div>
              </div>
            </div>
          </div>
          <!-- v-if="rRightOff" -->
          <div class="t_right">
            <!--名字-->
            <div class="t_right_top">{{ chatName }}</div>
            <!--内容-->
            <div class="t_right_con" id="t_right_con">
              <div v-if="hList.isCompleted" class="t_r_nmore">no more</div>
              <div v-else class="t_r_more" @click="seeMore()">see more</div>
              <div v-if="hList">
                <div
                  class="hList-left"
                  v-for="(item, index) in hList.messageList"
                  :key="index"
                >
                  <!--他人发送的消息-->
                  <div class="hList-left-a" v-if="item.to !== toUserId">
                    <img class="hlAva" :src="avatar || defaultAvatar" alt="" />
                    <div>
                      <!-- 判断消息是否是文字或者表情 -->
                      <div
                        v-if="item.type === 'TIMTextElem'"
                        v-html="item.payload.text"
                      ></div>
                      <!-- 消息时间 -->
                      <div>{{ item.time | offTime }}</div>
                    </div>
                  </div>
                  <!--我自己发送的消息-->
                  <div class="hList-left-b" v-else>
                    <div>
                      <!-- 判断消息是否是文字或者表情 -->
                      <div
                        v-if="item.type === 'TIMTextElem'"
                        v-html="item.payload.text"
                      ></div>
                      <!-- 消息时间 -->
                      <div>{{ item.time | offTime }}</div>
                    </div>
                    <img class="hlAva" :src="myAvatar" />
                  </div>
                </div>
              </div>
            </div>

            <!--输出框-->
            <div class="t_right_bot">
              <div>
                <textarea
                  placeholder="please input message, max 200 characters"
                  v-model="textarea"
                  maxlength="200"
                  @keydown="messageSendlisten"
                ></textarea>
                <!-- <div class="t_limit">当前还可发送{{200-(textarea.length)}}个字</div> -->
                <el-button class="r_i" v-if="toUserId!==null" @click="setButton" type="primary">send</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-row>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
import TIM from "tim-js-sdk";
import { genTestUserSig } from "@/common/GenerateTestUserSig";
export default {
  name: "chat",
  data() {
    return {
      chat_visible: false,
      session_box_width:"10px",
      chat_box_width:"70%",
      defaultAvatar:
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1651318081,2860235060&fm=26&gp=0.jpg", //默认头像,如果用户没有上传头像或者头像路径错误展示这个路径
      myAvatar:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2519824424,1132423651&fm=26&gp=0.jpg", //我的头像
      chatName: "", //查看的某个人name
      toUserId: "", //查看的某个人id
      avatar: "", //查看的某个人avatar
      lookup: "", //用户查找的名字
      isActive: "1",
      loading: false, //加载中
      textarea: "", //输入信息
      rListOff: true,
      rRightOff: false,
      // emojiMap: emojiMap,
      // emojiUrl: emojiUrl,
      rList: [], //会话列表
      hList: [] //具体信息
    };
  },
  filters: {
    //接收时间
    offTime: function(value) {
      const v = value;
      const date = new Date(v * 1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let dt = new Date(Date.parse(new Date()));
      let current = dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
      let system =
        date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
      if (current === system) {
        return h + m;
      } else {
        return Y + M + D;
      }
    }
  },
  mounted() {
    if(sessionStorage.getItem("userid")!==null){
      let pMountedTimer = window.setInterval(() => {
        if (window.parentMounted) {
          window.clearInterval(pMountedTimer);
          this.logData(
              sessionStorage.getItem("userid"),
              genTestUserSig(sessionStorage.getItem("userid"))
          );
        }
      }, 500);
    }
  },
  methods: {
    seeMore() {
      const self = this;
      let nextReqMessageID = self.hList.nextReqMessageID;
      let promise = this.tim.getMessageList({
        conversationID: self.hList.messageList[0].conversationID,
        nextReqMessageID,
        count: 15
      });
      promise.then(function(imResponse) {
        self.hList.messageList = [
          ...imResponse.data.messageList,
          ...self.hList.messageList
        ];
        self.hList.nextReqMessageID = imResponse.data.nextReqMessageID; // 分页
        self.hList.isCompleted = imResponse.data.isCompleted; // 是否已经拉完
        if (self.hList) self.rRightOff = true;
      });
    },
    //查找用户 模糊查找
    /*cLookup() {
      const self = this;
      let promise = this.tim.getConversationList();
      promise
          .then(function (imResponse) {
            self.rList = imResponse.data.conversationList;
            self.rListOff = true;
            let arr = [];
            if (self.lookup.split(" ").join("").length === 0) {
              //业务逻辑
              //........
            } else {
              self.rList.map((item) => {
                if (
                    item.userProfile.nick.indexOf(self.lookup) !== -1 ||
                    item.userProfile.userID.indexOf(self.lookup) !== -1
                ) {
                  arr.push(item);
                }
              });
            }
            arr.length === 0 ? self.hlData() : (self.rList = arr);
          })
          .catch(function (imError) {
            console.log(imError);
            // console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
          });
    },*/
    //自动保持在最底部
    below() {
      this.$nextTick(() => {
        let container = this.$el.querySelector("#t_right_con");
        container.scrollTop = container.scrollHeight;
      });
    },
    //回车发送文本 阻止浏览器默认换行操作
    messageSendlisten(event) {
      if (event.keyCode === 13) {
        this.setButton(); // 发送文本
        event.preventDefault(); // 阻止浏览器默认换行操作
        return false;
      }
    },
    //消息已读
    read(id) {
      let promise = this.tim.setMessageRead({ conversationID: id }).then(function(imResponse) {
          // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
          console.warn("setMessageRead error:", imResponse);
        })
        .catch(function(imError) {
          // 已读上报失败
          console.warn("setMessageRead error:", imError);
        });
    },
    //发送消息
    setButton() {
      const self = this;
      if (self.textarea.split(" ").join("").length === 0)
        return this.$message({
          message: "please input correct message",
          type: "warning"
        });
      console.log("1111111111111111111111",this.toUserId)
      let message = this.tim.createTextMessage({
        to: this.toUserId, //self.hList.userID ? self.hList.userID : "约定的名字_" + self.userIdMsg,
        // to: "youqianchengjin_" + self.userIdMsg,
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
          text: self.textarea
        }
      });
      // 发送消息
      this.tim.sendMessage(message).then(function(imResponse) {
          // 发送成功
          self.textarea = "";
          self.hList.messageList.push(imResponse.data.message);
          self.below(imResponse);
        })
        .catch(function(imError) {
          // 发送失败
          console.warn("sendMessage error:", imError);
        });
    },
    //获取会话资料
    setZi(conversationID, userID, avatar, chatName) {
      const self = this;
      self.toUserId = userID;
      self.avatar = avatar;
      self.isActive = conversationID;
      self.chatName = chatName || userID;
      this.tim.getMessageList({
          conversationID: conversationID,
          count: 15
        })
        .then(function(imResponse) {
          let hList = {};
          hList.messageList = imResponse.data.messageList; // 消息列表。
          hList.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
          hList.isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
          hList.userID = userID; // 点击进去的用户id。
          hList.conversationID = conversationID;
          self.hList = hList;
          if (self.hList) self.rRightOff = true;
          self.below();
          //设置消息已读
          self.read(conversationID);
        });
    },
    //获取会话列表
    hlData() {
      const self = this;
      this.tim.getConversationList().then(function(imResponse) {
          self.rList = imResponse.data.conversationList;
          if(imResponse.data.conversationList.length!==0){
            this.toUserId = imResponse.data.conversationList[0].userProfile.userID;
            self.setZi(
                imResponse.data.conversationList[0].conversationID,
                imResponse.data.conversationList[0].userProfile.userID,
                imResponse.data.conversationList[0].userProfile.avatar,
                imResponse.data.conversationList[0].userProfile.nick
            )
          }
        })
        .catch(function(imError) {
          console.log(imError);
        });
    },
    logData(userID, userSig) {
      const self = this;
      console.log("logData =============", userID, userSig);

      // 监听事件
      this.tim.on(TIM.EVENT.SDK_READY, function(event) {
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        console.log("SDK_READY ===================", event);
        self.hlData();
      });

      this.tim.on(TIM.EVENT.ERROR, function(event) {
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        console.error("ERROR ===================", event);
      });

      this.tim.on(TIM.EVENT.KICKED_OUT, function(event) {
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        console.error("KICKED_OUT ===================", event);
      });

      this.tim.on(TIM.EVENT.NET_STATE_CHANGE, function(event) {
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        console.error("NET_STATE_CHANGE ===================", event);
      });

      this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
        // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
        console.log("MESSAGE_RECEIVED ===================");
        self.hlData();
        if (self.hList) {
          if (event.data[0].from === self.hList.userID) {
            self.read(event.data[0].conversationID);
            self.hList.messageList.push(event.data[0]);
            self.below();
          }
        }
      });

      this.tim.login({ userID: userID, userSig: userSig }).then(function(imResponse) {
          console.log("login success ======================");
          //获取会话列表
          if (imResponse.data.repeatLogin === true) {
            // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
            console.log(imResponse.data.errorInfo);
          }
        })
        .catch(function(imError) {
          console.warn("login error:", imError); // 登录失败的相关信息
        });
    },
    handleClose() {
      this.chat_visible = false;
    }
  },
  watch: {
    rListOff: function(newval, oldval){
      if(newval===false){
        this.session_box_width='0px'
        this.chat_box_width='50%'
      }
      else{
        this.session_box_width='260px'
        this.chat_box_width='70%'
        this.hlData()
      }
    }
  },
  destroyed() {
    let promise = this.tim.logout();
    promise
      .then(function(imResponse) {
        console.log(imResponse.data);
      })
      .catch(function(imError) {
        console.warn("logout error:", imError);
      });
  }
};
</script>

<style scoped lang="scss">
.chat {
  position: absolute;
  border-radius: 20px 20px 20px 20px;
  top: 50px;
  right: 15%;
  left: 15%;
}
@mixin toCla {
  color: #a5b5c1;
  font-size: 12px;
}
@mixin toClb {
  display: inline-block;
  > div:nth-child(1):before {
    content: "";
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;

    position: absolute;
    top: 10px;
    font-size: 7px;
  }
  > div:nth-child(2) {
    color: #a5b5c1;
    font-size: 12px;
    margin-top: 9px;
  }
  > div:nth-child(1) {
    outline: none;
    font-size: 14px;
    position: relative;
    max-width: 350px;
    word-wrap: break-word;
    word-break: break-all;
    background: #fff;
    border-radius: 5px;
    display: inline-block;
    padding: 10px;
    -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
}
.chat_box {
  width: 100%;
  height: 100%;
  margin: 2% auto 0;
  display: flex;
  border: 1px solid #3d3d3d;
  position: relative;
  .session_box {
    width: 260px;
    height: 600px;
    overflow: auto;
    border-right: 1px solid #e5e5e5;
    .seek {
      overflow: hidden;
      background: red;
      position: absolute;
      width: 256px;
      z-index: 9;
      top: 0;
      left: 0;
      ::v-deep.el-input__inner {
        height: 35px;
        border: 0 !important;
        border-radius: 0 !important;
        border-bottom: 1px solid #b2b2b2 !important;
      }
    }
    .t_left_bot {
      // padding-top: 36px;
      overflow: auto;
      background: #3d3d3d;
      > div {
        width: 100%;
        height: 80px;
        background: #3333;
        border-bottom: 1px solid #e5e5e5;
        cursor: pointer;
        position: relative;
        div:nth-child(5) {
          position: absolute;
          width: 18px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          font-size: 11px;
          top: 4px;
          left: 58px;
          color: #fff;
          background: red;
          border-radius: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        div:nth-child(4) {
          position: absolute;
          width: 80px;
          font-size: 14px;
          top: 15px;
          left: 169px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: right;
        }
        div:nth-child(3) {
          position: absolute;
          width: 163px;
          font-size: 14px;
          top: 45px;
          left: 83px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        div:nth-child(2) {
          position: absolute;
          width: 90px;
          font-size: 16px;
          top: 13px;
          left: 83px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #ffffff;
        }
        img {
          width: 60px;
          height: 60px;
          position: absolute;
          top: 10px;
          left: 10px;
          border-radius: 2px;
        }
      }
    }
  }
  .t_right {
    flex: 1;
    background: #ffffff;

    .t_right_bot {
      border-top: 1px solid #e5e5e5;
      height: 139px;
      width: 100%;
      background: #fff;
      position: relative;
      ::v-deep.t_limit {
        position: absolute;
        right: 93px;
        bottom: 17px;
        color: #b2b2b2;
      }
      ::v-deep textarea {
        resize: none;
        height: 100px;
        border: 0;
        width: 96%;
        display: block;
        margin: 0 auto;
        outline: none;
      }
      .r_i {
        position: absolute;
        right: 12px;
        bottom: 7px;
        color: #fff;
      }
      > div:nth-child(1) {
        display: flex;
        align-items: center;
        .icture_a {
          display: inline-block;
          cursor: pointer;
          position: relative;
          margin-left: 5px;

          ::v-deep.el-popover {
            width: 400px !important;
            height: 160px !important;
            overflow: auto !important;
          }
        }
        .icture {
          width: 30px;
          height: 30px;
          display: inline-block;
          margin: 4px 15px;
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }
        input[type="file"] {
          color: transparent;
        }
        input {
          cursor: pointer !important;
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: 30px;
          opacity: 0;
        }
        ::v-deep i {
          font-size: 27px;
        }
      }
    }
    .t_right_con {
      height: 410px;
      overflow: auto;
      .t_r_nmore {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 13px;
        color: #a5b5c1;
        background: 0 0;
        padding-left: 0;
        padding-right: 0;
        cursor: pointer;
      }
      .t_r_more {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 13px;
        color: #409eff;
        background: 0 0;
        padding-left: 0;
        padding-right: 0;
        cursor: pointer;
      }
    }

    .t_right_top {
      padding: 0 20px;
      color: #1c2438;
      font-size: 18px;
      font-weight: bold;
      line-height: 50px;
      text-shadow: #76828c 0 0 0.1em;
    }
    .hList-left {
      width: 100%;
      position: relative;
      overflow: auto;
      .hlAva {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: block;
        display: inline-block;
        margin: 10px 20px;
        vertical-align: top;
      }
      .hList-left-b {
        text-align: right;
        > div:nth-child(2) {
          @include toCla;
        }
        > div:nth-child(1) {
          @include toClb;
          > div:nth-child(1):before {
            border-top: 7px solid transparent !important;
            border-bottom: 7px solid transparent !important;
            border-left: 7px solid #fff !important;
            right: -7px !important;
          }
        }
      }
      .hList-left-a {
        > div:nth-child(3) {
          @include toCla;
        }
        > div:nth-child(2) {
          @include toClb;
          > div:nth-child(1):before {
            left: -7px !important;
            border-right: 7px solid #fff !important;
          }
        }
      }
    }
  }
  .active {
    transition: 300ms;
    background: #d6d6d6 !important;
  }
}

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
