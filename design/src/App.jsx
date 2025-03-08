import React from 'react';
import { RouterProvider } from 'react-router';
import { Router } from './routers';
import { CartProvider } from './provider'; 

const App = () => {
  return (
    <CartProvider> 
      <RouterProvider router={Router} />
    </CartProvider>
  );
};

export default App;
