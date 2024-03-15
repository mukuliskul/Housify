import Image from "next/image";
import Link from "next/link";
import houseIcon from "@/public/icons/house-icon.svg";
export default function Property(props) {
	return (
		<div className={`${props.className} h-[300px] w-[300px] bg-[#4359D7] border rounded-3xl border-[#FFE37D]`}>
			<div className="h-[40%] border-b border-white">
				<Image
					src={houseIcon}
					width={200}
					height={200}
					className="h-[80%] mt-[10px] mx-auto"
				/>
			</div>
			<div className="font-[800] text-[20px] text-center text-white mt-2">
				<p className="w-[60%] leading-6 mx-auto">{props.address}</p>
			</div>
			<div className="grid grid-rows-2 flex justify-center text-white">
				<div className="flex flex-row justify-around mt-2">
				<Link href="/ComingSoon" passHref>
					<button className="bg-[#E4B300] w-[80px] h-[25px] border border-[#DDDDDD] rounded-md mx-1 hover:text-black hover:bg-white">
						<p className="text-[15px] font-white drop-shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25);]">
							Export
						</p>
					</button>
				</Link>
				<Link href="/ComingSoon" passHref>
					<button className="bg-[#E4B300] w-[80px] h-[25px] border border-[#DDDDDD] rounded-md mx-1 hover:text-black hover:bg-white">
						<p className="text-[15px] font-white drop-shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25);]">
							Edit
						</p>
					</button>
				</Link>					
				</div>
				<div className="flex flex-row justify-around mt-2">
				<Link href="/manageproperty/utility" passHref>
						<button className="bg-[#E4B300] w-[80px] h-[25px] border border-[#DDDDDD] rounded-md mx-1 hover:text-black hover:bg-white">
							<p className="text-[15px] font-white drop-shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25);]">
								Utility
							</p>
						</button>
					</Link>
					<Link href="/manageproperty/tenants" passHref>
						<button className="bg-[#E4B300] w-[80px] h-[25px] border border-[#DDDDDD] rounded-md mx-1 hover:text-black hover:bg-white">
							<p className="text-[15px] font-white drop-shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25);]">
								Tenants
							</p>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
