export interface Post {
    _id: string,
    user_id: string,
    title: string,
    fullname: string,
    university: string,
    username: string,
    content: string,
    tags: string[],
    likes: string[],
    dislikes: string[],
    replies: number,
    liked: boolean,
    disliked: boolean,
    created_at: string,
}