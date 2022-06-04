export default function Home() {
  return (
    <section id="home" className="section-styling relative overflow-hidden">
      <div className="sm:w-[95%] lg:w-[82%] xl:w-[75%] h-[100%] flex sm:flex-col md:flex-row sm:justify-center md:justify-between items-center mx-auto">
        <div className="sm:w-[200px] sm:h-[200px] md:w-[270px] md:h-[270px] lg:w-[305px] lg:h-[305px] xl:w-[385px] xl:h-[385px] grid place-items-center sm:mb-4 md:mb-0 relative">
          <div className="sm:w-[100%] sm:h-[90%] md:w-[100%] md:h-[100%] lg:w-[80%] lg:h-[80%] md:rounded-[50%] sm:blur-[41px] lg:blur-[55px] mb-16" style={{ background: "linear-gradient(129.85deg, #3B82F6 24.63%, #B388EB 65.62%)" }}></div>
          <img src="/mohammed.png" width="260" height="260" alt="mohammed abdulaziz" className=" absolute sm:bottom-16 md:bottom-16 lg:bottom-[7em]" />
        </div>

        <div className="ar">
          <h1 className=" sm:text-[1.7rem] lg:text-[2.1rem] xl:text-[2.3rem] text-blue_color font-bold">
            محمد عبدالعزيز مبرمج و مصمم مواقع
          </h1>
          <p className="sm:w-[99%] md:w-[380px] lg:w-[450px] xl:w-[575px] text-[#040C2D] sm:text-[1.1rem] xl:text-[1.25rem] mt-2">اساعد الاشخاص و  الشركات الناشئة و المتوسطة في البدء العمل على فكرة موقعهم و تحسينها و العمل على جعلها حقيقة بافضل صورة ممكنة</p>
        </div>
      </div>
    </section>
  )
}
