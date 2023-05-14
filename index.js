import * as web3 from '@solana/web3.js'
import dotenv from 'dotenv'
dotenv.config()

export const handler = async(event) => {
     var array = JSON.parse("[" + process.env.solana_keypair + "]");
    const payer = web3.Keypair.fromSeed(Uint8Array.from(array).slice(0,32))

    // connect to a cluster and get the current `slot`
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

    const receiver = new web3.PublicKey("Bsnb32s3iGJjbUyVYTnrsLPz3qkRKMrVNiyovChGHz1V")
    var transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: receiver,
            lamports: web3.LAMPORTS_PER_SOL / 100,
        })
    );
    // Sign transaction, broadcast, and confirm
    var signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    );
    console.log("SIGNATURE", signature);
    console.log("SUCCESS");
};