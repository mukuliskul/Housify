import cross from "@/public/icons/manageproperty/updateProperty/cross.png";
import Image from "next/image";
export default function UpdateFailed(props) {
  return (
    <>
      <div className="kumbh-sans-font h-[70vh] flex flex-col justify-center items-center">
        <Image
          src={cross}
          height={400}
          width={400}
          className="h-[200px] w-[200px] mb-[40px]"
        ></Image>
        <span className="text-[2em] sm:text-[3em] font-[500] text-center">
          {props.message}
        </span>
      </div>
    </>
  );
}
