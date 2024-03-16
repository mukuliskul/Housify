import "@/styles/globals.css";
import Navbar from "@/components/navbar.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isMobile, isTablet } from "react-device-detect";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		// Directly determine device type to avoid unnecessary operations on mobile/tablets.
		const deviceType = isMobile || isTablet ? "mobile" : "desktop";

		// For desktop devices, check for Ethereum/MetaMask presence.
		if (deviceType === "desktop") {
			if (typeof window !== "undefined" && window.ethereum) {
				window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
					// If no accounts found and viewport width suggests desktop, redirect to login.
					if (accounts.length === 0 && window.innerWidth >= 768) {
						router.push("/login");
					}
				});
			}
		}

		// Cleanup function if needed, though it's empty here.
		return () => {};
	}, [router]); // Dependencies adjusted for clarity, though it should run once.

	// Control display of Navbar based on route.
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
