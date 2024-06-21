import React, { useState } from 'react'
import './index.css'
import { NavLink, useRouteLoaderData } from 'react-router-dom'
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const Nav = () => {

let [isOpened,setIsOpened] = useState(false);
let authData = useRouteLoaderData('root');
let email ='Authorizing...';

if(authData && authData.email) email = authData.email;

  return (
  <>
    <div className='sticky top-0 bg-sec h-[45px] items-center w-full z-[6] flex justify-between  px-[20px] sm:px-[40px]'>
      <div className="flex items-center gap-[4px]">
        <CiMenuFries onClick={()=>setIsOpened(true)} className='md:hidden block'/>
        <NavLink to={`/`} className="fontcl2 text-[24px] main-f">BLOG.Io</NavLink>
      </div>
        <div className="hidden md:flex items-center gap-[20px]">
            <NavLink to={`/`} className='text-[16px] main-f'>Homepage</NavLink>
            <NavLink to={`/create-post`} className='text-[16px] main-f'>Create Post</NavLink>
        </div>
        <div className="flex items-center gap-[10px] sm:gap-[20px]">
           {
            authData && authData.hasToken ? 
            <div className="flex items-center gap-[20px]">
              <div className="flex items-center gap-[5px]">
                <p className="main-f fontcl text-[13px]">{email}</p>
            <div className="relative rounded-full w-[25px] bg-ter h-[25px]">
            <p className="main-f w-fit h-fit m-auto fontclD text-[13px] absolute top-0 right-0 left-0 bottom-[-2px]">{email[0].toUpperCase()}</p>
            </div>
              </div>
              <NavLink to={`logout`} className='text-[16px] main-f md:block hidden'>Logout</NavLink>
            </div>
            :
            <>
            <NavLink to={`authenticate?form=login`} className='text-[16px] main-f'>Login</NavLink>
            <NavLink to={`/authenticate?form=signup`} className='text-[16px] main-f btn1 px-[20px] py-[2px]'>Register</NavLink>
            </>
           }
                </div>
    </div>
    <div className={`flex p-[20px] flex-col gap-[20px] w-[200px] h-full bg-sec z-[7] fixed top-0 mega-trans ${isOpened ? 'left-0' : 'left-[-210px]'}`}>
    <div className="flex items-center gap-[4px]">
        <RxCross1 onClick={()=>setIsOpened(false)}/>
        <NavLink onClick={()=>setIsOpened(false)} to={`/`} className="fontcl2 text-[24px] main-f">Blog.Io</NavLink>
      </div>
      <NavLink onClick={()=>setIsOpened(false)} to={`/`} className='text-[16px] main-f'>Homepage</NavLink>
      <NavLink onClick={()=>setIsOpened(false)} to={`/create-post`} className='text-[16px] main-f'>Create Post</NavLink>
       {
        authData && authData.hasToken &&
        <NavLink to={`logout`} className='text-[16px] main-f'>Logout</NavLink>
       }
    </div>
  </>
  )
}

export default Nav