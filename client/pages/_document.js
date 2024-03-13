import { Html, Head, Main, NextScript } from "next/document";
import Navbar from '@/components/navbar.js'
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="h-[8vh]">
          <Navbar />
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
