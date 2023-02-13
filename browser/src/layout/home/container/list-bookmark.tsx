import { Button, Pagination } from "antd"

export const ListBookmarkCtn = () => {
    return <div className="mt-2 w-full">
        <h1 className="m-0 p-0 text-2xl font-bold pb-3 border-b">Bookmark của tôi</h1>
        <div className="p-0 mx-0 my-5 w-full">
        {[1,2,3,4,5].map((item, index) =>(
          <div key={index} className="border-b px-0 py-4">
            <h3 className="text-xl mt-0 mb-3 cursor-pointer">
                VÉ MÁY BAY ĐI THỤY SĨ 2023 CÓ GIÁ BAO NHIÊU?
            </h3>
            <div className="w-[215px] h-[140px] mr-5 align-top inline-block overflow-hidden cursor-pointer">
              <div className="no-underline">
                <img
                  className="w-full"
                  src="/assets/images/img/dong-phong-nha-quang-binh.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="w-[380px] min-h-[140px] inline-block align-top relative">
              <div className="text-base font-['r_conde_regular']"> 
                Làm thế nào để săn được vé máy bay đi Thụy Sĩ giá rẻ? Dưới đây là một trong những tuyệt chiêu mà mình thường xuyên áp dụng để đặt vé máy bay tiết kiệm nhất.
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
        <Pagination 
          
          onChange={() => {}} />
      </div>
    </div>
}