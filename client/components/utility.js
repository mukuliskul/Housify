import { useState } from "react";

export default function Utility(props) {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<>
			<div>
				<div className="mb-2 flex flex-row rows-1 justify-between items-center">
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
					<button className="flex justify-center items-center flex-col h-[40px] w-[120px] bg-[#D0D0D0] border rounded-2xl hover:bg-[#EFEFEF]">
						View
				</button>
				</div>
			</div>
		</>
	);
}
