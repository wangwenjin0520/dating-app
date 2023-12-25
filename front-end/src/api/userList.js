import { pureget, get } from "@/common/ajax";

export const getUserList = () => {
  return pureget("/search-mate");
};

export const getMyLikesUserList = () => {
  return pureget("/my-likes");
};

export const getMyDislikesUserList = () => {
  return pureget("/my-dislikes");
};

export const getWhoLikesMeUserList = () => {
  return pureget("/who-likes-me");
};

export const getUserListWithFilter = filter => {
  return get("/search-mate-with-filter", filter);
};
