import axios from "config/axios";

export const uploadMedia = (files: Array<File>) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  return axios.post("/media/upload", formData);
};
