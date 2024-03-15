import { useState } from "react";

export default function Utility(props) {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<>
			<div>
				<div className="grid grid-cols-1 lg:grid-cols-2 mb-2">
					<div>
						<p>
							<strong>File: </strong>
							{props.utility.file_name}
						</p>
						<p>
							<strong>Next due: </strong>
							{props.utility.next_due}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
