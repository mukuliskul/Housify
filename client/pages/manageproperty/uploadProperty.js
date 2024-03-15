const { ethers } = require("ethers");

// Contract details

export default function AddProperty() {
	async function registerPropertyOnBlockchain(propertyAddress, titleIpfsHash) {
		try {
			const contractABI = require("@/utils/HouseOwnershipRegistryABI.json");
			const contractAddress = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS;
			console.log(contractAddress);
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();

			const contract = new ethers.Contract(
				contractAddress,
				contractABI,
				signer
			);
			const tx = await contract.registerHouse(propertyAddress, titleIpfsHash);

			await tx.wait(); // Wait for the transaction to be mined

			console.log("Property registered successfully:", tx.hash);
			//return res.status(200).json({ success: true, transactionHash: tx.hash });
		} catch (error) {
			console.error("Error registering property:", error);
			//return res.status(500).json({ error: "Failed to register house" });
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		try {
			let response = await fetch("/api/uploadNewProperty", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json(); // Extract the JSON response
			await registerPropertyOnBlockchain(
				data.propertyAddress,
				data.ipfsHashes.title
			);
			console.log("Success:", data);
		} catch (error) {
			console.error("Error during form submission:", error.message);
		}
	}
	return (
		<>
			<div className="h-[8vh] text-black kumbh-sans-font">
				<h1 className="text-4xl font-bold text-primary mb-10">Add Property</h1>
				<form
					method="post"
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					className="text-black w-full space-y-[20px] flex flex-col justify-around items-start"
				>
					<label>
						Street Address
						<input
							type="text"
							name="street-address"
							id="street-address"
							placeholder="Street Address"
							className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
							required
						/>
					</label>

					<label>
						Postal Code:
						<input
							type="text"
							name="postal-code"
							id="postal-code"
							placeholder="Postal Code"
							pattern="^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$"
							className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
							required
						/>
					</label>

					<label>
						City
						<input
							type="text"
							name="city"
							id="city"
							placeholder="City"
							className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
							required
						/>
					</label>

					<label>
						Province
						<select
							name="province"
							id="province"
							className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
							required
						>
							<option value="">Select a Province</option>
							<option value="AB">Alberta</option>
							<option value="BC">British Columbia</option>
							<option value="MB">Manitoba</option>
							<option value="NB">New Brunswick</option>
							<option value="NL">Newfoundland and Labrador</option>
							<option value="NS">Nova Scotia</option>
							<option value="ON">Ontario</option>
							<option value="PE">Prince Edward Island</option>
							<option value="QC">Quebec</option>
							<option value="SK">Saskatchewan</option>
							<option value="NT">Northwest Territories</option>
							<option value="NU">Nunavut</option>
							<option value="YT">Yukon</option>
						</select>
					</label>

					<label
						className="w-[400px] block mb-2 font-medium text-gray-900"
						htmlFor="identification-proof"
					>
						Identification Proof
						<input
							name="identification-proof"
							type="file"
							className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-primary file:hover:bg-[#062f9e] file:text-white rounded"
							required
						/>
					</label>

					<label
						className="w-[400px] block mb-2 font-medium text-gray-900"
						htmlFor="title-certificate"
					>
						Title Certificate
						<input
							name="title-certificate"
							type="file"
							className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-primary file:hover:bg-[#062f9e] file:text-white rounded"
							required
						/>
					</label>

					<label
						className="w-[400px] block mb-2 font-medium text-gray-900"
						htmlFor="property-tax-receipts"
					>
						Property Tax Receipts
						<input
							name="property-tax-receipts"
							type="file"
							className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-primary file:hover:bg-[#062f9e] file:text-white rounded"
							multiple
						/>
					</label>
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
