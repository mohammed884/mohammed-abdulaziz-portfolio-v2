import React from 'react'
import Image from 'next/image';
import { deleteReview } from "../actions/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
export default function ReviewList({ review, isAdmin }) {
    const { name, description, stars, cover, date, _id } = review
    return (
        <div className="w-[100%] flex flex-col p-[.4em] relative ar review mr-8">
            <div className="w-1 h-[100%] absolute rounded-md left-0 gradient-line">
            </div>
            <div className="flex items-center" onClick={({ target }) => deleteReview(target, _id,isAdmin)}>
                <Image src={cover.url} width="37" height="37" alt={`${name}'s photo ${date}`} className="rounded-[50%] object-fit object-center" />
                <span className="sm:text-[1.1rem] md:text-[1.35rem] text-black mr-2 font-semibold">{name}</span>
            </div>
            <label>
                <textarea value={description} className="w-[100%] h-[180px] sm:text-[.9rem] md:text-[1rem] text-[#343434] text-[#] bg-none outline-none p-2 resize-none leading-[1.55em]" readOnly>
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
