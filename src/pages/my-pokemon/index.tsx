import BallWallet from "@/components/BallWallet";
import PokeCard from "@/components/PokeCard";
import Image from "next/image";
import React from "react";
// import { useSelector } from "react-redux";
import { useGetDataQuery } from "@/services/api";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import Head from "next/head";

const Index = () => {
  // const pokeList = useSelector((state: any) => state.ball.pokemon);
  const { data, isLoading } = useGetDataQuery();
  const theDataPokemon = data?.myPokemon;

  return (
    <div>
      <Head>
        <title>Pokemon | My Pokemon</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
        {isLoading ? (
          <div className="text-center flex flex-col justify-center text-2xl font-semibold">
            Loading....
            <span className="mx-auto">
              <PulseLoader color="#d3d3d3" size={6} />
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center lg:flex-row gap-10 md:gap-6 flex-wrap pt-5 lg:pt-0">
            {theDataPokemon && theDataPokemon.length > 0 ? (
              theDataPokemon.map((item: any, index: any) => (
                <PokeCard
                  name={item.name}
                  imgSrc={item.sprite}
                  nickname={item.nickname}
                  date={item.dateCaught}
                  key={index}
                  uid={item.uid}
                />
              ))
            ) : (
              <div className="flex flex-col justify-center mx-auto">
                <div className="mx-auto text-2xl font-semibold pb-5">
                  No Pokémon found
                </div>
                <Link href="/catch">
                  <button className="mx-auto px-2 md:px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl justify-end items-center gap-7 flex">
                    <div className="text-neutral-50 text-[15px] font-bold leading-normal">
                      Catch a Pokemon
                    </div>
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
