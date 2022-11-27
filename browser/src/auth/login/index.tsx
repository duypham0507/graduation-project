import { HeaderLayout } from "header/header-layout";
import { useHistory } from "react-router-dom";
import { LoginWithGoogleButton } from "./components/login-google";
import { FormLogin } from "./login-form";

export const LoginComponent = () => {
  let history = useHistory();
  
  const loginWithGoogle = (token: string) => {
    console.log(token);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative z-50">
        <HeaderLayout />
      </div>
      <div className="w-full flex h-full flex-col scrollable-view">
        <div className="w-full flex h-full flex-row justify-center my-6 items-center">
          <div className="sm:shadow-lg shadow-none bg-white border border-solid sm:rounded-md rounded-none sm:w-[448px] w-full mx-4 p-0 sm:p-6">
            <div className="flex flex-col items-center mb-4">
              <span className="text-2xl text-center font-medium text-baseBlack-100">
                Đăng nhập
              </span>
            </div>
            <FormLogin />
            <div className="flex flex-row w-full justify-center mt-4 mb-[18px]">
              <button className="">
                <span className="text-blue-500">Quên mật khẩu</span>
              </button>
            </div>
            <div className="text-center mb-4">
              <span className="text-gray-500">hoặc</span>
            </div>
            <div className="mb-6">
              <LoginWithGoogleButton
                onToken={(token) => loginWithGoogle(token)}
              />
            </div>
            <div className="mb-6">
              {/* <button className="p-4 flex h-[40px] w-full justify-center items-center border rounded-[2px] hover:bg-gray-100">
                <img
                  className="mr-4"
                  src="/assets/images/icons/icon-login-google.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="text-lg text-gray-500">
                  Đăng nhập bằng Facebook
                </span>
              </button> */}
            </div>
            <div className="mb-6 text-center">
              <span>
                Chưa có tài khoản? <a className="text-blue-500" onClick={() => history.push('/sign-up')}>Đăng ký</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
