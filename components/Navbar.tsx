//@ts-nocheck
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/context";

// Top Navbar
export default function Navbar(){
    const {user, username} = useContext(UserContext)
    
    return (

            <nav className="navbar">
                <ul>
                    <li>
                        <Link href="/">
                            <button className="btn-logo">FEED</button>
                        </Link>                  
                    </li>

                    {/* user logado e tem username */}
                    {username !== "" && (
                        <>
                            <li className="push-left">
                                <Link href="/admin">
                                    <button className="btn-blue">Write Posts</button>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${username}`}>
                                    <img src={user?.photoURL}/>
                                </Link>
                            </li>
                        </>
                    )}

                    {/* user logado e tem username */}
                    {username !== "" && (
                        <li>
                            <Link href="/enter">
                                <button className="btn-blue">Sign Out</button>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

    )
}