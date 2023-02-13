import { EditOutlined } from "@ant-design/icons"
import { ACCESS_TOKEN } from "constants/index";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { parseJwt } from "utils/index";

export const MenuTopCtn = () => {
    const history = useHistory();
    const [profile, setProfile] = useState<any>();

    useEffect(() => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            setProfile(parseJwt(accessToken));
        }
    }, []);

    return <div className="w-full h-[60px] bg-gray-200 py-4">
        <div className="w-full px-4 mx-[70px]">
            <div className="flex flex-row justify-between items-center w-full">
                <ul className="flex flex-row flex-nowrap items-center">
                    <li className="mx-5 font-semibold hover:text-blue-500 cursor-pointer">Trang chủ</li>
                    <li className="mx-5 font-semibold hover:text-blue-500 cursor-pointer">Bài viết</li>
                    <li className="mx-5 font-semibold hover:text-blue-500 cursor-pointer">Bloger</li>
                    <li className="mx-5 font-semibold hover:text-blue-500 cursor-pointer">Bookmark của tôi</li>
                </ul>
                {profile && <button onClick={() => history.push("/create-posts")} className="mr-20 bg-blue-500 hover:bg-blue-600 px-2 rounded text-white">
                    <EditOutlined className="mr-2"/>
                    <span className="font-semibold">Viết bài</span>
                </button>}
            </div>
        </div>
    </div>
}