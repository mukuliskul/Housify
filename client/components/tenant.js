import { useState } from "react";

export default function Tenant(props) {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<>
			<div>
				<div className="grid grid-cols-1 lg:grid-cols-2 mb-2">
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
				</div>
			</div>
		</>
	);
}
