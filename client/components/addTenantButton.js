import Link from "next/link";

export default function AddTenant(props) {
	return (
		<div className="">
			<Link href="/manageproperty/tenants/addTenant" passHref>
				<button className="flex justify-center items-center flex-col h-[100px] w-full bg-[#EFEFEF] border rounded-2xl">
					<div>
						<p className="text-black text-2xl ">Add Tenant</p>
					</div>
				</button>
			</Link>
		</div>
	);
}
