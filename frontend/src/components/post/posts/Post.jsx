import React from 'react'
import { Link } from 'react-router-dom';

const Post = ({post}) => {

  let {
    id,
    title ,
    description ,
    image,
    date,
  } = post;

  return (
    <Link to={`/blog/${id}`} className='w-full h-fit flex flex-col gap-[20px]'>
        <img src={image} alt="" className="rounded-[15px] pic w-full h-[240px] 600:h-[200px] 665:h-[240px]" />
        <div className="flex h-[230px] flex-col gap-[7px] px-[20px]">
    <p className='fontcl2 logo-f text-[12px]'> {date}</p>
    <p className='fontcl logo-f text-[22px]'> {title.length > 50 ? title.substring(0,45) + '......see more' : title}</p>
    <p className='fontcl3 logo-f text-[14px]'>{description.length > 150 ? description.substring(0,145) + '...SEE MORE' : description}</p>

        </div>
    </Link>
  )
}

export default Post