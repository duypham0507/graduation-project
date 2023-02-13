import axios from "config/axios";

export const sendVerifyEmail = async () => {
    try {
        const response = await axios.post("/mail/send-verify-mail");
        return response
    } catch (e) {
        return e;
    }
};

export const verifyEmail = async (token:string) => {
    try {
        const response = await axios.post("/mail/verify-email", {token: token});
        return response
    } catch (e) {
        return e;
    }
};