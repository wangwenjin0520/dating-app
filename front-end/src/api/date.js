import { post, get, pureget } from "@/common/ajax";

export const sendDate = dateForm => post("/send-date", dateForm);
export const cancelDate = dateForm => post("/cancel-date", dateForm);
export const acceptDate = dateForm => post("/accept-date", dateForm);
export const rejectDate = dateForm => post("/reject-date", dateForm);

export const getLikeStatus = toUserId => {
  return get("/get-like-status", { toUserId });
};

export const getDateFromMe = () => {
  return pureget("/get-date-from-me");
};

export const getDateToMe = () => {
  return pureget("/get-date-to-me");
};
