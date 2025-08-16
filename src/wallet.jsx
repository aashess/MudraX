import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair, PublicKey } from "@solana/web3.js";
import { HDKey } from "@scure/bip32";
import * as ed25519 from "@noble/ed25519";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

window.Buffer = Buffer

export default function Wallet() {
  const [count,setCount] = useState(0)
  const [public_key,setPublic_key] = useState()
  const [private_key,setPrivate_key] = useState(0)


  React.useEffect(() => {
    const mnemonic = generateMnemonic();
    console.log("🚀 ~ Wallet ~ mnemonic:", mnemonic)
    const seed = mnemonicToSeedSync(mnemonic);
    console.log("🚀 ~ Wallet ~ seed:", seed)

    // Create HDKey root
    const hd = HDKey.fromMasterSeed(seed);
    console.log("🚀 ~ Wallet ~ hd:", hd)

    for (let i = 0; i < 1; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      console.log("🚀 ~ Wallet ~ path:", path)
      const child = hd.derive(path);
      console.log("🚀 ~ Wallet ~ child:", child)

      // @scure/bip32 gives us privateKey directly
      if (!child.privateKey) throw new Error("No private key derived");

      // Create Solana keypair
      const keypair = Keypair.fromSeed(child.privateKey);
      console.log("🚀 ~ Wallet ~ keypair:", keypair)
      let pub_key = keypair.publicKey.toBase58()
      console.log(`Account ${i}:`, keypair.publicKey.toBase58());
      let pri_key = Buffer.from(keypair.secretKey).toString("hex")
      console.log(`Private Key ${i}`, Buffer.from(keypair.secretKey).toString("hex"));
      
      setPublic_key(pub_key)
      setPrivate_key(pri_key)
      
      
    }
  }, [count]);

  return (
    <>
    <div className=" items-center text-center h-screen">
    <button className=" border-2 shadow-2xl bg-blue-500" onClick={() => setCount(count + 1)}>Generate New</button>
    <div className=" 2xl">Public Key: {public_key}</div>
    <div className=" 2xl">Private Key: {private_key}</div>
    
    </div>
    </>
  )
}
