import { useState } from 'react'
import Image from "next/image";
import axios from "axios";
import Head from "next/head";
export default function Work({ project: { arTitle, slider, description, date, duration, client, link } }) {
  const [path, setPath] = useState("")
  return (
    <section className="section-styling min-h-[100vh]">
      <Head>
        <title>{arTitle}</title>
      </Head>
      <div className="sm:w-[88%] h-[90vh] lg:w-[90%] xl:w-[80%] 2xl:w-[70%] flex flex-col justify-around items-center mx-auto ar">
        <div className="w-[100%] flex sm:flex-col lg:flex-row-reverse">
          <div className="w-[100%] mx-auto mt-8">
            <div className="w-[95%] mx-auto flex flex-row relative justify-center">
              <Image src={`/uploads/${path || slider[0]}`} quality="100" width="600" height="350" className="rounded-sm" alt="Main image" />
              <div className="sm:w-[24%] md:w-[10%] lg:w-[16%] xl:w-[10%] min-h-[100%] flex flex-col justify-between border-r-2 rounded-sm mr-3 p-[.4em]  en">
                {
                  slider.map((img, index) =>
                    <Image
                      key={index}
                      onClick={() => setPath(img)}
                      src={`/uploads/${img}`}
                      width="40"
                      height="40"
                      alt={`slider image ${index}`}
                      className="cursor-pointer rounded-sm hover:opacity-90" />
                  )
                }
              </div>
            </div>
          </div>
          <div className="sm:w-[100%] xl:w-[80%] sm:mt-8 lg:mt-0">
            <h1 data-aos="fade-left" className="sm:text-[1.8rem] md:text-[2.3rem] lg:text-[2.7rem] xl:text-[2.9rem] text-blue_color font-bold ml-auto">{arTitle}</h1>
            <textarea readOnly value={description} className="sm:w-[100%] xl:w-[100%] h-[20vh] lg:text-[1.02rem] xl:text-[1.11rem] leading-8 bg-white_color outline-none resize-none">
            </textarea>
          </div>
        </div>
        <div className="w-[100%] flex justify-between p-[.3rem] border-t-2 border-purple_color">
          <div>
            <p className="sm:text-[.99rem] md:text-lg text-black_color">السنة</p>
            <time className="sm:text-sm md:text-[.95rem] lg:text-[1rem] opacity-90">{date.yearOfCreation}</time>
          </div>
          <div>
            <p className="sm:text-[.99rem] md:text-lg text-black_color">مدة العمل</p>
            <time className="sm:text-sm md:text-[1rem] opacity-90">{duration}</time>
          </div>
          <div>
            <p className="sm:text-[.99rem] md:text-lg text-black_color">العميل</p>
            <time className="sm:text-sm md:text-[1rem] opacity-90">{client}</time>
          </div>
          {
            link &&
            <div>
              <p className="sm:text-[.99rem] md:text-lg text-black_color">رابط المشروع</p>
              <a href={link}>الرابط</a>
            </div>
          }
        </div>
      </div>
    </section>
  )
};
export const getStaticPaths = async () => {
  const { data } = await axios(`${process.env.API_URL}/project`);
  const paths = data.projects.map(project => ({ params: { title: project.enTitle } }))
  return {
    paths,
    fallback: true // false or 'blocking'
  };
}
export const getStaticProps = async (ctx) => {
  const { title } = ctx.params;
  const { data } = await axios(`${process.env.API_URL}/project/single`, { headers: { title } });
  return {
    props: {
      project: data.project
    }
  }
}