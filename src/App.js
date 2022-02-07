import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from "react"
import shirt from "./shirt.jpeg"
const queryString = require('query-string');
function App() {
    const canvasRef = useRef()


    const str = window.location.search;

    const number = str.replace('?', '');
    console.log(number);
    const [state, setState] = useState();


    async function getimage(number){
      const res = await fetch(`https://api.opensea.io/api/v1/asset/0x26badf693f2b103b021c670c852262b379bbbe8a/${number}/?format=json`)
      const data = await res.json()
      console.log(data.image_url);
      const image = data.image_url
      setState(image)


      setNFT(image)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      ctx.clearRect(0,0,500,600)
    }

      console.log(state + "test");
      setter()
  }

  useEffect(() => {
    getimage(number)
  }, [])




    const [nft, setNFT] = useState("")

    const NFT = new Image()    

    const img = new Image()
    img.src = shirt
    NFT.src = nft
    NFT.crossOrigin = "Anonymous"


    img.onload = function(){
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d")
          ctx.drawImage(img,0,0); // Or at whatever offset you like
        }
    };

    NFT.onload = function() {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d")
        ctx.drawImage(NFT,185,200, 125,125); // Or at whatever offset you like
      }
    }

    const download = () => {
      const image = canvasRef.current.toDataURL("image/png")
      var link = document.createElement('a');
      link.download = "my-image.png";
      link.href = image;
      link.click();
  }
  const setter = (e) => {  
    setNFT(state)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      ctx.clearRect(0,0,500,600)
    }
  }

  return (
    <div className="App">
        <button onClick={download}>Download</button>
        <canvas ref = {canvasRef} style={{border: "1px solid black"}} width="470" height="600"></canvas>
    </div>
  );
}

export default App;
