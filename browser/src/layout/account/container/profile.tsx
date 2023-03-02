import { CameraOutlined, EnvironmentOutlined, MailOutlined, SaveOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Radio, Upload, message } from "antd";
import { ACCESS_TOKEN } from "constants/index";
import { useEffect, useState } from "react";
import { changePassword } from "services/auth";
import { editUserInfo, getUserInfo } from "services/user";
import { sendVerifyEmail } from "services/verify";
import { parseJwt } from "utils/index";

export const ProfileScreen = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState<any>();
  const [name, setName] = useState<any>();
  const [avatar, setAvatar] = useState<any>(null);
  const [info, setInfo] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [loadingAva, setLoadingAva] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChangeAvatar = (e) => {
    setLoadingAva(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      setLoadingAva(false);
    };
    reader.readAsDataURL(file);
  };

  const verifyEmail = async () => {
    setLoading(true)
    await sendVerifyEmail().then(res => {
      console.log(res);
      setLoading(false)
      success()
    }).catch((err) => {
      console.log(err);
      error()
    })
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Gửi email thành công',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Có lỗi xảy ra',
    });
  };

  useEffect(() => {
    if (accessToken) {
      setAvatar(parseJwt(accessToken).avatar)
    }
    const init = async () => {
      await getUserInfo().then(rs => {
        console.log(rs);
        setProfile(rs.data.data);
        setName(rs.data.data.name);
        setInfo(rs.data.data.info);
        setAvatar(rs.data.data.avatar);
      })
    }
    init()
  }, []);
  console.log(profile);

  const handleSubmitForm = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      let param = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      }
      await changePassword(param)
      message.success('Password changed successfully');
      form.resetFields();
      setOpenModal(false)
    } catch (err:any) {
      console.log(err?.response?.data?.message);
      
      message.error(err?.response?.data?.message!);
    }
  }

  const handlerSaveUserInfo = async () => {
    let param:any = {
      name: name!,
      // avatar: avatar!,
      info: info!,
    }
    await editUserInfo(param).then(rs => {
      messageApi.success("Lưu thông tin thành công")
    }).catch(err => {
      console.log(err);
      message.error(err?.response?.data?.message)
    })
  }

  return <div className="flex flex-col w-full h-full px-6">
    {contextHolder}
    <div className="scrollable-view flex flex-col pb-10 w-full">
      <div className="flex flex-row w-full items-center justify-between pr-2">
        <span className="text-xl text-baseGray-100 font-semibold">Thông tin cá nhân</span>
        <button onClick={handlerSaveUserInfo} className="border flex flex-row px-4 py-2 items-center rounded-sm h-8 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500">
          <SaveOutlined className="mr-2"/>
          <span className="text-lg">Lưu thay đổi</span>
        </button>
      </div>
      <div className="flex rounded">
        <input type="file" id="file" onChange={handleChangeAvatar} className="hidden" />
        <label htmlFor="file" className="rounded-full w-[150px] h-[150px] relative cursor-pointer hover:opacity-50 my-2">
          <div className="absolute z-50 bottom-0 right-0 flex justify-center items-center border-[1px] border-baseGray-60 rounded-full bg-white h-10 w-10 ">
            <CameraOutlined className="text-gray-500" style={{ fontSize: '24px' }} />
          </div>
          <img className="rounded-full w-[150px] h-[150px]" src={avatar ? avatar : "/assets/images/icons/icon-user.jpg"} alt="" />
        </label>
      </div>
      <div className="flex flex-row mt-5">
        <div className="flex flex-col h-full w-3/5">
          <div className="flex flex-row items-center w-full mb-5">
            <span className="w-[90px] flex-none text-right mr-5">Tên hiển thị:</span>
            <div className="flex flex-row items-center space-x-2 text-left">
              <div className="text-sm w-full inline-block">
                <Input type="text" className="" value={name} onChange={(event) => setName(event.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="text-blue-500 mt-[10px] w-[90px] mb-10" onClick={() => setOpenModal(true)}>Đổi mật khẩu</a>
      <div className="flex flex-col w-full mt-2">
        <span className="text-xl text-baseGray-100 font-semibold mb-10">Thông tin liên hệ</span>
        <div className="flex flex-row items-start">
          <div className="border rounded-xl w-[48px] h-[48px] justify-center items-center flex mr-4">
            <MailOutlined />
          </div>
          <div className="flex flex-col items-start">
            <span className="w-[90px] text-[16px] mr-5 text-gray-500">Email:</span>
            <div className="flex flex-row items-center">
              <span className="text-[16px] text-black">{profile?.email} {profile?.is_verified ? <span className="text-green-500">(Đã xác minh)</span> : <span className="text-red-500">(Chưa xác minh)</span>}</span>
              {!profile?.is_verified && <button onClick={() => verifyEmail()} className="text-[16px] text-gray-300 hover:text-blue-500 ml-4">Xác minh ngay</button>}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start mt-6">
          <div className="border rounded-xl w-[48px] h-[48px] justify-center items-center flex mr-4">
            <EnvironmentOutlined />
          </div>
          <div className="flex flex-col items-start">
            <span className="w-[90px] text-[16px] text-gray-500">Địa chỉ:</span>
            <div className="flex flex-row items-center space-x-2 text-left">
              {<Input type="text" className="" placeholder="Nhập địa chỉ" value={info} onChange={(event) => setInfo(event.target.value)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      open={openModal}
      title="Đổi mật khẩu"
      okText="Xác nhận"
      okType="default"
      onOk={handleSubmitForm}
      onCancel={() => setOpenModal(false)}
      cancelText="Hủy"
      closable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu cũ' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu mới' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận lại mật khẩu' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Mật khẩu xác nhận không khớp');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  </div>;
};
