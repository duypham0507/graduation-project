import { HeaderLayout } from "header/header-layout";
import { useHistory } from "react-router-dom";
import { FooterCtn } from "./container/footer";
import { MenuTopCtn } from "./container/menu-top";
import { NewPostsCtn } from "./container/new-post";
import { TopViewCtn } from "./container/top-view";
import { useEffect, useState } from 'react';
import { getPost } from "services/post";
export const HomeComponent = () => {
  const [keyword, setKeyword] = useState()
  const onSearch = (value) => {
    console.log(value);
    
    setKeyword(value)
  }
    
  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="fixed top-0 left-0 z-50 w-full bg-white">
        <HeaderLayout onSearch={(keyword) => onSearch(keyword)}/>
      </div>
      <div className="w-full min-h-full flex flex-col">
        <div className="w-full h-[200px]">
          <img
            className="w-full h-full"
            src="/assets/images/img/header-img.jpg"
            alt=""
          />
        </div>
        <div className="w-full sticky top-[60px] z-30">
          <MenuTopCtn />
        </div>
        <div className="mt-5 w-full h-full">
          <div className="mx-auto w-[960px]">
            <div className="mx-2 flex flex-row">
              <div className="ml-0 mr-2 w-2/3">
                <NewPostsCtn keyword={keyword}/>
              </div>
              <div className="mr-0 ml-2 w-1/3">
                <TopViewCtn />
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
