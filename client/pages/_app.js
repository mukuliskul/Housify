import "@/styles/globals.css";
import Navbar from "@/components/navbar.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isMobile, isTablet } from "react-device-detect";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		// Determine the device type to avoid unnecessary operations on mobile/tablets.
		const deviceType = isMobile || isTablet ? "mobile" : "desktop";

		if (deviceType === "desktop") {
			// For desktop devices, proceed with checking for Ethereum/MetaMask presence.
			if (typeof window !== "undefined" && window.ethereum) {
				window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
					// Redirect to login if no accounts found and the viewport suggests desktop.
					if (
						accounts.length === 0 &&
						window.innerWidth >= 768 &&
						router.pathname !== "/login"
					) {
						router.push("/login");
					}
				});
			}
		} else if (deviceType === "mobile" && router.pathname == "/login") {
			router.push("/");
		}
		// The cleanup function here is kept for potential future use, it's currently not required.
		return () => {};
	}, [router]); // Depend on 'router' to ensure this effect is correctly triggered.

	// Control the display of Navbar based on the route.
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
