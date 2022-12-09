import { Button, Input, Select } from "antd";
import { HeaderLayout } from "header/header-layout";
import Editor from "components/editor";
import { useCallback, useState } from "react";
import { createPost } from "services/post";

const { TextArea } = Input;
const options: any = [];
export const PostsComponent = () => {
  const [postData, setPostData] = useState<string>("");
  const handleUpdatePostData = useCallback(
    (data: string) => {
      setPostData(data);
    },
    [postData]
  );

  const handleUploadPost = useCallback(async () => {
    try {
      // Todo upload post handle fail or succeed
      // Title need to be unique
      const rs = await createPost({
        title: "Title new post without image",
        content: postData,
        tags: [2, 5, 59],
      });
    } catch (e) {}
  }, [postData]);
  return (
    <>
      <div className="pl-4 pr-4 mt-4">
        <Editor data={postData} setData={handleUpdatePostData} />
        <div className="flex justify-between mt-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={handleUploadPost}
          >
            Create new post
          </button>
        </div>
      </div>
    </>
    // <div className="w-full h-full flex flex-col relative">
    //   <div className="z-50">
    //     <HeaderLayout />
    //   </div>
    //   <div className="pt-4 px-4 flex flex-col w-full h-full items-center flex-grow-limit">
    //     <div className="w-2/3 h-10 mb-5 flex flex-row items-center">
    //       <span className="w-[100px]">Tiêu đề: </span>
    //       <Input className="" placeholder="Tiêu đề" />
    //     </div>
    //     <div className="w-2/3 h-10 mb-5 flex flex-row items-center">
    //       <span className="w-[100px]">Gắn thẻ: </span>
    //       <Select
    //         mode="multiple"
    //         allowClear
    //         style={{ width: "100%" }}
    //         placeholder="Gắn thẻ bài viết của bạn. Tối đa 5 thẻ. Ít nhất 1 thẻ!"
    //         onChange={() => {}}
    //         options={options}
    //         defaultValue={"123"}
    //       />
    //     </div>
    //     <div className="w-2/3 h-10 mb-5 flex flex-row items-start">
    //       <span className="w-[100px]">Nội dung: </span>
    //       {/* <CKEditor editor={ ClassicEditor }/> */}
    //       <TextArea rows={4} />
    //     </div>
    //   </div>
    //   <div className="w-full absolute bottom-0 right-0 p-4">
    //     <div className="flex flex-row items-center justify-end">
    //       <button className="mr-2">Hủy</button>
    //       <Button>Xuất bản</Button>
    //     </div>
    //   </div>
    // </div>
  );
};
