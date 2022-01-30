import logo from './logo.svg';
import './App.css';
import { useRef, useState } from "react"
import shirt from "./shirt.jpeg"
function App() {
    const canvasRef = useRef()

    const [nft, setNFT] = useState("")

    const NFT = new Image()    

    const img = new Image()
    img.src = shirt
    NFT.src = nft


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
    const image = e.target.files[0]
    setNFT(URL.createObjectURL(image))
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      ctx.clearRect(0,0,500,600)
    }
  }

  return (
    <div className="App">
        <input onChange={setter} type = "file" accept="image/*" />
        <button onClick={download}>Create Thingy</button>
        <canvas ref = {canvasRef} style={{border: "1px solid black"}} width="500" height="600"></canvas>
    </div>
  );
}

export default App;
