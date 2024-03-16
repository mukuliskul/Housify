import Link from "next/link";

export default function AddUtility(props) {
	return (
		<div className="">
			<Link href="/manageproperty/utility/addUtility" passHref>
				<button className="flex justify-center items-center flex-col h-[100px] w-full bg-[#EFEFEF] border rounded-2xl">
					<div>
						<p className="text-black text-2xl ">Add Utility</p>
					</div>
				</button>
			</Link>
		</div>
	);
}
