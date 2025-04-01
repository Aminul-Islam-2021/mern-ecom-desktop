import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className=" h-screen my-32 lg:my-20 mx-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
