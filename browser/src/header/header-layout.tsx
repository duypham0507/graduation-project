import { Button, Input } from "antd";
import { SearchOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Search } = Input;
export const HeaderLayout = () => {
  const history = useHistory();
  const onSearch = (value: string) => console.log(value);
  return (
    <div className="flex flex-row justify-between py-3 px-4 md:px-6 shadow items-center">
      <div className="flex flex-row">
        <HomeOutlined className="mr-2" style={{ fontSize: '150%'}} onClick={() => history.push('/home')}/>
        <div className=" w-[400px] h-10 bg-baseGray-20 flex flex-row relative rounded-[8px] border-[1px]">
          <input
            placeholder="Tìm kiếm..."
            className="w-full bg-transparent rounded-[8px] px-4 focus:outline-none focus:ring-2 focus:ring-transparent"
            type="text"
          />
          <button type="submit" className="float-left absolute right-4 top-2">
            <SearchOutlined />
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <EditOutlined className="mr-2" onClick={() => history.push("/posts")}/>
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
      </div>
    </div>
  );
};