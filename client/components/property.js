import Image from "next/image";
import Link from "next/link";
import houseIcon from "@/public/icons/house-icon.svg";
export default function Property(props) {
	return (
		<div className={props.className}>
			<div className="h-[297px] w-[297px] bg-[#4359D7] border rounded-3xl border-[#FFE37D]">
				<div className="h-[50%] border-b border-white">
					<Image
						src={houseIcon}
						width={200}
						height={200}
						className="h-[80%] mt-[10px] mx-auto"
					/>
				</div>
				<div className="font-[800] text-[20px] text-center text-white">
					<p className="w-[60%] leading-6 mx-auto">{props.address}</p>
				</div>
				<div className="flex flex-row justify-around text-white mt-[5px]">
					{/* Coming Soon */}
					<Link href="/manageproperty/utility" passHref>
						<button className="bg-[#E4B300] w-[84px] h-[28px] border border-[#DDDDDD] rounded-md">
							<p className="text-[15px] font-white drop-shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25);]">
								Utility
							</p>
						</button>
					</Link>
					{/* Coming Soon */}
					<Link href="/manageproperty/tenants" passHref>
						<button className="bg-[#E4B300] w-[84px] h-[28px] border border-[#DDDDDD] rounded-md">
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
