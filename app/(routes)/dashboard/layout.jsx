import React from "react";
import Sidebar from "./_components/Sidebar";
import DashBoardHeader from "./_components/DashBoardHeader";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="hidden md:block md:w-64 bg-slate-100 h-screen fixed">
        <Sidebar />
      </div>
      <div className=" md:ml-64 ">
        <DashBoardHeader />
        {children}
      </div>
    </div>
  );
};

export default Layout;
