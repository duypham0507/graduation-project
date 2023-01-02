import { Button, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPost, getPostFilter } from "services/post";

const pageSize = 6;

interface IProps {
  keyword?:string
}

export const NewPostsCtn = (props:IProps) => {
  const history = useHistory();
  const [current, setCurrent] = useState()
  const [minIndex, setMinIndex] = useState<number>(0)
  const [maxIndex, setMaxIndex] = useState<number>(0)
  const [listPost, setListPost] = useState<any>([])
  useEffect(() => {
    const init = async () => {
      await getPost().then(rs => {
        setListPost(rs.data.data);
        setMinIndex(0)
        setMaxIndex(pageSize)        
      })
    };
    init()
  },[])

  useEffect(() => {
    const init = async () => {
      let param:any = {};
      param.search = props.keyword
      await getPostFilter(param).then(rs => {
        setListPost(rs.data.data.data);
      })
    };
    init()
  },[props.keyword])

  const viewPost = (id) => {
    history.push('/posts/' + id)
  }

  const changePage = (page) => {
    setCurrent(page)
    setMinIndex((page - 1) * pageSize)
    setMaxIndex(page * pageSize);  
  }
  console.log('123',listPost);    

  return (
    <div className="">
      <h1 className="m-0 p-0 text-[24px] pb-2 border-b">Bài viết mới nhất</h1>
      <div className="p-0 mx-0 my-5">
        {listPost.map((item, index) => index >= minIndex &&
              index < maxIndex && (
          <div key={index} className="border-b px-0 py-4 cursor-pointer" onClick={() => viewPost(item.id_post)}>
            <h3 className="text-xl mt-0 mb-3">
              {item.title}
            </h3>
            <div className="w-[215px] h-[140px] mr-5 align-top inline-block overflow-hidden">
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
                {item.search.length > 200 ? item.search.split(" ").slice(0,50).join(" ") + "..." : item.search}
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
          pageSize={pageSize}
          current={current}
          total={listPost.length}
          onChange={changePage} />
      </div>
    </div>
  );
};
