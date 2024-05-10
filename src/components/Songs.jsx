import React from 'react'
import Song from './Song'
const Songs = ({songs}) => {
if (songs === null){
    return (
        <>
            <div>Cargando.........................................................</div>
        </>
      )
}else if(typeof songs === "string"){
    return (
        <>
        <div>Error: {songs}</div>
        </>
      )
}else{
    return (
        <>
        {songs.map(song => ( 
            <Song song={song}/>
        )
        )}
        </>
      )
    }
}

export default Songs