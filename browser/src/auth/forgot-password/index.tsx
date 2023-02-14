import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin, message } from "antd"
import { HeaderAuthen } from "header/header-authen"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { forgotPassword } from "services/auth";
const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;

export const ForgotPasswordComponent = () => {
  let history = useHistory();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    setLoading(true)
    let param: any = {
      email: email,
    };
    await forgotPassword(param).then(res => {
      console.log(res);
      setLoading(false)
      success()
      setEmail('')
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
  return <div className="w-full h-full flex flex-col">
    {contextHolder}
    <div className="relative z-50">
      <HeaderAuthen />
    </div>
    <div className="w-full flex h-full flex-col scrollable-view">
      <div className="w-full flex h-full flex-row justify-center my-6 items-center">
        <Spin spinning={isLoading} indicator={antIcon}>
          <div className="sm:shadow-lg shadow-none bg-white border border-solid sm:rounded-md rounded-none sm:w-[448px] w-full mx-4 p-0 sm:p-6">
            <div className="flex flex-col items-center mb-4">
              <span className="text-2xl text-center font-medium text-baseBlack-100">
                Quên mật khẩu?
              </span>
              <span className="text-gray-500 mt-2 text-center">Nhập Email bạn đã đăng ký tài khoản,chúng tôi sẽ gửi mail xác nhận giúp bạn lấy lại mật khẩu</span>
            </div>
            <div className="h-[48px] bg-transparent border rounded-lg mb-2">
              <input
                className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <Button
              className=" flex flex-row text-white font-medium px-4 items-center rounded-[2px] w-full justify-center mt-4 h-10 bg-green-500 hover:bg-green-500"
              type="primary"
              onClick={onSubmit}
            >
              Xác nhận
            </Button>
            <div className="my-4 text-center">
              <span className="">
                Quay lại <a className="text-blue-500 cursor-pointer" onClick={() => history.push('/login')}>Đăng nhập</a>
              </span>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  </div>
}