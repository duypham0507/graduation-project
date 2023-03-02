import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Pagination, Skeleton, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPost, getPostFilter } from "services/post";
const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;
const pageSize = 6;

interface IProps {

}

export const NewPostsCtn = (props: IProps) => {
  const history = useHistory();
  const [listPost, setListPost] = useState<any>([])
  useEffect(() => {
    const init = async () => {
      let param: any = {};
      param.limit = 6;
      param.offset = 0;
      await getPost(param).then(rs => {
        setListPost(rs.data.data);
      }).catch((error) => console.log(error))
    };
    init()
  }, [])

  return (
    <div className="w-full mt-3">
      <div className="border-b-[2px] mb-6">
        <h2 className="font-bold not-italic pb-3 text-xl">Bài viết gần đây</h2>
      </div>
      <div className="w-full flex-grow-limit flex flex-row flex-wrap">
        {listPost?.map((item, i) => <div key={i} onClick={() => history.push('/posts/' + item.id_post + '-' + item.slug)} className="mb-5 pb-5 ml-0 border-b flex flex-row items-center justify-start relative">
          <div className="mr-5 w-[250px] h-[90px]">
            <img src={item.thumbnail ? item.thumbnail : "/assets/images/img/header-img.jpg"} alt="" className="w-[250px] h-[100px]" />
          </div>
          <div className="w-full">
            <h4 className="text-base font-bold mb-1">
              {item.title}
            </h4>
            <div className="flex flex-row items-center justify-between">
              <span className="text-gray-300 text-sm">{moment(item.create_at).format("MM/DD/YYYY")}</span>
              <span className="mr-2 text-sm text-gray-300"><EyeOutlined /> {item.view}</span>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
};
