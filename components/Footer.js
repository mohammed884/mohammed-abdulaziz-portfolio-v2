import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="w-[100%] h-[10vh] flex flex-col justify-center items-center">
      <p>Developed By Mohammed Abdulaziz 2022 ©</p>
      <div className="mt-3">
        <Link href="https://www.instagram.com/dev.mohammed1/?hl=en">
          <span class="text-xl text-red-500 cursor-pointer">
            <FontAwesomeIcon icon={faInstagram} />
          </span>
        </Link>
        <Link _blank href="https://www.instagram.com/dev.mohammed1/?hl=en">
          <span class="ml-4 text-xl text-blue_color cursor-pointer">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </span>
        </Link>
      </div>
    </footer>
  )
}
