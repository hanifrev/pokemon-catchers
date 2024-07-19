import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { api } from "@/services/api";
import { pokemonApi } from "@/services/pokemonApi";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/login");
    }
  }, []);

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
