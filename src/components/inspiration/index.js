import { useState, useEffect } from "react";
import { inspirationalImage } from "../../style";

const Inpiration = () => {
    const [url, setUrl] = useState("https://i.pinimg.com/564x/f0/9c/57/f09c579148e096b3f7d908e1c915e1a7.jpg")
    
    useEffect(()=>{
        let arrayOfImages=[
            "https://i.pinimg.com/564x/f0/9c/57/f09c579148e096b3f7d908e1c915e1a7.jpg",
            "https://i.pinimg.com/564x/f6/5a/99/f65a99b4cdf6b561a4d19745a6108cf3.jpg",
            "https://i.pinimg.com/564x/17/4e/8d/174e8d662735b3bf720f21af3d07b9f8.jpg",
            "https://i.pinimg.com/564x/81/69/0d/81690d6ab52d9e32995013238f0cb6e2.jpg",
            "https://i.pinimg.com/564x/50/9a/71/509a71ba2b141672be61d1e84263d7c9.jpg",
            "https://i.pinimg.com/564x/02/f6/df/02f6dffc79a0f4b694c986b2ead42f53.jpg",
            "https://i.pinimg.com/564x/23/11/40/2311403aa9bce677986647a1bed37eb7.jpg",
            "https://i.pinimg.com/564x/51/c4/40/51c440d71c930085b03371752cb1c724.jpg",
            "https://i.pinimg.com/564x/53/96/ae/5396aef9db9009383246c5141cbc29cf.jpg",
            "https://i.pinimg.com/564x/2f/47/be/2f47be7126625d8c91ae1e9fb5ebfbd5.jpg",
            "https://i.pinimg.com/564x/a0/87/e6/a087e606b1c29848fda052282e955628.jpg",
            "https://i.pinimg.com/564x/9c/04/d7/9c04d7e8250db42e1260a1c2b6ab7233.jpg",
            "https://i.pinimg.com/564x/20/ba/87/20ba8759b74350f60eba56a674614733.jpg",
            "https://i.pinimg.com/564x/c1/e1/0e/c1e10e9b0547019aff0ae33b39128e4f.jpg",
            "https://i.pinimg.com/564x/dc/99/c9/dc99c9235c7032515c9bcf885b9b0095.jpg",
            "https://i.pinimg.com/564x/26/46/7c/26467c08ae043e52095ac55c1b2bccd4.jpg",
            "https://i.pinimg.com/564x/8f/df/ab/8fdfab4655e8223fe5520b5dcc4b2304.jpg"
        ]
        setInterval(()=>{
            setUrl(arrayOfImages[Math.floor(Math.random() * arrayOfImages.length)])
        }
        , 60000)
        
    },[])

    return ( 
        <div>
            <img src={url} alt="Image could not be loaded" style={inspirationalImage} />
        </div> 
    );
}
 
export default Inpiration;