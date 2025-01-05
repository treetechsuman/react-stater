import React from "react";
import { Outlet } from "react-router-dom";
import { Nav, BottomNav } from "../../components";
import { bottomLinks, brand, links } from "../../appConfig";
import { FlashProvider, useFlash } from "../common/FlashContext";
import FlashMessage from "../common/FlashMessage";

const Layout = () => {
  const { addMessage } = useFlash();

  return (
    <>
      <Nav brand={brand} links={links} />

      <main className="md:container md:mx-auto px-8 pt-6">
        <FlashMessage></FlashMessage>
        <div>
          <button
            onClick={() =>
              addMessage("Message Error!", "error", "test test error")
            }
          >
            Show Error
          </button>
          <button onClick={() => addMessage("Message Success!", "success")}>
            Show success
          </button>
        </div>
        <Outlet /> {/* Renders the child routes */}
      </main>

      <BottomNav bottomLinks={bottomLinks}></BottomNav>
    </>
  );
};

export default Layout;
