import { useState } from "react"
import Link from "next/link";
import Image from "next/image";

export default function ProjectList({ project, index }) {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);
    const { slider, arTitle, enTitle } = project;
    return (
        <Link href={`/projects/${enTitle}`}>
            <div
                onMouseEnter={() => setSelectedProjectIndex(index)}
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
            lg:text-[2.25rem]
            xl:text-[3rem]
            font-medium 
            absolute 
            right-0 
            sm:top-[-15%] 
            md:top-[-11%] 
            z-30
            ${selectedProjectIndex === index ? "opacity-100" : "opacity-0"} `}>
                    <span className="hover:underline text-black_color font-medium">
                        {arTitle}
                    </span>
                </div>
                <Image className={`${selectedProjectIndex === index && "scale-[.85]"}`} src={`${slider[0].url}`} quality="80" width="550" height="350" alt={arTitle} style={{ transition: "transform .2s ease-in-out" }} />
            </div>
        </Link>
    )
}
