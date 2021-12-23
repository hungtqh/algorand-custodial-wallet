import "styles/globals.css";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";
import Layout from "components/Layout";
import { wrapper } from "redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axios.get(url).then((res) => res.data),
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
