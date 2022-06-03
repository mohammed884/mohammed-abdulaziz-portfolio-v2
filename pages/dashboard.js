import Link from 'next/link'
import React from 'react'
import { adminLinks as links } from "../utilities/constants";
import Header from "../components/Header";
import { getRole } from "../actions/actions"
export default function Dashboard() {
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
    const token = ctx.req.cookies.token || "";
    const isAdmin = await getRole(token);
    if (!isAdmin) return {
        redirect: {
            permanent: false,
            destination: "/",
        },
        props: {},
    }
    return { props: {} }
}
