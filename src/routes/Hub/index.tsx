import { Outlet } from "react-router";

const Hub = () => {

    return(
        <div className="hub grid">
            <Outlet/>
        </div>
    )
}

export default Hub;