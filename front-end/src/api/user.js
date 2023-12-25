import { post, pureget } from "@/common/ajax";
export const login = formdata => post("/login/login", formdata);

export const verify = code => post("/login/verify", { code: code });

export const signup = formdata => {
  return post("/login/signup", formdata);
}

export const signup_apply_code = (formdata) =>{
  return post("/login/signup/code", formdata)
}

export const apply_code = () => {
  return pureget("/login/code");
};

export const logout = () =>{
  return pureget("/login/logout")
}