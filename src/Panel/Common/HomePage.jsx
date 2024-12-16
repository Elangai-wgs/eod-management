import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CommonSideBar from "./CommonSideBar";

const HomePage = () => {
  return (
    <section className="w-full h-screen flex bg-slate-50 overflow-hidden">
      {/* Sidebar Section */}
      <aside className="h-full sm:w-[20%] md:w-[20%] lg:w-[15%] bg-white">
        <CommonSideBar />
      </aside>

      <main className="flex-1 h-full flex flex-col gap-2">
      
          <Navbar />

        <div className="w-full overflow-auto">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default HomePage;
