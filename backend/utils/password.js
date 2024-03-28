const  hashPass = (pass) => {
    let hashedPass="";
    for (let i=0;i<pass.length;i++){
        hashedPass=hashedPass+`z${pass[i]}z`
    }
    return "xx"+hashedPass+"yy";
};

const unHashPass = (hashedPass) => {
    let midHashedPass = hashedPass.substr(2, hashedPass.length - 4);
    let pass = "";
    for (let i = 0; i < midHashedPass.length; i++) {
        if (midHashedPass[i] !== 'z') {
            pass += midHashedPass[i];
        }
    }
    return pass;
};

module.exports = {
    hashPass,
    unHashPass
};