import { Result } from "antd";
import { useHistory } from "react-router-dom";

export const UpdatePasswordSuccess = () => {
    let history = useHistory();
    return <div className="flex flex-col items-center justify-center w-full h-full">
        {/* <div className="flex flex-col items-center">
            <span className="text-xl font-semibold">Chúc mừng bạn đã cập nhật mật khẩu thành công</span>
            <button className="text-blue-600" onClick={() => history.push('/login')}>Quay lại đăng nhập</button>
        </div> */}
        <Result
            status="success"
            title="Chúc mừng bạn đã cập nhật mật khẩu thành công"
            extra={[
                <button className="text-blue-600" onClick={() => history.push('/login')}>Quay lại đăng nhập</button>
            ]}
        />
    </div>
}