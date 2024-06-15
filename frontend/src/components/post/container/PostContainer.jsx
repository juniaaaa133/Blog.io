import React from 'react'
import './index.css'

const PostContainer = ({children}) => {
  return (
    <div className='ctn'>
      {children}
    </div>
  )
}

export default PostContainer