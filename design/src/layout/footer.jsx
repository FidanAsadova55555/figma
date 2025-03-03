import React from 'react';
import { Link } from 'react-router';
import LogoComponent from '../common/logo';
import FooterLogo from "@/assets/footerlogo.svg";
import Youtube from "@/assets/youtube.svg";
import Facebook from "@/assets/facebook.svg";
import Instagram from "@/assets/instagram.svg";

const Footer = () => {
  const menuItems = [
    { name: "home", path: "/" },
    { name: "shop", path: "/shop" },
    { name: "product", path: "/product" },
    { name: "blog", path: "/blog" },
    { name: "contact us", path: "/contact" },
  ];

  return (
    <> 
      <footer className="bg-footbg lg:px-[160px] px-[32px] xs:px-[32px] pt-[80px] pb-[32px] flex flex-col gap-[49px] text-footxt">
        
        <div className="pb-[8px] flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left">
          <div className="flex flex-col items-center lg:flex-row gap-[8px]">
            <LogoComponent Logo={FooterLogo} />
            <div className="text-sm capitalize font-inter leading-[22px]">
              Gift & Decoration Store
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-[16px] lg:gap-[40px] text-sm font-inter leading-[22px] capitalize mt-[16px] lg:mt-0">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="transition-all duration-500 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center border-t-[0.5px] border-old py-[16px] text-center lg:text-left">
          
          <div className="flex flex-col lg:flex-row justify-start items-center lg:items-start gap-[16px] lg:gap-[28px] text-btntxt leading-[20px] text-[12px] font-semibold font-poppins">
            <div>Copyright © 2023 3legant. All rights reserved</div>
            <div>Privacy Policy</div>
            <div>Terms of Use</div>
          </div>

          <div className="flex justify-center lg:justify-between gap-[24px] mt-[16px] lg:mt-0">
            <Instagram />
            <Facebook />
            <Youtube />
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
