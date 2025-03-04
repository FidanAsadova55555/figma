import React from 'react';
import Star from "@/assets/star.svg";
import clsx from "clsx";

const Product = ({ colors, name, newp, oldp, image, announcement, rating, ...props }) => {
  const CheckColorProduct = (color) => {
    switch (color) {
      case "black":
        return "bg-black";
      case "blue":
        return "bg-blue-300";
      case "white":
        return "bg-white-400";
      case "gray":
        return "bg-gray-400";
      default:
        return "bg-black";
    }
  };

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

  return (
    <div className="flex flex-col justify-center items-start gap-[12px]">
      <div className="w-full lg:h-[349px] md:h-[349px] h-[203px] overflow-hidden relative">
        <img src={image} className="w-full h-full object-cover" alt={name} />
        <div className="absolute  top-[10%] left-[10%] flex flex-col justify-start items-start gap-[8px]">
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
      <div className="flex flex-col gap-[4px] items-start">
        <div className="flex justify-start gap-[2px]">{renderStars(rating)}</div>
        <div>
          {colors?.map((color, index) => (
            <span
              key={index}
              style={{ backgroundColor: color }}
              className={clsx("inline-block w-5 h-5 border border-old rounded-full", CheckColorProduct(color))}
            >
            </span>
          ))}
        </div>
        <div className="text-sm lg:text-base font-inter font-semibold capitalize leading-[22px] lg:leading-[26px]">
          {name}
        </div>
        <div className="flex justify-start gap-[4px] lg:gap-[12px] text-sm lg:text-base font-inter font-semibold capitalize leading-[22px] lg:leading-[26px]">
          <div>${Number(newp).toFixed(2)}</div>
          {oldp && (
            <div className="line-through font-normal text-old">
              ${Number(oldp).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
