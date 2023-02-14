import { HeaderAuthen } from "header/header-authen";
import { useHistory } from "react-router-dom";
import { LoginWithGoogleButton } from "./components/login-google";
import { FormLogin } from "./login-form";
import { Spin } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { LoginWithFacebookButton } from "./components/login-facebook";
import { SocialLogin, loginSocial } from "services/auth";
import { AUTH_METHOD } from "enums/index";
import { useDispatch } from "react-redux";
const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;
export const LoginComponent = () => {
  let history = useHistory();
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const loginWithGoogle = async (token: string) => {
    console.log(token);
    let param: SocialLogin = {
      accessToken: token,
      method: AUTH_METHOD.GOOGLE
    }
    try{
      let res = await dispatch(loginSocial(param) as any);
      console.log(res);
      res.type === "login-social/fulfilled" && history.push('/home')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  };

  const loginWithFacebook = async (resFB) => {
    setLoading(true)
    console.log(resFB);
    let param: SocialLogin = {
      accessToken: resFB.accessToken,
      method: AUTH_METHOD.FB
    }
    try{
      let res = await dispatch(loginSocial(param) as any);
      console.log(res);
      res.type === "login-social/fulfilled" && history.push('/home')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative z-50">
        <HeaderAuthen />
      </div>
      <div className="w-full flex h-full flex-col scrollable-view">
        <div className="w-full flex h-full flex-row justify-center my-6 items-center">
          <Spin spinning={isLoading} indicator={antIcon}>
            <div className="sm:shadow-lg shadow-none bg-white border border-solid sm:rounded-md rounded-none sm:w-[448px] w-full mx-4 p-0 sm:p-6">
              <div className="flex flex-col items-center mb-4">
                <span className="text-2xl text-center font-medium text-baseBlack-100">
                  Đăng nhập
                </span>
              </div>
              <FormLogin onCallBack={(loaded) => setLoading(loaded!)}/>
              <div className="flex flex-row w-full justify-center mt-4 mb-[18px]">
                <button className="" onClick={() => history.push('/forgot-password')}>
                  <span className="text-blue-500">Quên mật khẩu</span>
                </button>
              </div>
              <div className="text-center mb-4">
                <span className="text-gray-500">hoặc</span>
              </div>
              <div className="mb-6">
                <LoginWithGoogleButton onToken={(token) => loginWithGoogle(token)}/>
              </div>
              <div className="mb-6">
                <LoginWithFacebookButton label="Đăng nhập bằng Facebook" onCallBack={(token) => loginWithFacebook(token)}/>
              </div>
              <div className="mb-6 text-center">
                <span>
                  Chưa có tài khoản? <a className="text-blue-500 cursor-pointer" onClick={() => history.push('/signup')}>Đăng ký</a>
                </span>
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
