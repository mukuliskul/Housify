// pages/_app.js
import "@/styles/globals.css";
import Navbar from "@/components/navbar.js";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined" && window.ethereum) {
			if (!window.ethereum.selectedAddress) {
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
			<div className="py-10 md:px-10 px-5">
				<Component {...pageProps} />;
			</div>
		</>
	);
}

export default MyApp;
