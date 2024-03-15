export default function AddUtility() {

	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		fetch("/api/uploadUtility", { method: "POST", body: formData });
	}

	return (
		<>
			<div className="h-[8vh] text-black kumbh-sans-font">
				<h1 className="text-4xl font-bold text-primary mb-10">Add Utility</h1>
				<form
					method="post"
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					className="text-black w-full space-y-[20px] flex flex-col justify-around items-start"
				>
                    <label
                        className="w-[400px] block mb-2 font-medium text-gray-900"
                        htmlFor="utility-file"
                    >
                        Utility File
                        <input
                            name="utility-file"
                            type="file"
                            className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-primary file:hover:bg-[#062f9e] file:text-white rounded"
                            required
                        />
                    </label>
					{/* <label>
						Tenant Full Name
						<input
							type="text"
							name="tenant-name"
							id="tenant-name"
							placeholder="Name"
							class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
							required
						/>
					</label> */}

					<button
						className="w-[215px] bg-primary h-[51px] rounded-2xl"
						type="submit"
					>
						<p className="py-[5px] text-[20px] font-[500] text-white text-center">
							Submit
						</p>
					</button>
				</form>
			</div>
		</>
	);
}
