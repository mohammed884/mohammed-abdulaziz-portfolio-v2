import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";

export default function ContactMe() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [socialLink, setSocialLink] = useState("");
    const [description, setDescription] = useState("");
    const [errMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const nameInputRef = useRef(null);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!name || !email || !socialLink || !description) return setErrorMessage("املا كل الحقول لمن فضلك")
        setIsLoading(true)
        const info = {
            name,
            email,
            socialLink,
            description,
        };
        const { data } = await axios.post("/api/contact", info);
        if (data.success) {
            setSuccessMessage(data.message);
            setErrorMessage("");
            setIsLoading(false)
            setTimeout(() => Router.back(), 200)
        } else {
            setSuccessMessage("");
            setErrorMessage(data.message);
            setIsLoading(false)

        };
    }
    return (
        <section className="section-styling flex items-center justify-center">
            <Head>
                <title>تواصل معي</title>
            </Head>
            <div className="sm:w-[85%] md:w-[70%] lg:w-[55%] h-[70vh] relative">
                <div className="w-[100%] flex items-center justify-between mx-auto">
                    <div data-aos="fade-right" onClick={() => Router.back()} style={{ transition: "transform .2s ease" }} className="w-[50px] flex items-center cursor-pointer text-center hover:translate-x-[-.9rem]">
                        <Link href="/" passHref>
                            <FontAwesomeIcon className="sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem] text-yellow_color cursor-pointer font-medium" icon={faArrowLeft} />
                        </Link>
                    </div>
                    <h1 data-aos="zoom-out" className="sm:text-[1.9rem] md:text-[2.1rem] lg:text-[2.15rem] text-blue_color font-bold">ارسل لي رسالة</h1>
                </div>
                <form className="sm:w-[92%] md:w-[90%]" onSubmit={handleSubmit} encType="multipart/form-data">
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
                        <label htmlFor="email"></label>
                        <input type="text" id="email" onChange={({ target: { value } }) => setEmail(value)} autoComplete="off" placeholder="البريد الاكتروني" />
                    </div>
                    <div>
                        <label htmlFor="social-link"></label>
                        <input type="text" id="social-link" onChange={({ target: { value } }) => setSocialLink(value)} autoComplete="off" placeholder="رابط موقعك او حساب التواصل الاجتماعي" />
                    </div>
                    <div>
                        <label htmlFor="description"></label>

                        <textarea id="description" onChange={({ target: { value } }) => setDescription(value)} placeholder="نبذة على فكرة مشروعك">

                        </textarea>
                    </div>
                    <button disabled={isLoading} type="submit" className="w-[105px] h-[38px] flex items-center justify-center bg-blue_color rounded-md text-white_color text-[1.15rem] mt-8 hover:bg-blue-600">
                        {
                            isLoading
                                ?
                                <span className="lds-ellipsis"><div></div><div></div><div></div><div></div></span>
                                :
                                "راسلني"
                        }
                    </button>
                </form>
            </div>
        </section>
    )
}
