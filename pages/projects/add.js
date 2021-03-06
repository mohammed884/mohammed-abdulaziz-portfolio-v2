import { useState, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import Head from "next/head"
import { useRouter } from 'next/router';
import { getRole, } from '../../actions/actions';
import Router from 'next/router';
import Loader from '../../components/Loader'
import BackBtn from '../../components/BackBtn'
export default function AddProject() {
    const router = useRouter()
    const [arTitle, setArTitle] = useState("");
    const [enTitle, setEnTitle] = useState("");
    const [slider, setSlider] = useState([]);
    const [description, setDescription] = useState("");
    const [client, setClient] = useState("");
    const [duration, setDuration] = useState("");
    const [yearOfCreation, setYearOfCreation] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [errMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const titleInputRef = useRef(null);
    useLayoutEffect(() => {
        titleInputRef.current.focus();
    }, [])
    const handleSubmit = async e => {
        e.preventDefault();
        if (!arTitle || !enTitle || !description || slider.length < 1) return setErrorMessage("من فضلك املا كل الحقول المطلوبة");
        if (projectLink && projectLink.slice(0, 8) !== "https://") return setErrorMessage("اكتب الرابط بصيغة صحيحة")
        setIsLoading(true)
        const fd = new FormData();
        fd.append("arTitle", arTitle)
        fd.append("enTitle", enTitle)
        fd.append("client", client)
        fd.append("duration", duration)
        fd.append("projectLink", projectLink);
        fd.append("description", description)
        fd.append("yearOfCreation", yearOfCreation)
        slider.forEach(img => fd.append("slider", img))

        const { data } = await axios.post("/api/projects", fd,);
        if (data.success) {
            setSuccessMessage(data.message);
            setErrorMessage("");
            setIsLoading(false)
            setTimeout(() => Router.push(`/projects/${enTitle}`), 400)
        } else {
            setErrorMessage(data.message)
            setSuccessMessage("")
            setIsLoading(false)

        }
    };

    return (
        <section className="section-styling flex items-center justify-center">
            <Head>
                <title>اضافة مشروع</title>
            </Head>
            {
                isLoading &&
                <Loader />
            }
            <div className="sm:w-[85%] md:w-[70%] lg:w-[55%] relative">
                <div className="w-[100%] flex items-center justify-between mx-auto">
                    <BackBtn path="/dashboard" />
                    <h1 data-aos="zoom-out" className="sm:text-[1.9rem] md:text-[2.1rem] lg:text-[2.15rem] text-custom_green font-bold">اضف مشروع</h1>
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
                        <label htmlFor="ar-title"></label>
                        <input
                            type="text"
                            ref={titleInputRef}
                            id="ar-title"
                            onChange={({ target: { value } }) =>
                                setArTitle(value)}
                            autoComplete="off"
                            placeholder="عنوان المشروع (عربي)" />
                    </div>
                    <div>
                        <label htmlFor="en-title"></label>
                        <input
                            type="text"
                            id="en-title"
                            className="en"
                            onChange={({ target: { value } }) => setEnTitle(value)}
                            autoComplete="off"
                            placeholder="عنوان المشروع (انكليزي)" />
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
                        <label htmlFor="client"></label>
                        <input
                            type="text"
                            id="client"
                            onChange={({ target: { value } }) => setClient(value)}
                            autoComplete="off"
                            placeholder="اسم العميل" />
                    </div>
                    <div>
                        <label htmlFor="yearOfCreation"></label>
                        <input
                            type="text"
                            id="yearOfCreation"
                            onChange={({ target: { value } }) => setYearOfCreation(value)}
                            autoComplete="off"
                            placeholder="سنة الانشاء" />
                    </div>
                    <div>
                        <label htmlFor="duration"></label>
                        <input type="text" id="duration" onChange={({ target: { value } }) => setDuration(value)} autoComplete="off" placeholder="مدة العمل" />
                    </div>
                    <div>
                        <label htmlFor="description"></label>
                        <textarea
                            id="description"
                            onChange={({ target: { value } }) => setDescription(value)}
                            placeholder="وصف المشروع"></textarea>
                    </div>
                    <div>
                        <label
                            style={{ transition: "border .3s ease" }}
                            className="text-[1.1rem] border-2 border-dashed hover:border-[#E9DAC1] ml-1 p-2 cursor-pointer"
                            htmlFor="slider">
                            صور المشروع
                        </label>
                        <input
                            type="file"
                            id="slider"
                            className="hidden"
                            onChange={e => setSlider([...e.target.files])}
                            multiple />
                    </div>
                    <button type="submit" className="w-[105px] h-[38px] bg-custom_green rounded-md text-white_color text-[1.15rem] mt-8 hover:bg-deep_green">انشر</button>
                </form>
            </div>
        </section>
    )
}
export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.token || ""
    const isAdmin = await getRole(token)
    if (!isAdmin) return {
        redirect: {
            permanent: false,
            destination: "/",
        },
        props: {},
    }
    return { props: {} }
}