import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Button, Card, styled } from "@mui/material";
import axios from "axios";
import { METADATA_URL, QUICKNODE_RPC } from "../../constant";
import {
  Connection,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { encode } from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";

type Props = {};
const Root = styled(Card)(() => ({
  borderRadius: 12,
  padding: 12,
}));

const secret = [
  4, 203, 170, 140, 52, 111, 194, 79, 184, 206, 170, 25, 182, 108, 154, 75, 251,
  39, 109, 71, 204, 249, 137, 240, 47, 92, 5, 61, 247, 48, 183, 151, 152, 91,
  68, 24, 87, 160, 224, 30, 240, 38, 70, 237, 131, 147, 128, 232, 21, 89, 248,
  148, 251, 123, 115, 191, 129, 24, 99, 200, 72, 8, 202, 5,
];

const Widget2 = (_props: Props) => {
  const wallet = useWallet();
  console.log("wallet==", wallet);
  const handleMint = async () => {
    try {
      if (!wallet.publicKey) return;
      const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
      const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
      console.log("wallet==", encode(WALLET.secretKey));
      const METAPLEX = Metaplex.make(SOLANA_CONNECTION).use(
        keypairIdentity(WALLET)
      );

      const MINT_PRICE_LAMPORTS = 0.6 * LAMPORTS_PER_SOL; // 1 SOL
      const PAYMENT_RECEIVER = new PublicKey(
        "GdxLvb63NkKpg6Zgmt4UEwZrNpZuBPPRSiCNY6bcjt9w"
      );

      // Check if the user has enough SOL to mint
      const userBalance = await SOLANA_CONNECTION.getBalance(wallet.publicKey);
      if (userBalance < MINT_PRICE_LAMPORTS) {
        throw new Error("Insufficient balance to mint NFT.");
      }

      // Send SOL to payment receiver
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: PAYMENT_RECEIVER,
          lamports: MINT_PRICE_LAMPORTS,
        })
      );

      const signature = await SOLANA_CONNECTION.sendTransaction(transaction, [
        WALLET,
      ]);
      await SOLANA_CONNECTION.confirmTransaction(signature);
      console.log("Payment transaction signature", signature);

      // Mint the NFT to the user's wallet
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/signature`
      );
      console.log("res==", res.data);
      const { nft } = await METAPLEX.nfts().create(
        {
          uri: `${METADATA_URL}${res.data.hash}`,
          name: "FailSol",
          sellerFeeBasisPoints: 500,
          symbol: "FAIL",
          creators: [
            { address: WALLET.publicKey, share: 80 },
            {
              address: new PublicKey(
                "DxqA9eeszbpVgYAfESrUMWC7Jur4kX7ZCQjMPjFKFJ57"
              ),
              share: 20,
            },
          ],
          isMutable: false,
          // updateAuthority: wallet.publicKey,
          // mintAuthority: wallet.publicKey,
        },
        { commitment: "finalized" }
      );

      console.log(`   Success!🎉`);
      console.log(
        `   Minted NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`
      );
      console.log("nft==", nft);
    } catch (error) {
      console.log("error==", error);
    }
  };

  return (
    <Root>
      <Button onClick={handleMint}>Mint</Button>
    </Root>
  );
};

export default Widget2;
