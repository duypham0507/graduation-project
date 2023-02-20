import { useEffect, useState } from "react"
import { getPostFilter } from '../../services/post';
import { HeaderLayout } from "header/header-layout";
import { Button, Pagination, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { NewPostsCtn } from "./container/new-post";
import { FooterCtn } from "layout/home/container/footer";
const pageSize = 6
const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;

export const PostWithAuthorComponent = () => {
    const history = useHistory();
    const [current, setCurrent] = useState()
    const [listPost, setListPost] = useState<any>([])
    const [isLoading, setLoading] = useState(false);
    const [minIndex, setMinIndex] = useState<number>(0)
    const [maxIndex, setMaxIndex] = useState<number>(0)
    const location = useLocation<{ useInfo: any }>();
    console.log(location.state.useInfo);


    useEffect(() => {
        if (!location.state.useInfo) return
        const init = async () => {
            setLoading(true)
            let param: any = {};
            param.limit = 6;
            param.authorId = location.state.useInfo.id;
            await getPostFilter(param).then(rs => {
                setListPost(rs.data.data.data);
                setMinIndex(0)
                setMaxIndex(pageSize)
            }).catch((error) => console.log(error))
            setLoading(false)
        };
        init()
    }, [])

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
    return <div className="w-full h-full overflow-x-hidden scrollbar">
        <div className="fixed top-0 left-0 z-50 w-full bg-white">
            <HeaderLayout onSearch={(keyword) => { }} />
        </div>
        <div className="w-full min-h-full flex flex-col">
            <div className="mt-20 w-full h-full">
                <div className="mx-auto w-[1000px] flex flex-row">
                    <div className="ml-0 mr-2 w-2/3">
                        <div className="mt-2 w-full flex flex-col">
                            <h1 className="m-0 p-0 text-2xl font-bold pb-3 border-b">Bài viết của tác giả: {location.state.useInfo.name}</h1>
                            <div className="p-0 mx-0 my-5 w-full min-h-20">
                                <Spin spinning={isLoading} indicator={antIcon}>
                                    {listPost.map((item, index) => index >= minIndex &&
                                        index < maxIndex && (
                                            <div key={index} className="border-b px-0 py-4">
                                                <h3 className="text-xl mt-0 mb-3 cursor-pointer hover:text-blue-600 font-semibold" onClick={() => viewPost(item.slug, item.id_post)}>
                                                    {item.title}
                                                </h3>
                                                <div className="w-[215px] h-[140px] mr-5 align-top inline-block overflow-hidden cursor-pointer" onClick={() => viewPost(item.slug, item.id_post)}>
                                                    <div className="no-underline">
                                                        <img
                                                            className="object-cover w-[215px] h-[140px]"
                                                            src={item.thumbnail ? item.thumbnail : "/assets/images/img/dong-phong-nha-quang-binh.jpg"}
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
                    </div>
                    <div className="mr-0 ml-2 w-1/3">
                        <NewPostsCtn />
                    </div>
                </div>
            </div>
            <div className="w-full">
                <FooterCtn />
            </div>
        </div>
    </div>
}