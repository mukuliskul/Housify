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
        <nav className="lg:px-10 px-5 flex w-full flex-col lg:flex-row lg:justify-between h-[100%] font-medium text-[20px] items-center border-black border-b-[1px] text-primary md:pb-0 pb-2">
          <Link href="/" passHref>
            <Image src={"/icons/Nav-logo.svg"} width={200} height={200} />
          </Link>
			<Link href="/" passHref legacyBehavior><a>Home</a></Link>
			<Link href="/about" passHref legacyBehavior><a>About</a></Link>
			<Link href="/features" passHref legacyBehavior><a>Features</a></Link>
			<button
			className="bg-primary text-white border-[1px] rounded-3xl h-[33px] w-[80px] font-extrabold hover:bg-[#1040c7]"
			onClick={handleLogout}
			>
			Logout
        	</button>
        </nav>
    </>
  );
}
