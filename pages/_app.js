import Layout from '../components/Layout';
import Head from "next/head"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  return (
    <>
    {/* <Head>
    <title>Mohammed Abdulaziz</title>
    </Head> */}
    <Component {...pageProps} />
    </>
  )
}

export default MyApp;