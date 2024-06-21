import React from 'react'
import { redirect } from 'react-router'
import { storage } from '../../util/storage'

const Logout = () => {
  return (
    <></>
  )
}

export default Logout

export const removeAuthTokenLoader = () => {
    storage.remove('token');
    storage.remove('user');
    storage.remove('expired')
    return redirect('/');
    }