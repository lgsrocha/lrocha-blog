import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-context';
import {UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';


//Principal app da aplicação envelopada pelo userContext para passagem de contexto e acesso das páginas
export default function App({ Component, pageProps }: AppProps) {
  //const [state, setState] = useState(default_UserContext)

  const userData = useUserData();

  return (
      <UserContext.Provider value={userData as any}>
        <ThemeProvider>
          <Navbar/>
          <Component {...pageProps} />
          <Toaster/>
        </ThemeProvider>
      </UserContext.Provider>  
   );
}
