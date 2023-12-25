import { get, post } from "@/common/ajax";

export const get_basic_information = id =>
  get("/profile/basic-info/get", { id });
export const get_looks = id => get("/profile/looks/get", { id });
export const get_hobbies = id => get("/profile/hobbies/get", { id });
export const get_covid = id => get("/profile/covid/get", { id });

export const update_basic_information = form_data =>
  post("/profile/basic-info/update", form_data);

export const update_looks = form_data =>
  post("/profile/looks/update", form_data);

export const update_hobbies = form_data =>
  post("/profile/hobbies/update", form_data);

export const update_covid = form_data =>
  post("/profile/covid/update", form_data);
