import React, { useState } from "react";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Buffer } from "buffer";
window.Buffer = Buffer;

 function Wallet() {
  const mnemonic = generateMnemonic();
  console.log("🚀 ~ Wallet ~ mnemonic:", mnemonic);
    // let [showseed, setshowseed] = useState(false)
//   let [seed, setseed] = useState("")
  const seed = mnemonicToSeedSync(mnemonic);
  console.log("🚀 ~ Wallet ~ seed:", seed);

  const hex = (toString())
console.log(hex);

  for (let i = 0; i < 4; i++) {
      const path = `m/44'/501'/${i}'/0`  //Derivation Path for Solana

      
    
  }


//    setInterval(() => {console.log(`uint16arary: ${uint16arrayy}`)},2000)
  
  

// function updated() {
//     setTimeout(() => {
//         setshowseed = true
//         console.log("🚀 ~ updated ~ setshowseed:", setshowseed)
        
//     })

  return (
    <>
      <div>wallet</div>
        {/* {wait}
      {!showseed ? <div>Loading...</div> : setTimeout(() => {
                <div>{seed}</div>
      },2000)}

      <button onClick={updated} className=" rounded-xl border-2">Submit</button> */}
    </>
  );
}

export default Wallet;
