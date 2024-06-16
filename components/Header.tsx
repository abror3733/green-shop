'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, ChangeEventHandler } from 'react'
import { Navbar } from './Navbar'
import { HamburgerIcon, LoginIcon, OrderBasket, SearchIcon } from '@/assets/fonts/Icon'
import { Button } from './Button'
import { usePathname } from "next/navigation";

interface LinkType {
    id:number;
    title:string;
    path:string;
    isActive:boolean;
}

const Header = () => {
    const pathname = usePathname()
    const navList = [
        {id:1,title:"Home", path:"/", isActive:pathname == "/" ? true : false},
        {id:2,title:"Shop", path:"/shop", isActive:pathname == "/shop" ? true : false},
        {id:3,title:"Plant Care", path:"/plant", isActive:pathname == "/plant" ? true : false},
        {id:4,title:"Blogs", path:"/blogs", isActive:pathname == "/blogs" ? true : false}
    ]

    const [showSearchInput, setShowSearchInput] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const handleSearchChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.value == ""){
            setTimeout(() => {
                setShowSearchInput(false)
            },2000)
        }
    }
    const closeModal = (e:React.MouseEvent) =>{
        if((e.target as HTMLButtonElement).id == "modal-wrapper"){
             setOpenModal(false)
        }
    }
  return (
    <header className='pt-[41px] md:pt-[25px]'>
        <div className="container px-[24px] gap-[8px] md:gap-0 md:px-0 flex items-center justify-between md:border-b-[1px] md:border-[#A2D0AB]">
            <Link className='pb-[17px] hidden md:block' href={'/'}>
               <Image src={'/site-logo.svg'} width={150} height={34} alt='Site logo'/>
            </Link>
            <Navbar/>
            <div className='hidden md:flex items-center space-x-[30px] pb-[11px] '>
                <button className='flex items-center' onClick={() => setShowSearchInput(true)}>
                    {!showSearchInput && <SearchIcon/>}

                </button>
                <button>
                    <OrderBasket/>
                </button>
                <Button bgBtn={false} title='Login' iconPosition='prev' icon={<LoginIcon/>} buttonWidth={125}/>
            </div>
            <input className={`md:hidden py-[14px] pl-[41px] w-[90%] search-input duration-300 outline-none focus:shadow text-[14px] 
            font-normal leading-[16px] bg-[#F8F8F8] rounded-[10px]`}
             type="text" name='plant-search' placeholder='Find your plants' autoComplete='off' aria-label='Find your plants'/>
            <button onClick={() => setOpenModal(true)} className='md:hidden w-[45px] h-[45px] bg-[#46A358] rounded-[14px] flex items-center justify-center opacity-80'>
              <HamburgerIcon/>
            </button>
        </div>
        <div onClick={closeModal} id='modal-wrapper' className={`${openModal ? "left-0": "left-[-100%]"} modal duration-500 fixed top-0 z-[2] backdrop-blur-md h-[100vh] w-full`}>
            <div className={`hamburger-bg absolute w-[80%] h-[100vh] bg-green-300 duration-500 ${openModal ? "right-0" : "right-[-200%]"} p-10 flex flex-col space-y-5`}>
                {navList.map((item:LinkType) => (
                    <Link onClick={() => setOpenModal(false)} key={item.id} className={`font-normal pb-[33px] text-[16px] leading-[20.11px] text-[#3D3D3D]`} href={item.path}>{item.title}</Link>
                ))}
            </div>
        </div>
    </header>
  )
}

export default Header