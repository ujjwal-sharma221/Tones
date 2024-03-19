import Image from "next/image";

const RightPart = () => {
  return (
    <div className="w-full relative items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-violet-600 to-sky-900 blur  rounded-lg"></div>
      <Image
        src="/images/right-image.png"
        alt="right-image"
        height={1500}
        width={1000}
        className=" rounded-lg  relative"
      ></Image>
    </div>
  );
};

export default RightPart;
