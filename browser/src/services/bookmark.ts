import axios from "config/axios";

export const getListBookmark= async () => {
    return await axios.get("/bookmark/", {params: {limit: 100, offset: 0}});
};

export const toggleBookmark = async (payload) => {
    return await axios.patch("/bookmark/", payload);
};

export const getBookmarByCur = async (id_post ) => {
    return await axios.get("/bookmark/isBookmarByCur/" + id_post );
};