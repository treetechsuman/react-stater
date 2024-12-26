import React from "react";
import { Outlet } from "react-router-dom";
import {Nav,BottomNav} from "../../components";
import { bottomLinks, brand, links,  } from "../../appConfig";


const Layout = () => {
  return (
    <>
      <Nav brand={brand} links={links} />
      <main className="md:container md:mx-auto px-8 pt-6">
        <Outlet /> {/* Renders the child routes */}
      </main>
      <BottomNav bottomLinks={bottomLinks}></BottomNav>
    </>
  );
};

export default Layout;