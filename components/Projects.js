import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { carouselResponsive } from "../utilities/constants"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ReviewList from './ReviewList';
import ProjectList from './ProjectList';
import Link from "next/link"
export default function Works({ reviews, averageRating, isAdmin, projects }) {
    return (
        <section className="w-[100%] sm:min-h-[120vh] bg-[#FEFBF6] md:min-h-[100vh] overflow-hidden">
            <h1 data-aos="fade-down" className="title mb-3">
                مشاريع مختارة
            </h1>
            <div className="sm:w-[92%] md:w-[80%] sm:min-h-[30vh] md:min-h-[50vh] grid grid-cols-2 gap-5 place-items-center mx-auto mt-8">
                {
                    projects?.map((project, i) =>
                        <ProjectList
                            project={project}
                            index={i}
                            key={i} />
                    )
                }
            </div>
            <div className="w-[80%] h-[50vh] mx-auto mt-10 ar">
                <div className="flex items-center relative">
                    <div data-aos="fade-left" className="w-2 sm:h-10 lg:h-12 rounded-md gradient-line"></div>

                    <div className="w-[100%] flex items-center mr-3">
                        <h2 className="flex font-bold text-black_color sm:text-[1.8rem] md:text-[2rem] lg:text-[2.3rem]">الآراء</h2>
                        <div className="flex items-center mr-5">
                            (<FontAwesomeIcon className="w-[16px] text-yellow_color" icon={faStar} />
                            <p className="md:text-[1rem] lg:text-[1.4rem] mr-[.2em]">{averageRating}</p>)
                        </div>
                    </div>

                </div>
                <Carousel className="mx-auto en p-3" autoPlay={true} responsive={carouselResponsive} infinite={true} arrows={true} removeArrowOnDeviceType={["tablet", "mobile"]} keyBoardControl={true}>
                    {
                        reviews?.map((review, i) =>
                            <ReviewList review={review} key={i} isAdmin={isAdmin}/>
                        )
                    }
                </Carousel>
                <ul>
                    <li className="sm:w-[150px] md:w-[170px] h-[50px] flex items-center justify-center rounded-md text-[1rem] border-[3px] border-[#1A4D2E] text-slate-800 hover:border-[#123922] font-bold mt-10 cursor-pointer">
                        <Link href="/review" passHref>اكتب تجربتك معي</Link>
                    </li>
                </ul>
            </div>
        </section >
    )
};
