import { useState } from "react";
import { Button } from 'antd';
import axios from "axios";

export const FormLogin = () => {
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        let params:any = {
            email: email,
            password: password
        }
        axios.post("http://localhost:3002/user/login", params).then((rs:any) => {
            if(rs) {
                console.log(rs.data.message);    
            }
        }).catch((er) => {console.log(er);
        })
    }
    return <div className="">
        <div>
            <div className="h-[48px] bg-transparent border rounded-lg mb-2">
                <input className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg" type="text" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
            </div>
        </div>
        <div>
            <div className="h-[48px] bg-transparent border rounded-lg mb-2">
                <input className="w-full px-4 h-full block border-0 bg-transparent text-black outline-none rounded-lg" type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                <button className="ml-[-25px] mt-[-34px] mr-[16px] p-0 float-right"></button>
            </div>
        </div>
        <Button className=" flex flex-row text-white px-4 items-center rounded-[2px] w-full justify-center mt-4 h-10 bg-green-500 hover:bg-green-500" type="primary" onClick={onSubmit}>Đăng nhập</Button>
    </div>
}