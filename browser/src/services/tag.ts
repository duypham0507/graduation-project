import axios from "config/axios";

export const getTag = () => {
    return axios.get("/tag/", {params: {limit: 6}});
};