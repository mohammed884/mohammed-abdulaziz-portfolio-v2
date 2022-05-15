import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
export default function ClientList({ client }) {
    const { name, project_description, date, email, socialLink, _id } = client;
    const handleAnswer = async e => {
        const confirm = window.confirm('هل انت متاكد من مراسلتك للعميل؟')
        if (!confirm) return
        const _id = e.target.closest("BUTTON").value;
        await axios.put('/api/clients/potential', { _id }, { withCredentials: true })
    }
    const handleDelete = async e => {
        const confirm = window.confirm('هل انت متاكد انك تريد حذف رسالة العميل؟')
        if (!confirm) return
        const _id = e.target.closest("BUTTON").value
        await axios.delete('/api/clients/potential', { headers: { _id }, withCredentials: true });
        e.target.closest(".client").remove();

    }
    return (
        <div key={_id} className="w-[100%] h-[100%] flex flex-col border-b-2  p-[.4em] mx-auto ar client">
            <div>
                <p className="text-black_color text-[1.45rem] font-semibold">{name}</p>
                <time className="text-[.85rem] opacity-80">{date}</time>
            </div>
            {/* <p className="text-[1.2rem] mt-4">الوصف</p> */}
            <textarea readOnly className="w-[100%] text-[1.12rem] lg:text-[1.1rem] bg-white_color rounded-sm outline-none " value={project_description}>
            </textarea>
            <div className="flex justify-between en">
                {/* <p className="text-[1.1rem] font-semibold text-deep_blue mt-2 ">معلومات العميل</p> */}
                <div>
                    <p className="sm:text-[.95rem] lg:text-[1.05rem] font-[550]">{email}</p>
                    {
                        socialLink.slice(0, 8) === "https://"
                            ?
                            <a href={socialLink} className="underline text-blue_color hover:text-blue-600 cursor-pointer">الرابط</a>
                            :
                            <span className="text-blue_color hover:text-blue-600 cursor-pointer">{socialLink}</span>
                    }
                </div>
                <div className="sm:w-[18%] md:w-[12%] lg:w-[10%] xl:w-[12%] 2xl:w-[7%] flex justify-between mt-4 en">
                    <button value={_id} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-red-600" /></button>
                    <button value={_id} onClick={handleAnswer}><FontAwesomeIcon icon={faCheck} className="text-blue-500 hover:text-blue-600" /></button>
                </div>
            </div>
        </div>
    )
}
