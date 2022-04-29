import React, { useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faConciergeBell, faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
export default function Header({ servicesRef, worksRef, homeRef }) {
    const links = [
        {
            title: "الخدمات",
            href: "#services",
            ref: servicesRef,
            icon: faConciergeBell
        },
        {
            title: "الاعمال",
            href: "#works",
            ref: worksRef,
            icon: faGlobe
        },
        {
            title: "الصفحة الرئيسية",
            href: "#home",
            ref: homeRef,
            icon: faHome
        },
    ];
    const [activeLinkIndex, setActiveLinkIndex] = useState(links.length - 1);
    const headerRef = useRef(null);
    // useLayoutEffect(() => {
    //     const handleScroll = () => {
    //         const { current } = headerRef;
    //         if (scrollY === 225) {
    //             current.classList.add("backdrop-filter-blur[4px]")
    //         } else {
    //             current.classList.remove("backdrop-filter-blur[4px]")

    //         }
    //     }
    //     window.addEventListener("scroll", handleScroll);
    // }, [])
    const scrollDown = index => {
        links[index].ref.current?.scrollIntoView({ behavior: 'smooth' });
        setActiveLinkIndex(index)
    }
    return (
        <header ref={headerRef} className="w-[100%] h-[70px] bg-white_color flex items-center fixed z-30">
            <ul className="w-[35%] flex justify-between items-center mx-auto">
                <li className="flex text-[#040C2D] text-[1.2rem] rounded-lg cursor-pointer hover:scale-[.92]">
                    <Link href="/contact-me">تواصل معي</Link>
                    {/* <FontAwesomeIcon className="w-5 ml-3 text-blue_color" icon={faEnvelope} /> */}
                </li>
                {
                    links.map(({ title, icon, href }, index) =>
                        <li
                            key={index}
                            onClick={() => scrollDown(index)}
                            className="
                        text-[1.2rem] 
                        cursor-pointer 
                        hover:scale-[.92] 
                        block">
                            <div style={{ transition: "width .3s ease-in-out" }} className={`${activeLinkIndex === index ? "w-8" : "w-0"} rounded ml-auto h-1 bg-[#0E185F]`}></div>
                            <div className="flex">
                                <Link href={href}>{title}</Link>
                                {/* <FontAwesomeIcon className="w-5 ml-3 text-blue_color" icon={icon} /> */}
                            </div>
                        </li>
                    )
                }
            </ul>
        </header>
    )
}
