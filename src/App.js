import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from "react"
import { addImage,getImageFromFirebase } from './firebase';
import shirt from "./shirt.jpeg"
const queryString = require('query-string');
function App() {
    const canvasRef = useRef()


    const str = window.location.search;

    const number = str.replace('?', '');
    const [nft, setNFT] = useState("")


    async function getimage(number){
      const res = await fetch(`https://api.opensea.io/api/v1/asset/0x26badf693f2b103b021c670c852262b379bbbe8a/${number}/?format=json`)
      const data = await res.json()
      const image = data.image_url
      setNFT(image)
  }

  useEffect(() => {getimage(number)} ,[getimage, number])

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
      let imageData = canvasRef.current.toDataURL("image/png")
      var link = document.createElement('a');
      link.download = "my-image.png";
      addImage(number, imageData)

      link.href = imageData;
      link.click();
  }

  // canvasRef.current.onload = () => {
  //   const ctx = canvasRef.current.getContext("2d")
  //   if (NFT) ctx.drawImage(NFT,185,200, 125,125); // Or at whatever offset you like
  //   if (img) ctx.drawImage(img,185,200, 125,125); // Or at whatever offset you like
  // }

  return (
    <div className="App">
        <button onClick={download}>Download</button>
        <canvas ref = {canvasRef} style={{border: "1px solid black"}} width="470" height="600"></canvas>
    </div>
  );
}

export default App;
