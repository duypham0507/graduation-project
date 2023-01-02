import { EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getPost } from "services/post";

export const ListPostScreen = () => {
  const [listPost, setListPost] = useState<any>([]);
  useEffect(() => {
    const init = async () => {
      await getPost().then((rs) => {
        setListPost(rs.data.data);
      });
    };
    init();
  }, []);
  return (
    <div className="w-full h-full flex flex-col flex-grow-limit">
      <span className="text-xl text-baseGray-100 font-semibold px-6">
        Bài viết của tôi
      </span>
      <div className="scrollable-view pb-20 gap-y-4 mt-6">
        {[1,2,3,4,5,6,7,8,9,10].map((item, index) => <div className="w-full bg-transparent hover:bg-gray-100 relative px-4 py-2">
            <div className="flex flex-row space-x-4 h-[120px] rounded-sm items-start">
                <div className="w-[213px] h-[118px] rounded-none flex-none">
                    <img src="/assets/images/img/header-img.jpg" alt="" className="object-cover w-[213px] h-[118px] rounded-none flex-none"/>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col w-full">
                        <span className="text-lg font-semibold mb-3"> Tour du lịch Sài Gòn Miền Tây 1 ngày | Về thăm làng hoa Sa Đéc ngút ngàn</span>
                        <span className="">Ngày đăng: 08/12/2022</span>
                        <span className="">Tag: Du lịch trong nước</span>
                        <div className="flex flex-row">
                            <span className="mr-2"><EyeOutlined /> 1k</span>
                            <span className="mr-2"><LikeOutlined /> 500</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>)}
      </div>
    </div>
  );
};
