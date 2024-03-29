import { useEffect, useState } from 'react'
import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import Header from "../../components/Header";
import Router from "next/router";
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQueries, QueryClient, dehydrate } from 'react-query';
import { getRole, getProjectDetails } from '../../actions/actions';
import 'react-multi-carousel/lib/styles.css';
export default function Work({ token }) {
  const [mainImgUrl, setMainImgUrl] = useState("");
  const router = Router.useRouter();
  const results = useQueries([
    { queryKey: ["project-details", router.query.title], queryFn: getProjectDetails },
    { queryKey: ["role", token], queryFn: getRole },
  ], {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
  useEffect(() => {
    if (!results[0].data.success) return Router.back()
  }, [])
  const { arTitle, enTitle, slider, description, date, duration, client, link, _id } = results[0].data.project
  const isAdmin = results[1].data
  const handleDelete = async () => {
    if (!isAdmin) return;
    const isSure = window.confirm('Are you sure you want to DELETE THE PROJECT?');
    if (!isSure) return;
    const { data } = await axios.delete("/api/projects", { headers: { _id } });
    if (data.success) Router.push("/")
  };
  console.log(mainImgUrl);
  return (
    <section className="section-styling sm:h-[130vh]">
      <Header isAdmin={isAdmin} />
      <Head>
        <title>{arTitle}</title>
      </Head>
      <div className="sm:w-[88%] sm:h-[120vh] md:h-[90vh] lg:w-[90%] xl:w-[80%] 2xl:w-[70%] flex flex-col justify-around items-center mx-auto ar">
        <div className="w-[100%] flex sm:flex-col lg:flex-row-reverse items-center">
          <div className="sm:w-[100%] md:w-[80%] lg:w-[56%] h-[80%] mx-auto mt-8">
            <div className="max-w-[95%] mx-auto flex flex-col relative justify-center">
              <Image src={mainImgUrl === "" ? slider.length > 1 ? slider[1].url : slider[0].url : mainImgUrl} quality="100" width="600" height="350" className="rounded-sm" alt="Main image" />
              <div className="w-[100%] flex flex-row justify-between border-t-2 rounded-sm p-[.4em] mt-2 en">
                {
                  slider.map((img, index) =>
                    <Image
                      key={index}
                      onClick={() => setMainImgUrl(img.url)}
                      src={img.url}
                      width="38"
                      height="40"
                      alt={`slider image ${index}`}
                      className="cursor-pointer rounded-sm hover:opacity-90" />
                  )
                }
              </div>
            </div>
          </div>
          <div className="sm:w-[100%] xl:w-[80%] h-[80%] sm:mt-2 lg:mt-0">
            <div data-aos="fade-down">
              <h1 className="sm:text-[1.89rem] md:text-[2.4rem] lg:text-[2.7rem] xl:text-[2.9rem] text-custom_green font-bold">
                {arTitle}
              </h1>
              <time className="sm:text-[.8rem] lg:text-[.9rem]">{date.published}</time>
            </div>

            <textarea readOnly value={description} className="sm:w-[100%] xl:w-[90%] sm:h-[92%] lg:h-[80%] lg:text-[1.02rem] xl:text-[1.11rem] leading-7 bg-none mt-5 outline-none resize-none">
            </textarea>
          </div>
        </div>
        <div className="w-[100%] p-[.3rem] mt-4">
          <div className="flex items-center">
            <div data-aos="fade-left" className="w-2 sm:h-10 lg:h-10 gradient-line rounded-md"></div>
            <div className="inline-flex items-center">
              <h2 className="text-[1.3rem] mr-2">معلومات اضافية</h2>
              {
                isAdmin &&
                <div className="mr-4 text-[1.1rem]">
                  <FontAwesomeIcon onClick={() => Router.push(`/project/edit/${enTitle}`)} className="text-blue_color cursor-pointer" icon={faEdit} />
                  <FontAwesomeIcon onClick={handleDelete} className="text-red-500 mr-4 cursor-pointer" icon={faTrash} />
                </div>
              }
            </div>
          </div>
          <div className="sm:w-[100%] xl:w-[50%] flex justify-between mt-5">
            <div>
              <p className="sm:text-[.99rem] md:text-lg text-black_color">تاريخ العمل</p>
              <time className="sm:text-sm md:text-[.95rem] lg:text-[1rem] opacity-90">{date.yearOfCreation}</time>
            </div>
            <div>
              <p className="sm:text-[.99rem] md:text-lg text-black_color">مدة العمل</p>
              <time className="sm:text-sm md:text-[.95rem] lg:text-[1rem] opacity-90">{duration}</time>
            </div>
            <div>
              <p className="sm:text-[.99rem] md:text-lg text-black_color">العميل</p>
              <time className="sm:text-sm md:text-[.95rem] lg:text-[1rem] opacity-90">{client}</time>
            </div>
            {
              link &&
              <div>
                <p className="sm:text-[.99rem] md:text-lg text-black_color">رابط المشروع</p>
                <Link href={link} passRef>الرابط</Link>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
};

export const getServerSideProps = async (ctx) => {
  const title = ctx.query.title;
  const token = ctx.req.cookies.token || "";
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["project-details", title], async () => await getProjectDetails(title))
  await queryClient.prefetchQuery(["role", token], async () => await getRole(token))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      token,
    }
  }
}