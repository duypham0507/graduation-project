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
          await getPostFilter(param).then(rs => {
            setListPost(rs.data.data.data);
          })
        };
        init()
    },[props.keyword])
    return <div className="w-full">
      <div className="border-b-[2px] mb-6">
        <h2 className="font-bold not-italic pb-4 text-2xl">Bài viết liên quan</h2>
      </div>
      <div className="w-full flex-grow-limit scrollable-view flex flex-row flex-wrap">
        {[1,2,3,4,5,6].map((item, i) => <div key={i} className="w-1/2 md:w-1/3 xxl:w-1/4 xlHDP:w-1/5 xlPHD:w-1/6 max-h-[318px] pl-4 mb-2 relative bg-transparent item-program group">
          <div className="bg-cover h-auto w-full rounded-xl overflow-hidden mx-auto my-0">
            <img src="/assets/images/img/header-img.jpg" alt="" className="h-auto w-full"/>
          </div>
          <div className="text-left pt-2 pb-5 w-full">
            <h3 className="font-bold text-lg my-[0.1rem]">Nên ăn gì ở Huế đây? Bật mí luôn 10 món ăn đậm xứ Kinh Thành</h3>
            <span className="my-[0.1rem] text-base">{"Giữa muôn vàn ẩm thực có bề dày lịch sử của xứ Huế. Đã bao giờ bạn đã từng loay".split(" ").slice(0,50).join(" ") + "..."}</span>
          </div>
        </div>)}
      </div>
    </div>
}