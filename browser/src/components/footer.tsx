export const FooterCtn = () => {
    return <div className="w-ful mt-10 min-h-[60px] bg-[#1c59c2] flex flex-col justify-center items-center">
        <div className="flex flex-row space-x-[6px] text-xs text-white w-3/4 items-center justify-center">
            <a className="hover:underline hover:decoration-white hover:text-white text-white text-xs cursor-pointer">
                <span>Chính sách bảo mật</span>
            </a>
            <p>|</p>
            <a className="hover:underline hover:decoration-white hover:text-white text-white text-xs cursor-pointer">
                <span>Điều khoản sử dụng</span>
            </a>
            <p>|</p>
            <a className="hover:underline hover:decoration-white hover:text-white text-white text-xs cursor-pointer">
                <span>Hỗ trợ</span>
            </a>
        </div>
        <div className="w-full mt-2 flex flex-row items-center justify-center">
            <span className="text-sm text-white font-['os_regular']">@Copyright TravelApp - Email: travelapp.datn@gmail.com</span>
        </div>
    </div>
}