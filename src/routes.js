import PrivateRoute from './components/PrivateRoute'
import AuthLayout from './pages/auth'
import MainLayout from './pages/layout'
import ProfileLayout from './pages/profile'
import Home from './pages/home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import ProfilePosts from './pages/profile/posts'
import ProfileTagged from './pages/profile/tagged'
import InboxLayout from './pages/inbox'
import Inbox from './pages/inbox/inbox'
import Chat from './pages/inbox/chat'

const routes = [
    {
        path: '/',
        element: <MainLayout />,
        auth: true,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: ':username',
                element: <ProfileLayout />,
                children:[
                    {
                        index: true,
                        element: <ProfilePosts />
                    },
                    {
                        path: 'tagged',
                        element: <ProfileTagged />
                    }
                ]
            },
            {
                path: 'inbox',
                element: <InboxLayout />,
                children: [
                    {
                        index:true,
                        element: <Inbox />
                    },
                    {
                        path: ':conversationId',
                        element: <Chat />
                    }
                ]
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
            path: 'login',
            element: <Login/>
            },
            {
            path: 'register',
            element: <Register/>
            }
        ]

    }
]

const authCheck = routes => routes.map(route => {
    if(route?.auth){
        route.element = <PrivateRoute>{route.element}</PrivateRoute>
    }
    if(route?.children){ 
        route.children = authCheck(route.children)
    }
    return route
})

export default authCheck(routes)