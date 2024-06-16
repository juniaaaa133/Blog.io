import React from 'react'
import { useRouteError } from 'react-router'
import { Link } from 'react-router-dom';

const Error = () => {
    let error = useRouteError();

  return (
    <div className='flex flex-col gap-[5px] m-auto absolute top-0 right-0 left-0 bottom-0 w-fit h-fit'>
    <p className="fontcl2 logo-f text-[25px]">OOPS!</p>
    <p className="logo-f text-[16px] fontcl">{error.message}</p>    
    {
        error.status === 503 ?
        <div className='logo-f w-fit mega-trans py-[5px] text-[14px] fontcl2 ' onClick={()=>window.location.reload()}>Reload</div>
                            :
     <Link to={'/'} className='logo-f w-fit mega-trans py-[5px] text-[13px] fontcl2'>Go Back Home</Link>

    }
    </div>
  )
}

export default Error