import { useRef } from "react";
import Header from '../components/Header.js';
import HomePage from "../components/HomePage.js";
import Projects from "../components/Projects.js";
import Slider from "../components/Slider";
import WhyMe from "../components/WhyMe.js";
import Head from "next/head";
import { dehydrate, useQueries, QueryClient } from "react-query";
import { getProjects, getReviews, getRole } from "../actions/actions.js";
export default function Home({ token }) {
  const mainRef = useRef(null);
  const homeRef = useRef(null);
  const worksRef = useRef(null);
  const servicesRef = useRef(null);
  const results = useQueries([
    { queryKey: ['reviews'], queryFn: getReviews },
    { queryKey: ['projects'], queryFn: getProjects },
    { queryKey: ['role', token], queryFn: getRole },
  ], {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const reviews = results[0] ? results[0].data : []
  const projects = results[1] ? results[1].data.projects : []
  const success = results[2] ? results[2].data : []
  const isAdmin = success;
  const totalReviews = reviews.reduce((total, current) => total + current.stars, 0)
  const averageRating = totalReviews > 0 ? (totalReviews / reviews.length).toString().slice(0, 3) : 0;
  return (
    <div className="overflow-x-hidden relative scroll-smooth">
      <Head>
        <title>Mohammed Abdulaziz</title>
      </Head>
      <Slider />
      <Header isAdmin={isAdmin} homeRef={homeRef} worksRef={worksRef} servicesRef={servicesRef} />
      <main ref={mainRef} className="bg-white_color overflow-hidden scroll-smooth">
        <HomePage homeRef={homeRef} />
        <div id="projects" ref={worksRef} className="h-[75px]"></div>
        <Projects projects={projects} reviews={reviews} averageRating={averageRating} isAdmin={isAdmin} />
        <div id="whyme" ref={servicesRef} className="h-[75px]"></div>
        <WhyMe />
      </main>
    </div>
  )
}
export const getServerSideProps = async ctx => {
  const token = ctx.req.cookies.token || "";
    console.log("start fetching");
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("reviews", getReviews);
  await queryClient.prefetchQuery("projects", getProjects);
  await queryClient.prefetchQuery(["role", token], async () => await getRole(token));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      token
    },
  }
}
