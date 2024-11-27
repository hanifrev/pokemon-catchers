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

interface userDataProps {
  pokeBall: number;
  greatBall: number;
  masterBall: number;
  coins: number;
  catched: number;
  attempt: number;
  myPokemon: [];
}

const Layout: React.FC<Props> = ({ children }) => {
  // const [loggedInUser, setLoggedInUser] = useState<Overview | null>(null);
  const [userData, setUserData] = useState<userDataProps>();
  const dispatch = useDispatch();
  const targetUsername = Cookies.get("username");
  const isButtonClicked = useSelector((state: any) => state.button);

  const retriveUsername = useSelector((state: any) => state.data.username);
  // console.log(retriveUsername, "targetUsername");

  Cookies.set("usernames", retriveUsername);

  useEffect(() => {
    const username = Cookies.get("usernames");
    const fetchLoggedInUser = async () => {
      // @ts-ignore
      const user = await getLoggedInUserByUsername(
        retriveUsername ? retriveUsername : username
      );
      // console.log("====", user);
      // setLoggedInUser(user);
      dispatch(setData(user));
    };

    fetchLoggedInUser();
  }, [dispatch]);

  // console.log(loggedInUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = Cookies.get("usernames");
        const response = await axios.get("/api/db");
        const data = response.data;

        const user = data.find((item: any) => item.username === username);

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

  dispatch(pokeCount(userData && userData.pokeBall));
  dispatch(greatCount(userData && userData.greatBall));
  dispatch(masterCount(userData && userData.masterBall));
  dispatch(coinsCount(userData && userData.coins));
  dispatch(catchCount(userData && userData.catched));
  dispatch(attemptCount(userData && userData.attempt));
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
