import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CommonSideBar from "./CommonSideBar";

const HomePage = () => {
  return (
    <section className="w-full h-screen flex gap-1 bg-slate-50 overflow-hidden">
      {/* Sidebar Section */}
      <aside className="h-full bg-white">
        <CommonSideBar />
      </aside>

      <main className="flex-1 h-full flex flex-col gap-4">
      
          <Navbar />

        <div className="w-full flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default HomePage;
