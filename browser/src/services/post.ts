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

export const createPost = async (payload: ICreatePostPayload) => {
  return await axios.post("/post", payload);
};

export const getPost = async (params) => {
  return await axios.get("/post/", {params: params});
};



export const getPostDetail = async (id_post) => {
  return await axios.get("/post/" + id_post);
};

export const updatePost = async (id_post, param) => {
  return await axios.patch("/post/" + id_post, param);
};

export const deleltePost = async (id_post) => {
  return await axios.delete("/post/" + id_post);
};

export const getPostByUser = async () => {
  return await axios.get("/post/byUser", {params : {limit: 100,offset: 0}});
};

export const getPostFilter = async (param) => {
  return await axios.get("/post/search", {params: param});
};

export const updateReaction = async (param) => {
  return await axios.post("/post/updateReaction", param);
}