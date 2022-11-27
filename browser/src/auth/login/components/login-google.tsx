import { GOOGLE_APP_ID } from 'constants/index';
import { useState } from 'react';
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from 'react-google-login';

interface IProps {
    label?: string;
    onToken: (token: string) => void;
}

function LoginWithGoogleButton(props: IProps) {
    const [disable, setDisable] = useState<boolean>(false);
    const { signIn, loaded } = useGoogleLogin({
        clientId: GOOGLE_APP_ID,
        autoLoad: false,
        isSignedIn: false,
        prompt: 'select_account',
        cookiePolicy: 'none',
        onSuccess: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
            props.onToken((res as any).tokenId);
        },
        onFailure: (error) => {
            console.log('onFailure error', error)
            if (error.error === "idpiframe_initialization_failed") {
                setDisable(true)
            }
        }
    });

    const onLogin = async () => {
        // if (disable) {
        //     alert("có lỗi xảy ra")
        //     return;
        // }
        signIn();
    }

    // if (disable) return <div />
    return (
        <button className="p-4 flex h-[40px] w-full justify-center items-center border rounded-[2px] hover:bg-gray-50" onClick={onLogin}>
            <img className="mr-4" src="/assets/images/icons/icon-login-google.png" width={24} height={24} alt=""/>
            <span className="text-lg text-baseGray-100">Đăng nhập bằng Google</span>
        </button>
    )
}

export { LoginWithGoogleButton };