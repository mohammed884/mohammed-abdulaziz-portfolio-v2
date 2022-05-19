import Head from "next/head";
import ClientList from "../../components/clientList";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { getAnsweredClients, } from "../../actions/actions";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useEffect } from "react";
export default function Answered({ token }) {
    const router = useRouter()
    const { data } = useQuery(["answered-clients", token], getAnsweredClients, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    useEffect(() => { if (!data.success) router.back() }, [])
    return (
        <>
            <Head>
                <title>عملاء تم مراسلتهم</title>
            </Head>
            <section className="section-styling">
                <div className="sm:w-[92%] h-[100%] md:w-[80%] lg:w-[70%] flex flex-col justify-center mx-auto">
                    <div className="w-[90%] flex justify-between items-center mx-auto mt-5">
                        <FontAwesomeIcon onClick={() => router.back()} icon={faArrowLeft} className="text-yellow_color text-[1.2rem] cursor-pointer" />
                        <h1 className="sm:text-[1.59rem] md:text-[1.8rem] lg:text-[1.9rem] text-blue_color font-bold">عملاء تم مراسلتهم</h1>
                    </div>
                    <div className="w-[90%] min-h-[80%] grid grid-cols-1 mx-auto mt-12">
                        {
                            data.clients?.length > 0
                                ?
                                data.clients.map(client =>
                                    <ClientList client={client} />
                                )
                                :
                                <h2 className="text-[1.3rem] opacity-90 ml-auto mt-3 ">لا يوجد عملاء تم مراسلتهم</h2>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.token || "";
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["answered-clients", token], async () => await getAnsweredClients(token))
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            token
        }
    }
}
