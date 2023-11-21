import { useState, useEffect } from "react";
import { inspirationalImage } from "../../style";

const Inpiration = () => {
    const [url, setUrl] = useState("")
    
    useEffect(()=>{
        setUrl("https://i.pinimg.com/564x/f0/9c/57/f09c579148e096b3f7d908e1c915e1a7.jpg")
    },[])

    return ( 
        <div>
            <img src={url} alt="Image could not be loaded" style={inspirationalImage} />
        </div> 
    );
}
 
export default Inpiration;