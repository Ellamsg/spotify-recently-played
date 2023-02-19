import React, { useEffect, useState } from "react"

import axios from "axios"

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1&after=1484811043508";
export default function SpotifyPlayist(){
    const [token, setToken] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const playTrack = async (uri) => {
    try {
      await axios.put('https://api.spotify.com/v1/me/player/play', { uris: [uri] }, {
        headers: {
          Authorization: "Bearer" + token
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetPlaylists = () => {
     axios.get(PLAYLISTS_ENDPOINT, {
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
 

  return (
    <>
    {data?.items ? data.items.map((item) => 
      <div>
         
          <button onClick={() => playTrack(item.track.uri)}>Play</button>
      </div>
    
      ) 
      
      : null}
     
      <button onClick={handleGetPlaylists}>Get Playlists</button>
     
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