import Users from "./Users"
import Posts from "./Posts"

interface Props {
    results: {
        posts: [],
        users: []
    }
}

const Results = ({results}: Props) => {
    return(
        <div className="col col-sm-12 results">
            <div className="grid">
                {
                    results.users && results.users.length > 0 &&
                    <Users users={results.users}/>
                }
                {
                    results.posts && results.posts.length > 0 &&
                    <Posts posts={results.posts}/>
                }
            </div>
        </div>
    )
}

export default Results;