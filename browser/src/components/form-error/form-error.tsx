import React from 'react';
interface IProps {
    className?: string;
    errorMessage?: string;
}
export function FormError(props: IProps) {
    /* nếu isHidden = true, return null ngay từ đầu */
    if (!props.errorMessage) { return null; }
    return (
        <div className={`${props.className} `}>
            <span className={`text-red-500`}>{props.errorMessage}</span>
        </div>
    )
}