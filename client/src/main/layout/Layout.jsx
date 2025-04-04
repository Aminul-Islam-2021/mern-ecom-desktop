import React from "react";
import { Toaster } from "react-hot-toast";
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
      {/* Place Toaster once in your layout */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: "custom-toast",
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
      />
    </div>
  );
};

export default Layout;
