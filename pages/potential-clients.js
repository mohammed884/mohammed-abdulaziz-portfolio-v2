import axios from "axios"
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
export default function PotentialClients({ data }) {
    return (
        <section className="section-styling flex items-center">
            <Head>
                <title>العملاء المحتملين</title>
            </Head>
            <div className="sm:w-[92%] md:w-[80%] lg:w-[70%] mx-auto ">
                <div className="w-[90%] mt-8 flex justify-between items-center mx-auto">
                    <FontAwesomeIcon onClick={() => window.history.back()} icon={faArrowLeft} className="text-yellow_color text-[1.2rem] cursor-pointer" />
                    <h1 className="sm:text-[1.59rem] md:text-[1.8rem] lg:text-[1.9rem] text-blue_color font-bold">العملاء المحتملين</h1>
                </div>
                <div className="w-[90%] min-h-[80%] grid grid-cols-1 mx-auto">
                    {
                        data.potentialClients.map(({ name, project_description, date, email, socialLink, _id }) =>
                            <div key={_id} className="w-[100%] h-[100%] flex flex-col border-b-2  p-[.4em] mx-auto ar">
                                <div>
                                    <p className="text-black_color text-[1.45rem] font-semibold">{name}</p>
                                    <time className="text-[.85rem] opacity-80">{date}</time>
                                </div>
                                {/* <p className="text-[1.2rem] mt-4">الوصف</p> */}
                                <textarea readOnly className="w-[100%] text-[1.12rem] lg:text-[1.1rem] bg-white_color rounded-sm outline-none " value={project_description}>
                                </textarea>
                                <div className="flex justify-between en">
                                    {/* <p className="text-[1.1rem] font-semibold text-deep_blue mt-2 ">معلومات العميل</p> */}
                                    <div>
                                        <p className="sm:text-[.95rem] lg:text-[1.05rem] font-[550]">{email}</p>
                                        {
                                            socialLink.slice(0, 8) === "https://"
                                                ?
                                                <a href={socialLink} className="underline text-blue_color hover:text-blue-600 cursor-pointer">الرابط</a>
                                                :
                                                <span className="text-blue_color hover:text-blue-600 cursor-pointer">{socialLink}</span>
                                        }
                                    </div>
                                    <div className="sm:w-[18%] md:w-[12%] lg:w-[10%] xl:w-[12%] 2xl:w-[7%] flex justify-between mt-4 en">
                                        <button><FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-red-600" /></button>
                                        <button><FontAwesomeIcon icon={faCheck} className="text-blue-500 hover:text-blue-600" /></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
};

export const getServerSideProps = async (ctx) => {
    const { data } = await axios(`${process.env.API_URL}/potential-clients`, { headers: { token: ctx.req.cookies.token } });
    return {
        props: {
            data
        }
    }
}
