import { useState } from 'react'
import { useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [text, setText] = useState("")
  const [url, setUrl]= useState(null)
  const [hidden, setHidden]=useState("")
  const img=useRef(null)
  //console.log(text)

  const handleLogin= async(e)=>{
    e.preventDefault()
    console.log(text)
    try{
      const response= await fetch("http://localhost:8000/generate_qr",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
       // credentials: "include",
        body:JSON.stringify({text})
      })

      if(response.ok){
        const data= await response.blob()
      console.log(data)
      const url= URL.createObjectURL(data)
      setUrl(url)
      setHidden("hidden")
      
      }

    }catch(error){
      console.error("error al generar el QR",error)

    }
 
  }
  const Descargar = async()=>{
        const link= document.createElement("a")
        link.href= url
        link.download= "qr_Generated.png"
        link.click()

      }
      const Eliminar= async()=>{
        setUrl(null)
        setHidden("")
        setText("")
        
        
      }


  return (
    <>
       <div className=" inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      {/* El Div del Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 leading-tight tracking-tighter mb-4">
            QR CODE <span className="text-green-700">GENERATOR</span>
          </h1>
          <form 
          onSubmit={handleLogin}>
          <label htmlFor="qr-input" className=" text-left block text-sm font-medium text-gray-700 mb-2">Texto para generar QR:</label>
          <input type="text" 
          placeholder="Ingrese texto para generar QR"
           className="border border-gray-300 rounded-lg w-full p-3 mb-4"
           value={text}
           onChange={(e)=>setText(e.target.value)}></input>
          <div className="aspect-square bg-gray-100 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
            {/* Aquí iría el componente del QR */}
            {url? <img ref={img} src={url} className="w-full h-full object-contain "></img>: <span className="text-gray-400">QR Preview Area</span>}
            
          </div>

          {hidden?<button disabled={true} className={`w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors hover:bg-green-700 ${hidden}`}>
            Generate QR
          </button>:<button className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors hover:bg-green-700">
            Generate QR
          </button>}
          {url?<><button onClick={Descargar} className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors hover:bg-green-700 p-3 mb-6 mt-4">
            Descargar
          </button><button onClick={Eliminar} className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors hover:bg-green-700 p-3 mb-6 mt-4">
            Eliminar
          </button></>:<button disabled={true} className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors hover:bg-green-700 p-3 mb-6 mt-4 hidden">
            Descargar
          </button>}
          <label className="text-sm text-gray-700"> Desarrollado por: Lic. Jose Gutierrez </label>
          </form>
        </div>

      </div>
    </div>
     
    </>
  )
}

export default App
 