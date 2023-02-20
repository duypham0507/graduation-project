import axios from "config/axios";

export interface ITagPayload {
    id: number;
    tag_description: string;
    tag_name: string
}

export const getTag = () => {
    return axios.get("/tag/", {params: {limit: 6}});
};