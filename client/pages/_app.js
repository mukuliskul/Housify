// pages/_app.js
import "@/styles/globals.css";
import Navbar from "@/components/navbar.js";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        return console.log(accounts);
      });
      if (!window.ethereum.request({ method: "eth_accounts" })) {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
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
