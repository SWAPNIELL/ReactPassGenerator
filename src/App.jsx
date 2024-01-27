import { useState,useCallback,useEffect, useRef} from 'react';
import './index.css';

function App() {

  const [password,setPassword] = useState("")
  const [length, setLength] = useState(8); // Initialize 'length' state with a default value of 8
  const [numbersAllowed,setNumbersAllowed] = useState(false);
  const [CharactersAllowed,setCharactersAllowed] = useState(false);
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" //it will contain data from which password will be made
     if(numbersAllowed) {
      str += "0123456789"
     }
     if(CharactersAllowed){
      str += "~`!@#$%^&*(){}[]?"
     }
     for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length+1) //characters index not that character
      pass += str.charAt(char)
     }

     

     setPassword(pass)
  
  
  },[length,numbersAllowed,CharactersAllowed])
  const copyPasswordToClipboard = useCallback( () => {
    passwordRef.current?.select()
    
    window.navigator.clipboard.writeText(password)
  

  }, [password])

    useEffect( () => {
      passwordGenerator()
    } ,
    [length,numbersAllowed,CharactersAllowed,passwordGenerator])
  return (
    <> 
      
      <div className='text-center mt-6 '>
        <h1 className='text-black font-bold '>RANDOM PASSWORD GENERATOR</h1>
        <div className='flex flex-col items-center justify-center mt-8 space-y-4'>
          <div className='flex items-center'>
            <input
              type='text'
              value={password}
              placeholder='Password'
              ref={passwordRef}
              className='text-black rounded-xl border-2 border-black w-80 py-3 px-4'
              readOnly 
            />
          </div>
          <div className='flex items-center'>
            <button 
              onClick={copyPasswordToClipboard}
              className='mt-6 size-15 bg-gradient-to-tr from-blue-600 to-blue-800 hover:from-blue-400 hover:to-blue-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl'
              type='button'
            >
              Copy
            </button>
          </div>
          </div>
          <div className='mt-8 space-x-4 flex-row'>
            <input 
              type='range' 
              
              min={8} 
              max={99} 
              
              className='cursor-pointer' 
              value={length} // Set value to 'length'
              onChange={(e) => setLength(parseInt(e.target.value))} // Update 'length' state
            />  
            <label className='text-black font-bold'> Length: {length}</label>
            <div className='space-x-2 mt-3'>
            
            <input type='checkbox' className='h-4 w-5' onChange={()=>{
              setNumbersAllowed((prev)=> !prev);
            }}>
              </input><label className='text-black font-bold'>Numbers</label>


            <input type='checkbox' className='h-4 w-5' onChange={()=>{
              setCharactersAllowed((prev)=>!prev);
            }}></input><label className='text-black font-bold'>Characters</label>
            </div>
            
          </div>
      </div>
     
    </>
  );
}

export default App;

