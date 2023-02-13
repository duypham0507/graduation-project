import { Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SignUpPayload } from "services/auth";
import { signup } from '../../services/auth';

interface IProps {
  onCallBack?: (loading?: boolean) => void
}
export const FormSignUp = (props:IProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = async () => {
    props.onCallBack!(true)
    let data: SignUpPayload = {
      name: name,
      email: email,
      password: password,
    };
    let res = await dispatch(signup(data) as any);
    console.log(res);
    props.onCallBack!(false)
    res.payload.status === 201 && history.push('/signup-sucess')
  };

  return (
    <div className="">
      <div className="h-[48px] bg-transparent border rounded-lg mb-2">
        <input
          className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg"
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="h-[48px] bg-transparent border rounded-lg mb-2">
        <input
          className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg"
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="h-[48px] bg-transparent border rounded-lg mb-2">
        <input
          className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="ml-[-25px] mt-[-34px] mr-[16px] p-0 float-right"></button>
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
