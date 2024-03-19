import React from "react";
import LeftPart from "./left-part";
import RightPart from "./right-part";

const Heading2 = () => {
  return (
    <div className="flex flex-col mt-10 justify-center items-center md:flex-row p-6 pb-10 ">
      <LeftPart></LeftPart>
      <RightPart></RightPart>
    </div>
  );
};

export default Heading2;
