interface User {
    email: string;
    fullname: string;
    username: string;
    university: string;
    faculty: string;
    status: string;
}

interface LoggedInUser extends User {
    _id: string;
    id: string;
    profile_img: boolean;
    bg_img: boolean;
    mates: Object[];
}

interface SignUpUser extends User {
    password: string;
}

export type {
    User,
    LoggedInUser,
    SignUpUser
}