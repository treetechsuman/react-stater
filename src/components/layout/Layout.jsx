import React from "react";
import { Outlet } from "react-router-dom";
import {Nav,BottomNav} from "../../components";
import { bottomLinks, brand, links,  } from "../../appConfig";


const Layout = () => {
  return (
    <>
      <Nav brand={brand} links={links} />
      <main className="p-6 pt-10 text-center">
        <Outlet /> {/* Renders the child routes */}
      </main>
      <BottomNav bottomLinks={bottomLinks}></BottomNav>
    </>
  );
};

export default Layout;