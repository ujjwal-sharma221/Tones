import { steps } from "../constants/text";

const LeftPart = () => {
  return (
    <div className="flex flex-col justify-center items-center p-10 w-1/2">
      <div className="w-[25rem] h-full">
        <span className="underline decoration-red-400 decoration-2 font-bold">
          Tones
        </span>{" "}
        is not about numbers it is about a relentless pursuit of greatness,
        creating compelling stories about how you solve genuine problems.
      </div>
      {steps.map((step) => (
        <div
          key={step.id}
          className="w-[25rem] p-4 rounded-lg h-full bg-[#F1F1F1] mt-4 font-semibold"
        >
          <span className=" text-red-400 pr-2">{step.id}</span>
          {step.text}
        </div>
      ))}
    </div>
  );
};

export default LeftPart;
