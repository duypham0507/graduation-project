import { uploadMedia } from "services/media";

class UploadAdapter {
  private loader: any;
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const { data } = await uploadMedia([file]);

    return {
      default: data.list[0].url,
    };
  }
  abort() {}
}

export const CustomUploadAdapter = (editor: any) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
};
