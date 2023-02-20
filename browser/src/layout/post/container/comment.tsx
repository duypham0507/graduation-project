import { ClockCircleOutlined, CommentOutlined, MessageOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Modal } from "antd";
import { ACCESS_TOKEN } from "constants/index";
import moment from "moment";
import { useState, useEffect } from 'react';
import { createComment, deleteComment, getComment, updateComment } from "services/comment";
import { parseJwt } from "utils/index";
import classNames from 'classnames';
const { TextArea } = Input;

const static_menu_action = [
  {
    label: "Chỉnh sửa",
    type: 'edit'
  },
  {
    label: "Xóa",
    type: 'delete'
  }
]

interface IProps {
  post_id?: string;
  author_id?: string
}
export const CommentCtn = (props: IProps) => {
  const [listComment, setListComment] = useState<any>([])
  const [content, setContent] = useState<string>()
  const [profile, setProfile] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idComment, setIdComment] = useState<any>();
  const [changeComment, setChangeComment] = useState<any>();
  
  

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      setProfile(parseJwt(accessToken));
    }
  }, []);

  const menuActionComent = (action: (type) => void) => {
    return <div className={`w-auto shadow-lg flex flex-col bg-white mr-1`}>
      {static_menu_action.map((item, index) => {
        return <button className='flex w-full justify-end py-2 px-2 hover:bg-gray-300'
          key={index}
          onClick={(e) => {
            action(item.type)
          }}
        >
          <span className='text-black text-sm'>{item.label} </span>
        </button>
      })}
    </div>
  }

  useEffect(() => {
    getComments()
  }, [])

  const getComments = async () => {
    await getComment(props.post_id!).then(res => {
      setListComment(res.data.data.data);
      console.log('res', listComment);
    }).catch(error => console.log('error', error))
  };

  const submitComment = async () => {
    let param: any = {}

    param.id_post = props.post_id;
    param.content = content;

    if (profile) {
      let res = await createComment(param)
      console.log('đasa', res);
      setContent(undefined)
      getComments()
    } else {
      setIsModalOpen(true)
    }
  }

  const handleAction = async (type,item) => {
    switch(type){
      case"edit":
        setIdComment(item.id_comment)
        setChangeComment(item.content)
        break;
      case "delete":
        await deleteComment(item.id_comment);
        await getComments()
        break
    }
  }

  const editComment = async (id_comment) => {
    let param:any = {
      id_comment: id_comment,
      content: changeComment
    }
    await updateComment(param);
    await getComments()
    setIdComment(undefined)
  }
  return (
    <div className="w-full">
      <div className="border-b-[2px] mb-6">
        <h2 className="font-bold not-italic pb-3 text-xl">Bình luận</h2>
      </div>
      <div className="w-2/3 flex-grow-limit flex flex-row flex-wrap">
        {listComment && <div className="w-full flex flex-row justify-center mb-3">
          <span className="text-base text-gray-500"><MessageOutlined /> {listComment.length > 0 ? `Có ${listComment.length} bình luận` : "Chưa có bình luận nào"}</span>
        </div>}
        {listComment && listComment.map((item, i) => <div key={i} className="flex flex-row items-center w-full mb-5 relative">
          <div className="flex-none mr-5">
            <img src={item.user_info?.avatar ? item.user_info?.avatar : "/assets/images/icons/icon-user.jpg"} alt="" className="w-[60px] h-[60px] rounded-full" />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center">
              <span className="font-semibold mr-2">{item.user_info.name}</span>
              <span className="text-sm text-gray-300">{item.create_at && moment(item?.create_at).format("MM/DD/YYYY gg:hh:ss")}</span>
            </div>
            {idComment == item.id_comment && <div className="w-[95%]">
              <input type="text" className="focus:outline-none border-b w-full" onChange={(event) => setChangeComment(event.target.value)} value={changeComment}/>
              <div className="flex flex-row justify-end">
                <div className="flex flex-row items-center mt-1">
                  <button className="text-sm border px-2 py-1 mr-2" onClick={() => setIdComment(undefined)}>Đóng</button>
                  <button className="text-sm border px-2 py-1 text-white bg-blue-400 hover:bg-blue-500" onClick={() => editComment(item.id_comment)}>Sửa</button>
                </div>
              </div>
            </div>}
            {idComment != item.id_comment && <span className="">{item.content}</span>}
            {idComment != item.id_comment && <div className="flex flex-row items-center px-2">
              <span className="text-sm text-gray-400 mr-5">2 Thích</span>
              <span className="text-sm text-gray-400">Phản hồi</span>
            </div>}
          </div>
          {(item.id_user == profile?.id!) && <div className={classNames('flex flex-row items-center justify-center w-6 h-6 p-1 rounded-full hover:bg-gray-200 absolute top-3 right-2')}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <Dropdown overlay={menuActionComent((actioneType) => handleAction(actioneType, item))} placement='bottomLeft' trigger={['click']}>
              <a onClick={(e) => {
                e.preventDefault()
              }}
              >
                <MoreOutlined className="text-xl text-baseGray-60" />
              </a>
            </Dropdown>
          </div>}
        </div>)}
        {profile && <div className="w-full">
          <div className="mb-2">
            <span className="font-semibold">Viết bình luận</span>
          </div>
          <div className="flex flex-col items-start w-full">
            <TextArea rows={4} className="w-full" value={content} onChange={(event) => setContent(event.target.value)} />
            <div className="mt-2 w-full flex flex-row justify-end">
              <Button onClick={submitComment} className="bg-blue-500 hover:bg-blue-600 text-white hover:!text-white font-semibold">Gửi</Button>
              <Button onClick={() => setContent('')} className="hover:!border-black hover:!text-black font-semibold ml-2">Hủy</Button>
            </div>
          </div>
        </div>}
        {!profile && <div className="w-full">
          <div className="flex flex-col items-center border px-4 py-2 w-full cursor-pointer">
            <span className="">Bạn phải đăng nhập để bình luận</span>
          </div>
        </div>}
      </div>

      {/* <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)}>
        <p className="">Bạn phải đăng nhập </p>
      </Modal> */}
    </div>
  );
};
