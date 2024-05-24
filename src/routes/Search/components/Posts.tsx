import PostPreview from "../../Hub/components/PostPreview"

interface Props {
    posts: []
}

const Posts = ({posts}: Props) => {
    return(
        <div className="col col-sm-12">
            <div className="block">
                <h2>Posts</h2>
                <div className="grid">
                    {
                        posts.map((post, i) => <PostPreview post={post} key={i}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Posts;