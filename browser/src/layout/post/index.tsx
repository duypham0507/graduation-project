import { HeaderLayout } from "header/header-layout";
import { FooterCtn } from "layout/home/container/footer";
import { TopViewCtn } from "layout/home/container/top-view";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostDetail } from "services/post";
import parse from "html-react-parser";
import moment from "moment";
import { PostFilterCtn } from "./container/post-filter";
import { EyeOutlined, LikeOutlined } from "@ant-design/icons";

export const PostsComponent = () => {
  const [postsInfo, setPostsInfo] = useState<any>({});
  let param = useParams<{ postsId: string }>();

  useEffect(() => {
    const init = async () => {
      if (!param.postsId) return;
      let res = await getPostDetail(param.postsId);
      res.status === 200 && setPostsInfo(res.data.data);
    };
    init();
  }, []);

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="fixed top-0 left-0 z-50 w-full bg-white">
        <HeaderLayout />
      </div>
      {/* <div className="sticky top-[200px] left-5 ml-10">
        <div className="w-[200px] h-[200px]"></div>
        {postsInfo?.userinfo?.name!}
      </div> */}
      <div className="w-full min-h-full flex flex-col">
        <div className="w-full h-full">
          <div className="mx-auto w-[960px]">
            <div className="mx-2 flex flex-row">
              <div className="ml-0 mr-2 w-2/3 mt-[100px]">
                <header className="border-b mb-5">
                  <h1 className="pt-2 text-2xl font-bold">{postsInfo.title}</h1>
                  <div className="">
                    <span className="text-gray-400">
                      Tác giả: {postsInfo?.userinfo?.name}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="inline-block">
                      <p className="text-sm mb-2 mr-2">
                        {" "}
                        <span className="text-gray-400">
                          Ngày đăng:{" "}
                          {postsInfo.create_at &&
                            moment(postsInfo.create_at).format(
                              "h:mm:ss MM/DD/YYYY"
                            )}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <span className="mr-2 text-gray-400">
                        <EyeOutlined /> {postsInfo?.view ?  postsInfo?.view : 0}
                      </span>
                      <span className="mr-2 text-gray-400">
                        <LikeOutlined /> {postsInfo?.reactions?.likes ? postsInfo?.reactions?.likes : 0}
                      </span>
                    </div>
                  </div>
                </header>
                <div className="">
                  {postsInfo.content && parse(postsInfo?.content)}
                </div>
              </div>
              <div className="mr-0 ml-2 w-1/3">
                <TopViewCtn />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto py-2">
          <PostFilterCtn tags={postsInfo.tags} />
        </div>
        <div className="w-full">
          <FooterCtn />
        </div>
      </div>
    </div>
  );
};
