import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair, PublicKey } from "@solana/web3.js";
import { HDKey } from "@scure/bip32";
import * as ed25519 from "@noble/ed25519";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

window.Buffer = Buffer;

export default function Wallet() {
  const [count, setCount] = useState(0);
  const [public_key, setPublic_key] = useState();
  const [private_key, setPrivate_key] = useState();
  const [mnemonic, setMnemonic] = useState("");
  const [hd, setHd] = useState("");
  const [seed, setSeed] = useState("");

  useEffect(() => {
    // setMnemonic(generateMnemonic())
    setMnemonic(generateMnemonic());

    const temp_seed = mnemonicToSeedSync(mnemonic);
    setSeed(temp_seed);

    // Create HDKey root
    const root = HDKey.fromMasterSeed(temp_seed);
    setHd(root);

    //  setHd(prev => HDKey.fromMasterSeed(seed))

    for (let i = 0; i < 1; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      // console.log("🚀 ~ Wallet ~ path:", path)
      const child = root.derive(path);
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

      setPublic_key(pub_key);
      setPrivate_key(pri_key);
    }
  }, [count]);

  // console.log("🚀 ~ Wallet ~ mnemonic:", mnemonic)
  // console.log("🚀 ~ Wallet ~ keypair:", keypair)
  // console.log("🚀 ~ Wallet ~ seed:", seed)
  //  console.log("🚀 ~ Wallet ~ HDKey:", root)

  // console.log("🚀 ~ Wallet ~ hd:", hd)
  // console.log("--------------------------------------------------", hd)

  return (
    <>
       
      <div className=" flex justify-center items-center bg-gradient-to-r from-sky-400 via-cyan-600 to-blue-700 w-screen text-center h-screen">
        <div className="2xl pt-3 space-y-2">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-md max-w-2xl mx-auto pt-3">
            <p class="text-gray-800 text-base leading-relaxed">
              Recovery Phase: {mnemonic}
            </p>
          </div>

          <div class="bg-gradient-to-r  from-teal-400 via-blue-500 to-indigo-600 p-6 rounded-lg shadow-md max-w-2xl mx-auto pt-3">
            <p class="text-white text-base leading-relaxed">
              Master Seed(hex):{" "}
              <span className="break-words whitespace-pre-wrap text-sm overflow-hidden">
                {hd ? Buffer.from(seed).toString("hex") : "Loading..."}
              </span>
            </p>
          </div>

          <button
            className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out"
            onClick={() => setCount(count + 1)}
          >
            Generate New Wallet
          </button>
         <button
            className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out"
            // onClick={() => setCount(count + 1)}
          >Create Solana</button>
          
          {/* <div className=" 2xl">Public Key: {public_key}</div>
          <div className=" 2xl">Private Key: {private_key}</div> */}
          
        </div>
      </div>
    </>
  );
}