import React, { useState } from "react";
import Wallet from "./wallet";


function Home() {
    const [state, setState] = useState(false)
    if(state) {
        return <Wallet/>

    }
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex flex-col items-center">
        <div className="mt-12 flex justify-center w-full">
          <div className="rounded-xl shadow-lg p-8 flex flex-col items-center max-w-xl w-full mx-4">
            <div className="flex items-center mb-4">
              <svg
                className="w-10 h-10 text-cyan-300 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3"
                />
              </svg>
              <h1 className="text-3xl font-bold text-white tracking-wide">
                Create Your HD Wallet
              </h1>
            </div>
            <p className="text-lg text-cyan-100 text-center mt-2">
              Generate a secure hierarchical deterministic wallet with a 12-word
              mnemonic
              <br />
              <span className="text-cyan-200 text-base">
                phrase. Keep your seed phrase safe - it's the only way to
                recover your wallet. phrase
              </span>
            </p>
          </div>
        </div>
        <button onClick={() => setState(true)}
         className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-500
        to-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:from-cyan-400
         hover:via-blue-400 hover:to-indigo-500 hover:scale-105 transition-all duration-200 border
          border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">
          
          Create HD Wallet
        </button>
      </div>
    </>
  );
}
export default Home;
