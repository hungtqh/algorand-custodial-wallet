import "styles/globals.css";
import { AppProps } from "next/app";
import { NextPage } from "next";
import { SWRConfig } from "swr";
import axios from "axios";
import { wrapper } from "redux/store";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axios.get(url).then((res) => res.data),
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
