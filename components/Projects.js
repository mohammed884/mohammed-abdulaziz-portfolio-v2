import React, { useState } from 'react'
import Image from "next/image";
import Carousel from 'react-multi-carousel';
import Link from "next/link"
import 'react-multi-carousel/lib/styles.css';
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
export default function Works({ reviews, averageRating, isAdmin, projects }) {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1  // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    const deleteReview = async (target, _id) => {
        if (!isAdmin) return;
        const check = window.confirm('Are you sure you want to DELETE THIS?')
        if (!check) return
        const { data } = await axios.delete("/api/review", { headers: { _id } });
        if (data.success) target.closest(".review").remove()
    }
    return (
        <section className="w-[100%] sm:min-h-[120vh] md:min-h-[100vh] overflow-hidden">
            <h1 data-aos="fade-down" className="title mb-3">
                مشاريع مختارة
            </h1>
            <div className="sm:w-[92%] md:w-[80%] sm:min-h-[30vh] md:min-h-[50vh] grid grid-cols-2 gap-5 place-items-center mx-auto mt-8">
                {
                    projects?.map(({ arTitle,enTitle, slider }, i) =>
                        <Link key={i} href={`/project/${enTitle.replace(/" "/g, "-")}`}>
                            <div
                                onMouseEnter={() => setSelectedProjectIndex(i)}
                                onMouseLeave={() => setSelectedProjectIndex(-1)}
                                data-aos="zoom-out"
                                className="sm:w-[100%] md:w-fit cursor-pointer hover:scale-[.86] relative work rounded-sm flex items-center justify-center">
                                <div
                                    style={{ transition: "opacity .3s ease-in-out" }}
                                    className={`
                                    hover:underline
                                    text-black 
                                    flex
                                    sm:text-[1.5rem]
                                    md:text-[2.1rem] 
                                    font-medium 
                                    absolute 
                                    right-0 
                                    top-0 
                                    z-30
                                    ${selectedProjectIndex === i ? "opacity-100" : "opacity-0"} `}>
                                    <span className="hover:underline text-black_color font-medium">
                                        {arTitle}
                                    </span>
                                </div>
                                <Image className={`${selectedProjectIndex === i && "scale-[.85]"}`} src={`/uploads/${slider[0]}`} quality="80"  width="550" height="350" alt={arTitle} style={{ transition: "transform .2s ease-in-out" }} />
                            </div>
                        </Link>

                    )
                }
            </div>
            <div className="w-[80%] h-[50vh] mx-auto mt-10 ar">
                <div className="flex items-center relative">
                    <div data-aos="fade-left" className="w-2 sm:h-10 lg:h-12 rounded-md" style={{ background: "linear-gradient(129.85deg, #3B82F6 24.63%, #B388EB 65.62%)" }}></div>

                    <div className="w-[100%] flex items-center mr-3">
                        <h2 className="flex font-bold text-black_color sm:text-[1.8rem] md:text-[2rem] lg:text-[2.3rem]">الآراء</h2>
                        <div className="flex items-center mr-5">
                            (<FontAwesomeIcon className="w-[16px] text-yellow_color" icon={faStar} />
                            <p className="md:text-[1rem] lg:text-[1.4rem] mr-[.2em]">{averageRating}</p>)
                        </div>
                    </div>

                </div>
                <Carousel className="mx-auto en p-3" autoPlay={true} responsive={responsive} infinite={true} arrows={true} removeArrowOnDeviceType={["tablet", "mobile"]} keyBoardControl={true}>
                    {
                        reviews.map(({ name, description, stars, cover, date, _id }, i) =>
                            <div className="w-[100%] flex flex-col p-[.4em] relative ar review mr-5" key={i}>
                                <div className="w-1 h-[100%] absolute rounded-md left-0" style={{
                                    background: "linear-gradient(129.85deg, #3B82F6 24.63%, #B388EB 65.62%)"
                                }}>
                                </div>
                                <div className="flex items-center" onClick={({ target }) => deleteReview(target, _id)}>
                                    <Image src={`/uploads/${cover}`} width="37" height="37" alt={`${name}'s photo ${date}`} className="rounded-[50%] object-fit object-center" />
                                    <span className="sm:text-[1.1rem] md:text-[1.25rem] text-black mr-2">{name}</span>
                                </div>
                                <label>
                                    <textarea value={description} className="w-[100%] h-[180px] sm:text-[.9rem] md:text-[1rem] text-[#1a1a1a] text-[#] bg-white_color outline-none p-2 resize-none leading-[1.55em]" readOnly>
                                    </textarea>
                                </label>
                                <time className="sm:text-[.7rem] md:text-[.9rem] font-light ml-auto">{date}</time>
                                <div className="ar">
                                    <div className="flex">
                                        {
                                            [...Array(5)].map((_, i) =>
                                                <FontAwesomeIcon key={i} icon={faStar} className={`sm:w-[1rem] md:w-[1.21rem] ${i < stars ? "text-yellow_color" : "text-slate-400"}`} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Carousel>
                <ul>
                    <li className="sm:w-[150px] md:w-[170px] h-[50px] flex items-center justify-center rounded-md text-[1rem] border-[3px] border-blue_color text-deep_blue hover:border-blue-600 font-bold mt-10 cursor-pointer">
                        <Link href="/review">اكتب تجربتك معي</Link>
                    </li>
                </ul>
            </div>
        </section >
    )
};
