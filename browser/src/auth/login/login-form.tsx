import { useState } from "react";
import { Button } from "antd";
import { login, LoginPayload } from "services/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

interface IProps {
  onCallBack?: (loading?: boolean) => void
}

export const FormLogin = (props: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const onSubmit = async () => {
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
  return (
    <div className="">
      <div>
        <div className="h-[48px] bg-transparent border rounded-lg mb-2">
          <input
            className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg"
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
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
