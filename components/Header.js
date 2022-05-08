import React, { useState } from 'react'
import Link from 'next/link';
export default function Header({ isAdmin }) {
    const links = [
        {
            title: "العملاء المحتملين",
            href: "/potential-clients",
            admin: true
        },
        {
            title: "اضف عمل",
            href: "/project/add",
            admin: true
        },
        {
            title: "تواصل معي",
            href: "/contact-me",
            admin: false
        },
        {
            title: "لماذا انا",
            href: "#whyme",
            admin: false
        },
        {
            title: "الاعمال",
            href: "#projects",
            admin: false

        },
        {
            title: "الصفحة الرئيسية",
            href: "#home",
            admin: false

        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [activeLinkIndex, setActiveLinkIndex] = useState(links.length - 1);
    return (
        <header className={`w-[100%] ${isOpen ? isAdmin ? "sm:h-[325px]" : "sm:h-[300px]" : "sm:h-[40px]"} overflow-hidden md:h-[70px] bg-white_color sm:flex-col md:flex-row items-center flex fixed z-30`}>
            <div className="w-[95%] sm:flex items-center justify-between md:hidden mt-3 ar">
                <div onClick={() => setIsOpen(!isOpen)} className="w-[25px] h-[30px] flex flex-col items-center justify-center cursor-pointer relative">
                    <div
                        className={`
                        menu-line menu-line-1 ${isOpen ? "rotate-[45deg] bg-red-500" : "absolute bottom-[22px] rotate-0"}
                    `}>
                    </div>
                    <div className={`menu-line ml-auto w-[70%] menu-line-2 ${isOpen ? "opacity-0" : "opacity-100"}`}></div>
                    <div
                        className={`
                        menu-line menu-line-3 ${isOpen ? "rotate-[-46deg] bg-red-500" : "absolute top-[22px] rotate-0"}
                    `}></div>
                </div>
                <img src="/images/work-template.png" className="w-[25px] h-[25px]" alt="test"/>
            </div>
            <ul className={`
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
                    links.map(({ title, icon, href, admin }, index) =>
                        <li
                            key={index}
                            onClick={() => {
                                setActiveLinkIndex(index)
                                setIsOpen(!isOpen)
                            }}
                            className={`
                            sm:text-[1.1rem]
                            md:text-[1.15rem]
                            lg:text-[1.2rem] 
                            cursor-pointer 
                            hover:scale-[.92] 
                            ${admin && !isAdmin ? "hidden" : "block"}`}>
                            <div
                                style={{ transition: "width .3s ease-in-out", background: "linear-gradient(129.85deg, #3B82F6 24.63%, #B388EB 90.62%)" }}
                                className={`${activeLinkIndex === index ? "w-8" : "w-0"} rounded ml-auto h-1`}></div>
                            <div className="flex">
                                <Link href={href}>{title}</Link>
                            </div>
                        </li>
                    )
                }
            </ul>
        </header>
    )
}
