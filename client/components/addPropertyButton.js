import Image from "next/image";
import Link from "next/link";
import yellowHouseIcon from "@/public/icons/yellow-house-icon.svg";
import addHouseIcon from "@/public/icons/add-house-icon.svg";
export default function AddProperty(props) {
	return (
		<Link href="/manageproperty/uploadProperty" passHref>
			<button className={`${props.className} flex justify-center items-center flex-col h-[300px] w-[300px] bg-[#D0D0D0] border rounded-3xl hover:bg-[#EFEFEF]`}>
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
	);
}
