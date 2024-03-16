import Image from "next/image";
import check from "@/public/icons/manageproperty/updateProperty/check.png";
export default function UpdateSuccessful(props) {
  return (
    <>
      <div className="kumbh-sans-font h-[70vh] flex flex-col justify-center items-center">
        <Image
          src={check}
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
