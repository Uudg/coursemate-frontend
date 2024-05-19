import { Navigate, Outlet } from "react-router";
import Navbar from "./layouts/Navbar";
import useAuth from "./auth/useAuth";

const App = () => {

    const {user} = useAuth();

    if (!user) return <Navigate to="/sign-in"/>

    return(
        <>
            <Navbar/>
            <div className="container view">
                <Outlet/>
            </div>
        </>
    )
}

export default App;