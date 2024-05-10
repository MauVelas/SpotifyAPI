import React, { useState } from 'react'
import Album from './Album';

const Colection = ({albums, accessToken}) => {
  const [inputText, setInputText] = useState('')
  return (
    <div className='colection'>
      {albums.map(album => <Album album={album} accessToken={accessToken}/>)}
    </div>
  )
}

export default Colection