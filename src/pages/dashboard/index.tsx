import OverviewCard from "@/components/OverviewCard";
import React from "react";
import OverviewHeader from "@/components/OverviewHeader";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import Head from "next/head";

const Index = () => {
  // const theCoinst = useSelector((state: any) => state.ball.coins);
  const theAttempt = useSelector((state: any) => state.ball.attempt);
  const theCatch = useSelector((state: any) => state.ball.catch);

  return (
    <div className="p-3 md:p-10 mx-auto">
      <Head>
        <title>Pokemon | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
            amount={
              theCatch ? theCatch : <PulseLoader color="#d3d3d3" size={6} />
            }
            bgColor="bg-[#B5E4CA]"
          />
          <OverviewCard
            img="/assets/ovAttempt.png"
            title="Catch Attempts"
            amount={
              theAttempt ? theAttempt : <PulseLoader color="#d3d3d3" size={6} />
            }
            bgColor="bg-[#B1E5FC]"
          />
          <OverviewCard
            img="/assets/ovCoin.png"
            title="Coins"
            // amount={
            //   theCoinst ? theCoinst : <PulseLoader color="#d3d3d3" size={6} />
            // }
            amount={<span className="text-2xl">coming soon</span>}
            bgColor="bg-[#CABDFF]"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
