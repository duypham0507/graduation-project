import axios from "config/axios";
import { SignUpPayload } from "./auth";
import { ITagPayload } from "./tag";

export interface ICreatePostPayload {
  title: string;
  // avatar: string;
  content: string;
  tags: Array<string | number>;
}

export interface IPostPayload {
  author_id: number;
  content: string;
  create_at: string;
  del_flag: number;
  id_post: number;
  reactionlists: Array<any>;
  reactions: {};
  search: string;
  slug: string;
  status: string;
  tags: Array<any>;
  thumbnail: string;
  title: string;
  userinfo: {
    avatar: string;
    email:string;
    id:number;
    info?:string
    mobile?:string
    name:string
  };
  view: number
}

export const createPost = (payload: ICreatePostPayload) => {
  return axios.post("/post", payload);
};

export const getPost = (params) => {
  return axios.get("/post/", {params: params});
};



export const getPostDetail = (id_post) => {
  return axios.get("/post/" + id_post);
};

export const updatePost = (id_post, param) => {
  return axios.patch("/post/" + id_post, param);
};

export const deleltePost = (id_post) => {
  return axios.delete("/post/" + id_post);
};

export const getPostByUser = () => {
  return axios.get("/post/byUser", {params : {limit: 100,offset: 0}});
};

export const getPostFilter = (param) => {
  return axios.get("/post/search", {params: param});
};

export const updateReaction = (param) => {
  return axios.post("/post/updateReaction", param);
}