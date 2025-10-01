import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../../public/favicon.ico'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [info, setInfo] = useState<any[]>();
  

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        // sessionStorage.clear();
        if (sessionStorage.length === 0) {
          fetch("http://localhost:6543/skins/1")
            .then((response) => response.json())
            .then((data) => {
              sessionStorage.setItem("name", JSON.stringify(data));
              setInfo(data);
            });
        } else {
          const data = JSON.parse(sessionStorage.getItem('name') || 'null');
          // doesn't rerender
          setInfo(data);
        }
      } catch (error) {
        console.error('Error fetching name', error);
      } 
    };
    fetchSkins();
  }, [setInfo]);

  return (
    <>
      <div>
        <div>{info &&
        info.map((product) => (
          <h1>{product.name}</h1>
        ))}</div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </>
  )
}

export default App
