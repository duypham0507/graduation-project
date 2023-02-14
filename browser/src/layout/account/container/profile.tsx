import { CameraOutlined, EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import { DatePicker, Input, Radio, Upload, message } from "antd";
import { ACCESS_TOKEN } from "constants/index";
import { useEffect, useState } from "react";
import { sendVerifyEmail } from "services/verify";
import { parseJwt } from "utils/index";

export const ProfileScreen = () => {
  const [profile, setProfile] = useState<any>({});
  const [name, setName] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [birthday, setBirthday] = useState<any>(null);
  const [gender, setGender] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState<boolean>(false);

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
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      setProfile(parseJwt(accessToken));
    }
  }, []);
  console.log(profile);
  
  return <div className="flex flex-col w-full h-full px-6">
    {contextHolder}
    <div className="scrollable-view flex flex-col pb-10 w-full">
        <span className="text-xl text-baseGray-100 font-semibold">Thông tin cá nhân</span>
        <div className="flex rounded">
          <label className="rounded-full w-[150px] h-[150px] relative cursor-pointer hover:opacity-50 my-2">
            <div className="absolute z-50 bottom-0 right-0 flex justify-center items-center border-[1px] border-baseGray-60 rounded-full bg-white h-10 w-10 ">
              <CameraOutlined className="text-gray-500" style={{ fontSize: '24px' }}/>
            </div>
            <Upload><img className="rounded-full w-[150px] h-[150px]" src={profile.avatar ? profile.avatar : "/assets/images/icons/icon-user.jpg"} alt="" /></Upload>
          </label>
        </div>
        <div className="flex flex-row mt-5">
            <div className="flex flex-col h-full w-3/5">
                <div className="flex flex-row items-center w-full mb-5">
                  <span className="w-[90px] flex-none text-right mr-5">Tên hiển thị:</span>
                  <div className="flex flex-row items-center space-x-2 text-left">
                    <div className="text-sm w-full inline-block">
                      <Input  type="text" className="" value={profile?.name} onChange={() => {}}/>
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-row items-center w-full mb-5">
                  <span className="w-[90px] flex-none text-right mr-5">Email:</span>
                  <div className="flex flex-row items-center space-x-2 text-left">
                    <div className="text-sm w-full inline-block">
                      <Input  type="text" className="" value={profile?.email} onChange={() => {}}/>
                    </div>
                  </div>
                </div> */}
                {/* <div className="flex flex-row items-center w-full mb-5">
                  <span className="w-[90px] flex-none text-right mr-5">Ngày sinh:</span>
                  <div className="flex flex-row items-center space-x-2 text-left">
                    <DatePicker className="w-full" onChange={() => {}} value={birthday}/>
                  </div>
                </div>
                <div className="flex flex-row items-center w-full mb-5">
                  <span className="w-[90px] flex-none text-right mr-5">Giới tính:</span>
                  <div className="flex flex-row items-center space-x-2 text-left">
                  <Radio.Group onChange={() => {}} value={gender}>
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
                    <Radio value="3">Khác</Radio>
                  </Radio.Group>
                  </div>
                </div> */}
            </div>
        </div>
        <div className="flex flex-col w-full mt-2">
          <span className="text-xl text-baseGray-100 font-semibold mb-10">Thông tin liên hệ</span>
          <div className="flex flex-row items-start">
            <div className="border rounded-xl w-[48px] h-[48px] justify-center items-center flex mr-4">
              <MailOutlined />
            </div>
            <div className="flex flex-col items-start">
              <span className="w-[90px] text-[16px] mr-5 text-gray-500">Email:</span>
              <div className="flex flex-row items-center">
                <span className="text-[16px] text-black">{profile?.email} {profile?.is_verified ? <span className="text-green-500">(Đã xác minh)</span>:<span className="text-red-500">(Chưa xác minh)</span>}</span>
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
                <button className="text-[16px] text-blue-500">Thêm địa chỉ</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>;
};
