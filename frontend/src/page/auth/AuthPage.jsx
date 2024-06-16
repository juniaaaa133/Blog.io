import React from 'react'
import AuthForm from '../../components/form/AuthForm'
import { Form, Link, useSearchParams } from 'react-router-dom'

const AuthPage = () => {

  let [searchParams,setSearchParams] = useSearchParams();
  let IsLoginPage = searchParams.get('form') === 'login'
let error = null;
  return (
    <>
    <div className='w-[90%]  sm:w-[70%] md:w-[400px] mx-auto my-[50px] flex flex-col gap-[20px]'>
        <p className="logo-f fontcl text-[18px] sm:text-[24px]">{IsLoginPage ? 'Login your account' : 'Create New Account'}</p>
        <Form method='POST' className='flex flex-col gap-[30px]'>
          {
            !IsLoginPage &&
            <div className="flex flex-col gap-[7px] w-full">
            <label className='text-[14px] fontcl3 logo-f'>Username</label>
            {
            error && <p className="logo-f text-[14px] text-red-500">{error.title}</p>
            }
            <input name='title' placeholder='Username' className='logo-f text-[14px] fontcl inp w-full h-[40px]' type="text" />
        </div>
          }
            <div className="flex flex-col gap-[7px] w-full">
                <label className='text-[14px] fontcl3 logo-f'>Email address</label>
                {
                error && <p className="logo-f text-[14px] text-red-500">{error.title}</p>
                }
                <input name='title' placeholder='example@gmail.com' className='logo-f text-[14px] fontcl inp w-full h-[40px]' type="email" />
            </div>
            <div className="flex flex-col gap-[7px] w-full">
                <label className='text-[14px] fontcl3 logo-f'>Password</label>
                {
                error && <p className="logo-f text-[14px] text-red-500">{error.image}</p>
                }
                <input name='image' placeholder='Password' className='logo-f text-[14px] fontcl inp w-full h-[40px]' type="text" />
            </div>
            <div className="flex items-center w-full flex-wrap gap-[10px]">
                <button className='logo-f w-[100%] sm:w-[49%] md:w-[150px] mega-trans py-[5px] text-[14px] fontcl2 btn1'>{IsLoginPage ? 'Login' : 'Sign up'}</button>
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