import React from "react"

interface ButtonType {
    title:string;
    icon?:any;
    iconPosition?:"prev" | "next";
    buttonWidth:number
    bgBtn:boolean
}

export const Button:React.FC<ButtonType> = ({title, icon, iconPosition, buttonWidth, bgBtn}) => {
    return(
        <button style={{width:`${buttonWidth}px`}} className={`${bgBtn ? "bg-transparent" : "bg-[#46A358]"} hover:opacity-90 duration-300 ${icon && iconPosition ? "py-[10px]" : "py-[12px]" } rounded-[6px] flex items-center justify-center space-x-[4px]`}>
            {icon && iconPosition == "prev" && icon}
            <span className={`font-medium text-[12px] leading-[20.11px] ${bgBtn ? "text-[#46A358]" : "text-white"}`}>{title}</span>
            {icon && iconPosition == "next" && icon}
        </button>
    )
}