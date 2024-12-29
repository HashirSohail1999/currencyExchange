import React, { useEffect, useState } from 'react';
import './App.css'

interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  type: string;
}

const App: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const serverUrl = 'http://localhost:3000'; // Replace with your server's URL
  const [currencies, setCurrencies] = useState<Currency[] | []>([]);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [AmountBaseCurrency, setAmountBaseCurrency] = useState(1);
  
  //USEEFFECT FOR FETCHING THE LIST OF CURRENCIES
  useEffect(() => {
    const serverUrl = 'http://localhost:3000'; // Replace with your server's URL
    fetch(`${serverUrl}/api/currencies`)
    .then(response => {
        console.log('Response received:', response);
        return response.json();
      })
    .then(data => {
      console.log('Currencies:', data)
      const currencyArray = Object.values(data.data) as Currency[];
      setCurrencies(currencyArray);
    });
  }, [])

  //function for requesting the conversion
  const convertCurrency = async () => {
     
  //   fetch(`${serverUrl}/api/data?base_currency=${baseCurrency}&target_currency=${targetCurrency}`)
  //   .then(response => {
  //     console.log('Response received:', response);
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log('Data parsed:', data);
  //     setconver(data);
  //   })
  //   .catch(error => console.error('Error fetching data:', error))
  // }

    fetch(`${serverUrl}/api/data?base_currency=${baseCurrency}&target_currency=${targetCurrency}`)
    .then(response => {
      console.log('Response received:', response);
      return response.json();
    })
    .then(data => {
      console.log('Data parsed:', data);
      const amount = data.data[targetCurrency]; // Access the target currency value
      // Display the conversion
      setConvertedAmount(amount? amount.toString(): "conversion Failed"
      );
    })
    .catch(error => console.error('Error fetching data:', error))
  }



    return (
      <div className='flex-col justify-center items-center min-h-screen flex'>
        {currencies.length > 0 ? (
        <div className="m-5 p-2 bg-teal-500 bg-opacity-50 backdrop-filter backdrop-blur-lg h-max w-max rounded-xl flex-row text-center">
          <div className='Title text-2xl m-3'>Select Currency</div>
            <div>
            <select 
              className="form-control bg-slate-900 border-2 border-teal-500 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400" 
              id="baseCurrencySelect"
              value={baseCurrency}
              onChange={(e) => {
                setBaseCurrency(e.target.value)
                setConvertedAmount(0)
              }}
            >
            {currencies.map((currency) => (
            <option key={currency.code} value={currency.code} className="bg-slate-800 text-white">
              {currency.name} ({currency.symbol}) - {currency.code}
            </option>
            ))}
          </select>
            </div>
          <div className='Title text-2xl m-3'>Select Target Currency</div>
          <select 
            className="form-control bg-slate-900 border-2 border-teal-500 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400" 
            id="targetCurrencySelect"
            value={targetCurrency}
            onChange={(e) => {
              setTargetCurrency(e.target.value)
              setConvertedAmount(0)
            }}
          >
            {currencies.map((currency) => (
            <option key={currency.code} value={currency.code} className="bg-slate-800 text-white">
              {currency.name} ({currency.symbol}) - {currency.code}
            </option >
            ))}
          </select>
        </div>
        ) : (
          <p>Loading...</p>
        )}
        <button
         className="m-5 p-2 bg-teal-500 bg-opacity-50 backdrop-filter backdrop-blur-lg h-max w-max rounded-xl flex-row text-center"
         onClick={() => {convertCurrency()}}>
          {`Convert `+ baseCurrency+" to  "+targetCurrency}
        </button>

{/* Resultss */}

        {(convertedAmount !== 0) && (
        <div 
        className="m-5 p-2 text-2xl flex-row text-center"
        >
          1 {baseCurrency} =
          {convertedAmount+ " "} 
           {targetCurrency}
        </div>)}
{/* Multiply by the ratio  */}
<div className="m-5 p-2 bg-teal-500 bg-opacity-50 backdrop-filter backdrop-blur-lg h-max w-max rounded-xl flex flex-col items-center justify-center text-center">
  <div className='Title text-2xl m-3'>Multiply {baseCurrency} by rate</div>
  <div>
    <input 
      type="number"
      className="form-control bg-slate-900 border-2 border-teal-500 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
      value={AmountBaseCurrency}
      onChange={(e) => setAmountBaseCurrency(Number(e.target.value))}
    />
  </div>
  {(convertedAmount !== 0) && (
    <div className="m-5 p-2 text-2xl flex-row text-center">
      {convertedAmount * AmountBaseCurrency} 
    </div>
  )}
</div>
      </div>
    );
  }

export default App
