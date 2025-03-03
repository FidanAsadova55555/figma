import React from 'react'
import Product from '@/components/product'
import Breadcrumbs from '@/components/bread'
import Bg from '@/assets/bg.svg?url'  

const Shop = () => {
  return (
    <div>
      <div
        className="relative h-[392px] w-full bg-cover bg-center lg:px-[160px] px-[32px]"
        style={{backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundClip: 'content-box', 
         }}
      >
        <div className="flex flex-col text-center items-center justify-center gap-[24px] h-full">
          <Breadcrumbs />
          <div className="text-[40px] lg:text-[54px] font-poppins capitalize font-medium leading-[44px] lg:leading-[58px] tracking-[-1px]">
            shop page
          </div>
          <div className=" text-base lg:text-[20px] font-inter font-normal leading-[26px]  lg:leading-[32px]">
            Let’s design the place you always imagined.
          </div>
        </div>
      </div>

      <div className="lg:px-[160px] md:px-[32px] px-[32px] pt-[60px] pb-[100px] flex justify-between items-center gap-[24px]">
        <div className="grid grid-cols-1"></div>
        <div className="grid xl:grid-cols-3 grid-cols-2  gap-[12px] lg:gap-[24px]">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </div>
  )
}

export default Shop
