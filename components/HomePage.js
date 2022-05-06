import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home({ homeRef }) {
  return (
    <section id="home" ref={homeRef} className="section-styling relative overflow-hidden">
      <div className="sm:w-[95%] lg:w-[82%] xl:w-[75%] h-[100%] flex sm:justify-end md:justify-between items-center mx-auto">
        <div className="md:w-[270px] md:h-[270px] lg:w-[305px] lg:h-[305px] xl:w-[400px] xl:h-[400px] sm:hidden md:grid place-items-center">
          <div className="w-[100%] h-[100%] rounded-[50%] sm:blur-[50px] lg:blur-[55px]" style={{ background: "linear-gradient(129.85deg, #3B82F6 24.63%, #B388EB 65.62%)" }}></div>
          {/* <img src="/images/mohammed.png" alt="home image" className="sm:w-[100px] sm:h-[100px] md:w-[200px] md:h-[200px] aspect-square lg:w-[260px] lg:h-[260px] xl:w-[300px] xl:h-[300px] absolute" /> */}
        </div>

        <div className="ar">
          <h1 className=" sm:text-[1.7rem] lg:text-[2.1rem] xl:text-[2.2rem] text-blue_color font-bold">
            محمد عبدالعزيز مبرمج و مصمم مواقع
          </h1>
          <p className="sm:w-[320px] md:w-[380px] lg:w-[450px] xl:w-[500px] text-[#040C2D] sm:text-[1.1rem] xl:text-[1.3rem] mt-1">اساعد الاشخاص و الشركات في العمل على فكرة موقعهم و تحسينها و وضع خطة كاملة للمشروع   </p>
          {/* <FontAwesomeIcon className="sm:text-[1.3rem] text-blue_color mt-8" icon={faArrowDown} style={{fontSize:"1.3rem"}}/> */}
        </div>
      </div>
    </section>

  )
}
