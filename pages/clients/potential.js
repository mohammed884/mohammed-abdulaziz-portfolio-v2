import Head from "next/head";
import ClientList from "../../components/clientList";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { getPotentialClients, } from "../../actions/actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
export default function PotentialClients({ token }) {
    const router = useRouter()
    const { data } = useQuery(["potential-clients", token], getPotentialClients, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    useEffect(() => { if (!data.success) router.back() }, []);
    return (
        <section className="section-styling flex items-center">
            <Head>
                <title>العملاء المحتملين</title>
            </Head>
            <div className="sm:w-[92%] h-[100%] md:w-[80%] lg:w-[70%] flex flex-col justify-center mx-auto">
                    <div className="w-[90%] flex justify-between items-center mx-auto mt-5">
                        <FontAwesomeIcon onClick={() => router.back()} icon={faArrowLeft} className="text-yellow_color text-[1.2rem] cursor-pointer" />
                        <h1 className="sm:text-[1.59rem] md:text-[1.8rem] lg:text-[1.9rem] text-blue_color font-bold">عملاء تم مراسلتهم</h1>
                    </div>
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
    )
};

export const getServerSideProps = async ctx => {
    const token = ctx.req.cookies.token || "";
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["potential-clients", token], async () => await getPotentialClients(token));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            token
        }
    }
}
