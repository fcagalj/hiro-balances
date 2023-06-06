import React, { useEffect, useState } from 'react';
import leftPad from 'left-pad';
import rightPad from 'right-pad';


// In prod this will point to the user-specific endpoint
const LEGACY_JSON_API =
    'https://gist.githubusercontent.com/babasutra/7ec6b41369c2fcfbaeed8bb15edebec1/raw/24a98fd3042729fec2760143a78fdca60899eea2/sample.json';

// Switch this before deploying to prod:
const DEV_MODE = true;


async function fetchBalances() {



  if (DEV_MODE) {
    return fetchBalancesForDevelopment();
  } else {
    return fetchBalancesFromMessyLegacyApi(LEGACY_JSON_API);
  }
}

async function fetchBalancesFromMessyLegacyApi(url) {
  const response = await fetch(url);
  const data = await response.text();
  const json = JSON.parse(data);
  return json;
}

function fetchBalancesForDevelopment() {
  return [
    // you can add/edit tokens, balances etc.
    { name: 'Bitcoin', balance: 0.2, priceUSD: 27300 },
    { name: 'ElonToken', balance: 19.99, priceUSD: 0.01 },
    { name: 'USD Coin', balance: 1.99, priceUSD: 1.0 }
  ];
}

export default function App() {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    async function updateBalances() {
      const balances = await fetchBalances();
      setBalances(balances);
    }
    updateBalances();
  }, [setBalances]);

  return (
    <div className="App">
      <pre>
        |{leftPad('', 48, '-')}|
        <br />| <strong>{rightPad('Token', 20)}</strong> |
        <strong>{leftPad('Balance', 10)}</strong> |
        <strong>{leftPad('USD', 10)}</strong> |
        <br />|{leftPad('', 46, '=')}|
        <br />
        <TokenList tokenBalances={balances} />
      </pre>
    </div>
  );
}

function TokenList({ tokenBalances }) {
  return tokenBalances.map(TokenBalance);
}

function TokenBalance({ name, balance, priceUSD }) {
  return (
    <>
            | {rightPad(name, 20)} |{leftPad(balance.toString(), 10)} |
      {leftPad((balance * priceUSD).toString(), 10)} |
      <br />|{leftPad('', 46, '-')}|
      <br />
    </>
  );
}


