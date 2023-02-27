import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";


const GET_PROFILE = "https://api.spotify.com/v1/me/top/artists?limit=1";


export default function SpotifyPlayist() {
  const [token, setToken] = useState("");
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  
    const getArtist = () => {
      axios
        .get(GET_PROFILE, {
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
    };
    ;
  

/*  save result in local storage */
  React.useEffect (() =>{
    const data = localStorage.getItem("artists");
    if(data){
      setArtist(JSON.parse(data))
    }
  },[])

  React.useEffect (() =>{
     localStorage.setItem("artists",JSON.stringify(artist))
  })




  window.addEventListener ('click',function(){
    getArtist()
  })
  return (
    <div className="">
  

      {artist?.items
        ? artist.items.map((item) => (
            <div className="flex p-3 lg:flex-row gradient gap-9 justify-center ">
              <div className="  py-6 flex flex-col lg:flex-row md:gap-3 ">
                <img
                  className=" h-[300px] w-[300px]"
                  src={item.images[2].url}
                />
                <div className="md:py-6 lg:text-left text-center ">
                  <h1 className="text-3xl text-red underline uppercase">
                    Your Top Artist
                  </h1>
                  <h1 className="text-3xl text-white">{item.name}</h1>
                  <h1 className=" text-white ">{item.genres[1]}</h1>
                </div>
              </div>

              <div className="relative lg:block hidden bg-green">
                <img
                  className="h-full w-[400px] drop"
                  src={item.images[0].url}
                />
              </div>
           
            </div>
            
          ))
        : null}

     
    </div>
  );
}
