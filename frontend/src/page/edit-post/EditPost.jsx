import React from 'react'
import PostForm from '../../components/form/PostForm'
import { redirect, useActionData, useRouteLoaderData } from 'react-router'

const EditPost = () => {

    let currentPostData = useRouteLoaderData('blog');
    let errorObj = useActionData();
    
  return (
    <PostForm 
    header={'Edit Post'}
    button_text={'Update Post'}
    error={errorObj && errorObj.errors}
    responseValueToUpdate={currentPostData}
    />
  )
}

export default EditPost

export const updateAction = async ({request,params}) => {
    let formData = await request.formData();

    let data = {
        title : formData.get('title'),
        description : formData.get('description'),
        image : formData.get('image'),
        date : formData.get('date')
    }
    console.log(data)

    let res = await fetch(
        `http://localhost:8080/posts/${params.id}`,{
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data)
        }
      )
      if(!res.ok) {
        console.log("ERROR")
        return;
      }
      return redirect('/');
}