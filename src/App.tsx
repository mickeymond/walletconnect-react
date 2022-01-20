import React from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";
import logo from './logo.svg';
import './App.css';

function App() {
  const [connected, setConnected] = React.useState(false);
  const [chainId, setChainId] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [balance, setBalance] = React.useState("");

  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId: "8acc78d5beb44a14aa0a70a712c14811",
    rpc: {
      56: "https://bsc-dataseed.binance.org/",
      97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
  });

  //  Wrap with Web3Provider from ethers.js
  const web3Provider = new providers.Web3Provider(provider);

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts: string[]) => {
    console.log(accounts);
    setAddress(accounts[0]);
    setConnected(true);
    getWalletInfo(accounts[0]);
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId: number) => {
    console.log(chainId);
    setChainId(chainId);
    setConnected(true);
  });

  // Subscribe to session disconnection
  provider.on("disconnect", (code: number, reason: string) => {
    console.log(code, reason);
    window.location.reload();
  });

  async function getWalletInfo(address: string) {
    const getBalanceResult = await web3Provider.getBalance(address);
    const balance = ethers.utils.formatUnits(getBalanceResult, 18);
    setBalance(balance);
  }

  async function connectWallet() {
    //  Enable session (triggers QR Code modal)
    await provider.enable();
  }

  async function disconnectWallet() {
    await provider.disconnect();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>You are connected to Chain Id: {chainId} with Address: {address} and Balance: {balance}</p>
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
        {!connected ?
          <button onClick={connectWallet}>Connect Wallet</button> :
          <button onClick={disconnectWallet}>Disconnect Wallet</button>}
      </header>
    </div>
  );
}

export default App;
