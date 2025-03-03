import React from 'react'
import { Outlet } from 'react-router';
import Footer from './footer';
import Header from './header';

const Layout = () => {
    return (
      <div><Header/>
      <main> <Outlet /></main>
        <Footer/>
      </div>
    );
}

export default Layout