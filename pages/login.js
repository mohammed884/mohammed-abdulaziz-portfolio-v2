import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";

export default function Login() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errMessage, setErrMessage] = useState("")
    const handleSubmit = async e => {
        e.preventDefault();
        const info = {
            name,
            password,
        };
        const { data } = await axios.post("/api/login", info);
        if (data.success) Router.push("/")
        else setErrMessage(data.message);
    }
    return (
        <section>
            <Head>
                <title>سجل دخول</title>
            </Head>
            <form className="en" onSubmit={handleSubmit}>
                {
                    errMessage &&
                    <span>{errMessage}</span>
                }
                <label htmlFor="name">Name</label>
                <input onChange={({ target: { value } }) => setName(value)} type="text" id="name" />
                <label htmlFor="password">Password</label>
                <input onChange={({ target: { value } }) => setPassword(value)} type="password" id="password" />
                <button type="submit">Login</button>
            </form>
        </section>
    )
}
