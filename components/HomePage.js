export default function Home({ homeRef }) {
  return (
    <section ref={homeRef} className="section-styling relative overflow-hidden">
      <div className="w-[75%] h-[100%] flex justify-between items-center mx-auto">
        <div data-aos="zoom-in" className="w-[400px] h-[400px] grid place-items-center rounded-[50%]">
          <div className="w-[400px] h-[400px] grid place-items-center rounded-[50%] blur-[55px]" style={{ background: "linear-gradient(129.85deg, #3B82F6 24.63%, #B388EB 65.62%)" }}></div>
          <img src="/images/mohammed.png" width="200" height="200" alt="my image" className="absolute" />
        </div>
        <div className="ar">
          <span className="font-bold text-[2.2rem]">
            محمد عبدالعزيز مبرمج و مصمم مواقع
          </span>
          <p className="max-w-[500px] text-[#040C2D] text-[1.3rem] mt-1">اساعد الاشخاص و الشركات في العمل على فكرة موقعهم و تحسينها و وضع خطة كاملة للمشروع   </p>
        </div>
      </div>
    </section>

  )
}
