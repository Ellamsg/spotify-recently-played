import React from "react";


export default function Nav(props) {
 
  return (
    <div className="  bg-wind flex flex-row justify-between ">
    
      <div className="p-4">
        <h1 className=" text-white ">LAMS</h1>
      </div>
      <div className="bg-darkwind p-4 border-b-2 border-green">
        <button className=" text-white animate-pulse" onClick={props.handleLogin}>
          LOGIN TO SPOTIFY
        </button>
      </div>
    </div>
  );
}
