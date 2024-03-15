import Image from "next/image";
import fileIcon from "@/public/icons/file-icon.svg";
import aiLogo from "@/public/icons/generate/ailogo.svg"

export default function Generate() {
  return (
    <div className="grid lg:grid-cols-2 grid-col-1 text-black kumbh-sans-font"> 
      <div> 
        <h1 className="text-4xl font-bold text-primary mb-2 lg:mb-10">Generate Documents</h1>
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
              <button type="button" className="w-full bg-primary h-14 rounded-2xl text-white font-medium text-xl px-2">
                Generate document with AI<Image src={aiLogo} className="inline h-[0.7em] mb-2"></Image>
              </button>
              <button type="button" className="w-full bg-primary h-12 rounded-2xl text-white font-medium text-xl px-2">
                Download Document
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-primary mb-2 lg:mb-10 lg:mt-0 mt-10">Interpret Documents</h1>
        <div className="border w-full lg:max-w-xl rounded-t-lg border-black">
          <div className="bg-primary rounded-t-lg text-center p-2 text-white font-medium text-lg">Ask AI for Help</div>
          <div className="bg-gray-200 h-[60vh]"></div>
          <div className="flex flex-row bg-white border-t border-black p-2">
          <button type="button" className="w-auto bg-primary h-auto pb-2 px-3 mr-2 rounded-2xl text-white font-medium text-3xl cursor-not-allowed">
                +
              </button>
            <input type="text" className="w-full px-2 rounded-lg border border-black cursor-not-allowed" readOnly value="Coming soon..." />
          </div>
        </div>
      </div>
    </div>
  );
}
