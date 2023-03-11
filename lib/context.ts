import { createContext } from "react";

//Tipando os dados do usuário
type UserType = {
    user:string
    username:string 
}

//Tipando props do contexto
// type PropsUserContext ={
//     state: UserType
//     setState: React.Dispatch<React.SetStateAction<UserType>>
// }

//valor Default user Context
export const default_UserContext ={
        user: "",
        username: "teste"
}

//Criando Contexto
export const UserContext = createContext<UserType>(default_UserContext);