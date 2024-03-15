import Property from "@/components/property.js";
import AddProperty from "@/components/addPropertyButton.js";
export default function ManageProperty() {
	let houses = [
		"99 xyz avenue, North York, ON M2H 2K1",
		"999 xyz street, North York, ON M2H 1K8"
	];
	return (
		<>
			<div className="w-[100%] h-[100vh] text-black kumbh-sans-font">
				<h1 className="text-4xl font-bold text-primary mb-10">
					Manage Property
				</h1>
				<div className="flex flex-col lg:flex-row lg:justify-evenly items-center flex-wrap">
					{houses?.map((house) => {
						return (
							<Property address={house} key={house} className="mt-10 mx-[25px]" />
						);
					})}
					<AddProperty className="mt-10 mx-[25px]" />
				</div>
			</div>
		</>
	);
}
