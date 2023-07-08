//@ts-nocheck
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { ThemeContext } from "./theme-context";

// Top Navbar
export default function Navbar(){
    const {user, username} = useContext(UserContext)
    const { theme, toggleTheme } = useContext(ThemeContext);


    return (

            <nav className="navbar">
                <ul>
                    <li>
                        <Link href="/">
                            <button className="btn-logo">FEED</button>
                        </Link>                  
                    </li>
                    <li>
                         <button onClick={toggleTheme} className="toogle-theme">
                             Tema {theme === 'light' ? 'Escuro' : 'Claro'}
                         </button>
                    </li>

                    {/* user logado e tem username */}
                    {username && (
                        <>
                            <li className="push-left">
                                <Link href="/admin">
                                    <button className="btn-blue">Meus Posts</button>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${username}`}>
                                    <img src={user?.photoURL}/>
                                </Link>
                            </li>
                        </>
                    )}

                    {/* user não logado OU não tem username */}
                    {!username && (
                        <li>
                            <Link href="/enter">
                                <button className="btn-blue">Logar</button>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

    )
}