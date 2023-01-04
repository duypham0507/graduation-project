import { EyeOutlined } from "@ant-design/icons"

export const RecommendPostCtn = () => {
    return <div className="w-full">
        <div className="py-2 border-b">
            <h3 className="text-xl font-bold">Đề xuất cho bạn</h3>
        </div>
        <div className="w-full m-0 p-0 mt-2">
            {[1,2,3,4,5,6,7,8,9,10].map(item => <div className="mb-5 pb-5 ml-0 border-b flex flex-row items-center justify-start relative">
                <div className="mr-5 w-[250px] h-[90px]">
                    <img src="/assets/images/img/header-img.jpg" alt="" className="w-[250px] h-[100px]"/>
                </div>
                <div className="w-full">
                    <h4 className="text-base font-bold mb-1">
                        Rong ruổi miền Tây bằng xe máy có núi, có sông, có hồ, có biển.
                    </h4>
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-gray-300 text-sm">02/01/2023</span>
                        <span className="mr-2 text-sm text-gray-300"><EyeOutlined /> 452</span>
                    </div>
                </div>
            </div>)}
        </div>
    </div>
}