import Icon from "../../../components/icon";
import { useSelector } from "react-redux";
import ChatList from "./chatlist";

export default function Sidebar() {

    const user = useSelector(state => state.auth.user)

    return(
        <aside className="w-[349px] flex-shrink-0 border-r border-gray-300">
            <header className="h-[60px] border-b border-gray-300 flex items-center justify-between px-5">
                <button className="flex items-center mx-auto gap-x-2.5 text-base text-semibold">
                    {user.username}
                    <Icon name='chevron-down' size={20} className='rotate-180' />
                </button>
                <Icon name='new-message' size={24} />
            </header>
            <ChatList />
        </aside>
    )
}