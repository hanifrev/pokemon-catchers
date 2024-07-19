import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { useRemovePokemonMutation } from "@/services/api";
import { confirmAlert } from "react-confirm-alert";

interface Props {
  imgSrc: string;
  name: string;
  nickname: string;
  date: string;
  uid: string;
}

const PokeCard: React.FC<Props> = ({ imgSrc, name, nickname, date, uid }) => {
  const [removePokemon] = useRemovePokemonMutation();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, "dd-MMMM-yyyy hh:mm a");
  }

  const handleReleaseClick = () => {
    // Call the removePokemon mutation with the uid of the Pokemon to be released
    removePokemon({ uid })
      .unwrap()
      .then(() => {
        console.log("Pokemon released successfully!");
      })
      .catch((error) => {
        console.error("Failed to release Pokemon:", error);
      });
  };

  const handleRelease = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-overlay">
            <div className="react-confirm-alert">
              <h1>Are you sure?</h1>
              <p>Do you want to release this?</p>
              <div className="react-confirm-alert-button-group">
                <button onClick={onClose}>Cancel</button>
                <button
                  onClick={() => {
                    onClose();
                    handleReleaseClick();
                  }}
                >
                  Release
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="w-[308px] h-auto">
      <div className=" bg-[#EFEFEF] h-[200px] rounded-[20px]">
        <Image
          src={imgSrc}
          width={200}
          height={200}
          alt="pokemon"
          className="mx-auto"
        />
      </div>
      <div className=" justify-start gap-10 inline-flex pt-4 items-center lg:items-start ">
        <div className="w-[171px] flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-zinc-900 text-2xl font-semibold leading-normal">
            {name}
          </div>
          <div className="self-stretch text-zinc-900 text-[15px] font-semibold leading-normal">
            {nickname}
          </div>
        </div>
        <button
          className="px-3 py-1 lg:px-5 lg:py-3 bg-red-500 hover:bg-red-400 rounded-xl justify-center items-center gap-2 flex"
          onClick={handleRelease}
        >
          <div className="text-neutral-50 text-[15px] font-semibold lg:font-bold leading-normal">
            Release
          </div>
        </button>
      </div>
      <div className="w-full text-gray-500 text-sm font-semibold leading-normal">
        Catched on {formatDate(date)}
      </div>
    </div>
  );
};

export default PokeCard;
