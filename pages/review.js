import React, { useState, useLayoutEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';
import axios from 'axios';
import Link from "next/link"
export default function Review() {
    const [name, setName] = useState("");
    const [cover, setCover] = useState("");
    const [description, setDescription] = useState("");
    const [stars, setStars] = useState(1);
    const [projectLink, setProjectLink] = useState("");
    const [currentStar, setCurrentStar] = useState(1);
    const [confettiWidth, setConfettiWidth] = useState(0);
    const [confettiHeight, setConfettiHeight] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [errMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const nameInputRef = useRef(null);
    useLayoutEffect(() => {
        nameInputRef.current.focus();
        const { clientHeight, clientWidth } = document.body;
        setConfettiHeight(clientHeight)
        setConfettiWidth(clientWidth)
    }, [])
    const handleSubmit = async e => {
        e.preventDefault();
        if (!name || !description || stars < 1) return setErrorMessage("من فضلك املا كل الحقول المطلوبة");
        if (projectLink && projectLink.slice(0, 8) !== "https://") return setErrorMessage("اكتب الرابط بصيغة صحيحة")
        const fd = new FormData();
        fd.append("name", name)
        fd.append("description", description)
        fd.append("stars", stars)
        fd.append("projectLink", projectLink);
        fd.append("cover", cover)

        const { data } = await axios.post("/api/review", fd, { headers: { 'content-type': 'multipart/form-data' } });
        if (data.success) {
            setSuccessMessage(data.message)
            setErrorMessage("")
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
                window.history.back()
            }, 2200)
        } else {
            setErrorMessage(data.message)
            setSuccessMessage("")
        }
    };

    return (
        <section className="section-styling flex items-center justify-center">
            {
                showConfetti
                &&
                <Confetti
                    width={confettiWidth}
                    height={confettiHeight}
                />
            }
            <div className="sm:w-[85%] md:w-[70%] lg:w-[55%] h-[70vh] relative">
                <div className="w-[100%] flex items-center justify-between mx-auto">
                    <div data-aos="fade-right" onClick={() => window.history.back()} style={{ transition: "transform .2s ease" }} className="w-[50px] flex items-center cursor-pointer text-center hover:translate-x-[-.9rem]">
                        <Link href="/">
                            <FontAwesomeIcon className="sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem] text-yellow_color cursor-pointer font-medium" icon={faArrowLeft} />
                        </Link>
                    </div>
                    <h1 data-aos="zoom-out" className="sm:text-[1.9rem] md:text-[2.1rem] lg:text-[2.15rem] text-blue_color font-bold">اكتب تجربتك معي</h1>
                </div>
                <form className="sm:w-[92%] md:w-[90%] mt-8" onSubmit={handleSubmit} encType="multipart/form-data">
                    {
                        errMessage &&
                        <div data-aos="fade-left" className="flex items-center">
                            <div className="w-[.5rem] h-10 bg-red-500 rounded-md ml-2 mt-0"></div>
                            <span className="text-[1.2rem] text-red-500 font-medium">{errMessage}</span>
                        </div>
                    }
                    {
                        successMessage &&
                        <div data-aos="fade-left" className="flex items-center">
                            <div className="w-[.5rem] h-10 bg-blue_color rounded-md ml-2 mt-0"></div>
                            <span className="text-[1.2rem] text-blue_color font-medium">{successMessage}</span>
                        </div>
                    }
                    <div>
                        <label htmlFor="name"></label>

                        <input type="text" ref={nameInputRef} id="name" onChange={({ target: { value } }) => setName(value)} autoComplete="off" placeholder="الاسم الكريم" />
                    </div>
                    <div>
                        <label htmlFor="link"></label>
                        <input
                            type="text"
                            id="link"
                            onFocus={e => e.target.classList.add("en")}
                            onChange={({ target: { value } }) => setProjectLink(value)}
                            autoComplete="off"
                            placeholder="رابط المشروع (اختياري)" />
                    </div>
                    <div>
                        <label htmlFor="description"></label>

                        <textarea id="description" onChange={({ target: { value } }) => setDescription(value)} placeholder="كيف كانت تجربتك؟">

                        </textarea>
                    </div>
                    <div className="mt-3">
                        {
                            [...Array(5)].map((_, i) =>
                                <FontAwesomeIcon
                                    style={{ transition: "color .25s ease-in-out" }}
                                    key={i}
                                    icon={faStar}
                                    onMouseEnter={() => setCurrentStar(i + 1)}
                                    onMouseLeave={() => setCurrentStar(-1)}
                                    onClick={() => setStars(i + 1)}
                                    className={`
                                    sm:text-[1rem]
                                    md:text-[1.1rem] 
                                    mt-2
                                    cursor-pointer 
                                    ${i < currentStar || i < stars ? "text-yellow_color" : "text-slate-400"}`} />

                            )
                        }
                        <span className="sm:text-[.81rem] md:text-[.91rem] mr-2">( {stars} )</span>
                    </div>
                    <div>
                        <label style={{ transition: "border .3s ease" }} className="text-[1.1rem] border-2 border-dashed hover:border-blue_color ml-1 p-2 cursor-pointer" htmlFor="cover">حمل صورة</label>
                        <input type="file" id="cover" className="hidden" onChange={e => setCover(e.target.files[0])} />
                        <span className="text-[1rem] mr-2">{cover ? cover.name : "(اختياري)"}</span>
                    </div>
                    <button type="submit" className="w-[105px] h-[38px] bg-blue_color rounded-md text-white_color text-[1.15rem] mt-8 hover:bg-blue-600">انشر</button>
                </form>
            </div>
        </section>
    )
}
