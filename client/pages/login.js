import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import detectEthereumProvider from "@metamask/detect-provider";

import Image from "next/image";
import housifyLogo from "@/public/icons/housify-logo.png";

export default function Login() {
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    getProvider();
  }, []);

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    if (!(await detectEthereumProvider({ silent: true }))) {
      window.alert("Metamask not detected");
    } else {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      updateWallet(accounts);
      if (accounts.length > 0) {
        router.push("/");
      } else {
        window.alert("Log in failed");
      }
    }
  };

  return (
    <div>
      <div className="text-black">
        <div className="grid grid-cols-2 items-center lg:flex-row w-screen h-[95vh] bg-white text-black">
          <div className="flex flex-col justify-center items-center col-span-2 sm:col-span-1">
            <div className="logo h-[400px] w-[400px] rounded-xl mx-auto flex justify-center items-center">
              <Image
                src={housifyLogo}
                height={300}
                width={300}
                className="mx-auto"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mx-[10%] mt-[5%] sm:mt-[0%] col-span-2 sm:col-span-1">
            <h1 className="text-[2.2em] text-[#1D4ED8] text-center font-[900] mb-10">
              WELCOME !
            </h1>
            <p className="text-[#1D4ED8] text-[1.1em] text-center mb-10">
              Log in to your property powerhouse. Your one-stop hub for hassle
              free leases and secure property document management. Let's get
              started!
            </p>
            <div className="flex justify-center w-[100%] mb-10">
              <button
                className="bg-blue-700 w-[80%] sm:w-[70%] lg:w-[55%] h-[40px] text-[100%] rounded-md text-white mx-auto"
                onClick={async () => {
                  await handleConnect();
                }}
              >
                <img
                  className="h-[100%] inline"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                  alt="metamask logo"
                />
                Log in with MetaMask
              </button>
            </div>
            <p className="text-[1em] text-center">
              Don't have a MetaMask account?{" "}
              <a
                className="font-medium text-blue-500 hover:underline"
                href="https://metamask.io/download/"
              >
                Click here to get started.
              </a>
              <br />
              <br />
              Why choose MetaMask?{" "}
              <a
                className="font-medium text-blue-500 hover:underline"
                href="https://metamask.io/"
              >
                Click here to learn more.
              </a>
              <br />
              <br />
              New to Housify?{" "}
              <a
                className="font-medium text-blue-500 hover:underline"
                href="signup"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
