import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="h-[8vh] text-black kumbh-sans-font">
        <h1 className="text-4xl font-bold text-primary mb-10">Coming Soon !!!</h1>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/f/f8/UnderCon_icon_black.svg" width={400} height={400}/>
        <p className="my-5 text-xl">
          This feature is Under Construction.
        </p>
        <p className="mb-5 text-xl">
          Please stay tuned to updates. Your patience is appreciated.
        </p>
      </div>
  );
}
