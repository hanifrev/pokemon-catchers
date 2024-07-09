import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const OverviewHeader = () => {
  const data = useSelector((state: RootState) => state.data.data);
  return (
    <>
      <div className="text-zinc-800 text-2xl md:text-3xl lg:text-[40px] font-semibold leading-[48px] pb-6 text-center md:text-left">
        Welcome, {data?.username}!
      </div>
      <div className="w-full h-auto p-6 bg-neutral-50 rounded-[20px] flex-col justify-start items-start gap-8 inline-flex">
        <div className="w-full justify-start items-center flex">
          <div className="grow shrink basis-0 h-8 justify-start items-center gap-4 flex">
            <div className="text-zinc-900 text-sm md:text-xl font-semibold leading-loose">
              Start your Adventure Now!
            </div>
          </div>
          <Link href="/catch">
            <button className="px-2 md:px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl justify-end items-center gap-7 flex">
              <div className="text-neutral-50 text-[15px] font-bold leading-normal">
                Catch a Pokemon
              </div>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OverviewHeader;
