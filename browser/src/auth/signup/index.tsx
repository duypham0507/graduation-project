import { HeaderAuthen } from "header/header-authen";
import { useHistory } from "react-router-dom";
import { FormSignUp } from "./signup-form";

export const SignupComponent = () => {
  let history = useHistory();
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative z-50">
        <HeaderAuthen />
      </div>
      <div className="w-full flex h-full flex-col scrollable-view">
        <div className="w-full flex h-full flex-row justify-center my-6 items-center">
          <div className="sm:shadow-lg shadow-none bg-white border border-solid sm:rounded-md rounded-none sm:w-[448px] w-full mx-4 p-0 sm:p-6">
            <div className="flex flex-col items-center mb-4">
              <span className="text-2xl text-center font-medium text-baseBlack-100">
                Đăng kí
              </span>
            </div>
            <FormSignUp />
            <div className="text-center mb-4">
              {/* <span className="text-gray-500">hoặc</span> */}
            </div>
            <div className="mb-6">
              {/* <LoginWithGoogleButton
                onToken={(token) => loginWithGoogle(token)}
              /> */}
            </div>
            <div className="mb-6 text-center">
              <span>
                Đã có tài khoản? <a className="text-blue-500" onClick={() => history.push('/login')}>Đăng nhập</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
