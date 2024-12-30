import React, { useEffect, useState } from 'react';
import loadingImage from './assets/loading.png';
import './App.css'

const NODEJS_SERVER_URL = import.meta.env.VITE_NODEJS_SERVER_URL;

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

interface log {
  id: number;
  request: string;
  response: string;
  time: string;
}

const App: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const serverUrl = NODEJS_SERVER_URL // Replace with your server's URL
  const [currencies, setCurrencies] = useState<Currency[] | []>([]);
  const [logs, setlogs] = useState<log[] | []>([]);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [AmountBaseCurrency, setAmountBaseCurrency] = useState(1);
  
  
  //Function for fetching the logs
  const fetchLogs = async () => {
    try {
      // console.log('Fetching logs');
      const response = await fetch(`${serverUrl}/api/logs`);
      const data = await response.json();
      // console.log("logs "+ JSON.stringify(data, null, 2));
      setlogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };
  
  //function for requesting the conversion
  const convertCurrency = async () => {
    fetch(`${serverUrl}/api/data?base_currency=${baseCurrency}&target_currency=${targetCurrency}`)
    .then(response => {
      // console.log('Response received:', response);
      return response.json();
    })
    .then(data => {
      // console.log('Data parsed:', data);
      const amount = data.data[targetCurrency]; // Access the target currency value
      // Display the conversion
      setConvertedAmount(amount.toString());
      //write the log
       writeLog(
        "Convert " + baseCurrency + " to " + targetCurrency,
        amount.toString() !== 0 ? "The converted amount is " + amount.toString() : "Conversion failed"
        ).then(() => {
          fetchLogs();
        });
    })
    .catch(error => console.error('Error fetching data:', error))
  }

  //Function for pushing the logs
  const writeLog = async (requestContent: string, responseContent: string): Promise<void> => {
    const result = await fetch(`${serverUrl}/api/logs`, {
      method: 'POST', // HTTP POST method
      headers: { 'Content-Type': 'application/json' }, // Tell the server it's JSON
      body: JSON.stringify({
        request: requestContent, // What you're sending
        response: responseContent, // What you're logging as the response
      }),
    });
  
    const data = await result.json(); // Parse the server's response
    console.log(data); // Output the response in the console
  };

  //USEEFFECT FOR FETCHING THE LIST OF CURRENCIES AND LOGS
  useEffect(() => {
    const serverUrl = NODEJS_SERVER_URL|| 'http://localhost:3000'; // Use environment variable or fallback to localhost
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
    fetchLogs()
  }, [])
  
    return (
      <div className='flex flex-col justify-center items-center min-h-screen p-4'>
        {currencies.length > 0 ? (
        <div id="xD" className="m-5 p-4 bg-teal-500 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl flex flex-col text-center w-full max-w-md">
          <div className='Title text-2xl m-3'>Select Currency</div>
            <div>
            <select 
              className="form-control bg-slate-900 border-2 border-teal-500 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 w-full" 
              id="baseCurrencySelect"
              value={baseCurrency}
              onChange={(e) => {
                setBaseCurrency(e.target.value)
                setConvertedAmount(0)
              }}
            >
            {currencies.map((currency) => (
            <option key={currency.code} value={currency.code} className="bg-slate-800 text-white">
              <>{currency.name} ({currency.symbol})</> 
              <> - {currency.code}</>
            </option>
            ))}
          </select>
            </div>
          <div className='Title text-2xl m-3'>Select Target Currency</div>
          <select 
            className="form-control bg-slate-900 border-2 border-teal-500 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 w-full" 
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
        ) : (<>
{/* Loading Image */}
            <div className="flex justify-center items-center">
            <img src={loadingImage} alt="Loading" width={50} height={50} className="animate-spin" />
            </div>
          <div>Loading currencies...</div>
          </>
        )}
        <button
         className="m-5 p-2 bg-teal-500 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl text-center w-full max-w-md"
         onClick={() => {
          convertCurrency()
          }}>
          {`Convert `+ baseCurrency+" to  "+targetCurrency}
        </button>

{/* Resultss */}

        {(convertedAmount !== 0) && (
        <div 
        className="m-5 p-2 text-2xl text-center w-full max-w-md"
        >
          1 {baseCurrency} =
          {convertedAmount+ " "} 
           {targetCurrency}
        </div>)}
{/* Multiply by the ratio  */}
<div className="m-5 p-4 bg-teal-500 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl flex flex-col items-center justify-center text-center w-full max-w-md">
  <div className='Title text-2xl m-3'>Multiply {baseCurrency} by rate</div>
  <div className="w-full">
    <input 
      type="number"
      className="form-control bg-slate-900 border-2 border-teal-500 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
      value={AmountBaseCurrency}
      onChange={(e) => setAmountBaseCurrency(Number(e.target.value))}
    />
  </div>
  {(convertedAmount !== 0) && (
    <div className="m-5 p-2 text-2xl text-center w-full">
      {convertedAmount * AmountBaseCurrency} 
    </div>
  )}
</div>
<h1 className="text-2xl  m-5">Logs</h1>
<div className="overflow-x-auto w-full">
  {logs.length > 0 ?(<table className="min-w-full bg-slate-900 border-2 border-teal-500 text-white">
    <thead>
      <tr>
        <th className="py-1 px-2 border-b">ID</th>
        <th className="py-1 px-2 border-b">Request</th>
        <th className="py-1 px-2 border-b">Response</th>
        <th className="py-1 px-2 border-b">Time</th>
      </tr>
    </thead>
    <tbody>
      {logs.slice(0, 10).map(log => (
        <tr key={log.id} className="bg-slate-900 border-2 border-teal-500 rounded-md p-1 text-white focus:outline-none focus:ring-2 focus:ring-teal-400">
          <td className="py-1 px-2 border-b">{log.id}</td>
          <td className="py-1 px-2 border-b">{log.request}</td>
          <td className="py-1 px-2 border-b">{log.response}</td>
          <td className="py-1 px-2 border-b">{log.time}</td>
        </tr>
      ))}
    </tbody>
  </table>):
  (<>
{/* Loading Image */}
            <div className="flex justify-center items-center">
            <img src={loadingImage} alt="Loading" width={50} height={50} className="animate-spin" />
            </div>
          <div>Loading currencies...</div>
          </>
        )}
</div>
      </div>
    );
  }

export default App
