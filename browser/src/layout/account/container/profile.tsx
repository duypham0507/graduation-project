import { ACCESS_TOKEN } from "constants/index";
import { useEffect, useState } from "react";
import { parseJwt } from "utils/index";

export const ProfileScreen = () => {
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      setProfile(parseJwt(accessToken));
    }
  }, []);
  console.log(profile);
  
  return <div className="flex flex-col w-full h-full px-6">
    <div className="scrollable-view flex flex-col pb-10">
        <span className="text-xl text-baseGray-100 font-semibold mb-10">Thông tin cá nhân</span>
        <div className="flex flex-row">
            <div className="flex flex-col w-2/5 space-y-2">
                <div className="flex flex-row">
                  <span className="w-[90px] flex-none text-right mr-5">Tên hiển thị:</span>
                  <div className="flex flex-row items-center space-x-2 text-left">
                    <span className=" font-normal text-md">{profile?.name}</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[90px] flex-none text-right mr-5">Email:</span>
                  <div className="flex flex-row items-center space-x-2 text-left">
                    <span className=" font-normal text-md">{profile?.email}</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[90px] flex-none text-right mr-5">Ngày sinh:</span>
                  <div className="flex flex-row items-center space-x-2 text-left">
                    <span className=" font-normal text-md">Chưa có</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[90px] flex-none text-right mr-5">Giới tính:</span>
                  <div className="flex flex-row items-center space-x-2 text-left">
                    <span className=" font-normal text-md">Nam</span>
                  </div>
                </div>
            </div>
        </div>
    </div>
  </div>;
};
