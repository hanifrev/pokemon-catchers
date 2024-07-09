import Image from "next/image";
import React from "react";

interface CardProps {
  img: string;
  title: string;
  amount: number;
  bgColor?: string;
}

const OverviewCard: React.FC<CardProps> = ({ img, title, amount, bgColor }) => {
  return (
    <div
      className={`w-full md:w-[316px] h-[196px] p-4  bg-opacity-25 rounded-xl justify-start items-start flex  ${bgColor}`}
    >
      <div className="grow shrink basis-0 p-4 flex-col justify-start items-start gap-4 flex">
        <div className="w-12 h-12 p-3 bg-zinc-900 rounded-[48px] justify-center items-center inline-flex">
          <Image
            src={img}
            alt="img"
            width={48}
            height={48}
            className=" relative flex-col justify-start items-start flex"
          />
        </div>
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch justify-start items-center gap-1 inline-flex">
              <div className="text-neutral-700 text-[13px] font-semibold leading-none">
                {title}
              </div>
            </div>
            <div className="self-stretch text-zinc-900 text-5xl font-semibold leading-[48px]">
              {amount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
