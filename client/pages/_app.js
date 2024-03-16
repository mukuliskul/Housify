// pages/_app.js
import "@/styles/globals.css";
import Navbar from "@/components/navbar.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      console.log("About to request")
      console.log(window.innerWidth);
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length == 0 && window.innerWidth >= 768) {
          router.push("/login");
        }
      });
    } else if (window.innerWidth >= 768) {
      router.push("/login");
    }
    return () => {
    };
  }, []);

  const showNavbar = router.pathname !== "/login";

  return (
    <>
      {showNavbar && <Navbar />}
      <div
        className={router.pathname !== "/login" ? "py-10 md:px-10 px-5" : ""}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
