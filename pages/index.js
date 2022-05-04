import { useRef, useEffect, useState } from "react";
import axios from 'axios'
import Header from '../components/Header.js';
import HomePage from "../components/HomePage.js";
import Works from "../components/Works.js";
import Slider from "../components/Slider";
import WhyMe from "../components/WhyMe.js";
import Dashboard from "../components/Dashboard.js";
export default function Home({ reviews, average_rating }) {
  const mainRef = useRef(null);
  const homeRef = useRef(null);
  const worksRef = useRef(null);
  const servicesRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const callAdminApi = async () => {
    const res = await axios(`/api/admin`);
    setIsAdmin(res.data.success);
    setLoading(false)
  };
  useEffect(() => {
    callAdminApi();
  }, [])
  if (loading) return;
  return (
    <div className="overflow-x-hidden relative scroll-smooth">
      <Slider />
      <Header isAdmin={isAdmin} homeRef={homeRef} worksRef={worksRef} servicesRef={servicesRef} />
      <main ref={mainRef} className="bg-white_color overflow-hidden scroll-smooth">
        <HomePage homeRef={homeRef} />
        <div id="works" ref={worksRef} className="h-[75px]"></div>
        <Works reviews={reviews} average_rating={average_rating} />
        <div id="whyme" ref={servicesRef} className="h-[75px]"></div>
        <WhyMe />
      </main>
    </div>
  )
}
export const getServerSideProps = async (ctx) => {
  const { SERVER_URL } = process.env
  const reviewsRes = await axios(`${SERVER_URL}/review`);
  const reviews = reviewsRes.data;
  const totalReviews = reviewsRes.data.reduce((total, current) => total + current.stars, 0)
  const average_rating = (totalReviews / reviewsRes.data.length).toString().slice(0, 3);

  return {
    props: {
      reviews,
      average_rating
    },
  }
}