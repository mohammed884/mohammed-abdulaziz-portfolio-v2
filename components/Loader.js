import React from 'react'
import loader from "../styles/loader.module.css"
export default function Loader() {
    return (
        <div className="w-[100%] h-[100%] absolute flex justify-center items-center z-20">
            <div className="w-[100%] h-[100%] bg-black opacity-50 absolute"></div>
            <div className={loader.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
