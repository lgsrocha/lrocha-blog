import { User } from "firebase/auth";
import { createContext } from "react";

//Tipando os dados do usuário
type UserType = {
    user: User | null
    username:string | null
}

//Tipando props do contexto
// type PropsUserContext ={
//     state: UserType
//     setState: React.Dispatch<React.SetStateAction<UserType>>
// }

//valor Default user Context
export const default_UserContext ={
        user: null,
        username: null
}

//Criando Contexto
export const UserContext = createContext<UserType>(default_UserContext);