import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { api, pokemonApi } from "@/services/api";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/login");
    }
  }, []);

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     router.reload();
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  const pagesWithoutLayout = ["/login", "/signup"];

  const shouldRenderLayout = !pagesWithoutLayout.includes(router.pathname);

  return (
    <>
      {shouldRenderLayout ? (
        <ApiProvider api={{ ...api, ...pokemonApi }}>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ApiProvider>
      ) : (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      )}
    </>
  );
}
