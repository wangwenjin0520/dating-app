import Config from "./config";
import axios from "axios";
import qs from "qs";
import crypto from "crypto";
import { Buffer } from "buffer";
import router from "../router";
import ElementUI from "element-ui";


axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config) {
  //比如是否需要设置 token
  if(config.url!==Config.backEndUrl + "/login/RSA"){
    config.headers._csrf = sessionStorage.getItem("csrf")
  }
  return config
})
axios.interceptors.response.use(
  async response => {
    if (
        response.config.url === Config.backEndUrl + "/login/login" ||
        response.config.url === Config.backEndUrl + "/login/verify" ||
        response.config.url === Config.backEndUrl + "/login/signup" ||
        response.config.url === Config.backEndUrl + "/login/status" ||
        response.config.url === Config.backEndUrl + "/login/code" ||
        response.config.url === Config.backEndUrl + "/login/signup/code"
    ) {
      if(response.data.code === 403){
        await transfer_key()
      }
      else{
        if (response.data.data !== undefined) {
          const plaintext = AES_decrypt(response.data.data);
          response.data.data = JSON.parse(plaintext);
        }
      }

    } else {
      if (
          response.config.url !== Config.backEndUrl + "/login/RSA"
      ) {
        if (response.data.code === 400) {
          await transfer_key()
          ElementUI.Message({ message: 'session expired, please login', type: 'warning' });
          await router.push("/login")
        }
        else if(response.data.code === 403){
          await transfer_key()
          ElementUI.Message({ message: 'AES key wrong, please re-submit', type: 'warning' });
        }
        else{
          if (response.data.data !== undefined) {
            const plaintext = AES_decrypt(response.data.data);
            response.data.data = JSON.parse(plaintext);
          }
        }
      }
    }
    return response;
  },
  async error => {
    console.log(error.response.status)
    //if(error.response.status === 403){
    //  await transfer_key()
    //  ElementUI.Message({ message: 'AES key wrong, please re-submit', type: 'warning' });
    //}
    ElementUI.Message({ message: error.response.data, type: 'warning' });
    return Promise.reject(error);
  }
);

export const pureget = async function(url) {
  await check_key();
  return axios.get(Config.backEndUrl + url);
};

export const get = async function(url, params) {
  await check_key();
  return axios.get(Config.backEndUrl + url, {
    params: params
  });
};

export const post = async function(url, data) {
  await check_key();
  let new_data = JSON.stringify(data);
  const result = { data: AES_encrypt(new_data) };
  return axios.post(Config.backEndUrl + url, result, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const del = async function(url, params) {
  await check_key();
  return axios.delete(Config.backEndUrl + url, {
    params: params
  });
};

export const put = async function(url, data) {
  await check_key();
  return axios.put(Config.backEndUrl + url, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const pre_get = function(url) {
  return axios.get(Config.backEndUrl + url);
};

export const pre_post = function(url, RSA_key) {
  const plain_key = Buffer.from(sessionStorage.getItem("AES_key"), "base64");
  const plain_iv = Buffer.from(sessionStorage.getItem("AES_iv"), "base64");
  const publickey = Buffer.from(RSA_key, "utf8");
  const cipher_key = RSA_encrypt(plain_key, publickey).toString("base64");
  const cipher_iv = RSA_encrypt(plain_iv, publickey).toString("base64");
  let formData = {
    key: cipher_key,
    iv: cipher_iv,
    signal: 1
  };
  return axios.post(Config.backEndUrl + url, qs.stringify(formData), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const check_key = async function() {
  if(sessionStorage.getItem("AES_key")===null || sessionStorage.getItem("csrf")===null || sessionStorage.getItem("AES_iv")===null){
    await transfer_key();
  }
};

export const check_status = async function() {
  await pre_get("/login/status").then(async res => {
    if (res.data.code === 200) {
      if (sessionStorage.getItem("userid") === null) {
        sessionStorage.setItem("userid", res.data.data._uid);
        sessionStorage.setItem("username", res.data.data.username)
      }
      await router.push("/my-profile/" + sessionStorage.getItem("userid"))
    }
    else {
      await router.push("/login")
    }
  })
}

export const transfer_key = async function() {
  await sessionStorage.setItem("AES_key", crypto.randomBytes(16).toString("base64"));
  await sessionStorage.setItem("AES_iv", crypto.randomBytes(12).toString("base64"));
  await pre_get("/login/RSA").then(async res => {
    const RSA_key = res.data.data.public_key;
    console.log("1-----------------------",res)
    sessionStorage.setItem("csrf", res.data.data._csrf)
    await pre_post("/login/AES", RSA_key);
  });
}

export const AES_decrypt = function(ciphertext) {
  const key = Buffer.from(sessionStorage.getItem("AES_key"), "base64");
  const iv = Buffer.from(sessionStorage.getItem("AES_iv"), "base64");
  try {
    const new_ciphertext = Buffer.from(ciphertext, "base64");
    if (ciphertext === new_ciphertext) alert(1);
    const cipher = crypto.createDecipheriv("aes-128-gcm", key, iv);
    const msg = cipher.update(
      new_ciphertext.slice(12, new_ciphertext.length - 16)
    );
    return msg.toString("utf8");
  } catch (e) {
    console.log("Decrypt is error", e);
    return null;
  }
};

export const AES_encrypt = function(plaintext) {
  const key = Buffer.from(sessionStorage.getItem("AES_key"), "base64");
  const iv = Buffer.from(sessionStorage.getItem("AES_iv"), "base64");
  try {
    const cipher = crypto.createCipheriv("aes-128-gcm", key, iv);
    let enc = cipher.update(plaintext, "utf8", "hex");
    enc += cipher.final("hex");
    const tags = cipher.getAuthTag();
    enc = Buffer.from(enc, "hex");
    const totalLength = iv.length + enc.length + tags.length;
    return Buffer.concat([iv, enc, tags], totalLength).toString("base64");
  } catch (e) {
    console.log("Encrypt is error", e);
    return null;
  }
};

export const RSA_encrypt = function(plaintext, publickey) {
  return crypto.publicEncrypt(
    { key: publickey, padding: crypto.constants.RSA_PKCS1_PADDING },
    plaintext
  );
};
