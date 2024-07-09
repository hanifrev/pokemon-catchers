import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const BallWallet = () => {
  const thePokeBall = useSelector((state: any) => state.ball.poke);
  const theGreatBall = useSelector((state: any) => state.ball.great);
  const theMasterBall = useSelector((state: any) => state.ball.master);
  const theCoinst = useSelector((state: any) => state.ball.coins);

  return (
    <div className="w-full h-auto lg:h-[96px] lg:px-10 py-2 lg:py-6 text-[#6F767E] bg-white text-[15px] font-bold flex flex-row justify-end items-center gap-6">
      <div className="flex flex-row gap-1">
        <Image
          src="/assets/ball-left.svg"
          alt="pokeball"
          width={24}
          height={24}
        />
        <span className="flex items-center">{thePokeBall}</span>
      </div>
      <div className="flex flex-row gap-1">
        <Image
          src="/assets/ball-center.svg"
          alt="pokeball"
          width={24}
          height={24}
        />
        <span className="flex items-center">{theGreatBall}</span>
      </div>
      <div className="flex flex-row gap-1">
        <Image
          src="/assets/ball-right.svg"
          alt="pokeball"
          width={24}
          height={24}
        />
        <span className="flex items-center">{theMasterBall}</span>
      </div>
      <div className="flex flex-row gap-1">
        <Image src="/assets/wallet.svg" alt="pokeball" width={24} height={24} />
        <span className="flex items-center">{theCoinst}</span>
      </div>
    </div>
  );
};

export default BallWallet;
