import { Button, Input, Select, message } from "antd";
import { HeaderLayout } from "components/header/header-layout";
import Editor from "components/editor";
import { useCallback, useState, useEffect } from 'react';
import { createPost, getPostDetail, updatePost } from "services/post";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getTag } from "services/tag";
import { log } from 'console';
import { FormErrorWrapper } from "components/form-error/form-error-wrapper";
import { FormError } from "components/form-error/form-error";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
export const CUPostsComponent = () => {
  let history = useHistory();
  const [avatar, setAvatar] = useState<any>(null);
  const [content, setContent] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [tag, setTag] = useState<any>([]);
  const [errorTitle, setErrorTitle] = useState<any>();
  const [errorContent, setErrorContent] = useState<any>();
  const [errorTag, setErrorTag] = useState<any>();
  const [listTag, setListTag] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [postsInfo, setPostsInfo] = useState<any>({});
  const location = useParams<{ postId: string }>();
  const [loadingAva, setLoadingAva] = useState(false);

  const handleChange = (e) => {
    setLoadingAva(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      setLoadingAva(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!location.postId!) return;
    const init = async () => {
      let res = await getPostDetail(location.postId);
      if (res.status === 200) {
        setContent(res.data.data?.content)
        setTitle(res.data.data?.title)
        setTag(res.data.data?.tags.map(i => i.id_tag))
      };
    };
    init();
  }, [])

  console.log(tag)

  useEffect(() => {
    const init = async () => {
      await getTag().then((rs) => {
        setListTag(rs.data.data);
      });
    };
    init();
  }, []);

  const handleUpdateContent = useCallback(
    (data: string) => {
      setContent(data);
    },
    [content]
  );

  const handleUploadPost = async () => {
    if (!isValidate()) return
    setLoading(true)
    try {
      // Todo upload post handle fail or succeed
      // Title need to be unique
      const rs = !location.postId ? await createPost({
        title: title!,
        content: content!,
        tags: tag,
      }) : await updatePost(location.postId, {
        title: title,
        content: content,
        tags: tag,
      });
      setLoading(false)
      message.success("Xuất bản thành công,vui lòng đợi quản trị viên kiểm duyệt")
      history.push("/home");
    } catch (e) {
      setLoading(false)
    }
  };

  const isValidate = () => {
    let validate = true
    if (title == undefined || title == '') {
      setErrorTitle('Tiêu đề hiện đang để trống')
      validate = false
    }
    if (!tag || tag?.length == 0) {
      setErrorTag('Danh muc hiện đang để trống')
      validate = false
    }
    if (tag && tag?.length > 3) {
      setErrorTag('Số danh muc hiện đang nhiều hơn 3')
      validate = false
    }
    if (content == undefined || content == '') {
      setErrorContent('Nội dung hiện đang để trống')
      validate = false
    }
    return validate
  }

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="z-50">
        <HeaderLayout />
      </div>
      <div className="pt-4 px-4 flex flex-col w-full h-full mb-4 overflow-auto items-center scrollbar">
        <div className="flex flex-col w-2/3 h-full">
          <div className="flex flex-row w-full justify-start">
            {/* <div className="w-[260px] h-[150px] border-[1px] flex-none relative">
              <input type="file" id="file" onChange={handleChange} className="hidden" />
              <label htmlFor="file">
                <div className="absolute inset-0 flex flex-row items-center justify-center">
                  <span className="text-gray-600"><UploadOutlined size={30} /> Tải ảnh lên</span>
                </div>
                <img src={avatar!} alt="" className="w-[260px] h-[150px] flex-none" />
              </label>
            </div> */}
            <div className="flex flex-col w-2/3">
              <div className="flex flex-col mb-4">
                <div className="w-full h-10 flex flex-row items-center">
                  <span className="w-[100px]">Tiêu đề: </span>
                  <Input
                    className=""
                    placeholder="Tiêu đề"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </div>
                {(!title || title == '') && <FormErrorWrapper className="!mt-[-3px]" errorMessage={errorTitle} />}
              </div>
              <div className="flex flex-col mb-4">
                <div className="w-full flex flex-row items-center">
                  <span className="w-[100px]">Gắn thẻ: </span>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Gắn thẻ bài viết của bạn. Tối đa 3 thẻ. Ít nhất 1 thẻ!"
                    onChange={(value) => {
                      tag && tag?.length < 4 && setErrorTag(undefined)
                      setTag(value)
                    }}
                    value={tag}
                  >
                    {listTag.length > 0 && listTag.map((item) => <Option key={item.id_tag} value={item.id_tag}>{item.tag_name}</Option>)}
                  </Select>
                </div>
                {(!tag || tag?.length == 0 || tag?.length > 3) && <FormErrorWrapper className="!mt-0" errorMessage={errorTag} />}
              </div>
            </div>
          </div>
          <div className="w-full my-4 flex flex-col items-start">
            <span className="w-[100px]">Nội dung: </span>
            <span className="text-sm">*<i>Lưu ý: Hình ảnh đầu tiên trong phần này sẽ được đặt làm ảnh đại diện cho bài viết của bạn</i></span>
            {(!content || content == '') && <FormErrorWrapper className="!mb-[2px]" errorMessage={errorContent} />}
            <div className="flex flex-row h-full w-full mt-1">
              <Editor data={content!} setData={handleUpdateContent} />
            </div>
          </div>
          <div className="flex flex-row items-center justify-end w-full h-auto">
            <button className="mr-2" onClick={() => history.push("/home")}>Hủy</button>
            <Button className="!border-blue-400 !text-blue-400 hover:bg-blue-500 hover:!text-white" onClick={handleUploadPost} loading={isLoading}>Xuất bản</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
