import Navbar from '@/components/Navbar';
import { default_UserContext, UserContext } from '@/lib/context';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';


//Principal app da aplicação envelopada pelo userContext para passagem de contexto e acesso das páginas
export default function App({ Component, pageProps }: AppProps) {
  const [state, setState] = useState(default_UserContext)
  return (
      <UserContext.Provider value={{user: "", username: "teste"}}>
        <Navbar/>
        <Component {...pageProps} />
        <Toaster/>
      </UserContext.Provider>  
   );
}
