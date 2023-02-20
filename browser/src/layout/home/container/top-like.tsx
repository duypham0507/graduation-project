export const TopLikeCtn = () => {
    return <div className="">
    <div className="mx-0 my-2">
      <div className="min-h-[200px]">
        {[1,2,3,4,5].map((item, index) => (
          <div key={index} className="px-4 py-5 flex flex-row font-semibold items-center mb-[-1px] cursor-pointer">
            <span className="float-left flex-none ml-1 p-2 text-[20px] font-bold bg-transparent text-blue-500">
              {index + 1 + "."}
            </span>
            <span className="text-[13px] font-['r_conde_regular']">
              Tour du lịch Sài Gòn Miền Tây 1 ngày | Về thăm làng hoa Sa Đéc
              ngút ngàn
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
}