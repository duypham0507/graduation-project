import { HeaderLayout } from 'header/header-layout';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { verifyEmail } from 'services/verify';
import { parseJwt } from 'utils/index';
export const VerifySuccess = () => {
    let param = useParams<{ verifyToken: string }>();
    const history = useHistory();
    const [response, setResponse] = useState<any>()

    console.log('param', parseJwt(param.verifyToken));

    useEffect(() => {
        const init = async () => {
            let res: any = await verifyEmail(param.verifyToken)
            setResponse(res)
            console.log("res", res);
        }
        init()
    }, [])
    
    return <div className="w-full h-full overflow-x-hidden">
        <div className="fixed top-0 left-0 z-50 w-full bg-white">
            <HeaderLayout onSearch={(keyword) => {}} />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center">
                <span className="text-xl font-semibold">{response?.status === 200 ? "Xác thực thành công!" : "Xác thực không thành công"}</span>
                <button className="text-blue-600" onClick={() => history.push('/login')}>Quay lại trang chủ</button>
            </div>
        </div>
    </div>
}