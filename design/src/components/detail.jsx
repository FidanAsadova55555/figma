import React from 'react'
import Star from "@/assets/star.svg";
import {CountdownTimer} from "@/common/duration.jsx";
import CartButton from './cartbutton';

const JustDetail = ({ colors, name, newp, oldp, image, announcement, rating, ...props }) => {
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
          if (i < rating) {
            stars.push(<Star key={i} />);
          }
        }
        return stars;
      };
    
    const discountPercentage = oldp ? Math.round(((oldp - newp) / oldp) * 100) : 0;

    const product = {
        id: props.id || name, 
        name,
        newp,
        oldp,
        image,
        discountprice: newp, 
    };

    return (
    <div>
        <div className='grid grid-cols-12 gap-[63px]'>
            <div className="col-span-6">
                <div className="w-full lg:h-[729px] md:h-[414px] h-[203px] overflow-hidden relative">
                    <img src={image} className="w-full h-full object-cover" alt={name} />
                    <div className="absolute top-[10%] left-[10%] flex flex-col justify-start items-start gap-[8px]">
                        {announcement && (
                            <div className="rounded-[4px] border border-btntxt shadow-lg px-[14px] py-[4px] text-anounce uppercase font-inter leading-[16px] text-base font-bold bg-white">
                                {announcement}
                            </div>
                        )}
                        {discountPercentage > 0 && (
                            <div className="rounded-[4px] px-[14px] py-[4px] text-btntxt uppercase font-inter leading-[16px] text-base font-bold bg-button">
                                -{discountPercentage}%
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-span-6">
                <div className='flex flex-col items-start justify-start w-full'>
                    <div className="flex flex-col items-start justify-start w-full gap-[16px] pb-[24px] border-b border-[#E8ECEF]">
                        <div className='flex justify-start items-center gap-[2px]'>{renderStars(rating)}</div>
                        <div className="text-[40px] tracking-[-0.4px] font-poppins font-medium capitalize leading-[44px] ">
                            {name}
                        </div>
                        <div className='flex justify-start items-center gap-[12px]'>
                            <div className="text-[28px] font-poppins font-medium capitalize leading-[34px] tracking-[-0.6px]">
                                ${Number(newp).toFixed(2)}
                            </div>
                            <div className='line-through text-[20px] leading-[28px] font-poppins text-old'>
                                ${Number(oldp).toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div className='flex py-[24px] flex-col items-start justify-start w-full border-b border-[#E8ECEF]'>
                        <h1 className='text-base font-inter leading-[26px] text-[#343839]'>Offer expires in:</h1>
                        <CountdownTimer targetDate="2025-03-10T00:00:00" />
                        <CartButton product={product} />  
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default JustDetail;