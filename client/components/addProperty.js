import Image from "next/image";
import Link from "next/link";
import yellowHouseIcon from "@/public/icons/yellow-house-icon.svg";
import addHouseIcon from "@/public/icons/add-house-icon.svg";
export default function AddProperty(props) {
	return (
		<div className={props.className}>
			{/* Coming Soon */}
			<Link href="/manageproperty/uploadProperty" passHref>
				<button className="flex justify-center items-center flex-col h-[297px] w-[297px] bg-[#EFEFEF] border rounded-3xl">
					<div>
						<Image src={yellowHouseIcon} className="pb-[10px]" />
					</div>
					<div>
						<p className="text-[#E4B300] text-[24px]">
							<Image src={addHouseIcon} className="inline" /> Add Property
						</p>
					</div>
				</button>
			</Link>
		</div>
	);
}
