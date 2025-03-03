import React from "react";
import { Link, useLocation } from "react-router";
import { Breadcrumb } from "antd";
import "antd/dist/reset.css"; 

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const items = [
    {
      title: <Link className="text-off capitalize leading-[24px] font-medium text-sm font-inter" to="/">Home</Link>,
    },
    ...pathnames.map((value, index) => {
      const navigate = `/${pathnames.slice(0, index + 1).join("/")}`;
      return {
        title:
          index === pathnames.length - 1 ? (
            <span className="text-anounce capitalize leading-[24px] font-medium text-sm font-inter">{value}</span>
          ) : (
            <Link to={navigate} className="text-off capitalize leading-[24px] font-medium text-sm font-inter">
              {value}
            </Link>
          ),
      };
    }),
  ];

  return (
    <div className="w-full flex justify-center mt-4">
      <Breadcrumb
        items={items}
        separator=">"
        className="text-off text-sm"
      />
    </div>
  );
};

export default Breadcrumbs;
