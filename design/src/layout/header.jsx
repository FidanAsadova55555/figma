import React, { useState } from "react";
import { Link, useLocation } from "react-router"; 
import "remixicon/fonts/remixicon.css";
import LogoComponent from "../common/logo";
import HeaderLogo from "@/assets/logo.svg";
import Shopingbag from "@/assets/bag.svg";
import User from "@/assets/user.svg"
import Search from "@/assets/search.svg"
import { useCartContext } from "@/provider";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { carts } = useCartContext();

  const totalItems = carts.reduce((total, item) => total + item.quantity, 0);

  const menuItems = [
    { name: "home", path: "/" },
    { name: "shop", path: "/shop" },
    { name: "product", path: "/product" },
    { name: "cart", path: "/cart" },
  ];

  return (
    <>
      <div className="lg:px-[160px] md:px-[32px] px-[32px] py-[16px]">
        <div className="flex flex-row justify-between items-center">
          
          <div className="flex flex-row items-center gap-[16px]">
            <LogoComponent Logo={HeaderLogo} />
            <button
              className="lg:hidden text-[24px]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>

          <div className="hidden lg:flex capitalize flex-row justify-center items-center gap-[40px] font-space text-neutral text-sm font-medium leading-[24px]">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-all duration-500 ease-in-out ${
                  location.pathname === item.path ? "text-[#141718]" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-row justify-between items-center gap-[16px]">
            <Search className=" text-[24px] hidden lg:inline"/>
            <User className=" text-[24px] hidden lg:inline"/>

            <div className="flex justify-center items-center">
<Shopingbag/>              <span className="rounded-full border bg-black text-white w-[20px] flex items-center justify-center h-[20px]">
{totalItems}

              </span>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-start gap-4 mt-4 px-[32px] py-4 bg-white border rounded-md shadow-md">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="w-full text-sm capitalize text-neutral font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
