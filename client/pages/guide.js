
export default function Guide() {
    return (
      <div className="h-[8vh] text-black kumbh-sans-font">
            <h1 className="text-4xl font-bold text-primary mb-10">Welcome to Housify</h1>
            <p className="mb-5">
            Welcome to Housify, your innovative platform designed to simplify the management of property-related documents, Housify simplifies the complexity of property management by offering a secure and efficient way to store, create, and manage your property and all related documents in one accessible place. With Housify, enjoy enhanced security, streamlined document management, and easy access to all your important documents at the tip of your fingers. We're excited to have you onboard and encourage you to explore the benefits and features designed to make your property management seamless.
            </p>
            <h2 className="text-3xl text-primary mb-7">Getting Started</h2>
            <h3 className="text-2xl italic text-tertiary mb-2">Creating an account for homeowners/real estate investors</h3>
            <ol className="list-decimal pl-10 mb-10">
                <li>Visit the Housify homepage.</li>
                <li>Click on "Connect with MetaMask".</li>
                <li>MetaMask is the official wallet supported by Housify (<a className="text-primary underline" href="https://metamask.io/" target="_blank">Learn More</a> , <a className="text-primary underline" href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank">Install MetaMask</a>).</li>
            </ol>
            <h2 className="text-3xl text-primary mb-7">Dashboard Overview</h2>
            <p className="mb-5">Your dashboard is the control center, featuring document management, property management, Housify Guide, and Profile management. We provide you snippets of Housify to help you navigate the dashboard easily, ensuring you can make the most of the AI-driven recommendations for efficient document management.</p>
            <ol className="list-decimal text-2xl italic text-tertiary mb-2 pl-10">
               <li>Generate Document (to-do).</li>
                <li>Manage Property (to-do)</li>
                <li>Guide to Housify (to-do)</li>
                <li>Manage Profile (to-do)</li>
            </ol>
        </div>
    );
  }