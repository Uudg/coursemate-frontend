import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "../App";
import Dashboard from "../routes/Dashboard";
import Chats from "../routes/Chats";
import Hub from "../routes/Hub";
import AI from "../routes/AI";
import Settings from "../routes/Settings";
import Search from "../routes/Search";
import SignInPage from "../auth/SignInPage";
import SignUpPage from "../auth/SignUpPage";
import Users from "../routes/Users";
import List from "../routes/Hub/views/List";
import Post from "../routes/Hub/views/Post";
// import Post from "../routes/Hub/Posts/Post";
// import User from "../routes/Users";
// import Auth from "../routes/Auth";
// import Register from "../routes/Auth/Register";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard/>
                },
                {
                    path: "/chats",
                    element: <Chats/>
                },
                {
                    path: "/hub/",
                    element: <Hub/>,
                    children: [
                        {
                            path: "",
                            element: <List/>
                        },
                        {
                            path: ":id",
                            element: <Post/>
                        }
                    ]
                },
                {
                    path: "/ai",
                    element: <AI/>
                },
                {
                    path: "/settings",
                    element: <Settings/>
                },
                // {
                //     path: "/posts/:id",
                //     element: <Post/>
                // },
                {
                    path: "/users/:id",
                    element: <Users/>
                },
                {
                    path: "/search",
                    element: <Search/>
                },
                {
                    path: "/",
                    element: <Navigate to="/dashboard"/>
                }
            ]
        },
        {
            path: "/sign-in",
            element: <SignInPage/>
        },
        {
            path: "/sign-up",
            element: <SignUpPage/>
        }
    ]
);

export default router;