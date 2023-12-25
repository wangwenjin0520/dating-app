export function validateEMail(rule, value,callback) {
    // const reg =/^[A-Za-z\d]+([-_.][A-Za-z\d]+)+@[a-zA-Z0-9]+\.[a-z]+$/;
    // if(value===''||value===undefined||value==null){
    //     callback();
    // }else{
    //     if (!reg.test(value)){
    //         callback(new Error('email format is not correct'));
    //     } else {
    //         callback();
    //     }
    // }
}
export const validatePsdReg = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('please input password'))
    }
    if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(value)) {
        callback(new Error('Please enter 6-20 characters, numbers or symbols (excluding spaces), and there are at least two types of letters, numbers and punctuation marks'))
    } else {
        callback()
    }
}

export const validateUsername = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('please input username'))
    }
    if (!/^[a-zA-Z0-9]{1,20}$/.test(value)) {
        callback(new Error('username should be the combination of 1-20 characters and numbers'))
    } else {
        callback()
    }
}

