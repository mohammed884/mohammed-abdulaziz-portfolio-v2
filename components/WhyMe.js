import Img from "next/image";
import Link from "next/link";
import { whyMeFutures } from "../utilities/constants";
export default function WhyMe() {
  return (
    <section className="section-styling sm:h-[210vh] md:h-[108vh] lg:h-[124vh] xl:h-[101vh] ar">
      <div data-aos="fade-down" className="flex flex-col items-center mb-5">
        <h1 className="title">لماذا موقعك سيكون رائع</h1>
      </div>
      <div className="w-[70%] sm:h-[88vh] md:h-[80vh] flex flex-col items-center justify-between mt-8 mx-auto">
        {
          whyMeFutures.map(({ title, why, svg }, i) =>
            <div data-aos={`${i % 2 === 0 ? "fade-left" : "fade-right"}`} className={`flex items-center sm:flex-col sm:mt-8 md:mt-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`} key={i}>
              <Img width="210" height="210" src={`/svgs/${svg}`} alt={title} />
              <div className={`${i % 2 === 0 ? "md:ml-2" : " md:mr-2"} sm:mt-3 md:mt-0`}>
                <h2 className="sm:text-[1.5rem] text-black_color font-bold">{title}</h2>
                <p className="max-w-[500px] text-black_color sm:text-[1.1rem] md:text-[1.11rem] mt-2 leading-[1.61em]">{why}</p>
              </div>
            </div>
          )
        }
        <div className="flex flex-col items-center sm:mt-8 md:mt-0">
          <h3 className="text-[2.5rem] text-custom_green font-bold mb-5">مهتم؟</h3>
          <ul>
            <li className="text-[1.35rem] text-deep_blue list-none hover:underline">
              <Link href="/contact-me">راسلني من هنا</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
