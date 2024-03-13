import Navbar from "@/components/navbar.js";
import Image from "next/image";
import fileIcon from "@/public/icons/file-icon.svg";
export default function Generate() {
  return (
    <>
      <div className="grid grid-cols-10 w-[100%] gap-y-[40px] h-[100vh] text-black kumbh-sans-font">
        <div className="col-span-10 sm:col-span-8 lg:col-span-7">
          <p className="sm:text-left text-center w-[90%] sm:ml-[30px] sm:w-auto mx-auto my-[30px] text-primary font-[600] text-[35px]">
            Generate Documents
          </p>
          <form>
            {/*Select document*/}
            <div className="flex flex-col sm:text-start text-center items-center sm:items-start">
              <div>
                <span className="font-[600] text-[27px] ml-[30px]">
                  Select Document:
                </span>
                <select
                  name="document-type"
                  id="doctype"
                  className="bg-[#D9D9DB] h-[39px] w-[379px] text-black text-center font-[500] rounded-lg ml-[20px]"
                >
                  <option>Lease Term</option>
                  <option>Rental Agreement</option>
                </select>
              </div>
            </div>

            {/*Document generate/download*/}
            <div className="sm:w-[60%] w-[100%] md:h-[244px] flex flex-col flex-wrap lg:flex-row justify-around items-center sm:ml-[30px] mt-[30px]">
              <div className="w-[198px] border border-black bg-white rounded-lg">
                <Image
                  src={fileIcon}
                  className="mx-auto py-[99px]"
                  alt="file icon"
                />
              </div>
              <div className="w-[412px] lg:w-[50%] h-[198px] lg:h-[100%] inline-flex flex-col justify-around">
                <div className="w-[412px] bg-primary h-[58px] rounded-2xl">
                  <p className="py-[5px] text-[28px] font-[500] text-white text-center">
                    Generate document with AI
                  </p>
                </div>
                <div className="w-[215px] bg-primary h-[51px] rounded-2xl">
                  <p className="py-[5px] text-[20px] font-[500] text-white text-center">
                    Download Document
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="mx-auto sm:mx-0 col-span-10 sm:col-span-2 lg:col-span-3">
          <div className="w-[418px] h-[610px] border rounded-t-[29px] border-black ">
            <div className="w-[100%] h-[10%] bg-primary rounded-t-[29px] text-center">
              <span className="font-[500] text-[17px] text-white my-auto">Ask AI for Help</span>
            </div>
            <div className="h-[80%] bg-gray-200" />
            <div className="h-[10%] bg-white border-t border-black">
              <input type="text" className="h-[100%] w-[100%] rounded-lg border border-black cursor-not-allowed" readOnly value="Coming soon..."></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
