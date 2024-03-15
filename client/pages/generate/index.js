import Image from "next/image";
import fileIcon from "@/public/icons/file-icon.svg";
import aiLogo from "@/public/icons/generate/ailogo.svg"

export default function Generate() {
  return (
    <div className="grid grid-cols-10 text-black kumbh-sans-font">
      <div className="col-span-10 lg:col-span-7">
        <h1 className="text-4xl font-bold text-primary mb-10">
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
              <Image
                src={fileIcon}
                alt="file icon"
                className="mx-auto py-[50%]"
              />
            </div>
            <div className="flex flex-col max-w-[350px] justify-around m-5 space-y-5">
              <button
                type="button"
                className="w-full bg-primary h-14 rounded-2xl text-white font-medium text-xl"
              >
                Generate document with AI
                <Image src={aiLogo} className="inline h-[0.8em]"></Image>
              </button>
              <button
                type="button"
                className="w-full bg-primary h-12 rounded-2xl text-white font-medium text-lg"
              >
                Download Document
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-span-10 lg:col-span-3">
        <div className="border w-full rounded-t-lg border-black lg:mt-0 mt-10">
          <div className="bg-primary rounded-t-lg text-center p-2 text-white font-medium text-lg">
            Ask AI for Help
          </div>
          <div className="bg-gray-200 h-[70vh]"></div>
          <div className="bg-white border-t border-black p-2">
            <input
              type="text"
              className="w-full rounded-lg border border-black cursor-not-allowed"
              readOnly
              value="Coming soon..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
