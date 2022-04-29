import React, { useLayoutEffect, useRef } from 'react'

export default function Slider() {
    const sliderRef = useRef(null);
    const welcomeTextRef = useRef(null);
  
    useLayoutEffect(() => {
      setTimeout(() => {
        const { current } = sliderRef;
        current.style.transition = "transform .9s ease-in-out"
        current.style.transform = "translate(1000%)"
      }, 1500);
      const texts = ["Hello"];
      let i = 0;
      const randomTextInterval = setInterval(() => {
        const { current } = welcomeTextRef;
        current.textContent = texts[i]
        i++
        if (i > texts.length) {
          clearInterval(randomTextInterval);
          current.textContent = "Ready?"
        }
      }, 290);
    }, []);
    return (
        <div data-aos="fade-right" data-aos-delay="330" ref={sliderRef} className="w-[100%] h-[100vh] grid place-items-center fixed z-[90000]" style={{ background: "linear-gradient(102.92deg, #B388EB 28.41%, #FFC623 103.31%)" }}>
            <h1 ref={welcomeTextRef} className="font-bold text-[5rem] text-[#F9FAFE]">مرحبا بك</h1>
        </div>
    )
}
