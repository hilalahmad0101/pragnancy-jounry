import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import GlobalProvider from '@/context/GlobalContext';
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useState } from 'react';
import  { Toaster } from 'react-hot-toast';
export default function App({ Component, pageProps }) {

  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const showSidebar = () => {
    setSidebar(true);
  };

  const showAndHideDropdown = () => {
    setDropdown(!dropdown);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };

  const { route } = useRouter();

  return (
    <>
      <GlobalProvider>
        {route == '/'
          ? <Component {...pageProps} />
          : <main className="flex">
            <Sidebar
              sidebar={sidebar}
              setSidebar={setSidebar}
              closeSidebar={closeSidebar}
            />
            <div className="w-full">
              <Navbar
                showAndHideDropdown={showAndHideDropdown}
                showSidebar={showSidebar}
                dropdown={dropdown}
              />
              <Component {...pageProps} />
            </div>
          </main>
        }

        <Toaster />
      </GlobalProvider>

    </>
  )
}
