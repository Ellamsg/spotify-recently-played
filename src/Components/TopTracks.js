import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
const TRACK_PLAY = "https://api.spotify.com/v1/me/top/tracks?limit=4";

export default function TopTracks() {
  const [token, setToken] = useState("");
  const [track, setTrack] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const getTrack = () => {
    axios
      .get(TRACK_PLAY, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setTrack(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*  save result in local storage */
  React.useEffect(() => {
    const data1 = localStorage.getItem("track");
    if (data1) {
      setTrack(JSON.parse(data1));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("track", JSON.stringify(track));
  });
  window.addEventListener("click", function () {
    getTrack();
  });
  return (
    <div className="p-3 ">
      <div className=" ">
        <h1 className="text-black p-3  border-b-2 text-3xl border-gray-light">
          TOP TRACKS
        </h1>
      </div>
      <h1 className="p-3 text-red font-bold">Song Activity</h1>

      <div className="grid lg:grid-cols-4 px-3 md:grid-cols-2 justify-center grid-cols-1 justify-items-center gap-3">
        {track?.items
          ? track.items.map((item) => (
              <div className=" mages">
                <div className="relative ">
                  <img className=" grid " src={item.album.images[0].url} />
                  <h1 className="absolute  top-0 text-red text-3xl">
                    {item.artists[0].name}
                  </h1>
                  <h1 className="text-red played-text absolute top-[220px]">
                    {item.name}
                  </h1>
                  <ReactAudioPlayer
                    className="bg-transparent w-full border-green border-2"
                    src={item.preview_url}
                    controls
                  />
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
