import React, { useState } from 'react'
import Image from "next/image";
import Carousel from 'react-multi-carousel';
import Link from "next/link"
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
export default function Works({ reviews, average_rating }) {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);
    const work = [
        {
            title: "العنوان",
            description: "",
            cover: "work-1.jpg",
            active: false,
            private_repo: false,
        },
        {
            title: "العنوان 2",
            description: "",
            cover: "work-1.jpg",
            // github_link:"",
            // vist_link:"",
            active: false,
            private_repo: false,
        },
        {
            title: "العنوان 2",
            description: "",
            cover: "work-1.jpg",
            // github_link:"",
            // vist_link:"",
            active: false,
            private_repo: false,
        },
        {
            title: "العنوان 2",
            description: "",
            cover: "work-1.jpg",
            // github_link:"",
            // vist_link:"",
            active: false,
            private_repo: false,
        },
    ];
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <section className="w-[100%] min-h-[100vh] overflow-hidden">
            <h1 data-aos="fade-down" className="w-fit font-bold text-[2.2rem] text-blue_color mx-auto" style={{ color: "linear-gradient(129.85deg, #3B82F6 24.63%, #B388EB 65.62%)" }}>
                اقوم بعمل مواقع تتكلم عن نفسها
            </h1>
            <div className="w-[80%] min-h-[50vh] grid grid-cols-2 gap-5 place-items-center mx-auto mt-8">
                {
                    work.map(({ title, cover }, i) =>
                        <Link key={i} href={`/work/${title.replace(/" "/g, "-")}`}>
                            <div
                                onMouseEnter={() => setSelectedProjectIndex(i)}
                                onMouseLeave={() => setSelectedProjectIndex(-1)}
                                data-aos="zoom-out"
                                className="cursor-pointer hover:scale-[.86] relative work rounded-sm flex items-center justify-center">
                                <div
                                    style={{ transition: "opacity .3s ease-in-out" }}
                                    className={`
                                    hover:underline
                                    text-black 
                                    flex
                                    text-[2.1rem] 
                                    font-medium 
                                    absolute 
                                    right-0 
                                    top-0 
                                    z-30
                                ${selectedProjectIndex === i ? "opacity-100" : "opacity-0"} `}>
                                    <span className="hover:underline">
                                        {title}
                                    </span>
                                </div>
                                <Image className={`${selectedProjectIndex === i && "scale-[.85]"}`} src={`/images/${cover}`} width="550" height="350" alt={title} style={{ transition: "transform .2s ease-in-out" }} />

                            </div>
                        </Link>

                    )
                }
            </div>
            <div className="w-[80%] h-[50vh] mx-auto mt-5 ar">

                <div className="flex items-center relative">
                    <div data-aos="fade-left" className="w-2 h-12 bg-deep_blue rounded-md"></div>

                    <div className="w-[100%] flex items-center mr-3">
                        <p className="flex font-medium text-[2.3rem]">الآراء</p>
                        <div className="flex items-center mr-5">
                            (<FontAwesomeIcon className="w-[16px] text-yellow_color" icon={faStar} />
                            <p className="text-[1.4rem] mr-[.2]">{average_rating}</p>)
                        </div>
                    </div>

                </div>
                <Carousel className="mx-auto en p-3" autoPlay={true} responsive={responsive} infinite={true} arrows={true} keyBoardControl={true}>
                    {
                        reviews.map(({ name, description, stars, cover }, i) =>
                            <div className="flex flex-col w-[450px] ar" key={i}>
                                <div className="flex items-center">
                                    <Image src={`/images/${cover}`} width="40" height="40" alt={`${name}'s photo`} />
                                    <span className="mr-2 text-[1.39rem] font-medium">{name}</span>
                                </div>
                                <label>
                                    <textarea value={description} className="w-[100%] h-[180px] text-[1rem] bg-white_color outline-none p-2 resize-none leading-[1.55em]	" readOnly>

                                    </textarea>
                                </label>
                                <div className="flex">
                                    {
                                        [...Array(5)].map((_, i) =>
                                            <FontAwesomeIcon key={i} icon={faStar} className={`w-[1.21rem] ${i < stars ? "text-yellow_color" : "text-slate-400"}`} />
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </Carousel>
                <a href="/review">
                    <button className="w-[170px] h-[45px] rounded-md text-[1rem] bg-blue_color text-white_color hover:bg-blue-600 font-bold mt-5">
                        اكتب تجربتك معي
                    </button>
                </a>
            </div>
        </section >
    )
};
