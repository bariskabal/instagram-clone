import Header from "./components/header";

export default function Chat() {

    const user = {
        name: 'Barış Kabal',
        avatar: 'https://pbs.twimg.com/profile_images/1532119724515024896/2kcZhkOU_400x400.jpg'
    }

    return(
        <div className="flex-1">
            <Header user= {user} />
            Chat
        </div>
    )
}