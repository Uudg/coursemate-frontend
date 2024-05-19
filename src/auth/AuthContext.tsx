import { createContext } from "react";
import { LoggedInUser, SignUpUser } from "../models/User";

export interface AuthContextType {
    user: LoggedInUser | null;
    signIn: (username: string, password: string) => any;
    signOut: () => void;
    signUp: (user: SignUpUser) => any;
    checkUsername: (username: string) => Promise<boolean>;
    changePasword: (currentPasword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;