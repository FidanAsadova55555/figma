import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carts, setCarts] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(carts));
    }, [carts]);

    useEffect(() => {
        const total = carts.reduce((acc, item) => acc + item.discountprice * item.quantity, 0);
        setTotalAmount(total);
    }, [carts]);

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

            return updatedCart;
        });
    };

    const removeFromCart = (productId) => {
        setCarts((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateCartQuantity = (productId, newQuantity) => {
        setCarts((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
            )
        );
    };

    const cartValues = {
        carts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
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
