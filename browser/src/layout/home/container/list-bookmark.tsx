import { Button, Pagination } from "antd"
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { getListBookmark } from "services/bookmark";

export const ListBookmarkCtn = () => {
  const history = useHistory();
  const [listBookmark, setListBookmark] = useState<any>()

  useEffect(() => {
    const init = async () => {
      let res = await getListBookmark()
      console.log(res);
      setListBookmark(res.data.data)
    }
    init()
  }, [])
  return <div className="mt-2 w-full">
    <h1 className="m-0 p-0 text-2xl font-bold pb-3 border-b">Bookmark của tôi</h1>
    <div className="p-0 mx-0 my-5 w-full">
      {listBookmark && listBookmark.map((item, index) => (
        <div key={index} className="border-b px-0 py-4">
          <h3 className="text-xl mt-0 mb-3 cursor-pointer" onClick={() => history.push('/posts/' + item.id_post + '-' + item.slug)}>
            {item.post_info.title}
          </h3>
          <div className="w-[215px] h-[140px] mr-5 align-top inline-block overflow-hidden cursor-pointer" onClick={() => history.push('/posts/' + item.slug, {postsId: item.id_post})}>
            <div className="no-underline">
              <img
                className="w-[213px] h-[140px] object-cover"
                src={item.post_info?.thumbnail ? item.post_info?.thumbnail : "/assets/images/img/dong-phong-nha-quang-binh.jpg"}
                alt=""
              />
            </div>
          </div>
          <div className="w-[380px] min-h-[140px] inline-block align-top relative">
            <div className="text-base font-['r_conde_regular']">
              {item.post_info?.search?.length > 200 ? item.post_info?.search?.split(" ").slice(0, 50).join(" ") + "..." : item.post_info?.search!}
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

        onChange={() => { }} />
    </div>
  </div>
}