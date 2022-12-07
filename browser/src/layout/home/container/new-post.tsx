import { Button, Pagination } from "antd";

export const NewPostsCtn = () => {
  return (
    <div className="">
      <h1 className="m-0 p-0 text-[24px] pb-2 border-b">Bài viết mới nhất</h1>
      <div className="p-0 mx-0 my-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <div className="border-b px-0 py-4">
            <h3 className="text-xl mt-0 mb-3">
              Động Phong Nha ở Quảng Bình: Khám phá hang động 2 triệu năm tuổi
            </h3>
            <div className="w-[215px] h-[140px] mr-5 align-top inline-block overflow-hidden">
              <a href="" className="no-underline">
                <img
                  className="w-full"
                  src="/assets/images/img/dong-phong-nha-quang-binh.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="w-[380px] min-h-[140px] inline-block align-top relative">
              <div className="text-base font-['r_conde_regular']">
                Bạn đã thật sự khám phá trọn vẹn vẻ đẹp của vùng đất Tây Nguyên
                chưa? Nếu chưa thì cùng nhau khai phá vùng đất này cùng với tour
                du lịch Tây Nguyên Tết 2023 nhé!
              </div>
              <Button className="absolute bottom-0 right-0 py-[3px] px-[10px] border-blue-500 hover:bg-blue-500">
                <span className="text-blue-500 hover:text-white text-sm">
                  Xem chi tiết
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};
