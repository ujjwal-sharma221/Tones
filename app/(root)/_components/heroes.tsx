import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative ">
          <Image
            src="/images/Hero-1.png"
            width={400}
            height={400}
            alt="documents"
            className="object-contain"
          ></Image>
        </div>
        <div className="relative hidden md:block">
          <Image
            src="/images/Hero-2.png"
            width={400}
            height={400}
            alt="documents"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Heroes;
