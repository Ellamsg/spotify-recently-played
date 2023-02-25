import React, { useEffect, useState } from "react"
import './App.css';
import axios from "axios"


const GET_PROFILE ="https://api.spotify.com/v1/me/top/artists?limit=1"
export default function SpotifyPlayist(){
    const [token, setToken] = useState("");
  const [artist, setArtist] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

 


const getArtist =() =>{
  axios.get(GET_PROFILE,  {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  .then((response) => {
    setArtist(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
}

function refreshPage() {
  window.location.reload(false);
}
  return (
    <div className="">
    <div className="flex  flex-row gradient gap-9 justify-center ">
       <div className="  py-6 flex flex-col md:flex-row md:gap-3 ">
       <img className=" h-[300px] w-[300px]" src="image/01.jpg"/>
       <div className="md:py-6 md:text-left text-center ">
       <h1 className="text-3xl text-red">wiz</h1>
       <h1 className=" text-white">wizzy said he would take it </h1>
       </div>
       
       </div>
      
       <div className="relative md:block hidden bg-green">
       <img className="h-full w-[400px]"src="image/03.jpg"/>
       <p className="absolute right-0 bottom-4">hh</p>
       <p className="absolute right-0 bottom-4">hh</p>
       </div>
      
     </div>
    
    
    
    {artist?.items ? artist.items.map((item) => 
       {/*<div className="flex  flex-row gradient gap-9 justify-center ">
       <div className="  py-6 flex flex-row gap-3 ">
       <img className=" h-[300px] w-[300px]" src={item.images[0].url}/>
       <div className="py-6 ">
       <h1 className="text-3xl text-red">{item.name}</h1>
       <h1 className=" text-white">wizzy said he would take it </h1>
       </div>
       
       </div>
      
       <div className="relative bg-green">
       <img className="h-full w-[400px]"src={item.images[0].url}/>
       <p className="absolute right-0 bottom-4">hh</p>
       <p className="absolute right-0 bottom-4">hh</p>
       </div>
      
     </div>
    */}
      ) 
      
      : null}
     
   {/*  <button onClick={handleGetPlaylists}>Get Playlist</button>
    */}
    {/*  <button onClick={getArtist}>artist</button>
    */}
     
    </div>
  );
}