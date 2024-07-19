import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

const BallWallet = () => {
  const thePokeBall = useSelector((state: any) => state.ball.poke);
  const theGreatBall = useSelector((state: any) => state.ball.great);
  const theMasterBall = useSelector((state: any) => state.ball.master);
  // const theCoinst = useSelector((state: any) => state.ball.coins);

  return (
    <div className="w-full h-auto lg:h-[96px] lg:px-10 py-2 lg:py-6 text-[#6F767E] bg-white text-[15px] font-bold flex flex-row justify-end items-center gap-6">
      <div className="flex flex-row gap-1">
        <Image
          src="/assets/ball-left.svg"
          alt="pokeball"
          width={24}
          height={24}
        />
        <span className="flex items-center">
          {" "}
          {thePokeBall ? thePokeBall : <PulseLoader color="#d3d3d3" size={5} />}
        </span>
      </div>
      <div className="flex flex-row gap-1">
        <Image
          src="/assets/ball-center.svg"
          alt="pokeball"
          width={24}
          height={24}
        />
        <span className="flex items-center">
          {theGreatBall ? (
            theGreatBall
          ) : (
            <PulseLoader color="#d3d3d3" size={5} />
          )}
        </span>
      </div>
      <div className="flex flex-row gap-1">
        <Image
          src="/assets/ball-right.svg"
          alt="pokeball"
          width={24}
          height={24}
        />
        <span className="flex items-center">
          {" "}
          {theMasterBall ? (
            theMasterBall
          ) : (
            <PulseLoader color="#d3d3d3" size={5} />
          )}
        </span>
      </div>
      {/* <div className="flex flex-row gap-1">
        <Image src="/assets/wallet.svg" alt="pokeball" width={24} height={24} />
        <span className="flex items-center">
          {theCoinst ? theCoinst : <PulseLoader color="#d3d3d3" size={5} />}
        </span>
      </div> */}
    </div>
  );
};

export default BallWallet;
