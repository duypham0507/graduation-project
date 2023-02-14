import { HeaderAuthen } from "header/header-authen";
import { useHistory } from "react-router-dom";
import { FormSignUp } from "./signup-form";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { LoginWithGoogleButton } from "auth/login/components/login-google";
import { LoginWithFacebookButton } from "auth/login/components/login-facebook";
import { SocialLogin, login } from "services/auth";
import { useDispatch } from "react-redux";
import { AUTH_METHOD } from "enums/index";
import { loginSocial } from '../../services/auth';
const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;
export const SignupComponent = () => {
  let history = useHistory();
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const signUpGoogle = async (token) => {
    // let res = await dispatch(login(token) as any);
    console.log(token);
    let param: SocialLogin = {
      accessToken: token,
      method: AUTH_METHOD.GOOGLE
    }
    let res = await dispatch(loginSocial(param) as any);
    console.log(res);
    res.type === "login-social/fulfilled" && history.push('/home')
  }

  const signUpFacebook = async (resFB) => {
    console.log(resFB);
    let param: SocialLogin = {
      accessToken: resFB.accessToken,
      method: AUTH_METHOD.FB
    }
    let res = await dispatch(loginSocial(param) as any);
    console.log(res);
    res.type === "login-social/fulfilled" && history.push('/home')
  }

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
                  Đăng kí
                </span>
              </div>
              <FormSignUp onCallBack={(loaded) => setLoading(loaded!)}/>
              <div className="text-center mb-4">
                <span className="text-gray-500">hoặc</span>
              </div>
              <div className="mb-6">
                <LoginWithGoogleButton onToken={(token) => signUpGoogle(token)}/>
              </div>
              <div className="mb-6">
                <LoginWithFacebookButton label="Đăng kí bằng Facebook" onCallBack={(token) => signUpFacebook(token)}/>
              </div>
              <div className="mb-6 text-center">
                <span>
                  Đã có tài khoản? <a className="text-blue-500 cursor-pointer" onClick={() => history.push('/login')}>Đăng nhập</a>
                </span>
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
