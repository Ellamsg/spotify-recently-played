import React, { useEffect, useState } from "react"

import axios from "axios"

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1&after=1484811043508";
const GET_PROFILE ="https://api.spotify.com/v1/me/top/artists?limit=2"
export default function SpotifyPlayist(){
    const [token, setToken] = useState("");
  const [data, setData] = useState({});
  const [artist, setArtist] = useState({});

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
  return (
    <>
    {artist?.items ? artist.items.map((item) => 
      <div>
         <p>{item.name}</p>
         <img src={item.images[0].url}/>
          <button onClick={getArtist}>get artist vvv</button>
      </div>
    
      ) 
      
      : null}
     
      <button onClick={handleGetPlaylists}>Get Playlist</button>
      <button onClick={getArtist}>get artist vvv</button>
      {data?.items ? data.items.map((item) => 
      <div>
           <p>{item.track.name}</p>
           <p>{item.track.artists[0].name}</p>
        <img src={item.track.album.images[0].url}/>
      
      </div>
    
      ) 
      
      : null}
    </>
  );
}