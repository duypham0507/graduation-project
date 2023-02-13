import axios from "config/axios";

export const getUser = async () => {
    try {
        const response = await axios.get("/admin/users", { params: { limit: 100, offset: 0 } });
        return response
    } catch (e: any) {
        return e;
    }
};