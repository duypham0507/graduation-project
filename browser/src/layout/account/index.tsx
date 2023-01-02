import { Tabs } from "antd";
import { ProfileScreen } from "./container/profile";
import { ListPostScreen } from "./container/list-post";
import { ListTagScreen } from "./container/list-tag";
import { HeaderLayout } from "header/header-layout";

export const AccountComponent = () => {
  return (
    <div className="relative h-full w-full">
      <div className="h-full flex flex-col overscroll-none overflow-hidden">
        <div className="z-50 w-full bg-white">
          <HeaderLayout onSearch={(keyword) => {}} />
        </div>
        <div className="flex flex-row flex-grow-limit">
          <div className="w-full h-full ml-8">
            <Tabs tabPosition="left" className="mt-2 pl-0">
              <Tabs.TabPane key="1" tab="Thông tin cá nhân">
                <ProfileScreen />
              </Tabs.TabPane>
              <Tabs.TabPane key="2" tab="Bài viết của tôi">
                <ListPostScreen />
              </Tabs.TabPane>
              <Tabs.TabPane key="3" tab="Danh sách thẻ tag">
                <ListTagScreen />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
