import { EyeOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import { getPostFilter } from "services/post";
import moment from "moment";

interface IProps {
    tags?: any;
    authorId?: string;
}

export const RecommendPostCtn = ({ tags, authorId }: IProps) => {
    const [listPost, setListPost] = useState<Array<any>>()
    useEffect(() => {
        console.log(tags);
        const init = async () => {
            let param: any = {};
            param.tags = tags;
            param.authorId = authorId;
            await getPostFilter(param).then(rs => {
                setListPost(rs.data.data.data);
            })
        };
        init()
    }, [tags, authorId])
    console.log(listPost);
    
    return <div className="w-full">
        <div className="py-2 border-b">
            <h3 className="text-xl font-bold">Đề xuất cho bạn</h3>
        </div>
        <div className="w-full m-0 p-0 mt-2">
            {listPost?.map((item, i) => <div key={i} className="mb-5 pb-5 ml-0 border-b flex flex-row items-center justify-start relative">
                <div className="mr-5 w-[250px] h-[90px]">
                    <img src={item.thumbnail ? item.thumbnail : "/assets/images/img/header-img.jpg"} alt="" className="w-[250px] h-[100px]" />
                </div>
                <div className="w-full">
                    <h4 className="text-base font-bold mb-1">
                        {item.title}
                    </h4>
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-gray-400 text-sm">{moment(item.create_at).format("MM/DD/YYYY")}</span>
                        <span className="mr-2 text-sm text-gray-400"><EyeOutlined /> {item.view}</span>
                    </div>
                </div>
            </div>)}
        </div>
    </div>
}