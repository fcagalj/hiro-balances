import React, { useEffect, useState } from 'react';
import leftPad from 'left-pad';
import rightPad from 'right-pad';
import PropTypes from 'prop-types';
import { fetchBalances } from './api/fetchBalances';



export default function App() {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    async function updateBalances() {
      const balances = await fetchBalances();
      setBalances(balances);
    }
    updateBalances();
  }, []);

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
  return tokenBalances.map((tokenBalance, index) => <TokenBalance key={index} {...tokenBalance} />);
}

TokenList.propTypes = {
  tokenBalances: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      priceUSD: PropTypes.number.isRequired
    })
  )
};

const TokenBalance = React.memo(function TokenBalance({ name, balance, priceUSD }) {
  return (
    <>
      | {rightPad(name, 20)} |{leftPad(balance.toString(), 10)} |
      {leftPad((balance * priceUSD).toString(), 10)} |
      <br />|{leftPad('', 46, '-')}|
      <br />
    </>
  );
});

TokenBalance.propTypes = {
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  priceUSD: PropTypes.number.isRequired
};
