import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPost } from "services/post";

export const TopViewCtn = () => {
  const history = useHistory();
  const [listPost, setListPost] = useState<any>([])
  useEffect(() => {
    const init = async () => {
      let param:any = {};
      param.limit = 100;
      param.offset = 0;
      param.orderBy = "VIEW"
      await getPost(param).then(rs => {
        setListPost(rs.data.data);
      })
    };
    init()
  },[])
  return (
    <div className="">
      <div className="mx-0 my-2">
        <div className="min-h-[200px]">
          {listPost &&  listPost.map((item, index) => (
            <div key={item.id_post} className="px-4 py-5 font-semibold flex flex-row items-center mb-[-1px] cursor-pointer" onClick={() => history.push('/posts/' + item.id_post + '-' + item.slug)}>
              <span className="float-left flex-none ml-1 p-2 text-[20px] font-bold bg-transparent text-blue-500">
                {index + 1 + "."}
              </span>
              <span className="text-[13px] font-['r_conde_regular']">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
