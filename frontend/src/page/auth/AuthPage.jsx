import React, { useEffect, useState } from 'react'
import { Form, Link, json, redirect, useActionData, useNavigate, useNavigation, useRouteError, useRouteLoaderData, useSearchParams } from 'react-router-dom'
import { uuidv7 } from 'uuidv7';
import { storage } from '../../util/storage';
import { api_url } from '../../util/api';

const AuthPage = () => {

  let data = useActionData();
  let authData = useRouteLoaderData('root');
  let [searchParams,setSearchParams] = useSearchParams();
  let navigation = useNavigation();
  let navigate = useNavigate();

  let isSubmitting = navigation.state === 'submitting';
  let IsLoginPage = searchParams.get('form') === 'login'

  useEffect(()=>{
    if(authData && authData.hasToken){
      navigate('/')
    }
  },[])

  return (
    <>
    <div className='w-[90%]  sm:w-[70%] md:w-[400px] mx-auto my-[50px] flex flex-col gap-[20px]'>
        <p className="logo-f fontcl text-[18px] sm:text-[24px]">{IsLoginPage ? 'Login your account' : 'Create New Account'}</p>
        <Form method='POST' className='flex flex-col gap-[30px]'>
         
            <div className="flex flex-col gap-[7px] w-full">
                <label className='text-[14px] fontcl3 logo-f'>Email address</label>
                {
                data && data.errors && <p className="logo-f text-[14px] text-red-500">{data.errors.email}</p>
                }
                <input name='email' placeholder='example@gmail.com' className='logo-f text-[14px] fontcl inp w-full h-[40px]' type="email" />
            </div>
            <div className="flex flex-col gap-[7px] w-full">
                <label className='text-[14px] fontcl3 logo-f'>Password</label>
                {
                data && data.errors && <p className="logo-f text-[14px] text-red-500">{data.errors.password}</p>
                }
                <input name='password' placeholder='Password' className='logo-f text-[14px] fontcl inp w-full h-[40px]' type="password" />
            </div>
            <div className="flex items-center w-full flex-wrap gap-[10px]">
                <button disabled={isSubmitting} className={`logo-f w-[100%] sm:w-[49%] md:w-[150px] mega-trans py-[5px] text-[14px] fontcl2 btn1 ${isSubmitting && 'opacity-[.6]' }`}>
                  {IsLoginPage
                   ?
                   isSubmitting ? 'Logging In' : 'Login'
                    :
                   isSubmitting ? 'Signing Up' : 'Sign up'
                   }
                   </button>
            </div>
            {
              IsLoginPage ?
              <div className="flex logo-f text-[14px] items-center gap-[5px]">
<p className=" fontcl3">Don't have an account?</p>
<Link to={`/authenticate?form=signup`} className='fontcl2'>Register</Link>
</div>
:
<div className="flex logo-f text-[14px] items-center gap-[5px]">
<p className=" fontcl3">Already had an account?</p>
<Link to={`/authenticate?form=login`} className='fontcl2'>Login</Link>
</div>
            }
        </Form>
    </div>
    </>
  )
}

export default AuthPage

export const authAction = async ({request}) => {
  let formData = await request.formData();
  let route = new URL(request.url).searchParams.get('form');

  let data = {
    email : formData.get('email'),
    password : formData.get('password'),
  }

  if(route !== 'login' && route !== 'signup'){
    throw json({message : 'NOT FOUND!'} ,{status : 404})
  }

  let res = await fetch(
    `${api_url}/${route}`,
    {
      method : "POST",
      headers : {
        'Content-Type' : "application/json",
      },
      body : JSON.stringify(data)
    }
  )
  if(res.status === 422){
    return res;
  }

  if(!res.ok){
    throw json({message : 'Something gone wrong'} ,{status : 500})
  }
  let resData = await res.json();
  let token =  resData.token;

  let tokenExpireDate = new Date()
  tokenExpireDate.setHours(tokenExpireDate.getHours() + 1);

  storage.set('token',token);
  storage.set('user',data.email);
  storage.set('expired',tokenExpireDate.toISOString())

  return redirect('/');
}