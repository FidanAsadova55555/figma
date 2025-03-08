import React, { useState } from "react";
import Heart from "@/assets/heart.svg";
import { useCartContext } from "@/provider";

const CartButton = ({ product }) => {
    const { addToCart, totalAmount } = useCartContext();
    const [quantity, setQuantity] = useState(1); 

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="w-full py-[32px] flex justify-center items-center flex-col gap-[16px]">
            <div className="flex gap-[24px] w-full">
                <div className="border border-[#F5F5F5] bg-[#F5F5F5] rounded-[8px] px-[16px] py-[12px] text-base font-inter flex justify-between gap-[24px] items-center w-auto">
                    <button onClick={decrement}>-</button>
                    <div>{quantity}</div>
                    <button onClick={increment}>+</button>
                </div>

                <div className="border border-footbg rounded-[8px] px-[40px] py-[10px] flex justify-center items-center gap-[8px] flex-1">
                    <Heart />
                    <div className="text-[18px] font-medium leading-[32px] font-inter">
                        Wishlist
                    </div>
                </div>
            </div>

            <div className="w-full">
                <button
                    className="border w-full border-footbg bg-footbg text-[18px] font-medium leading-[32px] font-inter text-white rounded-[8px] px-[40px] py-[10px]"
                    onClick={() => {
                        addToCart({ ...product, quantity });
                        console.log("Total Price After Adding:", totalAmount);
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default CartButton;
