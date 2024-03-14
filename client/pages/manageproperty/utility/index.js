import AddUtility from "@/components/addUtilityButton";
import Utility from "@/components/utility";

export default function Utilities() {
	let utilities = [
		{
            file_name: "UtilityOne-filename",
            next_due: "01 Jan, 2024"
        },
		{
            file_name: "UtilityTwo-filename",
            next_due: "01 Jan, 2024"
		},
	];
	return (
		<div className="h-[8vh] text-black kumbh-sans-font">
			<h1 className="text-4xl font-bold text-primary mb-10">Utilities</h1>
			<div className="divide-y border-y-[2px] mb-5">
				{utilities.map((u) => (
					<div className="py-5">
						<Utility utility={u} />
					</div>
				))}
			</div>
			<AddUtility />
		</div>
	);
}
