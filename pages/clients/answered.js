import Head from "next/head";
import ClientList from "../../components/clientList";
import { useRouter } from "next/router";
import { getAnsweredClients, } from "../../actions/actions";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useEffect } from "react";
import BackBtn from "../../components/BackBtn";
export default function Answered({ token }) {
    const router = useRouter()
    const { data } = useQuery(["answered-clients", token], async () => await getAnsweredClients(token), {
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
                    <BackBtn />
                    <div className="w-[90%] min-h-[80%] grid grid-cols-1 mx-auto mt-12">
                        {
                            data.clients?.length > 0
                                ?
                                data.clients.map((client, index) =>
                                    <ClientList key={index} client={client} index={index} />
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
