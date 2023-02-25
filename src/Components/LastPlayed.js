
import React, { useEffect, useState } from "react"
import axios from "axios"
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1&after=148811043508";
export default function LastPlayed(){

    const [token, setToken] = useState("");
    const [data, setData] = useState({});

  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
      }
    }, []);

    const handleGetPlaylists = () => {
        axios.get(PLAYLISTS_ENDPOINT,  {
           headers: {
             Authorization: "Bearer " + token,
           },
         })
         .then((response) => {
           setData(response.data);
         })
         .catch((error) => {
           console.log(error);
         });
     };
    return(

        <div className="p-3">
            <div className=" ">
                <h1 className="text-black p-3 border-b-2 text-3xl border-gray-light">LAST PLAYED</h1>
            </div>
            <h1 className="p-3">song activity</h1>
            <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-items-center gap-3">
        
                <div className="relative bg-red">
                <img className="mages"src="image/05.jpg"/>
                <h1 className="absolute  top-0 text-red text-3xl">Burna boy</h1>
                <h1 className=" played-text ">last last</h1>
                </div>
                <div>
                <img className="mages"src="image/03.jpg"/>
                </div>
                <div>
                <img className="mages"src="image/01.jpg"/>
                </div>
                <div>
                <img className="mages"src="image/02.jpg"/>
                </div>
                 
            </div>

         {/* <button onClick={handleGetPlaylists} >get</button>*/}
        {data?.items ? data.items.map((item) => 
      <div className="change">
           <p>{item.track.name}</p>
           <p>{item.track.artists[0].name}</p>
        <img src={item.track.album.images[0].url}/>
      
      </div>
    
      ) 
      
      : null}
        </div>
    )
}