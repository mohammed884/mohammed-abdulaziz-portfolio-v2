import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";
export default function ClientList({ client }) {
    const { name, project_description, date, email, socialLink, _id, deal } = client;
    const { pathname } = useRouter()
    const handleAnswer = async e => {
        const confirm = window.confirm('هل انت متاكد من مراسلتك للعميل؟')
        if (!confirm) return
        const _id = e.target.closest("BUTTON").value;
        await axios.put('/api/clients/potential', { _id }, { withCredentials: true });
        e.target.closest(".client").remove();
    }
    const handleDeal = async e => {
        const confirm = window.confirm('هل قمت بعمل الصفقة؟')
        if (!confirm) return
        const _id = e.target.closest("BUTTON").value;
        await axios.put('/api/clients/answered', { _id }, { withCredentials: true })
    }
    const handleDelete = async e => {
        const confirm = window.confirm('هل انت متاكد انك تريد حذف الرسالة؟')
        if (!confirm) return
        const _id = e.target.closest("BUTTON").value
        await axios.delete('/api/clients/potential', { headers: { _id }, withCredentials: true });
        e.target.closest(".client").remove();
    }
    return (
        <div className="w-[100%] h-[100%] flex flex-col border-b-2  p-[.4em] mx-auto ar client">
            <div>
                <div className="flex items-center">
                    <p className="text-black_color text-[1.45rem] font-semibold">{name}</p>
                    {deal && <span className="text-green-500 text-[.95rem] mr-2">
                        (<FontAwesomeIcon icon={faCheck} className="ml-1" />
                        Deal)
                    </span>}
                </div>
                <time className="text-[.85rem] opacity-80">{date}</time>
            </div>
            <textarea readOnly className="w-[100%] text-[1.12rem] lg:text-[1.1rem] bg-white_color rounded-sm outline-none " value={project_description}>
            </textarea>
            <div className="flex justify-between en">
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
                <div className="sm:w-[18%] md:w-[12%] lg:w-[10%] xl:w-[12%] 2xl:w-[7%] flex justify-between mt-4 ar">
                    <button value={_id} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-red-600" /></button>
                    {
                        pathname === "/clients/potential"
                            ?
                            <button value={_id} onClick={handleAnswer}><FontAwesomeIcon icon={faCheck} className="text-blue-500 hover:text-blue-600" /></button>
                            :
                            !deal
                            &&
                            <button value={_id} onClick={handleDeal}><FontAwesomeIcon icon={faMoneyBill} className="text-green-500 hover:text-green-600" /></button>
                    }
                </div>
            </div>
        </div>
    )
}
