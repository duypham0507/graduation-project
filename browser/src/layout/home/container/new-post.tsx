import { LoadingOutlined } from "@ant-design/icons";
import { Button, Pagination, Skeleton, Spin } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPost, getPostFilter } from "services/post";
const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;
const pageSize = 6;

interface IProps {
  keyword?: string
}

export const NewPostsCtn = (props: IProps) => {
  const history = useHistory();
  const [current, setCurrent] = useState()
  const [minIndex, setMinIndex] = useState<number>(0)
  const [maxIndex, setMaxIndex] = useState<number>(0)
  const [listPost, setListPost] = useState<any>([])
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (props.keyword && props.keyword != '') return
    const init = async () => {
      setLoading(true)
      let param: any = {};
      param.limit = 6
      await getPost(param).then(rs => {
        setListPost(rs.data.data);
        setMinIndex(0)
        setMaxIndex(pageSize)
      }).catch((error) => console.log(error))
      setLoading(false)
    };
    init()
  }, [])

  useEffect(() => {
    const init = async () => {
      if (props.keyword == undefined || props.keyword == '') return
      let param: any = {};
      param.search = props.keyword
      await getPostFilter(param).then(rs => {
        setListPost(rs.data.data.data);
      })
    };
    init()
  }, [props.keyword])

  const viewPost = (slug, id) => {
    history.push('/posts/' + slug, {  // location state
      postsId: id,
    })
  }

  const changePage = (page) => {
    setCurrent(page)
    setMinIndex((page - 1) * pageSize)
    setMaxIndex(page * pageSize);
  }
  console.log('123', listPost);

  return (
    <div className="mt-2 w-full flex flex-col">
      <h1 className="m-0 p-0 text-3xl font-bold pb-3 border-b">Bài viết mới nhất</h1>
      <div className="p-0 mx-0 my-5 w-full min-h-20">
        <Spin spinning={isLoading} indicator={antIcon}>
          {listPost.map((item, index) => index >= minIndex &&
            index < maxIndex && (
              <div key={index} className="border-b px-0 py-4">
                <h3 className="text-xl mt-0 mb-3 cursor-pointer" onClick={() => viewPost(item.slug, item.id_post)}>
                  {item.title}
                </h3>
                <div className="w-[215px] h-[140px] mr-5 align-top inline-block overflow-hidden cursor-pointer" onClick={() => viewPost(item.slug, item.id_post)}>
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
                    {item.search.length > 200 ? item.search.split(" ").slice(0, 50).join(" ") + "..." : item.search}
                  </div>
                  <Button className="absolute bottom-0 right-0 py-[3px] px-[10px] border-blue-500 hover:bg-blue-500" onClick={() => viewPost(item.slug, item.id_post)}>
                    <span className="text-blue-500 hover:text-white text-sm">
                      Xem chi tiết
                    </span>
                  </Button>
                </div>
              </div>
            ))}
        </Spin>
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
