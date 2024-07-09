import { Nav } from "@/data/NavData";
import { setButtonClicked } from "@/store/buttonSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from "react-redux";

interface NavigationProps {
  closeNavigation?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ closeNavigation }) => {
  const dispatch = useDispatch();
  const handleItemClick = () => {
    if (closeNavigation) {
      closeNavigation();
    }
    dispatch(setButtonClicked());
  };

  const router = useRouter();

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

  return (
    <div>
      <div>
        <Image
          src="/assets/Logo.png"
          className="hidden md:block"
          width={50}
          height={50}
          alt="logo"
        />
      </div>
      <div className="flex flex-col px-2 md:px-0 gap-2 pt-1 md:pt-12 text-[#6F767E] w-full md:w-[180px] lg:w-[292px]">
        {Nav.map((item, index) => (
          <Link href={item.path} key={index}>
            <span
              className={`flex flex-row items-center p-3 gap-3 rounded-xl  ${
                router.pathname == item.path
                  ? "bg-[#EFEFEF]"
                  : "hover:bg-slate-100"
              }`}
              onClick={handleItemClick}
            >
              <Image
                src={`/assets/${item.icon}`}
                width={24}
                height={24}
                alt="logo"
              />

              {item.title}
            </span>
          </Link>
        ))}
      </div>
      <button
        className="hidden md:flex flex-row items-center p-3 gap-3 text-[#6F767E] hover:bg-slate-100 fixed bottom-0 mb-6 cursor-pointer w-full md:w-[180px] lg:w-[292px]"
        onClick={handleLogout}
      >
        <Image src={`/assets/logout.svg`} width={24} height={24} alt="logo" />
        Logout
      </button>
    </div>
  );
};

export default Navigation;
