import React, { useEffect } from 'react'
import Nav from '../components/nav/Nav'
import { Outlet, useLoaderData, useLocation, useNavigate, useNavigation } from 'react-router'
import {RingLoader } from 'react-spinners';
import { useSubmit } from 'react-router-dom';

const Layout = () => {

  let {state} = useNavigation();
  let authData = useLoaderData();
  let navigate = useNavigate();
  let location = useLocation();

  let validateExpriedTokenDate = () => {
    let expTokenData = authData.expired;

    if(authData && !expTokenData){
      return;
    }

    let expiredMs = new Date(expTokenData);
    let currentMs = new Date();

    let duration =expiredMs - currentMs;
    if(duration <= 0){
      navigate('/logout');
    }
  }

  useEffect(()=>{
    validateExpriedTokenDate();
  },[location])

  return (
    <>
        <Nav />
       {
        state === 'loading' ?
<div className="flex w-full h-[100vh] items-center justify-center">
<RingLoader color="#e83553" />
</div>

        :
        <Outlet />
       }
    </>
  )
}

export default Layout