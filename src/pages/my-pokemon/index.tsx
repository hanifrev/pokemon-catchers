import BallWallet from "@/components/BallWallet";
import PokeCard from "@/components/PokeCard";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { useGetDataQuery } from "@/services/api";

const Index = () => {
  const pokeList = useSelector((state: any) => state.ball.pokemon);
  const { data } = useGetDataQuery();

  // console.log(pokeList);

  // console.log(data.myPokemon);
  const theDataPokemon = data?.myPokemon;

  return (
    <div>
      <Image
        src="/assets/myPokeBanner.png"
        alt="banner"
        width={1100}
        height={400}
        className="object-cover w-full"
      />
      <div className="w-[95%] md:w-[90%] lg:w-[1020px] p-6 bg-neutral-50 rounded-[20px] mx-auto transform -translate-y-[73px]">
        <div className="flex flex-col">
          <BallWallet />
          <div className=" flex-col justify-start items-start gap-2 inline-flex lg:transform lg:-translate-y-[98px]">
            <div className=" text-zinc-900 text-2xl lg:text-[32px] font-semibold leading-10">
              My Pokemons
            </div>
            <div className="text-gray-500 text-sm lg:text-xl font-semibold leading-loose">
              Here is the place where your pokemons are dwelling.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center lg:flex-row gap-10 md:gap-6 flex-wrap pt-5 lg:pt-0">
          {theDataPokemon &&
            theDataPokemon.map((item: any, index: any) => (
              <PokeCard
                name={item.name}
                imgSrc={item.sprite}
                nickname={item.nickname}
                date={item.dateCaught}
                key={index}
                uid={item.uid}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
