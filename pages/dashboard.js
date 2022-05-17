import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { adminLinks as links } from "../utilities/links";
import Router from "next/router";
import Header from "../components/Header";
import { getRole } from "../actions/actions"
import { useQuery, QueryClient, dehydrate } from "react-query"
export default function Dashboard({ isAdmin }) {
    return (
        <>
            <Header />
            <section className="section-styling">
                <aside className="w-[100%] h-[100%] flex flex-col items-center justify-around">
                    {
                        links.map(({ title, href }, i) =>
                            <li key={i} className="list-none font-semibold text-black_color">
                                <Link href={href}>{title}</Link>
                            </li>
                        )
                    }
                </aside>
            </section>
        </>
    )
};
export const getServerSideProps = async ctx => {
    const token = ctx.req.cookies.token
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["role", token], async () => await getRole(token));
    // return {
    //     redirect: {
    //       permanent: false,
    //       destination: "/"
    //     }
    //   }
    // }
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
