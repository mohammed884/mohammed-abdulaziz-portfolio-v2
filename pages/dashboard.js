import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { adminLinks as links } from "../utilities/links";
import Router from "next/router";
import Header from "../components/Header"
export default function Dashboard({ isAdmin }) {
    if (!isAdmin) return Router.push("/")
    return (
        <>
            <Header/>
            <section className="section-styling">
                <aside className="w-[100%] h-[100%] flex flex-col items-center justify-around">
                    {
                        links.map(({ title, href }) =>
                            <li className="list-none font-semibold text-black_color">
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
    const { data } = await axios(`${process.env.API_URL}/admin`, { headers: { token } });
    return {
        props: {
            isAdmin: data.success
        }
    }
}
