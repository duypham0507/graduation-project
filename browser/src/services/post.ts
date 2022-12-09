import axios from "config/axios";

export interface ICreatePostPayload {
  title: string;
  content: string;
  tags: Array<string | number>;
}

export const createPost = (payload: ICreatePostPayload) => {
  return axios.post("/post/", payload);
};
