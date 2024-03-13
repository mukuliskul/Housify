import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
	return (
		<>
			<header className="flex w-[100%] col-span-4 flex-row justify-left h-[100%] items-center bg-white border-black border-b-[1px] text-primary">
				<div className="md:px-10 px-5">
				<Link href="/" passHref>
					<Image src={"/icons/Nav-logo.svg"} width={200} height={200} />
				</Link>
				</div>
				<nav className="flex flex-row justify-around items-center w-[60%] font-medium text-[20px] pl-[5%]">
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
