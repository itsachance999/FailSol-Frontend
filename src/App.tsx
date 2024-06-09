import "./App.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { routers } from "./router/router";
import React, { useMemo } from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  CoinbaseWalletAdapter,
  // LedgerWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
  // WalletConnectWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WebSocketProvider } from "./providers/WebSocketProvider";

function App() {
  const network = WalletAdapterNetwork.Mainnet;
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TrustWalletAdapter(),
      new CoinbaseWalletAdapter(),
      // new LedgerWalletAdapter(),
      // new WalletConnectWalletAdapter(),
      new MathWalletAdapter(),
    ],
    [network]
  );
  return (
    <>
      <WebSocketProvider url={import.meta.env.VITE_WEBSOCKET_ENDPOINT}>
        <ThemeProvider theme={theme}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <React.Suspense fallback={<p>hello</p>}>
                <RouterProvider router={routers} />
              </React.Suspense>
            </WalletModalProvider>
          </WalletProvider>
        </ThemeProvider>
      </WebSocketProvider>
    </>
  );
}

export default App;
