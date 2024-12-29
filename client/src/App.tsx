import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState("null")
  const serverUrl = 'http://localhost:3000'; // Replace with your server's URL
  useEffect(() => {
    // const baseCurrency = 'EUR';
    // const currencies = 'USD';

    // fetch(`${serverUrl}/api/data?base_currency=${baseCurrency}&currencies=${currencies}`)
    // .then(response => {
    //   console.log('Response received:', response);
    //   return response.json();
    // })
    // .then(data => {
    //   console.log('Data parsed:', data);
    //   setData(data);
    // })
    // .catch(error => console.error('Error fetching data:', error))
  }, [data])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
          response is {data}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
