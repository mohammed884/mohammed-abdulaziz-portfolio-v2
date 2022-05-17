import Layout from '../components/Layout';
import Head from "next/head"
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/globals.css";
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  QueryClient,
  QueryClientProvider,
  Hydrate
} from 'react-query'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  const queryClient = useRef(new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false
      },
    },
  }))
  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp;