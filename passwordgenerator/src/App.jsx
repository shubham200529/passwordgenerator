import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const PasswordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"
    
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
        .catch(err => console.error("Failed to copy password:", err))
    }
    PasswordRef.current?.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 bg-gray-900 text-white'>
      <h1 className='my-3 text-center text-gray-300'> 
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 text-gray-500'>
        <input 
          type="text"
          value={password} 
          className='outline-none w-full py-1 px-3 bg-white'
          placeholder='Password'
          readOnly
          ref={PasswordRef}
        />
        <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'> 
        <div className='flex items-center gap-x-1'>
          <input type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numbers">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charinput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App