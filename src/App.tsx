import React from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import logo from './logo.svg';
import './App.css';

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
});

//  Wrap with Web3Provider from ethers.js
const web3Provider = new providers.Web3Provider(provider);

// Subscribe to accounts change
provider.on("accountsChanged", (accounts: string[]) => {
  console.log(accounts);
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId: number) => {
  console.log(chainId);
});

// Subscribe to session disconnection
provider.on("disconnect", (code: number, reason: string) => {
  console.log(code, reason);
});

async function connectWallet() {
  //  Enable session (triggers QR Code modal)
  await provider.enable();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a><hr />
        <button onClick={connectWallet}>Connect Wallet</button>
      </header>
    </div>
  );
}

export default App;
