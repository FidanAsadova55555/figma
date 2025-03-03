import React from 'react'
import Test from "@/assets/testimage.svg"
import Star from "@/assets/star.svg"

const Product = () => {
  return (
    <div className='flex flex-col justify-center items-start gap-[12px]'>
    <div className=' w-full lg:h-[349px] md:h-[349px] h-[203px]  overflow-hidden relative'>
< Test className="w-full h-full object-cover"/>
  <div className='absolute top-[10%] left-[10%] flex flex-col justify-start items-start gap-[8px]'>
<div className=' rounded-[4px]  px-[14px] py-[4px] text-anounce uppercase font-inter leading-[16px] text-base font-bold bg-white'>
new
</div>
<div className=' rounded-[4px]  px-[14px] py-[4px] text-btntxt uppercase font-inter leading-[16px] text-base font-bold bg-button'>
  -50%
</div>
<div>

</div>
</div>
    </div>
    <div className='flex flex-col gap-[4px] items-start'>
<div className='flex justify-start gap-[2px]'>
  <Star/>
  <Star/>
  <Star/>
  <Star/>
  <Star/>

</div>
<div className='text-sm lg:text-base font-inter font-semibold capitalize leading-[22px] lg:leading-[26px]'>
table lamp

</div>
<div className='flex justify-start gap-[4px] lg:gap-[12px] text-sm lg:text-base font-inter font-semibold capitalize leading-[22px] lg:leading-[26px]'>
<div>
  $19.00
  </div>
  <div className='line-through font-normal text-old'>
    $50.00
  </div>
  </div>
    </div>
    </div>
  )
}

export default Product