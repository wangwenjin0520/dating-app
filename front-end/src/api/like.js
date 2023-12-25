import { post, get, pureget } from "@/common/ajax";

export const likeUser = toUserId => post("/like-user", { toUserId });
export const dislikeUser = toUserId => post("/dislike-user", { toUserId });
export const normalUser = toUserId => post("/normal-user", { toUserId });

export const getLikeStatus = toUserId => {
  return get("/get-like-status", { toUserId });
};

export const getLikeStatus2 = () => {
  return pureget("/get-like-status");
};
