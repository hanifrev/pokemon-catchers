import React from "react";
import Lottie from "lottie-react";
import Loading from "../../public/assets/Loading.json";

const LoadingState = () => {
  return (
    <div>
      <div className="w-[200px] md:w-[350px] mx-auto pb-[38px]">
        <Lottie animationData={Loading} loop={true} />
      </div>
      <div className="text-black text-2xl md:text-[40px] text-center font-semibold leading-[48px]">
        Looking for a pokemon
      </div>
    </div>
  );
};

export default LoadingState;
