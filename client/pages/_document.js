import { Html, Head, Main, NextScript } from "next/document";
import Navbar from '@/components/navbar.js'
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navbar className="h-[8vh]" />
        <div className="py-10 md:px-10 px-5">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
