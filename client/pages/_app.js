// pages/_app.js
import "@/styles/globals.css";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      if (!window.ethereum.selectedAddress) {
        router.push('/login');
      }
    } else {
      
      router.push('/login');
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;