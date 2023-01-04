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
import { PostAuthorCtn } from "./container/post-author";
import { RecommendPostCtn } from "./container/post-recommend";
import { Avatar, Card } from "antd";

const { Meta } = Card;
export const PostsComponent = () => {
  const [loading, setLoading] = useState(false);
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
    <div className="w-full h-full flex flex-col">
      <div className="z-50 w-full bg-white">
        <HeaderLayout />
      </div>
      {/* <div className="sticky top-[200px] left-5 ml-10">
        <div className="w-[200px] h-[200px]"></div>
        {postsInfo?.userinfo?.name!}
      </div> */}
      <div className="flex-grow h-full w-full flex-grow-limit flex flex-col overflow-x-hidden scrollbar">
        <div className="w-full h-auto block">
          <div className="mx-auto w-[1000px] h-full">
            <div className="mx-2 flex flex-row w-full">
              <div className="ml-0 mr-2 w-2/3 mt-[100px]">
                <header className="border-b mb-5">
                  <h1 className="pt-2 text-2xl font-bold">{postsInfo.title}</h1>
                  <div className="">
                    <span className="text-gray-400">
                      Tác giả: {postsInfo?.author?.name}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="inline-block">
                      <p className="text-sm mb-2 mr-2">
                        {" "}
                        <span className="text-gray-400">
                          Ngày đăng:{" "}
                          {postsInfo.create_at &&
                            moment(postsInfo.create_at).format("MM/DD/YYYY")}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <span className="mr-2 text-gray-400">
                        <EyeOutlined /> {postsInfo?.view ? postsInfo?.view : 0}
                      </span>
                      <span className="mr-2 text-gray-400">
                        <LikeOutlined />{" "}
                        {postsInfo?.reactions?.likes
                          ? postsInfo?.reactions?.likes
                          : 0}
                      </span>
                    </div>
                  </div>
                </header>
                <div className="">
                  {postsInfo.content && parse(postsInfo?.content)}
                </div>
                <div className="flex flex-row items-center">
                  {postsInfo?.tags?.map((item) => (
                    <div className="px-2 mr-1 border-[1px] rounded cursor-pointer bg-gray-200">
                      <span className="text-sm text-blue-500">
                        {item.tag_name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row"></div>
              </div>
              <div className="mr-0 ml-2 w-1/3 mt-[100px] flex flex-col">
                <Card className="w-full h-[200px]" loading={loading}>
                  <Meta
                    className=""
                    avatar={<Avatar className="w-[75px] h-[75px]" src={postsInfo.userinfo?.avatar! ? postsInfo.userinfo.avatar : "/assets/images/icons/icon-user.jpg"} />}
                    title={<h4 className="text-xl font-semibold">{postsInfo.userinfo?.name!}</h4>}
                    description={postsInfo.userinfo?.email!}
                  />
                </Card>
                <RecommendPostCtn />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto py-2 w-[1000px] h-auto">
          <div className="">
            <PostAuthorCtn author_id={postsInfo.author_id} />
          </div>
        </div>
        <div className="w-full h-[300px]">
          <FooterCtn />
        </div>
      </div>
    </div>
  );
};
