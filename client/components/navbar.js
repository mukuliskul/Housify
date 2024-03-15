import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	function handleLogout() {
		router.push("/login");
	}
	return (
		<>
			<nav className="lg:px-10 px-5 flex w-full flex-col lg:flex-row lg:justify-evenly h-[100%] font-medium text-[20px] items-center border-black border-b-[1px] text-primary lg:pb-0 pb-2">
				<Link href="/" passHref>
					<Image src={"/icons/Nav-logo.svg"} width={200} height={200} />
				</Link>
				<div className="block lg:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex items-center px-3 py-2 border bg-white rounded text-black border-black border-2px font-extrabold hover:bg-[#909090]"
					>
						<svg
							className="fill-current h-3 w-3"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
					</button>
				</div>
				<div
					className={`${
						isOpen ? "block" : "hidden"
					} block lg:flex-grow lg:px-10 px-5 flex w-full flex-col lg:flex-row lg:justify-around items-center text-primary lg:flex`}
				>
					<Link href="/" passHref legacyBehavior>
						<a className="block lg:inline-block">Home</a>
					</Link>
					<Link href="/about" passHref legacyBehavior>
						<a className="block lg:inline-block">About</a>
					</Link>
					<Link href="/features" passHref legacyBehavior>
						<a className="block lg:inline-block">Features</a>
					</Link>
					<button
						className="bg-primary text-white border-[1px] rounded-3xl h-[33px] w-[80px] font-extrabold hover:bg-[#1040c7]"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			</nav>
		</>
	);
}
