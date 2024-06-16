'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkType {
    id:number;
    title:string;
    path:string;
    isActive:boolean;
}

export const Navbar = () => {
    const pathname = usePathname()
    const navList = [
        {id:1,title:"Home", path:"/", isActive:pathname == "/" ? true : false},
        {id:2,title:"Shop", path:"/shop", isActive:pathname == "/shop" ? true : false},
        {id:3,title:"Plant Care", path:"/plant", isActive:pathname == "/plant" ? true : false},
        {id:4,title:"Blogs", path:"/blogs", isActive:pathname == "/blogs" ? true : false}
    ]
    return (
        <nav className="hidden md:block">
            <ul className="flex items-center space-x-[50px]">
                {navList.map((item:LinkType) => (
                    <Link key={item.id} className={`${item.isActive ? "border-b-[3.5px] border-[#46A358] font-bold" : "font-normal"} pb-[33px] text-[16px] leading-[20.11px] text-[#3D3D3D]`} href={item.path}>{item.title}</Link>
                ))}
            </ul>
        </nav>
    )
}