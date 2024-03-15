import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import manageProperty from "@/public/icons/index/manage-property.svg";
import generateDocuments from "@/public/icons/index/generate-documents.svg";
import guide from "@/public/icons/index/guide.svg";
import profile from "@/public/icons/index/profile.svg";
import Link from "next/link";

export default function Index() {
	const router = useRouter();
	// useEffect(()=>{
	// router.push('/login')
	// })
	return (
		<div>
			<div className="grid grid-cols-4 h-[100vh] text-black kumbh-sans-font">
				<div className="col-span-4 text-center py-auto w-[50%] mx-auto">
					<p className="text-primary text-[20px]">
						Welcome to Housify, your digital haven for streamlined property
						management. Organize your documents effortlessly and craft leases
						with ease. Let Housify simplify your property ownership journey.
					</p>
				</div>
				<div className="col-span-4 h-[300px] w-[300px] sm:h-[200px] sm:w-[200px] sm:col-span-2 lg:h-[200px] lg:w-[200px] md:w-[200px] md:h-[200px] manage-property text-center items-center mx-auto lg:ml-[50%] lg:mt-0 mt-5">
					<Link href="/manageproperty" passHref>
						<Image
							src={manageProperty}
							height={400}
							className="w-[60%] sm:w-[60%] mt-[1%] mx-auto sm:mx-[26%]"
							alt="Manage Property Icon"
						/>
						<p className="kumbh-sans font-bold text-white text-[20px]">
							Manage
							<br />
							Property
						</p>
					</Link>
				</div>
				<div className="col-span-4 h-[300px] w-[300px] sm:h-[200px] sm:w-[200px] sm:col-span-2 lg:h-[200px] lg:w-[200px] md:w-[200px] md:h-[200px] manage-property text-center items-center mx-auto lg:mr-[50%] lg:mt-0 mt-5">
					<Link href="/generate" passHref>
						<Image
							src={generateDocuments}
							height={400}
							className="w-[50%] sm:w-[50%] mx-auto sm:ml-[30%]"
							alt="Generate Documents Icon"
						/>
						<p className="kumbh-sans font-bold text-white text-[20px]">
							Generate /
							Interpret
							<br />
							Documents
						</p>
					</Link>
				</div>
				<div className="col-span-4 h-[300px] w-[300px] sm:h-[200px] sm:w-[200px] sm:col-span-2 lg:h-[200px] lg:w-[200px] md:w-[200px] md:h-[200px] manage-property text-center items-center mx-auto lg:ml-[50%] lg:mt-0 mt-5">
					{/* Coming Soon */}
					<Link href="/guide" passHref>
						<button>
							<Image
								src={guide}
								height={400}
								className="w-[70%] sm:w-[50%] mx-auto my-auto"
								alt="Guide Icon"
							/>
							<p className="kumbh-sans font-bold text-white text-[20px]">
								Step-by-step
								<br />
								guide for Housify
							</p>
						</button>
					</Link>
				</div>
				<div className="col-span-4 h-[300px] w-[300px] sm:h-[200px] sm:w-[200px] sm:col-span-2 lg:h-[200px] lg:w-[200px] md:w-[200px] md:h-[200px] manage-property text-center items-center mx-auto lg:mr-[50%] lg:mt-0 mt-5">
					{/* Coming Soon */}
					<Link href="/ComingSoon" passHref>
						<button>
							<Image
								src={profile}
								height={400}
								className="w-[60%] sm:w-[50%] ml-[12%] sm:ml-[18%] mt-[13%]"
								alt="Profile Icon"
							/>
							<p className="kumbh-sans font-bold text-white text-[21px]">
								Manage
								<br />
								Profile
							</p>
						</button>
					</Link>
				</div>
				<br />
			</div>
		</div>
	);
}
