import React, { useLayoutEffect, useRef, useState } from 'react'

export default function Slider() {
    const sliderRef = useRef(null);
    const welcomeTextRef = useRef(null);
    const [show, setShow] = useState(true)
    useLayoutEffect(() => {
      setTimeout(() => {
        const { current } = sliderRef;
        current.style.transition = "transform .9s ease-in-out"
        current.style.transform = "translate(1000%)";
        setShow(false)
      }, 1500);
      const texts = ["Hello"];
      let i = 0;
      const randomTextInterval = setInterval(() => {
        const { current } = welcomeTextRef;
        current.textContent = texts[i]
        i++
        if (i > texts.length) {
          clearInterval(randomTextInterval);
          current.textContent = "Ready?";
        }
      }, 290);
    }, []);
    return (
        <div data-aos="fade-right" data-aos-delay="330" ref={sliderRef} className={`w-[100%] h-[100vh] ${show ? "grid" : "hidden"} place-items-center fixed z-[90000] gradient-line`}>
            <h1 ref={welcomeTextRef} className="font-bold sm:text-[2rem] md:text-[3.5rem] lg:text-[5rem] text-white">مرحبا بك</h1>
        </div>
    )
}
