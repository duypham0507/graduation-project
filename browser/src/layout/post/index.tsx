import { HeaderLayout } from "components/header/header-layout";
import { TopViewCtn } from "layout/home/container/top-view";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ICreatePostPayload, IPostPayload, getPostDetail, updateReaction } from "services/post";
import parse from "html-react-parser";
import moment from "moment";
import { PostFilterCtn } from "./container/post-filter";
import { BookFilled, BookOutlined, ExclamationCircleFilled, EyeOutlined, FacebookFilled, FlagFilled, HeartOutlined, InstagramFilled, LikeFilled, LikeOutlined, ShareAltOutlined, TwitterOutlined, YoutubeFilled } from "@ant-design/icons";
import { PostAuthorCtn } from "./container/post-author";
import { RecommendPostCtn } from "./container/post-recommend";
import { Avatar, Card, Skeleton, Modal, message } from 'antd';
import BackToTopButton from "components/BackToTopButton";
import { CommentCtn } from "./container/comment";
import { ACCESS_TOKEN } from "constants/index";
import { parseJwt } from "utils/index";
import { getBookmarByCur, toggleBookmark } from '../../services/bookmark';
import { FooterCtn } from "components/footer";

const { Meta } = Card;
const { warning } = Modal;
export const PostsComponent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [postsInfo, setPostsInfo] = useState<IPostPayload>();
  // const location = useLocation<{ postId: string }>();
  const param = useParams<{ postId: string, slug: string }>();
  const content = document.getElementById('content-post');
  const [profile, setProfile] = useState<any>();
  const [isBookmarByCur, setIsBookmarByCur] = useState(false);
  console.log(param);
  
  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      setProfile(parseJwt(accessToken));
    }
  }, []);
  useEffect(() => {
    getPostInfo();
  }, [param.postId]);

  useEffect(() => {
    statusBookMark();
  }, [param.postId]);

  const statusBookMark = async () => {
    if (!param.postId) return;
    await getBookmarByCur(param.postId).then(rs => {
      rs.status === 200 ? setIsBookmarByCur(true) : setIsBookmarByCur(false);
    });   
  };

  const getPostInfo = async () => {
    if (!param.postId) return;
    // setLoading(true)
    let res = await getPostDetail(param.postId);
    res.status === 200 && setPostsInfo(res.data.data);
    // setLoading(false)
  };

  useEffect(() => {
    const onScroll = () => {
      content?.scrollTop! >= 500 ? setShowButton(true) : setShowButton(false);
    };
    content?.addEventListener('scroll', onScroll, { passive: true });
    return () => content?.removeEventListener('scroll', onScroll);
  });

  const scrollToTop = () => {
    content?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToTop = () => {
    content?.scrollTo({ top: 0 });
  };
  
  const isLiked = useMemo(() => {
    let checkLike = postsInfo?.reactionlists?.some(x => x.id_user == profile?.id!);
    if(checkLike && postsInfo?.reactionlists?.length! > 0){
      return true;
    } else {
      return false;
    }
  }, [postsInfo]);

  const actionReaction = async () => {
    let param:any = {
      id_post: postsInfo?.id_post,
      reaction_type: "LIKE",
      status: isLiked ? "0" : "1"
    };
    if(!profile){
      showWarning();
      return;
    }
    await updateReaction(param);
    getPostInfo();
  };

  const handleBookmark = async () => {
    if(!profile){
      showWarning();
      return;
    }
    let param:any = {
      id_post: postsInfo?.id_post,
    };
    await toggleBookmark(param);
    statusBookMark();
  };

  const showWarning = () => {
    warning({
      title: 'Bạn cần đăng nhập để thực hiện thao tác này',
      icon: <ExclamationCircleFilled />,
      okText: 'Xác nhận',
      okType: 'link',
      onOk() {
        console.log('OK');
      },
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("http://localhost:3000/posts/" + postsInfo?.id_post + "-" + postsInfo?.slug)
      .then(() => {
        message.success("Sao chép link thành công");
      })
      .catch(() => {
        message.error("Sao chép link thành công");
      });
  };

  const description = () => <div className="flex flex-col h-full">
    <span className="text-base text-gray-400">{postsInfo?.userinfo?.email!}</span>
    <div className="flex flex-row items-center mt-4">
      <span className="cursor-pointer mx-2">
        <FacebookFilled style={{ fontSize: "150%" }}/>
      </span>
      <span className="cursor-pointer mx-2">
        <YoutubeFilled style={{ fontSize: "150%" }}/>
      </span>
      <span className="cursor-pointer mx-2">
        <TwitterOutlined style={{ fontSize: "150%" }}/>
      </span>
      <span className="cursor-pointer mx-2">
        <InstagramFilled style={{ fontSize: "150%" }}/>
      </span>
    </div>
  </div>;
  return (
    <div className="w-full h-full flex flex-col">
      <div className="z-50 w-full bg-white">
        <HeaderLayout />
      </div>
      {/* <div className="sticky top-[200px] left-5 ml-10">
        <div className="w-[200px] h-[200px]"></div>
        {postsInfo?.userinfo?.name!}
      </div> */}
      <div id="content-post" className="flex-grow h-full w-full flex-grow-limit flex flex-col overflow-x-hidden scrollbar">
        <div className="w-full h-auto block">
          <div className="mx-auto w-4/5 h-full">
            <div className="mx-2 flex flex-row w-full">
              <div className="ml-0 mr-2 w-2/3 mt-[100px]">
                <Skeleton loading={loading} active avatar>
                  <header className="border-b mb-5">
                    <h1 className="pt-2 text-2xl font-bold">{postsInfo?.title}</h1>
                    <div className="">
                      <span className="text-gray-400 cursor-pointer" onClick={() => history.push('/search-author', {useInfo: postsInfo?.userinfo!})}>
                        Tác giả: {postsInfo?.userinfo?.name}
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div className="inline-block">
                        <p className="text-sm mb-2 mr-2">
                          {" "}
                          <span className="text-gray-400">
                            Ngày đăng:{" "}
                            {postsInfo?.create_at &&
                              moment(postsInfo?.create_at).format("MM/DD/YYYY")}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span className="mr-2 text-gray-400">
                          <EyeOutlined /> {postsInfo?.view ? postsInfo?.view : 0}
                        </span>
                        <span className="mr-2 text-gray-400">
                          <LikeOutlined />{" "}
                          {postsInfo?.reactionlists?.length
                            ? postsInfo?.reactionlists?.length
                            : 0}
                        </span>
                      </div>
                    </div>
                  </header>
                  <div className="">
                    {postsInfo?.content && parse(postsInfo?.content)}
                  </div>
                  <div className="flex flex-row items-center">
                    {postsInfo?.tags?.map((item, i) => (
                      <div key={i} className="px-2 pb-1 mr-1 border-[1px] rounded cursor-pointer bg-gray-200"  onClick={() => history.push('/search-tags', {tag: item})}>
                        <span className="text-sm text-blue-500 hover:text-blue-600">
                          {item.tag_name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row justify-center mt-2 border-t border-b py-2">
                    <button onClick={actionReaction} className="font-semibold text-blue-700 mx-2">{isLiked ? <LikeFilled/> : <LikeOutlined />}{" "}{isLiked ? "Đã thích" : "Thích"}</button>
                    <button onClick={handleBookmark} className="font-semibold text-gray-600 mx-2">{isBookmarByCur ? <BookFilled/> : <BookOutlined />}{" "}{isBookmarByCur ? 'Đã lưu' : 'Lưu bài viết'}</button>
                    <button onClick={handleCopyLink} className="font-semibold text-gray-600 mx-2"><ShareAltOutlined />{" "}Chia sẻ</button>
                    <button className="font-semibold text-gray-600 mx-2"><FlagFilled />{" "}Báo cáo</button>
                  </div>
                </Skeleton>
              </div>
              <div className={`mr-0 ml-2 w-1/3 ${showButton ? 'top-5' : 'top-20'} sticky  h-full`}>
                {!showButton && <Card
                  className="w-full h-[150px]"
                  loading={loading}
                >
                  <Meta
                    className=""
                    avatar={<Avatar className="w-[70px] h-[70px]" src={postsInfo?.userinfo?.avatar! ? postsInfo?.userinfo.avatar : "/assets/images/icons/icon-user.jpg"} />}
                    title={<h4 className="text-xl font-semibold cursor-pointer" onClick={() => history.push('/search-author', {useInfo: postsInfo?.userinfo!})}>{postsInfo?.userinfo?.name!}</h4>}
                    description={description()}
                  />
                </Card>}
                <div className="">
                  <Skeleton loading={loading} active avatar className="h-[500px]">
                    <RecommendPostCtn tags={postsInfo?.tags![0].id} id_post={postsInfo?.id_post} authorId={postsInfo?.userinfo?.id.toString()} callBack={backToTop}/>
                  </Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto py-2 w-4/5 h-auto">
          <div className="">
            <PostAuthorCtn author_id={postsInfo?.author_id} id_post={postsInfo?.id_post} callBack={backToTop}/>
          </div>
        </div>
        <div className="mx-auto py-2 w-4/5 h-auto mt-2">
          <CommentCtn post_id={param.postId} author_id={postsInfo?.author_id?.toString()}/>
        </div>
        <div className="w-full h-[300px]">
          <FooterCtn />
        </div>
      </div>
      <BackToTopButton showButton={showButton} onScroll={scrollToTop} />
    </div>
  );
};
