import { Button, Input, Select } from "antd";
import { HeaderLayout } from "header/header-layout";
import Editor from "components/editor";
import { useCallback, useState } from "react";
import { createPost } from "services/post";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;
const options: any = [];
export const CUPostsComponent = () => {
  let history = useHistory();
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const handleUpdateContent = useCallback(
    (data: string) => {
      setContent(data);
    },
    [content]
  );

  const handleUploadPost = useCallback(async () => {
    console.log({
      title: title,
      content: content,
      tags: [2, 5, 59],
    });

    try {
      // Todo upload post handle fail or succeed
      // Title need to be unique
      const rs = await createPost({
        title: title,
        content: content,
        tags: [2, 5, 59],
      });
      console.log(rs);
      rs.data.message == "Ok" && history.push("/home");
    } catch (e) {
      console.log(e);
    }
  }, [content, title]);
  return (
    // <>
    //   <div className="pl-4 pr-4 mt-4">
    //     <Editor data={postData} setData={handleUpdatePostData} />
    //     <div className="flex justify-between mt-3">
    //       <button
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
    //         onClick={handleUploadPost}
    //       >
    //         Xuất bản
    //       </button>
    //     </div>
    //   </div>
    // </>
    <div className="w-full h-full flex flex-col relative">
      <div className="z-50">
        <HeaderLayout />
      </div>
      <div className="pt-4 px-4 flex flex-col w-full h-full mb-16 overflow-auto items-center flex-grow-limit">
        <div className="flex flex-col w-2/3 h-full">
          <div className="flex flex-row w-full justify-center">
            <div className="w-[260px] h-[150px] border-[1px] flex-none">
              <img src="" alt="" />
            </div>
            <div className="flex flex-col w-full ml-4">
              <div className="w-full h-10 mb-5 flex flex-row items-center">
                <span className="w-[100px]">Tiêu đề: </span>
                <Input
                  className=""
                  placeholder="Tiêu đề"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="w-full h-10 mb-5 flex flex-row items-center">
                <span className="w-[100px]">Gắn thẻ: </span>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Gắn thẻ bài viết của bạn. Tối đa 5 thẻ. Ít nhất 1 thẻ!"
                  onChange={() => {}}
                  options={options}
                  defaultValue={"123"}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-10 my-4 flex flex-col items-start">
            <span className="w-[100px]">Nội dung: </span>
            <div className="flex flex-row h-[300px] max-h-[500px]">
              <Editor data={content} setData={handleUpdateContent} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[60px] absolute bottom-0 right-0 p-4 border-t">
        <div className="flex flex-row items-center justify-end">
          <button className="mr-2">Hủy</button>
          <Button onClick={handleUploadPost}>Xuất bản</Button>
        </div>
      </div>
    </div>
  );
};
