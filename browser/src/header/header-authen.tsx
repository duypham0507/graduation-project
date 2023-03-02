import { Button, Input } from "antd";
import {
  HomeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const { Search } = Input;
export const HeaderAuthen = () => {
  const history = useHistory()

  const onSearch = (event) => {
    event.keyCode == 13 && history.push('/home', {keyword: event.target.value})
  };
  return (
    <div className="flex flex-row justify-between py-3 px-4 md:px-6 shadow items-center">
      <div className="flex flex-row">
        <div className="w-[35px] h-[35px] mr-2 cursor-pointer" onClick={() => history.push("/home")}>
          <img src="/assets/images/img/logo.jpg" alt="" className="w-[35px] h-[35px]"/>
        </div>
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
    </div>
  );
};
