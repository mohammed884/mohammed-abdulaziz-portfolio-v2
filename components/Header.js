import React, { useState } from 'react'
import Link from 'next/link';
import { faHome, faConciergeBell, faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
export default function Header({ isAdmin }) {
    const links = [
        {
            title: "لماذا انا",
            href: "#whyme",
            icon: faConciergeBell
        },
        {
            title: "الاعمال",
            href: "#works",
            icon: faGlobe
        },
        {
            title: "الصفحة الرئيسية",
            href: "#home",
            icon: faHome
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [activeLinkIndex, setActiveLinkIndex] = useState(links.length - 1);
    return (
        <header className={`w-[100%] ${isOpen ? "sm:h-[300px]" : "sm:h-[40px]"} overflow-hidden md:h-[70px] bg-white_color sm:flex-col md:flex-row items-center flex fixed z-30`}>
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
                <img src="/images/work-template.png" className="w-[25px] h-[25px]" alt="" />

            </div>
            <ul className="sm:w-[95%] sm:h-[220px] sm:mt-5 md:mt-0 md:w-[71%] lg:w-[50%] xl:w-[36%] sm:flex-col-reverse sm:items-end md:flex-row md:items-center justify-around flex mx-auto">
                {
                    isAdmin &&
                    <li className="flex text-[#040C2D] sm:text-[1.1rem] md:text-[1.18rem] lg:text-[1.2rem] rounded-lg cursor-pointer hover:scale-[.92]">
                        <Link href="/admin/">اضف عمل</Link>
                        {/* <FontAwesomeIcon className="w-5 ml-3 text-blue_color" icon={faEnvelope} /> */}
                    </li>
                }
                <li className="flex text-[#040C2D] sm:text-[1.1rem] md:text-[1.18rem] lg:text-[1.2rem] rounded-lg cursor-pointer hover:scale-[.92]">
                    <Link href="/contact-me">تواصل معي</Link>
                    {/* <FontAwesomeIcon className="w-5 ml-3 text-blue_color" icon={faEnvelope} /> */}
                </li>
                {
                    links.map(({ title, icon, href }, index) =>
                        <li
                            key={index}
                            onClick={() => {
                                setActiveLinkIndex(index)
                                setIsOpen(!isOpen)
                            }}
                            className="
                            sm:text-[1.1rem]
                            md:text-[1.15rem]
                        lg:text-[1.2rem] 
                        cursor-pointer 
                        hover:scale-[.92] 
                        block">
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
