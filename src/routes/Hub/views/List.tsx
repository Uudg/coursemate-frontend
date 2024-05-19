import CreatePost from "../components/createPost";
import Types from "../components/Types";
import PostPreview from "../components/PostPreview";
import { useHub } from "../../../hooks/useHub";

const List = () => {
    const { posts, loading, set_type, type, hasFetched } = useHub();

    return(
        <div className="hub grid">
            <div className="col col-sm-12">
                <h1>Mate Hub</h1>
            </div>
            <CreatePost/>
            <Types set_type={set_type} activeType={type}/>
            {loading ? 'Loading...' : 
                posts.length > 0 ? 
                posts.map((post, i) => <PostPreview post={post} key={i}/>) : 
                hasFetched && <h2>No posts found</h2>}
        </div>
    )
}

export default List;