import React from "react";

export default function Nav(props){


    return(
        <div className=" bg-wind flex flex-row justify-between ">
            <div className="p-4">
            <h1 className=" text-white ">SUONO</h1>
            </div>
          <div className="bg-darkwind p-4 border-b-2 border-green">
          <h1 className=" text-white">nav bar</h1>
           <button  onClick={props.handleLogin}>login to spotify</button>
          </div>
           
        </div>
    )
}