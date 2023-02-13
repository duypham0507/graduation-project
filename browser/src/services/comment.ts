import axios from "config/axios";

export interface ICreateComment {
    id_post: string;
    content: string;
}

export const getComment = async (id_post: string) => {
    try {
        const response = await axios.get("/comment", { params: { limit: 100, offset: 0, id_post: id_post } });
        return response
    } catch (e: any) {
        return e;
    }
};

export const createComment = async (param: ICreateComment) => {
    try {
        const response = await axios.post("/comment", param);
        return response
    } catch (e: any) {
        return e;
    }
};

export const updateComment = async (param: ICreateComment) => {
    try {
        const response = await axios.patch("/comment", param);
        return response
    } catch (e: any) {
        return e;
    }
};

export const deleteComment = async (id_comment: string) => {
    try {
        const response = await axios.delete("/comment",{data: {id_comment:id_comment}});
        return response
    } catch (e: any) {
        return e;
    }
};