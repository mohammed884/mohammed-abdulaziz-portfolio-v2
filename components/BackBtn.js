import React from 'react';
// import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link"
export default function BackBtn({path}) {
    // const router = useRouter()
    return (
        <div data-aos="fade-right" className="w-[50px] flex items-center cursor-pointer text-center hover:translate-x-[-.9rem]">
            <Link href={path || "/"} passRef>
                <FontAwesomeIcon className="sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem] text-yellow_color cursor-pointer font-medium" icon={faArrowLeft} />
            </Link>
        </div>
    )
}
