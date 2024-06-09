import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Button, Card, Grid, styled } from "@mui/material";
import { Connection, Keypair } from "@solana/web3.js";
import axios from "axios";
import { useMemo } from "react";
import { METADATA_URL, QUICKNODE_RPC } from "../constant";

type Props = {};

const Root = styled(Card)(() => ({
  padding: 8,
  display: "flex",
}));

const secret = [
  4, 203, 170, 140, 52, 111, 194, 79, 184, 206, 170, 25, 182, 108, 154, 75, 251,
  39, 109, 71, 204, 249, 137, 240, 47, 92, 5, 61, 247, 48, 183, 151, 152, 91,
  68, 24, 87, 160, 224, 30, 240, 38, 70, 237, 131, 147, 128, 232, 21, 89, 248,
  148, 251, 123, 115, 191, 129, 24, 99, 200, 72, 8, 202, 5,
];

const MintPage = (_props: Props) => {
  const getProvider = () => {
    if ("phantom" in window) {
      //@ts-ignore
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open("https://phantom.app/", "_blank");
  };
  const isPhantomInstalled = useMemo(
    //@ts-ignore
    () => window.phantom?.solana?.isPhantom,
    [window]
  );

  const handleMint = async () => {
    const provider = getProvider();
    const ADMIN_WALLET = Keypair.fromSecretKey(new Uint8Array(secret));

    try {
      //@ts-ignore
      const WALLET = await provider.connect();
      console.log("wallet==", WALLET);
      const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
      //    const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
      //    console.log("wallet==", encode(WALLET.secretKey));
      const METAPLEX = Metaplex.make(SOLANA_CONNECTION).use(
        //@ts-ignore
        walletAdapterIdentity(WALLET)
      );
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
          creators: [{ address: ADMIN_WALLET.publicKey, share: 100 }],
          isMutable: false,
        },
        { commitment: "finalized" }
      );
      console.log(`   Success!🎉`);
      console.log(
        `   Minted NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`
      );
    } catch (error) {
      console.log("error==", error);
    }
  };

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Root>
        {isPhantomInstalled ? (
          <Button onClick={handleMint} variant="contained" color="primary">
            mint
          </Button>
        ) : (
          <Button variant="contained" color="primary">
            ConnectWallet
          </Button>
        )}
      </Root>
    </Grid>
  );
};

export default MintPage;
