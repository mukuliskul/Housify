import { Html, Head, Main, NextScript } from "next/document";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar.js";
export default function Document() {
  const router = useRouter();
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navbar />
        <div className="py-10 md:px-10 px-5">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
