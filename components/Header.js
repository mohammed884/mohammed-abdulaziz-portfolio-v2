import React, { useState } from 'react'
import Link from 'next/link';
import { headerLinks as links } from "../utilities/constants"
import { useRouter } from 'next/router';
export default function Header({ isAdmin }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [activeLinkIndex, setActiveLinkIndex] = useState(router.pathname === "/" ? links.length - 1 : -1);
    const toggleNavbar = async () => {
        const links = document.querySelectorAll("#links li");
        // links.forEach((link, i) => {
        //     link.setAttribute("data-aos", "fade-left")
        //     // if (link.hasAttribute("data-aos")) return link.removeAttribute("data-aos")
        //     link.setAttribute("data-aos-duration", Math.trunc((++i / 2) * 10))
        // })
        setIsOpen(!isOpen)
    }
    return (
        <header className={`w-[100%] ${isOpen ? isAdmin ? "sm:h-[325px]" : "sm:h-[300px]" : "sm:h-[40px]"} bg-custom_beige overflow-hidden md:h-[70px] sm:flex-col md:flex-row items-center flex fixed z-30`}>
            <div className="w-[95%] sm:flex items-center justify-between md:hidden mt-2 ar">
                <div onClick={toggleNavbar} className="w-[25px] h-[30px] flex flex-col items-center justify-center cursor-pointer relative">
                    <div
                        className={`
                        menu-line menu-line-1 ${isOpen ? "rotate-[45deg] bg-red-500" : "absolute bottom-[22px] rotate-0 bg-[#D29D2B]"}
                    `}>
                    </div>
                    <div className={`menu-line ml-auto w-[70%] menu-line-2 ${isOpen ? "opacity-0" : "opacity-100 bg-[#D29D2B]"}`}></div>
                    <div
                        className={`
                        menu-line menu-line-3 ${isOpen ? "rotate-[-46deg] bg-red-500" : "absolute top-[22px] rotate-0 bg-[#D29D2B]"}
                    `}></div>
                </div>
                <span className="font-bold name">Dev. Mohammed</span>
            </div>
            <nav className="w-[100%]">
                <ul id="links" className={`
            sm:w-[95%] 
            sm:mt-5 
            md:mt-0 
            ${isAdmin ? "md:w-[80%] lg:w-[62%] xl:w-[48%] sm:h-[240px] " : "md:w-[71%] lg:w-[50%] xl:w-[36%] sm:h-[220px]"} 
            sm:flex-col-reverse 
            sm:items-end 
            md:flex-row 
            md:items-center 
            justify-around 
            flex 
            mx-auto
            `}>
                    {
                        links.map(({ title, href, admin }, index) =>
                            <li
                                key={index}
                                onClick={() => {
                                    setActiveLinkIndex(index)
                                    toggleNavbar()
                                }}
                                className={`
                                translate-x-[-12px]
                            sm:text-[1.1rem]
                            md:text-[1.15rem]
                            lg:text-[1.2rem] 
                            cursor-pointer 
                            hover:scale-[.92] 
                            ${admin && !isAdmin ? "hidden" : "block"}`}>
                                <div
                                    style={{ transition: "width .3s ease-in-out" }}
                                    className={`${activeLinkIndex === index ? "w-8" : "w-0"} rounded ml-auto h-1 gradient-line`}></div>
                                <div className="flex">
                                    <Link passRef href={
                                        router.pathname === "/"
                                            ? href
                                            :
                                            href[0] !== "/"
                                                ?
                                                `/${href}`
                                                :
                                                `${href}`}>
                                        {title}
                                    </Link>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}
