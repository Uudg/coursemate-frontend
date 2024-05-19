import useAuth from "../../auth/useAuth";

const Settings = () => {
    const {signOut} = useAuth()
    return(
        <>
            <button onClick={signOut}>Logout</button>
        </>
    )
}

export default Settings;