import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const TopBar = ({}) => {
  const [modal, setModal] = useState(false);
  const [nav, setNav] = useState(false);
  const router = useRouter();

  const closeNavigation = () => {
    setNav(false);
  };

  const handleLogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-overlay">
            <div className="react-confirm-alert">
              <h1>Are you sure?</h1>
              <p>Do you want to log out?</p>
              <div className="react-confirm-alert-button-group">
                <button onClick={onClose}>Cancel</button>
                <button
                  onClick={() => {
                    onClose();
                    handleConfirmLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  const handleConfirmLogout = () => {
    fetch("/api/logout")
      .then(() => router.push("/login"))
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  const thePokeBall = useSelector((state: any) => state.ball.poke);
  const theGreatBall = useSelector((state: any) => state.ball.great);
  const theMasterBall = useSelector((state: any) => state.ball.master);
  const theCoinst = useSelector((state: any) => state.ball.coins);

  return (
    <>
      <button
        className="flex md:hidden mt-10 ml-6 absolute"
        onClick={() => setNav(!nav)}
      >
        <FaAlignJustify />
      </button>
      <div className="w-full h-[96px] px-10 py-6 text-[#6F767E] bg-white text-[15px] font-bold flex flex-row justify-end items-center gap-2 md:gap-6">
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
          <Image
            src="/assets/wallet.svg"
            alt="pokeball"
            width={24}
            height={24}
          />
          <span className="flex items-center">{theCoinst}</span>
        </div>
        <div onClick={() => setModal(!modal)}>
          <Image
            src="/assets/ava.png"
            alt="pokeball"
            className="rounded-[50%]"
            width={40}
            height={40}
          />
        </div>
      </div>
      {modal && (
        <div
          className="bg-[#ffff] cursor-pointer w-[280px] hover:bg-slate-100 hover:border hover:border-b h-20 p-4 rounded-2xl backdrop-blur-[32px] flex items-center absolute right-0 transform -translate-x-[50px] -translate-y-[20px]"
          onClick={handleLogout}
        >
          <div className="text-gray-500 cursor-pointer text-[15px] font-semibold leading-normal">
            Logout
          </div>
        </div>
      )}
      {nav && (
        <div className="absolute z-50 bg-white w-full">
          <Navigation closeNavigation={closeNavigation} />
        </div>
      )}
    </>
  );
};

export default TopBar;
