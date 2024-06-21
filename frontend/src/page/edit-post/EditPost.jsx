import React, { useEffect } from 'react'
import PostForm from '../../components/form/PostForm'
import { json, redirect, useActionData, useNavigate, useNavigation, useRouteLoaderData } from 'react-router'
import ErrorPage from '../error/ErrorPage';
import { storage } from '../../util/storage';

const EditPost = () => {

    let currentPostData = useRouteLoaderData('blog');
    let errorObj = useActionData();
    let navigation = useNavigation();
    let isSubmitting = navigation.state === 'submitting';
    let authData = useRouteLoaderData('root');

  return (
    authData && !authData.hasToken ?
    <ErrorPage custom_msg={'404 NOT FOUND!'}/> 
    :
    <PostForm 
    isSubmitting={isSubmitting}
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

    let res = await fetch(
        `http://localhost:8080/posts/${params.id}`,{
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json",
            'Authorization' : `Bearer ${storage.get('token')}`
        },
        body : JSON.stringify(data)
        }
      )
      if(res.status === 422){
        return res
      }else if(res.status === 503){
        throw json({message : "No Internet Connection!"} , {status : 503})
      }
    
      if(!res.ok) {
      throw json({message : 'Something gone wrong!'} , {status : 500})
      }
      return redirect('/');
}