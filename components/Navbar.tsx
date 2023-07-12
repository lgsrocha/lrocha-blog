//@ts-nocheck
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { ThemeContext } from "./theme-context";
import SignOutButton  from "@/pages/enter";

// Top Navbar
export default function Navbar(){
    const {user, username} = useContext(UserContext)
    const { theme, toggleTheme } = useContext(ThemeContext);


    return (

            <nav className="navbar">
                <ul>
                    <li>
                        <Link href="/" className="logoNav">
                        </Link>                  
                    </li>

                    {/* user logado e tem username */}
                    {username && (
                        <>
                            <li className="push-left">
                                <Link href="/admin">
                                    <div className="btn-editArea">
                                        {/* <button className="btn-edit"></button> */}
                                    </div>
                                </Link>
                            </li>
                            <li className="navPic">
                                <Link href={`/${username}`}>
                                    <img src={user?.photoURL}/>
                                </Link>
                            </li>
                            <li>
                                <button onClick={toggleTheme} className="toogle-theme">
                                </button>
                            </li>
                            <li>
                                <SignOutButton style={{padding:0}}/>
                            </li>
                        </>
                    )}

                    {/* user não logado OU não tem username */}
                    {!username && (
                    <>
                        <li>
                            <button onClick={toggleTheme} className="toogle-theme">
                            </button>
                        </li>
                        <li>
                            <Link href="/enter">
                                <button className="loginArea"></button>
                            </Link>
                        </li>
                    </>
                    )}
                </ul>
            </nav>

    )
}