import Vue from "vue";
import VueRouter from "vue-router";
import Container from "./views/Container.vue";
import Login from "./views/Login";
import MyProfile from "./views/MyProfile";
import WhoLikesMe from "./views/WhoLikesMe.vue";
import MutualLikes from "./views/MutualLikes.vue";
import MyLikes from "./views/MyLikes.vue";
import MyDislikes from "./views/MyDislikes.vue";
import SearchMate from "./views/SearchMate.vue";
import DatesFromMe from "./views/DatesFromMe.vue";
import DatesToMe from "./views/DatesToMe.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "container",
    component: Container,
    children: [
      {
        path: "/my-profile",
        name: "my-profile",
        component: MyProfile
      },
      {
        path: "/my-profile/:userId",
        name: "myProfile",
        component: MyProfile
      },
      {
        path: "/date-from-me",
        name: "date-from-me",
        component: DatesFromMe
      },
      {
        path: "/date-to-me",
        name: "date-to-me",
        component: DatesToMe
      },
      {
        path: "/who-liked-me",
        name: "who-liked-me",
        component: WhoLikesMe
      },
      {
        path: "/mutual-liked",
        name: "mutual-liked",
        component: MutualLikes
      },
      {
        path: "/my-liked",
        name: "my-liked",
        component: MyLikes
      },
      {
        path: "/my-disliked",
        name: "my-disliked",
        component: MyDislikes
      },
      {
        path: "/search-mate",
        name: "search-mate",
        component: SearchMate
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
