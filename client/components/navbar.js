import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<header className="flex w-full flex-col md:flex-row md:justify-left h-[100%] items-center border-black border-b-[1px] text-primary">
				<div className="md:px-10 px-5">
				<Link href="/" passHref>
					<Image src={"/icons/Nav-logo.svg"} width={200} height={200} />
				</Link>
				</div>
				<nav className="flex flex-col md:flex-row justify-around items-center w-[60%] font-medium text-[20px] pl-[5%]">
					<Link href="/" passHref legacyBehavior>
						<a>Home</a>
					</Link>
					<Link href="/about" passHref legacyBehavior>
						<a>About</a>
					</Link>
					<Link href="/features" passHref legacyBehavior>
						<a>Features</a>
					</Link>
					<Link href="/services" passHref legacyBehavior>
						<a>Services</a>
					</Link>
				</nav>
			</header>
		</>
	);
}
