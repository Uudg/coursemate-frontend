import View from "./components/View"
import Edit from "./components/Edit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_user } from "../../api/user";
// import { ProfileProps } from "../../interfaces/Profile";

const User = () => {
    const { id = ''} = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    const get = async () => {
        get_user(id)
            .then(res => {
                setUser(res.data);
                setIsLoading(false); // Set loading to false when the data is fetched
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false); // Also set loading to false if there's an error
            });
    }

    useEffect(() => {
        get();
    }, [id]);

    const [edit, setEdit] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>; // Render some loading text while the API call is in progress
    }

    return (
        <>
            <h1>Account</h1>
            <div className="grid">
                {user &&
                    edit ?
                    <Edit setEdit={setEdit} user={user}/> :
                    <View setEdit={setEdit} user={user}/>
                }
            </div>
        </>
    );
}

export default User;