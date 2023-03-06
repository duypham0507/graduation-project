import FacebookLogin from '@greatsumini/react-facebook-login';
import { FACEBOOK_APP_ID } from 'constants/index';

interface IProps {
    label?: string;
    onCallBack: (res) => void;
    onCallBackProfile?: (res) => void;
    children?: any
    className?: string
}

function LoginWithFacebookButton(props: IProps) {

    return (
        <FacebookLogin
            appId={FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            onSuccess={(res) => {
                props.onCallBack(res)
            }}
            className={`w-full ${props.className}`}
        >
            {props.children ?
                props.children
                :
                <button className="p-4 flex h-[40px] w-full justify-center items-center border rounded-[2px] hover:bg-gray-50" >
                    <img className="mr-4" src="/assets/images/icons/icon-facebook.png" width={24} height={24} alt=""/>
                    <span className="text-lg text-baseGray-100">{props.label}</span>
                </button>
            }
        </FacebookLogin>
    )
}

export { LoginWithFacebookButton };