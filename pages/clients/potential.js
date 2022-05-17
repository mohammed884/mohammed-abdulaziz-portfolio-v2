import axios from "axios"
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import Router from "next/router";
import ClientList from "../../components/clientList";
import { useQueries, QueryClient, dehydrate } from "react-query";
import { getPotentialClients, getRole, } from "../../actions/actions"
export default function PotentialClients({ clients }) {
    const data = useQueries([
        { queryKey: ['potential-clients', 1], queryFn: getPotentialClients },
        { queryKey: ['role', 2], queryFn: getRole },
    ], {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
    console.log(data);
    return (
        <section className="section-styling flex items-center">
            <Head>
                <title>العملاء المحتملين</title>
            </Head>
            <div className="sm:w-[92%] md:w-[80%] lg:w-[70%] mx-auto ">
                <div className="w-[90%] mt-8 flex justify-between items-center mx-auto">
                    <FontAwesomeIcon onClick={() => Router.back()} icon={faArrowLeft} className="text-yellow_color text-[1.2rem] cursor-pointer" />
                    <h1 className="sm:text-[1.59rem] md:text-[1.8rem] lg:text-[1.9rem] text-blue_color font-bold">العملاء المحتملين</h1>
                </div>
                <div className="w-[90%] min-h-[80%] grid grid-cols-1 mx-auto">
                    {
                        clients.length > 0
                            ?
                            clients.map(client =>
                                <ClientList client={client} />
                            )
                            :
                            <h2 className="text-[1.3rem] opacity-90 ml-auto mt-3 ">لا توجد رسائل</h2>
                    }
                </div>
            </div>
        </section>
    )
};

export const getServerSideProps = async ctx => {
    const token = ctx.req.cookies.token
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("potential-clients", getPotentialClients);
    await queryClient.prefetchQuery("role", token, getRole);
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
