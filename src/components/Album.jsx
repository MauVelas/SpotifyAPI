import React, { useState } from 'react'
import Songs from './Songs';
import axios from 'axios'
import '../App.css'

const Album = ({album, accessToken}) => {
  const [songs, setSongs] = useState(null)
  const [showSongs, setShowSongs] = useState(false);
  const abrirCanciones = async(id) => {
    //console.log('acccccccccccccccccccccccessssssss')
    console.log(accessToken)
    //console.log('acccccccccccccccccccccccessssssss')
    setShowSongs(!showSongs)
    if (songs === null){
    const songsAlbum =  await get_songs_from_album(id)
    setSongs(songsAlbum)
    }
    
  }
  ////////////////////
  const get_songs_from_album = async () => {
    try {
      let url = `https://api.spotify.com/v1/albums/${album.id}/tracks`;
      const res = await axios.get(
        url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
      })
      
      if(res.status===200){
        console.log(res)
        return res.data.items
      }else{
        return 'Ocurrio un error al obtener la info'
      }
    }catch (error) {
      console.log(error);
      return 'Ocurrio un error al obtener la info'
    }
  }
  ///////////////
  //console.log('ssssssssssssssssssssssssssssss--------------------------------------------')
  return (
    <div className='album'>
      <img className='album-img' src={album.images[0].url} alt={album.images[0].url} width="300" height="300"/>
      <div className='album-name'>{album.name}</div>
      {album.artists.map(artist => 
        <div>
          {artist.name}
        </div>
        )}
      <div>{album.total_tracks} canciones</div>     
      <div>{album.release_date}</div>
      <button className='show-songs-btn' onClick={abrirCanciones}>Canciones</button>
      <div style={{ display: showSongs ? "block" : "none" }}>
        <Songs songs={songs}/>  
      </div>
      
    </div>
  )
}

export default Album