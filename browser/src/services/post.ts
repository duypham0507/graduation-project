import axios from "config/axios";

export interface ICreatePostPayload {
  title: string;
  content: string;
  tags: Array<string | number>;
}

export const createPost = (payload: ICreatePostPayload) => {
  return axios.post("/post/", payload);
};

export const getPost = (params) => {
  return axios.get("/post/", {params: params});
};

export const getPostDetail = (id_post) => {
  return axios.get("/post/" + id_post);
};

export const getPostFilter = (param) => {
  return axios.get("/post/search", {params: param});
};