import classNames from "classnames"
import { NavLink, useParams } from "react-router-dom"

export default function ChatList() {

    const {conversationId} = useParams()

    const chats = [
        {
            id: 1,
            user: {
                avatar: 'https://pbs.twimg.com/profile_images/1532119724515024896/2kcZhkOU_400x400.jpg',
                name: 'Barış Kabal'
            },
            unread: false,
            lastMessage: 'selam'
        },
        {
            id: 2,
            user: {
                avatar: 'https://pbs.twimg.com/profile_images/1561024389298135043/FK-tqOTs_400x400.jpg',
                name: 'JFK'
            },
            unread: false,
            lastMessage: 'ayağını denk al'
        },
        {
            id: 3,
            user: {
                avatar: 'https://pbs.twimg.com/profile_images/1532119724515024896/2kcZhkOU_400x400.jpg',
                name: 'Barış Kabal'
            },
            unread: true,
            lastMessage: 'selam'
        }
    ]

    return(
        <div className="h-[calc(100%-60px)] overflow-auto py-3">
            <header className="flex items-center justify-between px-5 mb-1">
                <h6 className="text-base font-semibold">Messages</h6>
                <button className="text-brand text-sm font-semibold">16 requests</button>
            </header>
            {chats.map(chat => (
                <NavLink key={chat.id} to={`/inbox/${chat.id}`} className={classNames({
                    'h-[72px] flex items-center gap-x-4 hover:bg-zinc-50 px-5' : true,           
                    '!bg-[#efefef]': +conversationId === chat.id
                })}>
                    <img src={chat.user.avatar} className='w-14 h-14 rounded-full' alt=''/>
                    <div className={classNames({
                            "text-sm": true,
                            'font-bold': chat?.unread
                        })}>
                        <h6>
                            {chat.user.name}
                        </h6>
                        <p className={`${!chat?.unread && 'text-[#8e8e8e]'}`}> 
                            {chat.lastMessage}
                        </p>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}