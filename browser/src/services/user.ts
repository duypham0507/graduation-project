import axios from "config/axios";

export const getUser = async () => {
    try {
        const response = await axios.get("/admin/users", { params: { limit: 100, offset: 0 } });
        return response
    } catch (e: any) {
        return e;
    }
};

export const getUserInfo = async () => {
    try {
        const response = await axios.get("/user/userInfo");
        const { user_info } = response.data;
        localStorage.setItem("user_info", user_info);
        return response
    } catch (e: any) {
        return e;
    }
};

export const editUserInfo = async (param) => {
    const response = await axios.patch("/user/edit", param);
    return response
};