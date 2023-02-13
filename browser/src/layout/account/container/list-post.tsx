import { ExclamationCircleFilled, EyeOutlined, LikeOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Modal } from "antd";
import classNames from 'classnames';
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleltePost, getPostByUser } from "services/post";
const { confirm } = Modal;

const static_menu_class_action = [
  {
    label: "Xem bài viết",
    type: 'detail'
  },
  {
    label: "Chỉnh sửa bài viết",
    type: 'edit'
  },
  {
    label: "Xóa bài viết",
    type: 'delete'
  }
]

export const ListPostScreen = () => {
  const history = useHistory();
  const [listPost, setListPost] = useState<any>([])
  const menuActionRender = (action: (type) => void) => {
    return <div className={`w-auto shadow-lg flex flex-col bg-white mr-1`}>
      {static_menu_class_action.map((item, index) => {
        return <button className='flex w-full justify-end py-2 px-2 hover:bg-gray-300'
          key={index}
          onClick={(e) => {
            action(item.type)
          }}
        >
          <span className='text-boldBlack text-base'>{item.label} </span>
        </button>
      })}
    </div>
  }
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    let param: any = {};
    await getPostByUser().then(rs => {
      setListPost(rs.data.data);
      console.log(listPost)
    })
  };
  
  const handleAction = (type,item) => {
    switch(type){
      case"detail":
        history.push('/posts/' + item.slug, {postsId: item.id_post});
        break;
      case"edit":
        history.push('/update-posts/' + item.id_post);
        break;
      case "delete":
        showDeleteConfirm(item.id_post);
        break
    }
  }

  const showDeleteConfirm = (id_post) => {
    confirm({
      title: 'Bạn có muốn xóa bài viết này?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await deleltePost(id_post);
        await init()
      },
      onCancel() {
        
      },
    });
  };

  const renderWithStatus = (status) => {
    switch(status) {
      case"APPROVED":
        return {
          bg_corlor: "border-green-500",
          text_corlor: "text-green-500",
          text: "Đã duyệt"
        };
      case"UNAPPROVED":
        return {
          bg_corlor: "border-orange-500",
          text_corlor: "text-orange-500",
          text: "Chưa duyệt"
        };
      case "BLOCKED":
        return {
          bg_corlor: "border-red-500",
          text_corlor: "text-red-500",
          text: "Bị chặn"
        }
      default:
        return {
          bg_corlor: "border-orange-500",
          text_corlor: "text-orange-500",
          text: "Chưa duyệt"
        };
    }
  }
  return (
    <div className="w-full h-full flex flex-col flex-grow-limit">
      <span className="text-xl text-baseGray-100 font-semibold px-6">
        Bài viết của tôi
      </span>
      <div className="scrollable-view pb-20 gap-y-4 mt-6 h-full">
        {listPost && listPost.map((item, index) => <div key={index} className="w-full cursor-pointer bg-transparent hover:bg-gray-100 relative px-3 py-2">
          <div className="flex flex-row space-x-4 h-[120px] rounded-sm items-start">
            <div className="w-[213px] h-[118px] rounded-none flex-none">
              <img src="/assets/images/img/header-img.jpg" alt="" className="object-cover w-[213px] h-[118px] rounded-none flex-none" />
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col w-full">
                <span className="text-lg font-semibold mb-3">{item.title}</span>
                <span className="">Ngày đăng: {moment(item.create_at).format("MM/DD/YYYY")}</span>
                <div className="flex flex-row">
                  <span className="mr-1">Tag:</span>
                  {item.tags.map(el => <span className="">{el.tag_name},</span>)}
                </div>
                <div className="flex flex-row">
                  <span className="mr-2"><EyeOutlined /> {item.view}</span>
                  <span className="mr-2"><LikeOutlined /> {item.reactions.likes}</span>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center w-1/4">
                <div className={`border px-4 py-2 flex flex-row items-center h-8 ${renderWithStatus(item.status).bg_corlor} ${renderWithStatus(item.status).text_corlor}`}>
                  <span className="">{renderWithStatus(item.status).text}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classNames('flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 absolute top-3 right-2')}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <Dropdown overlay={menuActionRender((actioneType) => handleAction(actioneType, item))} placement='bottomLeft' trigger={['hover']}>
              <a onClick={(e) => {
                e.preventDefault()
              }}
              >
                <MoreOutlined className="text-2xl text-baseGray-60" />
              </a>
            </Dropdown>
          </div>
        </div>)}
      </div>
    </div>
  );
};
