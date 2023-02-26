import React, { useEffect, useState } from "react";
import axios from "axios";

const DISPLAY_PROFILE = "https://api.spotify.com/v1/me";
export default function Nav(props) {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);
  const getProfile = () => {
    axios
      .get(DISPLAY_PROFILE, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProfile(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" bg-wind flex flex-row justify-between ">
      {/* <button className="text-white" onClick={getProfile}>proflile</button>
              {profile? profile.map((item) => 
        
        <div className=" ">
       
          <img src={item.images[0]}/>
           
      </div> 
        )  
              : null}*/}
      <div className="p-4">
        <h1 className=" text-white ">SUONO</h1>
      </div>
      <div className="bg-darkwind p-4 border-b-2 border-green">
        <button className=" text-white " onClick={props.handleLogin}>
          LOGIN TO SPOTIFY
        </button>
      </div>
    </div>
  );
}
