import axios from "config/axios";

export interface ITagPayload {
    id: number;
    tag_description: string;
    tag_name: string
}

export const getTag = async () => {
    return await axios.get("/tag/", {params: {limit: 100, offset: 0}});
};

export const createTag = async (payload: {
    tags: Array<{
      tag_name: string;
      tag_description: string;
    }>;
  }) => {
    return await axios.post("/tag", payload);
};