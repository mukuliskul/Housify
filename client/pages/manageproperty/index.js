import Property from "@/components/property.js";
import AddProperty from "@/components/addProperty.js";
export default function ManageProperty() {
	let houses = [
		"99 xyz avenue, North York, ON M2H 2K1",
		"999 xyz street, North York, ON M2H 2K1",
	];
	return (
		<>
			<div className="w-[100%] h-[100vh] text-black kumbh-sans-font">
				<h1 className="text-4xl font-bold text-primary mb-10">
					Manage Property
				</h1>
				<div className="lg:w-[80%] mx-auto flex flex-col md:flex-row justify-around items-center md:flex-wrap">
					{houses?.map((house) => {
						return (
							<Property address={house} key={house} className="m-[50px]" />
						);
					})}
					<AddProperty className="m-[50px]" />
				</div>
			</div>
		</>
	);
}
