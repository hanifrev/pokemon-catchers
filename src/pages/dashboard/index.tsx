import OverviewCard from "@/components/OverviewCard";
import React, { useEffect, useState } from "react";
import { getLoggedInUserByUsername } from "@/services/userService";
import Cookies from "js-cookie";
import OverviewHeader from "@/components/OverviewHeader";
import { useSelector } from "react-redux";

const Index = () => {
  const theCoinst = useSelector((state: any) => state.ball.coins);
  const theAttempt = useSelector((state: any) => state.ball.attempt);
  const theCatch = useSelector((state: any) => state.ball.catch);

  return (
    <div className="p-3 md:p-10 mx-auto">
      <OverviewHeader />

      <div className="bg-white p-6 mt-4 flex flex-col gap-8">
        <div className="justify-start items-center gap-4 flex">
          <div className="w-4 h-8 relative bg-violet-300 rounded" />
          <div className="text-zinc-900 text-base md:text-xl font-semibold leading-loose">
            Overview
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <OverviewCard
            img="/assets/ovCatch.png"
            title="Pokemons Catched"
            amount={theCatch}
            bgColor="bg-[#B5E4CA]"
          />
          <OverviewCard
            img="/assets/ovAttempt.png"
            title="Catch Attempts"
            amount={theAttempt}
            bgColor="bg-[#B1E5FC]"
          />
          <OverviewCard
            img="/assets/ovCoin.png"
            title="Coins"
            amount={theCoinst}
            bgColor="bg-[#CABDFF]"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
