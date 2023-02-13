import { EyeOutlined, LikeOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { getUser } from '../../../services/user';

export const ListBloggerCtn = () => {
    const [listBlogger, setListBlogger] = useState<any>([])

    // useEffect(() => {
    //     const init = async () => {
    //       await getUser().then(rs => {
    //         setListBlogger(rs.data.data);
    //         console.log(listBlogger);
    //       }).catch(error => error)
    //     };
    //     init()
    // },[])

    return <div className="mt-2 w-full">
        <h1 className="m-0 p-0 text-2xl font-bold pb-3 border-b">Blogger nổi bật</h1>
        <div className="p-0 mx-0 my-5 w-full flex flex-row flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((el,i) => <div key={i} className="w-1/2 md:w-1/2 xxl:w-1/4 xlHDP:w-1/5 xlPHD:w-1/6 max-h-[318px] px-4 my-6 relative">
                <div className="flex flex-row items-start">
                    <div className="">
                        <img src="/assets/images/img/dong-phong-nha-quang-binh.jpg" alt="" className="w-[60px] h-[60px] rounded-full" />
                    </div>
                    <div className="ml-5">
                        <span className="font-semibold">Blogger nổi bật</span>
                        <div className="flex flex-row">
                            <span className="mr-3 text-gray-400"><EyeOutlined /> 1525</span>
                            <span className="text-gray-400"><LikeOutlined /> 1450</span>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    </div>

}