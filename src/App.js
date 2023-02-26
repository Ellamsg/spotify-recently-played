import logo from './logo.svg';
import './App.css';
import Nav from './Components/Nav';
import SpotifyPlayist from './SpotifyPlaylist';
import { useEffect } from 'react';
import LastPlayed from './Components/LastPlayed';
import TopTracks  from './Components/TopTracks';

const CLIENT_ID = 'd678732486934e8685bc549c98783d78'
const SPOTIFY_AUTHORIZE_ENDPOINT ='https://accounts.spotify.com/authorize';
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000'
const SPACE_DELIMITER = "%20";
const SCOPES =["user-read-recently-played","streaming","user-top-read","user-read-currently-playing","user-read-playback-state", "user-read-private", "user-read-email" ]
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

const getReturnedParamsFromSpotifyAuth = (hash) =>{
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
}

function App() {
  useEffect( () =>{
    if(window.location.hash){
      const { access_token, expires_in, token_type } =
      getReturnedParamsFromSpotifyAuth(window.location.hash);
   
      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
  }
  })
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="relative">
       <p className="absolute text-center font-bold -z-10 md:text-2xl  text-1xl top-[350px] bottom-0 left-0 right-0 ">LOGIN & TAP TO GET SPOTIFY ACTIVITY</p>
      <Nav handleLogin={handleLogin}/>
       
       
      <SpotifyPlayist />
      <TopTracks/>
       <LastPlayed/>
       
    </div>
  );
}

export default App;
