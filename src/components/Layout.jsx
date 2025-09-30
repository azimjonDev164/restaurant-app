import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import { Fragment } from "react";

function Layout() {
  return (
    <Fragment>
      <Navbar />
      <div
        className="flex
      flow-auto"
      >
        <SideBar />
        <main className="px-3 overflow-y-auto w-full h-[calc(100vh-70px)] mx-auto">
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
}

export default Layout;
