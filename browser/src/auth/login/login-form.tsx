import { useState } from "react";
import { Button } from "antd";
import { login, LoginPayload } from "services/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormErrorWrapper } from "components/form-error/form-error-wrapper";
import { EMAIL_VALID } from "constants/index";

interface IProps {
  onCallBack?: (loading?: boolean) => void
}

export const FormLogin = (props: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState<any>();
  const [errorPassword, setErrorPassword] = useState<any>();
  const [errorLogin, setErrorLogin] = useState<any>();
  const dispatch = useDispatch();
  let history = useHistory();

  const onSubmit = async () => {
    if(!isValidate()) return
    props.onCallBack!(true)
    let data: LoginPayload = {
      email: email,
      password: password,
    };
    let res = await dispatch(login(data) as any);
    console.log(res);
    res.type === "login/fulfilled" && history.push('/home')
    props.onCallBack!(false)
  };

  const isValidate = () => {
    let validate = true
    if (email == undefined || email == '') {
      setErrorEmail('Vui lòng nhập tài khoản email')
      validate = false
    } 
    if(email && !EMAIL_VALID.test(email)) {
      setErrorEmail('Vui lòng nhập đúng email')
      validate = false
    }
    if (password == undefined || password == '') {
      setErrorPassword('Vui lòng nhập mật khẩu')
      validate = false
    }
    return validate
  }
  return (
    <div className="">
      {errorLogin && <FormErrorWrapper errorMessage={errorLogin} className=""/>}
      <div>
        <div className="h-[48px] bg-transparent border rounded-lg mb-2">
          <input
            className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg"
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        {errorEmail && <FormErrorWrapper errorMessage={errorEmail} className="!mt-[-12px]"/>}
      </div>
      <div>
        <div className="h-[48px] bg-transparent border rounded-lg mb-2">
          <input
            className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg"
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="ml-[-25px] mt-[-34px] mr-[16px] p-0 float-right"></button>
        </div>
        {errorPassword && <FormErrorWrapper errorMessage={errorPassword} className="!mt-[-12px]"/>}
      </div>
      <Button
        className=" flex flex-row text-white font-medium px-4 items-center rounded-[2px] w-full justify-center mt-4 h-10 bg-green-500 hover:bg-green-500"
        type="primary"
        onClick={onSubmit}
      >
        Đăng nhập
      </Button>
    </div>
  );
};
