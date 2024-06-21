import React from 'react'
import { Form, Link, useActionData, useSubmit } from 'react-router-dom'

const PostForm = ({date,
                   month,
                   year,
                   button_text,
                   header,
                   responseValueToUpdate,
                   error,
                   isSubmitting,
                }) => {

  return (
<div className='w-[90%] sm:w-[70%] md:w-[500px] mx-auto my-[50px] flex flex-col gap-[20px]'>
    <p className="logo-f fontcl text-[18px] sm:text-[24px]">{header}</p>
    <Form method='POST' className='flex flex-col gap-[30px]'>
        <div className="flex flex-col gap-[7px] w-full">
            <label className='text-[14px] fontcl3 logo-f'>Post title</label>
            {
            error && <p className="logo-f text-[14px] text-red-500">{error.title}</p>
            }
            <input defaultValue={responseValueToUpdate && responseValueToUpdate.title} name='title' placeholder='Title' className='logo-f text-[14px] fontcl inp w-full h-[40px]' type="text" />
        </div>
        <div className="flex flex-col gap-[7px] w-full">
            <label className='text-[14px] fontcl3 logo-f'>Image Url</label>
            {
            error && <p className="logo-f text-[14px] text-red-500">{error.image}</p>
            }
            <input defaultValue={responseValueToUpdate && responseValueToUpdate.image} name='image' placeholder='Image url link' className='logo-f text-[14px] fontcl inp w-full h-[40px]' type="text" />
        </div>
        <div className="flex flex-col gap-[7px] w-full">
            <label className='text-[14px] fontcl3 logo-f'>Post Description</label>
            {
            error && <p className="logo-f text-[14px] text-red-500">{error.description}</p>
            }
            <textarea defaultValue={responseValueToUpdate && responseValueToUpdate.description} name='description' placeholder='Description' className='logo-f text-[14px] fontcl inp w-full h-[280px]' type="text"></textarea>
        </div>
        <div className="flex flex-col gap-[7px] w-full">
            <label className='text-[14px] fontcl3 logo-f'>Post Date (Read Only)</label>
            <input  name='date' className='logo-f text-[14px] fontcl inp w-full h-[40px]' value={date && month && year ? date + '-' + month + '-' + year : responseValueToUpdate.date} type="text" />
        </div>
        <div className="flex items-center w-full flex-wrap gap-[10px]">
            <button className={`logo-f w-[100%] sm:w-[49%] md:w-[150px] mega-trans py-[5px] text-[14px] fontcl2 btn1 ${isSubmitting && 'opacity-[.6]'}`} disabled={isSubmitting}>{button_text}</button>
            <Link to='/' className='logo-f w-[100%] text-center sm:w-[49%] md:w-[150px] mega-trans py-[5px] text-[14px] fontcl btn2'>Discard Post</Link>
        </div>
    </Form>
</div>
  )
}

export default PostForm