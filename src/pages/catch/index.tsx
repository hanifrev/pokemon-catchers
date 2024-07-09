import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingState from "@/components/LoadingState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import {
  useUpdateAttemptMutation,
  useUpdateCatchedMutation,
  useUpdatePokeBallsMutation,
  useUpdateCoinsMutation,
  useAddPokemonMutation,
} from "@/services/api";
import { useGetPokemonByIdQuery } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setButtonClicked } from "@/store/buttonSlice";

const Index = () => {
  const userdata = useSelector((state: RootState) => state.data.data);
  const [caughtPokemon, setCaughtPokemon] = useState(null);
  const [notCaught, setNotCaught] = useState(false);
  const [id, setId] = useState<number>(1);
  const [pokeBallType, setPokeBallType] = useState("");
  const [theCoins, setTheCoins] = useState(0);
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //@ts-ignore
  const { data: theData, isLoading, isError } = useGetPokemonByIdQuery(id);
  const [updateAttemptMutation] = useUpdateAttemptMutation();
  const [updateCatchedMutation] = useUpdateCatchedMutation();
  const [updatePokeBallsMutation] = useUpdatePokeBallsMutation();
  const [updateCoinsMutation] = useUpdateCoinsMutation();
  const [addPokemonMutation] = useAddPokemonMutation();

  const dispatch = useDispatch();
  const isButtonClicked = useSelector((state: any) => state.button);

  const thePokeBall = useSelector((state: any) => state.ball.poke);
  const theGreatBall = useSelector((state: any) => state.ball.great);
  const theMasterBall = useSelector((state: any) => state.ball.master);
  const theCoinst = useSelector((state: any) => state.ball.coins);

  const catchPokemon = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 898) + 1;
      let group = "";

      if (randomNumber <= 399) {
        group = "Group A";
        setTheCoins(75);
      } else if (randomNumber <= 799) {
        group = "Group B";
        setTheCoins(150);
      } else {
        group = "Group C";
        setTheCoins(600);
      }

      let catchProbability = 0;
      switch (pokeBallType) {
        case "Poke Ball":
          catchProbability =
            group === "Group A" ? 50 : group === "Group B" ? 15 : 2.5;
          break;
        case "Great Ball":
          catchProbability =
            group === "Group A" ? 75 : group === "Group B" ? 30 : 15;
          break;
        case "Master Ball":
          catchProbability = 100;
          break;
        default:
          setErrorMessage("Please select a Poke Ball");
          return;
      }

      await updatePokeBallsMutation({ pokeBallType });
      const isCaught = Math.random() < catchProbability / 100;

      if (isCaught) {
        // @ts-ignore
        setId(randomNumber);

        // @ts-ignore
        setCaughtPokemon({
          // @ts-ignore
          id: randomNumber,
          nickname: nickname || `Pokemon ${randomNumber}`,
        });

        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);

        await updateAttemptMutation();
        await updateCoinsMutation({ theCoins });
        await updateCatchedMutation();
        setErrorMessage("");
      } else {
        // setErrorMessage("Pokemon not caught");
        await updateAttemptMutation();

        // setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setNotCaught(true);
          toastFailed();
        }, 1000);
      }
    } catch (error) {
      console.error("Error while catching Pokemon:", error);
      setErrorMessage("Error while catching Pokemon. Please try again.");
    }
    dispatch(setButtonClicked());
  };

  const toastFailed = () =>
    toast(
      "Catch failed, try again or reload the page, it`s not error, don`t worry"
    );

  const toastSuccess = () =>
    toast(nickname + " has been successfully catched!");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const caughtPokemon = {
      uid: uuidv4(),
      id: id,
      // @ts-ignore
      name: theData && theData.species.name,
      nickname: nickname,
      // @ts-ignore
      sprite: theData && theData.sprites.front_default,
      dateCaught: new Date().toISOString(),
    };

    try {
      await addPokemonMutation(caughtPokemon);
      setNickname("");
      toastSuccess();
    } catch (error) {
      console.error("Error while adding caught Pokemon:", error);
    }
  };

  return (
    <div className="p-3 md:p-10 mx-auto">
      <div className="p-5 md:p-[33px] bg-white flex flex-col gap-8">
        <div>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            theme="light"
          />
          <div className="self-stretch text-zinc-900 text-2xl md:text-[32px] font-semibold leading-10">
            Catch a Pokemon
          </div>
          <div className="text-gray-500 text-sm md:text-xl font-semibold leading-loose">
            It’s a wild west out there. Good luck, Pokemon Trainer{" "}
            {userdata?.username}.
          </div>
        </div>
        {loading ? (
          <LoadingState />
        ) : (
          <div
            className={`flex flex-col lg:flex-row gap-[64px] w-auto lg:w-[972px] ${
              caughtPokemon ? "justify-center mx-auto md:mx-0" : ""
            }`}
          >
            {/* choose */}
            <div className="flex mx-auto">
              <div className={`${caughtPokemon ? "w-full" : "w-[360px]"} `}>
                <div>
                  {caughtPokemon ? (
                    <div>
                      <Image
                        // @ts-ignore
                        src={theData && theData.sprites.front_default}
                        width={200}
                        height={200}
                        alt="please wait..."
                        className="mx-auto"
                      />
                      <div className="text-center text-black text-2xl md:text-[40px] font-semibold leading-[48px]">
                        Congratulations!
                      </div>
                      <div className="text-center text-xl font-normal leading-[48px]">
                        You&apos;ve found a {/* @ts-ignore */}
                        <b>{theData && theData.species.name}</b>
                      </div>
                      <form
                        className="flex flex-col pt-4 gap-4"
                        onSubmit={handleSubmit}
                      >
                        <label>Nickname:</label>
                        <input
                          type="text"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          className="h-12 p-3 bg-zinc-100 rounded-xl text-neutral-600 text-[15px] font-semibold mt-3"
                        />

                        <button
                          type="submit"
                          className="text-neutral-50 text-[15px] font-bold leading-normal h-12 px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl mt-4"
                        >
                          Save
                        </button>
                      </form>
                      <button
                        // @ts-ignore
                        onClick={() => setCaughtPokemon(false)}
                        className="text-neutral-50 text-[15px] font-bold leading-normal h-12 px-5 py-3 bg-gray-600 hover:bg-gray-400 rounded-xl mt-4 w-full"
                      >
                        Back
                      </button>
                      <ToastContainer
                        position="bottom-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="text-zinc-900 text-xl font-semibold leading-loose">
                        Choose your Poke Ball
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <button
                          onClick={() => setPokeBallType("Poke Ball")}
                          className={`p-4 rounded-xl border w-full hover:bg-slate-200 md:w-[360px] flex ${
                            pokeBallType === "Poke Ball"
                              ? "selected border-black"
                              : "border-zinc-100 "
                          }`}
                          // @ts-ignore
                          disabled={thePokeBall <= 0}
                        >
                          <div className="flex flex-row gap-3">
                            <Image
                              src="/assets/ball-left.svg"
                              alt="pokeball"
                              width={24}
                              height={24}
                            />
                            <div>
                              <div className="text-gray-500 text-xs font-medium leading-3 text-left">
                                {thePokeBall} left
                              </div>
                              <div className="text-zinc-900 text-[15px] font-semibold leading-normal">
                                Poke Ball
                              </div>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => setPokeBallType("Great Ball")}
                          className={`p-4 rounded-xl border hover:bg-slate-200 w-full md:w-[360px] flex ${
                            pokeBallType === "Great Ball"
                              ? "selected border-black"
                              : "border-zinc-100"
                          }`}
                          // @ts-ignore
                          disabled={theGreatBall <= 0}
                        >
                          <div className="flex flex-row gap-3">
                            <Image
                              src="/assets/ball-center.svg"
                              alt="pokeball"
                              width={24}
                              height={24}
                            />
                            <div>
                              <div className="text-gray-500 text-xs font-medium leading-3 text-left">
                                {theGreatBall} left
                              </div>
                              <div className="text-zinc-900 text-[15px] font-semibold leading-normal">
                                Great Ball
                              </div>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => setPokeBallType("Master Ball")}
                          className={` p-4 rounded-xl border w-full hover:bg-slate-200 md:w-[360px]  flex${
                            pokeBallType === "Master Ball"
                              ? "selected border-black"
                              : "border-zinc-100 "
                          }`}
                          // @ts-ignore
                          disabled={theMasterBall <= 0}
                        >
                          <div className="flex flex-row gap-3">
                            <Image
                              src="/assets/ball-right.svg"
                              alt="pokeball"
                              width={24}
                              height={24}
                            />
                            <div>
                              <div className="text-gray-500 text-xs font-medium leading-3 text-left">
                                {theMasterBall} left
                              </div>
                              <div className="text-zinc-900 text-[15px] font-semibold leading-normal">
                                Master Ball
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                      <div></div>
                      <div>
                        <button
                          className={`w-full md:w-[360px]  h-12 px-5 py-3 bg-blue-500 hover:bg-blue-400  mt-6 rounded-xl ${
                            pokeBallType.length != 0
                              ? "bg-opacity-100"
                              : "bg-opacity-50"
                          }`}
                          onClick={catchPokemon}
                          disabled={!pokeBallType}
                        >
                          <span className="text-neutral-50 text-[15px] font-bold leading-normal">
                            Catch Pokemon
                          </span>
                        </button>
                      </div>
                      {errorMessage && <p>{errorMessage}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* image */}
            <div className={`${caughtPokemon ? "hidden" : "block mx-auto"}`}>
              <Image
                src="/assets/image.png"
                alt="img"
                width={498}
                height={475}
                className="w-full h-auto md:w-[300px] md:h-[275px] lg:w-[498px] lg:h-[475px]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
