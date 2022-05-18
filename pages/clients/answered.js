import axios from "axios"
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import Router from "next/router";
import ClientList from "../../components/clientList";
import { getAnsweredClients, getRole } from "../../actions/actions";
import { dehydrate, QueryClient, useQueries } from "react-query";
export default function Answered({ clients, token }) {
    const results = useQueries([
        { queryKey: ['answered-clients'], queryFn: getAnsweredClients },
        { queryKey: ['role', token], queryFn: getRole },
    ], {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
    if (!results[1].data) Router.back();
const clients = results[1].data.clients
    return (
        <>
            <Head>
                <title>عملاء تم مراسلتهم</title>
            </Head>
            <section className="section-styling">
                <div className="sm:w-[92%] h-[100%] md:w-[80%] lg:w-[70%] flex flex-col justify-center mx-auto">
                    <div className="w-[90%] flex justify-between items-center mx-auto mt-5">
                        <FontAwesomeIcon onClick={() => Router.back()} icon={faArrowLeft} className="text-yellow_color text-[1.2rem] cursor-pointer" />
                        <h1 className="sm:text-[1.59rem] md:text-[1.8rem] lg:text-[1.9rem] text-blue_color font-bold">عملاء تم مراسلتهم</h1>
                    </div>
                    <div className="w-[90%] min-h-[80%] grid grid-cols-1 mx-auto mt-12">
                        {
                            clients.length > 0
                                ?
                                clients.map(client =>
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
    await queryClient.prefetchQuery("answered-clients", getAnsweredClients)
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            token
        }
    }
}
