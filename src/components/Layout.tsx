import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setData } from "@/store/dataSlice";
import { getLoggedInUserByUsername } from "@/services/userService";
import axios from "axios";
import {
  pokeCount,
  greatCount,
  masterCount,
  coinsCount,
  attemptCount,
  catchCount,
  pokemonList,
} from "@/store/ballSlice";

interface Props {
  children: React.ReactNode;
}

type Overview = {
  attempt: number;
  catched: number;
  coins: number;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<Overview | null>(null);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const targetUsername = Cookies.get("username");
  const isButtonClicked = useSelector((state: any) => state.button);

  useEffect(() => {
    const username = Cookies.get("username");
    const fetchLoggedInUser = async () => {
      // @ts-ignore
      const user = await getLoggedInUserByUsername(username);
      setLoggedInUser(user);
      dispatch(setData(user));
    };

    fetchLoggedInUser();
  }, [dispatch]);

  // console.log(loggedInUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/db");
        const data = response.data;

        const user = data.find((item: any) => item.username === targetUsername);

        if (user) {
          setUserData(user);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isButtonClicked]);

  // console.log(userData && userData);
  // @ts-ignore
  dispatch(pokeCount(userData && userData.pokeBall));
  // @ts-ignore
  dispatch(greatCount(userData && userData.greatBall));
  // @ts-ignore
  dispatch(masterCount(userData && userData.masterBall));
  // @ts-ignore
  dispatch(coinsCount(userData && userData.coins));
  // @ts-ignore
  dispatch(catchCount(userData && userData.catched));
  // @ts-ignore
  dispatch(attemptCount(userData && userData.attempt));
  // @ts-ignore
  dispatch(pokemonList(userData && userData.myPokemon));

  return (
    <div className="flex md:flex-row">
      {/* Mobile  */}
      <nav className="md:hidden bg-white w-full fixed top-0 z-10 px-4 py-2 ">
        {/* <Navigation /> */}
      </nav>
      {/* Desktop and Tablet */}
      <aside className="hidden md:flex bg-white w-[230px] lg:w-[340px] h-screen p-2 md:p-6 flex-col items-start gap-4 sticky top-0 ">
        <Navigation />
      </aside>
      <main className="w-full bg-[#F4F4F4] ">
        <TopBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
