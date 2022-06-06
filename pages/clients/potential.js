import Head from "next/head";
import ClientList from "../../components/clientList";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { getPotentialClients, } from "../../actions/actions"
import BackBtn from "../../components/BackBtn";
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
                <BackBtn path="/dashboard" />

                <div className="w-[90%] min-h-[80%] grid grid-cols-1 mx-auto mt-12">
                    {
                        data.clients?.length > 0
                            ?
                            data.clients.map((client, index) =>
                                <ClientList key={index} client={client} index={index} />
                            )
                            :
                            <h2 className="text-[1.3rem] opacity-90 ml-auto mt-3 ">لا يوجد عملاء محتملين</h2>
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
