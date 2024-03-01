import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
 const [symbol, setSymbol] = useState('');
 const [displayedSymbol, setDisplayedSymbol] = useState('');
 const [financials, setFinancials] = useState(null);
 const [error, setError] = useState('');

 const kpiItems = [
    { label: 'Market Capitalization', key: 'marketCapitalization' },
    { label: 'Enterprise Value', key: 'enterpriseValue' },
    { label: 'Current Dividend Yield', key: 'currentDividendYieldTTM' },
    { label: 'EPS Annual', key: 'epsAnnual' },
    { label: 'Book Value Per Share (Annual)', key: 'bookValuePerShareAnnual' },
    { label: 'Cash Flow Per Share (Annual)', key: 'cashFlowPerShareAnnual' },
 ];

 const fetchFinancials = async () => {
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=cn7fs9pr01qgjtj4jbs0cn7fs9pr01qgjtj4jbsg`);
      if (Object.keys(response.data.metric).length === 0) {
        setError('Company symbol not found or incorrect. Please try again!!');
        setFinancials(null);
      } else {
        setFinancials(response.data);
        setError('');
        setDisplayedSymbol(symbol);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setFinancials(null);
    }
 };

 return (
    <div className="App">
      <h1>Company's Basic Financials</h1>
      <input
        type="text"
        placeholder="Enter company symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={fetchFinancials}>Fetch Data</button>
      {error && <p className="error">{error}</p>}
      {financials && (
        <div className="financials">
          <h2>Financials of {displayedSymbol}</h2>
          <div className="kpi-dashboard">
            {kpiItems.map((item, index) => (
              <div className="kpi-item" key={index}>
                <p>{item.label}</p>
                <p>{financials.metric[item.key]} $</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
 );
}

export default App;
