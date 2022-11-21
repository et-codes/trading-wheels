import React from 'react';
import { currency, percent } from '../utils/format';

const Summary = ({ summary }) => {
  return (
    <div>
      stocks: {currency(summary.stocks)}<br />
      cash: {summary.cash}<br />
      total: {summary.total}<br />
      gain: {percent(summary.gain_pct)}
    </div>
  );
}

export default Summary;