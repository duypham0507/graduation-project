import { Button, Input, Popover } from "antd";
import { SearchOutlined, EditOutlined, HomeOutlined, CaretDownOutlined, ProfileOutlined, LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "constants/index";
import { parseJwt } from "utils/index";

interface IProps {
  onSearch?: (value: string) => void
}

export const HeaderLayout = (props: IProps) => {
  const history = useHistory();

  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      setProfile(parseJwt(accessToken));
    }
  }, []);

  const onSearch = (event) => {
    event.keyCode == 13 && props.onSearch && props.onSearch(event.target.value)
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    location.reload()
  }

  const content = (
    <div>
      <button className="flex flex-row py-3 px-3" onClick={() => history.push('/account')}>
        <ProfileOutlined />
        <span className="text-md w-full text-black leading-none pl-3">Quản lý tài khoản</span>
      </button>
      <button className="flex flex-row py-3 px-3" onClick={logout}>
        <LogoutOutlined  className="text-red-500"/>
        <span className="text-md text-red-500 leading-none pl-3">Đăng xuất</span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-row justify-between py-3 px-4 md:px-6 shadow items-center">
      <div className="flex flex-row">
        <HomeOutlined
          className="mr-2"
          style={{ fontSize: "150%" }}
          onClick={() => history.push("/home")}
        />
        <div className=" w-[400px] h-10 bg-baseGray-20 flex flex-row relative rounded-[8px] border-[1px]">
          <input
            placeholder="Tìm kiếm..."
            className="w-full bg-transparent rounded-[8px] px-4 focus:outline-none focus:ring-2 focus:ring-transparent"
            type="text"
            onKeyUp={onSearch}
          />
          <button type="submit" className="float-left absolute right-4 top-2">
            <SearchOutlined />
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        {profile && <EditOutlined className="mr-2" onClick={() => history.push("/create-posts")} />}
        {!profile && (
          <div className="w-[190px] flex flex-row justify-between">
            <Button
              className="bg-blue-500 text-white hover:text-white font-semibold"
              onClick={() => history.push("/login")}
            >
              Đăng nhập
            </Button>
            <Button
              className="bg-green-500 text-white hover:text-white font-semibold"
              onClick={() => history.push("/signup")}
            >
              Đăng kí
            </Button>
          </div>
        )}
        {profile && (
          <Popover content={content} trigger="click">
            <div className="cursor-pointer h-full">
              <div className="flex flex-row items-center">
                <div className="w-[40px] h-[40px] mr-1">
                  <img
                    className="w-[40px] h-[40px]"
                    src="/assets/images/icons/icon-user.jpg"
                    alt=""
                  />
                </div>
                <span className="text-md mr-2 hover:text-orange-400">
                  {profile.name}
                </span>
                <span className=""><CaretDownOutlined /></span>
              </div>
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};
