import React, { useState } from 'react'
import { json, redirect, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router'
import { VscSettings } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useSubmit } from 'react-router-dom';
import { storage } from '../../util/storage';
import { api_url } from '../../util/api';

const PostDetail = () => {

    let [isOpened,setIsOpened] = useState(false);
    let submit = useSubmit();
    let navigate = useNavigate();
    let authData = useRouteLoaderData('root');
    let {
        title,
        description,
        date,
        image
    } = useRouteLoaderData("blog");

    let handleDeletePost = () => {
      let toDelete = window.confirm("Do you really want to delete post permanently?")
      if(toDelete){
        submit(null,{method : "DELETE"})
      }else {
        return
      }
    }

  return (
    <>
    <div  className={`shadow-md z-[2] fixed top-0 bottom-0 bg-sec m-auto w-fit h-fit flex mega-trans items-center gap-[5px] ${ isOpened ? 'right-[45px]' : 'right-[-100px]'}`}>
    <CiEdit onClick={()=>navigate('edit')} className='fontclH w-[45px] h-[45px] bg-sec bcu mega-trans p-[10px] text-[20px]  rounded-[5px]'/>
        <AiOutlineDelete onClick={handleDeletePost} className='fontclH w-[45px] h-[45px] bg-sec bcu mega-trans p-[12px] text-[20px]  rounded-[5px]'/>
    </div>
    {
      isOpened ? 
      <RxCross1 onClick={()=>setIsOpened(false)} className='z-[3] fixed right-0 fontcl2 top-0 bottom-0 m-auto  bg-sec bcu hover:rounded-[13px] mega-trans w-[45px] h-[45px] p-[10px] shadow-md rounded-[5px]'/>
      :
      <VscSettings onClick={()=>setIsOpened(true)} className={`z-[3] fixed right-0 fontcl2 top-0 bottom-0 m-auto  bg-sec bcu hover:rounded-[13px] mega-trans w-[45px] h-[45px] p-[10px] shadow-md rounded-[5px] ${authData && authData.hasToken ? 'block' : 'hidden'}`}/>
    }
    <div className="flex flex-col sm:w-[80%] w-[95%] md:w-[650px] mx-auto mt-[50px] gap-[20px]">
          <p className='fontcl2 logo-f text-[12px]'> {date}</p>
    <p className='fontcl logo-f text-[25px] sm:text-[30px]'> {title}</p>
    <img src={image} alt="" className="pic w-auto h-auto" />
    <p className='fontcl3 logo-f text-[18px] text-justify'>{description}</p>
    </div>
    </>
  )
}

export default PostDetail

export const detailLoader = async ({request,params}) => {
    let res = await fetch(
        `${api_url}/posts/${params.id}`
      )
   if(res.status === 503){
        throw json({message : "No Internet Connection!"} , {status : 503})
      }
    
    if(!res.ok) {
      throw json({message : 'Something gone wrong!'} , {status : 500})
      }
      let data = await res.json();
      return data.post;
}

export const detailAction = async ({request,params}) => {
  let res = await fetch(
    `${api_url}/posts/${params.id}`,
    {
      method : request.method,
      headers :{
        'Authorization' : `Bearer ${storage.get('token')}`
      }
    },
  )
  if(!res.ok){
    throw new json({message : 'Something gone wrong'} , {status : 500})
  }
  return redirect('/');
}