import React from 'react'

export default function Loader() {
    return (
        <div className="w-[100%] h-[100%] absolute flex justify-center items-center z-20">
            <div className="w-[100%] h-[100%] bg-black opacity-50 absolute"></div>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
