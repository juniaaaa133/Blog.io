import React from 'react'

const HeadText = ({text}) => {
  return (
<div className="flex flex-col gap-[5px] w-fit">
<p className="fontcl logo-f text-[20px]">{text}</p>
<div className="w-[48%] h-[1.8px] bg-ter"></div>
</div>
  )
}

export default HeadText