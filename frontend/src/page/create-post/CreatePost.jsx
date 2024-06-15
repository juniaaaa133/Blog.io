import React from 'react'
import { Form, redirect, useActionData } from 'react-router-dom';
import { uuidv7 } from 'uuidv7';
import PostForm from '../../components/form/PostForm';

const CreatePost = () => {

let errorObj = useActionData();

let DATE = new Date();
let date = DATE.getDate() < 9 ? `0${DATE.getDate()}` : DATE.getDate();
let unformattedMonth = DATE.getMonth() == 11 ? 1 : DATE.getMonth() + 1;
let month = unformattedMonth < 9 ? `0${unformattedMonth}` : unformattedMonth;
let year = DATE.getFullYear() < 9 ? `0${DATE.getFullYear()}` : DATE.getFullYear();

return <PostForm 
        error={errorObj && errorObj.errors}
         date={date}
         month={month}
         year={year}
        button_text={'Create Post'}
         header={"Let's Create a Post"
         } />
}

export default CreatePost

export const createActoin = async ({request,params}) => {
let formData = await request.formData();
    
let title = formData.get('title');
let description = formData.get('description');
let image = formData.get('image');
let date = formData.get('date');

let data = {
    id : uuidv7(),
    title ,
    description ,
    image ,
    date ,
}

let res = await fetch(
    `http://localhost:8080/posts`,
    {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data),
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