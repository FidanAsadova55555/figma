import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carts, setCarts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0); 

    const addToCart = (product) => {
        setCarts((prev) => {
            const existingProduct = prev.find((item) => item.id === product.id);
            let updatedCart;

            if (existingProduct) {
                updatedCart = prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                updatedCart = [...prev, { ...product, quantity: product.quantity }];
            }

            console.log("Cart Updated:", updatedCart); 
            return updatedCart;
        });
    };

    const removeFromCart = (productId) => {
        setCarts((prev) => prev.filter((item) => item.id !== productId));
    };

    useEffect(() => {
        const total = carts.reduce((acc, item) => acc + (item.discountprice * item.quantity), 0);
        setTotalAmount(total);
        console.log("Total Amount Updated:", total); 
    }, [carts]); 

    const cartValues = {
        carts,
        addToCart,
        removeFromCart,
        totalAmount,
    };

    return <CartContext.Provider value={cartValues}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};