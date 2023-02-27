import React, { useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
const PLAYLISTS_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=4&after=148811043508";

export default function LastPlayed() {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleGetPlaylists = () => {
    axios
      .get(PLAYLISTS_ENDPOINT, {
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

  /*  save result in local storage */
  React.useEffect(() => {
    const data1 = localStorage.getItem("datas");
    if (data1) {
      setData(JSON.parse(data1));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("datas", JSON.stringify(data));
  });
  window.addEventListener("click", function () {
    handleGetPlaylists();
   
  });
  return (
    <div className="p-3 ">
      <div className=" ">
        <h1 className="text-black p-3  border-b-2 text-3xl border-gray-light">
          RECENTLY PLAYED
        </h1>
      </div>
      <h1 className="p-3 text-red font-bold">Song Activity</h1>

      <div className="grid lg:grid-cols-4 px-3 md:grid-cols-2 justify-center grid-cols-1 justify-items-center gap-3">
        {data?.items
          ? data.items.map((item) => (
              <div className=" mages">
                <div className="relative  ">
                  <img className="grid " src={item.track.album.images[0].url} />
                  <h1 className="absolute  top-0 text-red text-3xl">
                    {item.track.artists[0].name}
                  </h1>
                  <h1 className=" played-text ">{item.track.name}</h1>
                  <AudioPlayer
                  className="audio absolute z-10 bottom-0 bg-transparent text-center
                    text-transparent font-bold"
                   
                    src={item.preview_url}
                    onPlay={(e) => console.log("onPlay")}
                    customAdditionalControls ={[]}
                    showJumpControls={false}
                    customVolumeControls={[]}
                    defaultDuration={[]}
                    
                    // other props here
                  />
                </div>
                
              </div>
            ))
          : null}
      </div>
     
    </div>
  );
}
