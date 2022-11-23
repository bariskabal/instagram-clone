import {FaInstagram} from 'react-icons/fa'

export default function Loader() {
    return(
        <div className="w-full h-full fixed top-0 left-0 flex-col bg-zinc-50 text-pink-600 flex items-center justify-center text-2xl">
            <FaInstagram size={100} />
            <h6>Instagram</h6>
        </div>
    )
}