import React, { useState } from "react";
import { useCartContext } from "@/provider";
import Line from "@/assets/line.svg";

const Drawer = () => {
  const {carts, totalAmount, removeFromCart, updateCartQuantity } = useCartContext();
  const [shippingCost, setShippingCost] = useState(0);
const { isCartOpen, setCartOpen } = useCartContext();
  const handleShippingChange = (e) => {
    switch (e.target.value) {
      case "free":
        setShippingCost(0);
        break;
      case "express":
        setShippingCost(15);
        break;
      case "pickup":
        setShippingCost(totalAmount * 0.21);
        break;
      default:
        setShippingCost(0);
    }
  };

  const handleCheckout = () => {
    alert(`Checkout successful! Total amount: $${(totalAmount + shippingCost).toFixed(2)}`);
    console.log("Proceeding to payment...", { carts, totalAmount, shippingCost });
  };

  return (
<div
    className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto pt-[80px] px-4 md:px-6 font-poppins transform transition-transform duration-300 ease-in-out ${
      isCartOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
  >      <h1 className="text-center text-[36px] md:text-[54px] leading-[58px] font-medium mb-6">Cart</h1>
<button
  onClick={() => setCartOpen(false)}
  className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
>
  &times;
</button>

      <div className="mb-[80px] grid grid-cols-1 gap-8">
        <div>
          <div className="border-b hidden md:flex items-center pb-4 text-sm font-medium">
            <div className="w-1/3">Product</div>
            <div className="w-1/4 text-center">Quantity</div>
            <div className="w-1/6 text-center">Price</div>
            <div className="w-1/6 text-center">Subtotal</div>
          </div>

          {carts.map((item) => (
            <div key={item.id} className="border-b flex flex-col md:flex-row items-center py-4">
              <div className="w-full md:w-1/3 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                <div>
                  <p>{item.name}</p>
                  <button
                    className="text-old text-sm flex justify-start items-center"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Line /> Remove
                  </button>
                </div>
              </div>

              <div className="w-full md:w-1/4 flex justify-center items-center gap-3 mt-2 md:mt-0">
                <button
                  className="border px-3 py-1"
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="border px-3 py-1"
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="w-full md:w-1/6 text-center mt-2 md:mt-0">
                ${item.discountprice.toFixed(2)}
              </div>
              <div className="w-full md:w-1/6 text-center mt-2 md:mt-0">
                ${(item.discountprice * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="mt-6 border p-4">
            <p className="mb-2 font-medium">Have a coupon?</p>
            <div className="flex">
              <input type="text" placeholder="Coupon Code" className="border p-2 flex-1" />
              <button className="bg-black text-white px-6 py-2">Apply</button>
            </div>
          </div>
        </div>

        <div className="border p-6">
          <h2 className="text-xl font-semibold mb-4">Cart summary</h2>

          <div className="mb-4">
            <div className="flex justify-between py-2">
              <label>
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  defaultChecked
                  onChange={handleShippingChange}
                />{" "}
                Free shipping
              </label>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between py-2">
              <label>
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  onChange={handleShippingChange}
                />{" "}
                Express shipping
              </label>
              <span>+$15.00</span>
            </div>
            <div className="flex justify-between py-2">
              <label>
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  onChange={handleShippingChange}
                />{" "}
                Pick Up
              </label>
              <span>%21.00</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>${(totalAmount + shippingCost).toFixed(2)}</span>
            </div>
          </div>

          <button
            className="mt-4 w-full bg-black text-white py-3 text-lg"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
