import { useEffect, useState } from "react";
import Image from "next/image";
import fileIcon from "@/public/icons/file-icon.svg";
import aiIcon from "@/public/icons/generate/AiIcon.svg";
import askAiIcon from "@/public/icons/generate/AskAiIcon.svg";

const SUMMARIZE_URL = "/api/summarize";

export default function Generate() {
	const [messages, setMessages] = useState([
		{ sender: "system", content: "Please upload the file to be summarized" },
	]);

	const [sessionId, setSessionId] = useState("");

	const [userInput, setUserInput] = useState("");

	//Will be used to show loading message to user later
	const [isLoading, setIsLoading] = useState(false);
	//Calls api and adds the response to messages
	const summarizeText = (text) => {
		const newSessionId = Date.now().toString(); // Generate a unique session ID
		setSessionId(newSessionId); // Set the session ID

		//setIsLoading(true);
		fetch(SUMMARIZE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text,
				sessionId: newSessionId,
				isInitialMessage: true,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				//setIsLoading(false);
				setMessages((prev) => [
					...prev,
					{ sender: "system", content: data.message },
				]);
			})
			.catch((error) => {
				console.error("Error summarizing text:", error);
				//setIsLoading(false);
			});
	};

	//Extracts file content and calls summarize text
	const onLoadFile = function () {
		const typedarray = new Uint8Array(this.result);
		// Assuming pdfjsLib is defined and available
		pdfjsLib.getDocument({ data: typedarray }).promise.then((pdf) => {
			console.log("loaded pdf:", pdf.numPages);
			let promises = [];
			for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
				promises.push(
					pdf
						.getPage(pageNum)
						.then((page) =>
							page
								.getTextContent()
								.then((textContent) =>
									textContent.items.map((item) => item.str).join(" ")
								)
						)
				);
			}
			Promise.all(promises).then((pagesText) => {
				const allText = pagesText.join(" ");
				summarizeText(allText);
			});
		});
	};

	//Validates file type and initiates file processing
	const onChangeFileInput = (event) => {
		const file = event.target.files[0];
		if (file?.type !== "application/pdf") {
			console.error("The file uploaded is not a PDF file.");
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = onLoadFile;
		fileReader.readAsArrayBuffer(file);
	};

	//Adds a user message to messages if its not empty
	const sendMessage = () => {
		if (!userInput.trim()) return;

		setIsLoading(true);
		fetch(SUMMARIZE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: userInput,
				sessionId,
				isInitialMessage: false,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setIsLoading(false);
				setMessages((prev) => [
					...prev,
					{ sender: "system", content: data.message },
				]);
			})
			.catch((error) => {
				console.error("Error sending message:", error);
				setIsLoading(false);
			});

		setMessages((prev) => [...prev, { sender: "user", content: userInput }]);
		setUserInput("");
	};

	//adds an event listener for when the file is uploaded
	useEffect(() => {
		const fileInput = document.getElementById("file-input");
		if (fileInput) {
			fileInput.addEventListener("change", onChangeFileInput);
		}
	}, []);

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleStartDateChange = (e) => {
		const newStartDate = e.target.value;
		setStartDate(newStartDate);

		if (endDate && newStartDate > endDate) {
			setEndDate(newStartDate);
		}
	};

	const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		fetch("/api/uploadTenant", { method: "POST", body: formData });
	}
	
	return (
		<div className="grid lg:grid-cols-2 grid-col-1 text-black kumbh-sans-font">
			<input className="hidden" id="file-input" type="file" />
			<div>
				<h1 className="text-4xl font-bold text-primary mb-2 lg:mb-10">
					Generate Documents
				</h1>
				<form className="flex flex-col flex-start">
					<div>
						<label className="block font-semibold text-3xl">
							Select Document:
						</label>
						<select
							id="doctype"
							name="document-type"
							className="h-[50%] w-full max-w-xs bg-[#D9D9DB] text-center font-medium rounded-lg"
						>
							<option>Lease Term</option>
							<option>Rental Agreement</option>
						</select>
					</div>
					<div className="flex lg:flex-row justify-left mt-5">
						<div className="w-[35%] max-w-[250px] border border-black bg-white rounded-lg max-w-xs">
						<form
					method="post"
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					className="text-black w-full space-y-[20px] p-2 flex flex-col justify-around items-start"
				>
					<label>
						Landlord Full Name
						<input
							type="text"
							name="landlord-name"
							id="landlord-name"
							placeholder="Name"
							class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
							required
						/>
					</label>

					<label>
						Tenant Full Name
						<input
							type="text"
							name="tenant-name"
							id="tenant-name"
							placeholder="Name"
							class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
							required
						/>
					</label>

					<label>
						Lease Start Date
						<input
							type="date"
							name="start-date"
							id="start-date"
							value={startDate}
							onChange={handleStartDateChange}
							class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
							required
						/>
					</label>

					<label>
						Lease End Date
						<input
							type="date"
							name="end-date"
							id="end-date"
							value={endDate}
							onChange={handleEndDateChange}
							min={startDate}
							class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
							required
						/>
					</label>

					{/* <label
						className="w-[400px] block mb-2 font-medium text-gray-900"
						htmlFor="tenant-lease"
					>
						Tenant Lease
						<input
							name="tenant-lease"
							type="file"
							className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-primary file:hover:bg-[#062f9e] file:text-white rounded"
							required
						/>
					</label> */}

					{/* <button
						className="w-[215px] bg-primary h-[51px] rounded-2xl"
						type="submit"
					>
						<p className="py-[5px] text-[20px] font-[500] text-white text-center">
							Submit
						</p>
					</button> */}
				</form>
					</div>
						<div className="flex flex-col max-w-[350px] justify-around m-5 space-y-5">
							<button
								type="button"
								className="w-full bg-primary h-14 rounded-2xl text-white font-medium text-xl px-2 hover:bg-[#5280F2]"
							>
								Generate document with AI
								<Image src={aiIcon} className="inline h-[0.7em] mb-2"></Image>
							</button>
							<button
								type="button"
								className="w-full bg-primary h-12 rounded-2xl text-white font-medium text-xl px-2 hover:bg-[#5280F2]"
							>
								Download Document
							</button>
						</div>
					</div>
				</form>
			</div>
			<div className="flex flex-col">
				<h1 className="text-4xl font-bold text-primary mb-2 lg:mb-10 lg:mt-0 mt-10">
					Interpret Documents
				</h1>
				<div className="border w-full lg:max-w-xl rounded-t-lg border-black">
					<div className="bg-primary rounded-t-lg text-center p-2 text-white font-medium text-lg">
						<Image src={askAiIcon} className="inline" />
						Ask AI for Help
					</div>
					<div className="h-[60vh] overflow-y-auto flex flex-col">
						{messages.map((msg, index) => (
							<div
								key={index}
								className={`message max-w-[80%] 
                   ${
											msg.sender === "user"
												? " text-left self-end"
												: "text-left self-start mr-2 box-border"
										}`}
							>
								<p
									className={`inline-block p-2 rounded-lg w-[100%] ${
										msg.sender === "user"
											? "mt-2 border border-black"
											: "bg-gray-200 mt-2 ml-2 self-start"
									}`}
								>
									{msg.content}
								</p>
							</div>
						))}
					</div>
					<div className="flex flex-row bg-white border-t border-black p-2 mt-[4px]">
						<button
							type="button"
							className="w-auto bg-primary h-auto pb-2 px-3 mr-2 rounded-2xl text-white font-medium text-3xl"
							onClick={() => document.getElementById("file-input").click()}
						>
							+
						</button>
						<input
							type="text"
							className="w-full px-2 rounded-lg border border-black"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && sendMessage()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
