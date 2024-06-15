import React from 'react'
import { HiArrowSmallRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const HeadPost = ({post}) => {

  let {
    id,
    title ,
    description ,
    image,
    date,
  } = post;

  return (
    <div  className='w-full mx-auto relative h-[270px] sm:h-[380px] md:h-[500px] rounded-[12px] overflow-hidden'>
        <img src={image} alt="" className="w-full h-full pic" />
    <Link to={`/blog/${id}`} className="absolute flex flex-col gap-[12px] z-[3] w-full px-[20px] bottom-[30px]"> 
    <p className='fontclD logo-f text-[12px]'>{date}</p>
<p className='fontclD logo-f text-[26px] sm:text-[32px] 600:w-[500px]'>{title}</p>
<div className="flex 600:flex-row gap-[30px] flex-col  w-full justify-between 600:items-center">
    <p className='fontcl3D logo-f text-[14px] 600:w-[450px]'>{description.length > 150 ? description.substring(0,145) + '...SEE MORE' : description}</p>
<HiArrowSmallRight className='text-[36px] 600:block hidden fontclD' />
</div>
 
    </Link>
    <Link to={`/blog/${id}`} className="z-[2] top-0 absolute w-full h-full" style={{
        backgroundImage : `linear-gradient(to top , #242424c9 , #2424248e , #24242400)`
    }}></Link>
    </div>
  )
}

export default HeadPost