import { useEffect, useState } from "react";
import { getPostFilter } from "services/post";

interface IProps {
    keyword?:string
    tags?: []
}
  
export const PostFilterCtn = (props:IProps) => {
    const [listPost, setListPost] = useState<any>([])
    useEffect(() => {
        const init = async () => {
          let param:any = {};
          param.search = props.tags
          await getPostFilter(param).then(rs => {
            setListPost(rs.data.data.data);
          })
        };
        init()
    },[props.keyword])
    return <div className="">
      <h3 className="font-semibold">Bài viết liên quan</h3>
    </div>
}