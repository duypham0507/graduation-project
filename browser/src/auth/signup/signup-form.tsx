import { Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SignUpPayload } from "services/auth";
import { signup } from '../../services/auth';
import { EMAIL_VALID } from "constants/index";
import { FormErrorWrapper } from "components/form-error/form-error-wrapper";

interface IProps {
  onCallBack?: (loading?: boolean) => void
}
export const FormSignUp = (props: IProps) => {
  const [name, setName] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [errorName, setErrorName] = useState<any>();
  const [errorEmail, setErrorEmail] = useState<any>();
  const [errorPassword, setErrorPassword] = useState<any>();
  const [errorSignUp, setErrorSignUp] = useState<any>();
  let history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = async () => {
    if(!isValidate()) return
    props.onCallBack!(true)
    let data: SignUpPayload = {
      name: name!,
      email: email!,
      password: password!,
    };
    let res = await dispatch(signup(data) as any);
    console.log(res);
    props.onCallBack!(false)
    if(res.payload.status === 201){
      history.push('/signup-sucess')
    } else {
      setErrorSignUp(res.payload.response.data.message)
    }
  };

  const isValidate = () => {
    let validate = true
    if (name == undefined || name == '') {
      setErrorName('Vui lòng nhập tên tài khoản')
      validate = false
    }
    if (name && name?.length! < 6) {
      setErrorName('Tên phải nhiều hơn 6 kí tự')
      validate = false
    }
    if (email == undefined || email == '') {
      setErrorEmail('Vui lòng nhập tài khoản email')
      validate = false
    }
    if (email && !EMAIL_VALID.test(email)) {
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
      {<FormErrorWrapper errorMessage={errorSignUp} className="!mt-[-12px]"/>}
      <div>
        <div className="h-[48px] bg-transparent border rounded-lg mb-2">
          <input
            className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg"
            type="text"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        {errorName && <FormErrorWrapper errorMessage={errorName} className="!mt-[-12px]"/>}
      </div>
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
        className=" flex flex-row text-white px-4 items-center rounded-[2px] font-medium w-full justify-center mt-4 h-10 bg-green-500 hover:bg-green-500"
        type="primary"
        onClick={onSubmit}
      >
        Đăng kí
      </Button>
    </div>
  );
};
