import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair, PublicKey } from "@solana/web3.js";
import { HDKey } from "@scure/bip32";
import * as ed25519 from "@noble/ed25519";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

window.Buffer = Buffer;

export default function Wallet() {
  const [count, setCount] = useState(0);
  const [keys, setKeys] = useState([
 
]
);

  const [mnemonic, setMnemonic] = useState("");
  const [hd, setHd] = useState("");
  const [seed, setSeed] = useState("");
  const [status, setstatus] = useState(true);

  useEffect(() => {

    setMnemonic(generateMnemonic()); // word generate

    const temp_seed =  mnemonicToSeedSync(mnemonic);   // word convert... into seeed
    setSeed(temp_seed); 

    // Create HDKey root
    const root = HDKey.fromMasterSeed(temp_seed);    // seed ------- HDKey. 
    setHd(root);

    //  setHd(prev => HDKey.fromMasterSeed(seed))
  }, [count]);

  const keyPairGen = () => {

      const path = `m/44'/501'/${keys.length}'/0'`;
      // console.log("🚀 ~ Wallet ~ path:", path)
      const child = hd.derive(path);
      // console.log("🚀 ~ Wallet ~ child:", child)

      // @scure/bip32 gives us privateKey directly
      if (!child.privateKey) throw new Error("No private key derived");

      // Create Solana keypair
      // setKeypair(Keypair.fromSeed(child.privateKey))
      const keypair = Keypair.fromSeed(child.privateKey);

      let pub_key = keypair.publicKey.toBase58();
      // console.log(`Account ${i}:`, keypair.publicKey.toBase58());
      let pri_key = Buffer.from(keypair.secretKey).toString("hex");
      // console.log(`Private Key ${i}`, Buffer.from(keypair.secretKey).toString("hex"));

     setKeys(prev => [...prev, {pub_key,pri_key}])
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 shadow-lg py-4 px-8 flex items-left ">
        <span className="text-2xl font-bold text-white tracking-widest drop-shadow-lg">MudraX</span>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-2xl space-y-6 p-6 mt-8">
  <div className="bg-gradient-to-br from-indigo-800 via-blue-700 to-purple-800/80 border border-indigo-700 p-5 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 hover:border-indigo-400 hover:bg-indigo-900/30">
          <h2 className="text-lg font-semibold text-white mb-2">Recovery Phrase</h2>
          <p className="text-gray-100 text-base break-words">{mnemonic}</p>
        </div>

  <div className="bg-gradient-to-br from-blue-800 via-cyan-800 to-indigo-900/80 border border-blue-600 p-5 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 hover:border-blue-400 hover:bg-blue-900/30">
          <h2 className="text-lg font-semibold text-white mb-2">Master Seed (hex)</h2>
          <p className="text-white text-sm break-words">
            {hd ? Buffer.from(seed).toString("hex") : "Loading..."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="flex-1 bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-400 hover:from-indigo-600 hover:via-blue-500 hover:to-cyan-300 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 border border-indigo-500 hover:border-cyan-300"
            onClick={() => setCount(count + 1)}
          >
            Generate New Wallet
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-600 hover:from-pink-500 hover:via-fuchsia-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 border border-pink-400 hover:border-purple-300"
            onClick={keyPairGen}
          >
            Create Solana Account
          </button>
        </div>

        {keys.length > 0 && (
  <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900/80 border border-slate-700 rounded-lg shadow-inner p-4 max-h-screen overflow-y-auto space-y-4 mt-4 transition-transform duration-200 hover:scale-105 hover:border-slate-400 hover:bg-slate-900/30">
            <h3 className="text-md font-semibold text-white mb-2">Generated Accounts</h3>
            {keys.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900/80 border border-gray-700 rounded-lg p-4 flex flex-col gap-2 transition-transform duration-200 hover:scale-105 hover:border-gray-400 hover:bg-gray-900/30">
                <div>
                  <span className="text-xs text-gray-300">Public Key:</span>
                  <p className="text-white text-sm break-words">{item.pub_key}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-300">Private Key:</span>
                  <p className="text-pink-200 text-xs break-words">{item.pri_key}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
