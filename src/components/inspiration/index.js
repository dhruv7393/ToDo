import { useState, useEffect } from "react";

const Inpiration = () => {
    const [url, setUrl] = useState("")
    const myStyle = {
        width: '60vh'
    }
    useEffect(()=>{
        setUrl("https://i.pinimg.com/564x/f0/9c/57/f09c579148e096b3f7d908e1c915e1a7.jpg")
    },[])

    return ( 
        <div>
            <img src={url} alt="Image could not be loaded" style={myStyle} />
        </div> 
    );
}
 
export default Inpiration;