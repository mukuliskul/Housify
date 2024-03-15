import { useState } from "react";

export default function Tenant(props) {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<>
			<div>
				<div className="mb-2 flex flex-row rows-1 justify-between items-center">
					<div>
						<p className="">
							<strong>Name: </strong>
							{props.tenant.name}
						</p>
						<p className="">
							<strong>Start Date: </strong>
							{props.tenant.start_date}
						</p>
						<p className="">
							<strong>End Date: </strong>
							{props.tenant.end_date}
						</p>
					</div>
					<button className="flex justify-center items-center flex-col h-[40px] w-[120px] bg-[#D0D0D0] border rounded-2xl hover:bg-[#EFEFEF]">
						View
				</button>
				</div>
			</div>
		</>
	);
}
