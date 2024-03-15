import Link from "next/link";

export default function AddTenant(props) {
	return (
		<div className="">
			<Link href="/manageproperty/tenants/addTenant" passHref>
				<button className="flex justify-center items-center flex-col h-[100px] w-full bg-[#D0D0D0] border rounded-2xl hover:bg-[#EFEFEF]">
					<div>
						<p className="text-black text-2xl ">Add Tenant</p>
					</div>
				</button>
			</Link>
		</div>
	);
}
