import { useHistory } from "react-router-dom"

export const SignUpSucess = () => {
    const history = useHistory()

    return <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center">
            <span className="text-xl font-semibold">Đăng kí thành công</span>
            <button className="text-blue-600" onClick={() => history.push('/login')}>Quay lại đăng nhập</button>
        </div>
    </div>
}