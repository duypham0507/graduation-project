import { HeaderLayout } from "components/header/header-layout";
import { Link, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { NewPostsCtn } from "./container/new-post";
import { TopViewCtn } from "./container/top-view";
import { useEffect, useState } from "react";
import { getPost } from "services/post";
import { Carousel, Tabs } from "antd";
import { ACCESS_TOKEN } from "constants/index";
import { parseJwt } from "utils/index";
import { EditOutlined } from "@ant-design/icons";
import { ListBookmarkCtn } from "./container/list-bookmark";
import { ListBloggerCtn } from "./container/list-blogger";
import classNames from 'classnames';
import { FooterCtn } from "components/footer";

const navigate_homepage = [
  {
    path: "/home",
    label: "Bài viết"
  },
  {
    path: "/home/blogger",
    label: "Bloger"
  },
  {
    path: "/home/trending",
    label: "Xu hướng"
  },
  {
    path: "/home/group",
    label: "Hội nhóm"
  },
  {
    path: "/home/bookmark",
    label: "Bookmark của tôi"
  }
]
export const HomeComponent = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState();
  const [profile, setProfile] = useState<any>();
  const [pathNav, setPathNav] = useState<any>();
  

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      setProfile(parseJwt(accessToken));
    }
  }, []);

  const onSearch = (value) => {
    console.log(value);

    setKeyword(value);
  };

  return (
    <div className="w-full h-full overflow-x-hidden scrollbar">
      <div className="fixed top-0 left-0 z-50 w-full bg-white">
        <HeaderLayout onSearch={(keyword) => onSearch(keyword)} />
      </div>
      <div className="w-full min-h-full flex flex-col">
        <div className="w-full h-[210px] mt-10">
          <Carousel autoplay className="h-[210px]">
            <img className="w-full h-[210px] object-cover" src="/assets/images/img/header_img.jpg" alt="" />
            <img className="w-full h-[210px] object-cover" src="/assets/images/img/header_img2.jpg" alt="" />
            <img className="w-full h-[210px] object-cover" src="/assets/images/img/header_img3.jpg" alt="" />
          </Carousel>
        </div>
        <div className="w-full sticky top-[60px] z-30">
          <div className="w-full h-[60px] bg-gray-200 py-4">
            <div className="w-full px-4 mx-20">
              <div className="flex flex-row justify-between items-center w-full">
                <nav className="flex flex-row flex-nowrap items-center">
                  {navigate_homepage.map((item) => 
                    <NavLink  to={item.path} onClick={() => setPathNav(item.path)} className={classNames("mx-5 font-semibold hover:text-blue-600 cursor-pointer", {"hidden" : !profile && item.path == "/home/bookmark"})} activeStyle={{color: pathNav == item.path ? "blue" : ""}}>{item.label}</NavLink >
                  )}
                </nav>
                {profile && <button onClick={() => history.push("/create-posts")} className="mr-20 bg-blue-500 hover:bg-blue-600 px-2 rounded text-white">
                  <EditOutlined className="mr-2" />
                  <span className="font-semibold">Viết bài</span>
                </button>}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full h-full">
          <div className="mx-auto w-[1000px]">
            <div className="mx-2 flex flex-row">
              <div className="ml-0 mr-2 w-2/3">
                <Switch>
                  <Route path={"/"} exact>
                    <NewPostsCtn keyword={keyword} />
                  </Route>
                  <Route path={"/home"} exact>
                    <NewPostsCtn keyword={keyword} />
                  </Route>
                  <Route path={"/home/blogger"} exact>
                    <ListBloggerCtn />
                  </Route>
                  <Route path={"/home/bookmark"} exact>
                    <ListBookmarkCtn />
                  </Route>
                </Switch>
              </div>
              <div className="mr-0 ml-2 w-1/3">
                <Tabs className="">
                  <Tabs.TabPane key="1" tab={<h1 className="m-0 p-0 text-2xl font-bold text-black">Top thịnh hành</h1>}>
                    <TopViewCtn />
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <FooterCtn />
        </div>
      </div>
    </div>
  );
};
